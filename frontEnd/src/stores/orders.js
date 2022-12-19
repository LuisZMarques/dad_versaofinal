import { ref, inject, computed } from "vue";
import { defineStore } from "pinia";

import { useUsersStore } from "@/stores/users.js";
import { useCartStore } from "@/stores/cart.js";
import { useCustomerStore } from "./customer";

export const useOrdersStore = defineStore("orders", () => {
  const axios = inject("axios");
  const toast = inject("toast");
  const socket = inject("socket");

  const usersStore = useUsersStore();
  const cartStore = useCartStore();

  const allOrders = ref([]);
  const orders = ref([]);
  const hotDishs = ref([]);
  const ordersPreparingOrReady = ref([]);
  const ordersCustomer = ref([]);
  let isLoading = ref(false);

  function clearOrders() {
    orders.value = [];
  }

  // Devolve todos os pedidos
  async function loadOrders() {
    try {
      const response = await axios.get("orders");
      allOrders.value = response.data.data;
      console.log(allOrders.value);
    } catch (error) {
      clearOrders();
      throw error;
    }
  }

  // Devolve os pedidos do cliente
  async function getOrdersCustomer() {
    try {
      isLoading.value = true;
      const response = await axios.get(
        "/orders/ordersByCustomer/" + usersStore.user.id
      );
      ordersCustomer.value = response.data.data;
      console.log(orders);
      isLoading.value = false;
    } catch (error) {
      clearOrders();
      throw error;
    }
  }

  // Devolve todos os pedidos em preparação ou prontos
  async function getOrderPreparingOrReady() {
    try {
      isLoading.value = true;
      const response = await axios.get("orders/preparingOrReady");
      ordersPreparingOrReady.value = response.data.data;
      getHotDishs();
      isLoading.value = false;
    } catch (error) {
      clearOrders();
      throw error;
    }
  }

  async function getOrders() {
    try {
      isLoading.value = true;
      const response = await axios.get("orders");
      allOrders.value = response.data.data;
      isLoading.value = false;
    } catch (error) {
      clearOrders();
      throw error;
    }
  }
  // Devolve pedidos já entregues
  async function getOrdersDelivered() {
    try {
      isLoading.value = true;
      const response = await axios.get("orders/delivered");
      orders.value = response.data.data;
      isLoading.value = false;
      console.log(orders);
    } catch (error) {
      clearOrders();
      throw error;
    }
  }

  let ordersReady = computed(() => {
    return orders.value.filter((order) => order.status == "R");
  });
  let ordersPreparing = computed(() => {
    return orders.value.filter((order) => order.status == "P");
  });

  let getHotDishs = () => {
    hotDishs.value = [];
    ordersPreparingOrReady.value.forEach((order) => {
      if (order.status == "P") {
        order.products.forEach((product) => {
          if (
            product.type == "hot dish" &&
            (product.pivot.status == "P" || product.pivot.status == "W")
          )
            hotDishs.value.push(product);
        });
      }
    });
  };

  let productPreparing = async (orderId, id) => {
    let orderIdx = ordersPreparingOrReady.value.findIndex(
      (t) => t.id == orderId
    );
    let productIdx = ordersPreparingOrReady.value[orderIdx].products.findIndex(
      (p) => p.id == id
    );
   
      
    try {
      ordersPreparingOrReady.value[orderIdx].products[productIdx].pivot.status =
      "P";
      const response = await axios.patch(
        "orders/" + orderId + "/updateEstadoDaOrder/",
        ordersPreparingOrReady.value[orderIdx]
      );
      toast.success("Mesagem: Pedido a preparar");
      return response.data.data;
    } catch (error) {}
  };

  async function update(data){
    try {
      const response = await axios.patch(
        "orders/" + orderId + "/updateEstadoDaOrder/",
        ordersPreparingOrReady.value[orderIdx]
      );
      return response.data.data;
    } catch (error) {}
  }

  let productReady = async (orderId, id) => {
    let orderIdx = ordersPreparingOrReady.value.findIndex(
      (t) => t.id == orderId
    );
    let productIdx = ordersPreparingOrReady.value[orderIdx].products.findIndex(
      (p) => p.id == id
    );
    ordersPreparingOrReady.value[orderIdx].products[productIdx].pivot.status =
      "R";

    toast.success("Mesagem: Pedido pronto");
    try {
      const response = await axios.patch(
        "orders/" + orderId + "/updateEstadoDaOrder/",
        ordersPreparingOrReady.value[orderIdx]
      );
      toast.success("Mesagem: Producto pronto");
      return response.data.data;
    } catch (error) {}
  };

  let orderReadyToDelivery = async (orderId) => {
    let orderIdx = ordersPreparingOrReady.value.findIndex(
      (t) => t.id == orderId
    );
    let updatedOrder = ordersPreparingOrReady.value[orderIdx];
    updatedOrder.status = "D";
    updatedOrder.delivered_by = useUsersStore.user.id;
    toast.success("Mesagem: Pedido entregue");
    try {
      const response = await axios.patch(
        "orders/" + orderId + "/updateEstadoDaOrder/",
        ordersPreparingOrReady.value[orderIdx]
      );
      return response.data.data;
    } catch (error) {}
  };

  let orderNotCanceled = computed(() => {
    return ordersPreparingOrReady.value.filter((order) => order.status != "C");
  });

  let orderPreparedToReady = async (orderId) => {
    let orderIdx = orders.value.findIndex((t) => t.id == orderId);
    let updatedOrder = orders.value[orderIdx];
    updatedOrder.status = "R";
    toast.success("Mesagem: Pedido pronto");
    try {
      const response = await axios.patch(
        "orders/" + orderId + "/updateEstadoDaOrder/",
        updatedOrder
      );
      return response.data.data;
    } catch (error) {}
  };

  //sera preciso ir buscar o proximo id disponivel ,
  // o customer id e ver como fazer o ticket number, points_gained e total_paid esta a associar ao null aos campos
  const newOrder = () => {
    return {
      type: cartStore.cart.payment_type,
      reference: cartStore.cart.payment_reference,
      value: cartStore.cart.total_price,
    };
  };

  // fazer a compra

  async function createOrder() {
    try {
      const response = await axios.post("orders", cartStore.cart);
      toast.success("Mesagem: pagamento feito com sucesso");
      socket.emit("newOrder", response.data.data);
      cartStore.clearCart();
      return response.data.data;
    } catch (error) {
      toast.error("Mesagem:" + error.response.data.message);
    }
  }

  let cancelOrder = async (orderId) => {
    let orderIdx = ordersPreparingOrReady.value.findIndex(
      (t) => t.id == orderId
    );
    if (orderIdx >= 0) ordersPreparingOrReady.value[orderIdx].status = "C";
    try {
      const response = await axios.patch(
        "orders/" + orderId + "/updateEstadoDaOrder/",
        ordersPreparingOrReady.value[orderIdx]
      );
      toast.success("Mesagem: pedido cancelado com com sucesso");
      return response.data.data;
    } catch (error) {
      toast.error("Mesagem:" + error.response.data.message);
    }
  };

  function addOrderOnArray(order) {
    ordersPreparingOrReady.value.push(order);
    getHotDishs();
  }

  socket.on("newOrder", (order) => {
    addOrderOnArray(order);
    toast.success(`Novo pedido foi criado com sucesso.`);
  });

  return {
    isLoading,
    orders,
    getOrders,
    ordersPreparing,
    ordersReady,
    productReady,
    productPreparing,
    orderReadyToDelivery,
    orderPreparedToReady,
    getOrderPreparingOrReady,
    hotDishs,
    getHotDishs,
    createOrder,
    loadOrders,
    allOrders,
    getOrdersCustomer,
    getOrdersDelivered,
    ordersCustomer,
    orderNotCanceled,
    ordersPreparingOrReady,
    cancelOrder,
  };
});
