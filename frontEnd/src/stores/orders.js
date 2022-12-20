import { ref, inject, computed } from "vue";
import { defineStore } from "pinia";

import { useUsersStore } from "@/stores/users.js";
import { useCartStore } from "@/stores/cart.js";
import { useLoadingStore } from "@/stores/loading.js";

export const useOrdersStore = defineStore("orders", () => {
  const axios = inject("axios");
  const toast = inject("toast");
  const socket = inject("socket");

  const usersStore = useUsersStore();
  const cartStore = useCartStore();
  const loadingStore = useLoadingStore();

  const allOrders = ref([]);
  const orders = ref([]);
  const hotDishs = ref([]);
  const ordersPreparingOrReady = ref([]);
  const ordersCustomer = ref([]);
  let isLoading = ref(false);

  // Devolve todos os pedidos
  async function loadOrders() {
    try {
      loadingStore.toggleLoading();
      const response = await axios.get("orders");
      allOrders.value = response.data.data;
      console.log(allOrders.value);
    } catch (error) {
      clearOrders();
      throw error;
    }finally{
      loadingStore.toggleLoading();
    }
  }

  // Devolve os pedidos do cliente
  async function getOrdersCustomer() {
    try {
      loadingStore.toggleLoading();
      const response = await axios.get(
        "/orders/ordersByCustomer/" + usersStore.user.id
      );
      ordersCustomer.value = response.data.data;
      console.log(orders);
      isLoading.value = false;
    } catch (error) {
      clearOrders();
      throw error;
    }finally{
      loadingStore.toggleLoading();
    }
  }

  // Devolve todos os pedidos em preparação ou prontos
  async function getOrderPreparingOrReady() {
    try {
      loadingStore.toggleLoading();
      const response = await axios.get("orders/preparingOrReady");
      ordersPreparingOrReady.value = response.data.data;
      getHotDishs();
      isLoading.value = false;
    } catch (error) {
      clearOrders();
      throw error;
    }finally{
      loadingStore.toggleLoading();
    }
  }

  async function getOrders() {
    try {
      loadingStore.toggleLoading();
      const response = await axios.get("orders");
      allOrders.value = response.data.data;
      isLoading.value = false;
    } catch (error) {
      clearOrders();
      throw error;
    }finally{
      loadingStore.toggleLoading();
    }
  }
  // Devolve pedidos já entregues
  async function getOrdersDelivered() {
    try {
      loadingStore.toggleLoading();
      const response = await axios.get("orders/delivered");
      orders.value = response.data.data;
      isLoading.value = false;
      console.log(orders);
    } catch (error) {
      clearOrders();
      throw error;
    }finally{
      loadingStore.toggleLoading();
    }
  }

  let ordersReady = computed(() => {
    return ordersPreparingOrReady.value.filter((order) => order.status == "R");
  });

  let ordersPreparing = computed(() => {
    return ordersPreparingOrReady.value.filter((order) => order.status == "P");
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
    console.log(isAllReadyForDelivering(orderIdx));
    try {
      ordersPreparingOrReady.value[orderIdx].products[productIdx].pivot.status =
        "P";
        loadingStore.toggleLoading();
      const response = await axios.patch(
        "orders/" + orderId + "/updateEstadoDosProdutos/",
        ordersPreparingOrReady.value[orderIdx].products[productIdx].pivot
      );
      toast.success("Mesagem: Pedido a preparar");
      return response.data.data;
    } catch (error) {

    }finally{
      loadingStore.toggleLoading();
    }
  };

  async function update(data) {
    try {
      loadingStore.toggleLoading();
      const response = await axios.patch(
        "orders/" + orderId + "/updateEstadoDaOrder/",
        ordersPreparingOrReady.value[orderIdx]
      );
      return response.data.data;
    } catch (error) {

    }finally{
      loadingStore.toggleLoading();
    }
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
    if (isAllReadyForDelivering(orderIdx)) {
      orderPreparedToReady(orderIdx);
    }
  };

  let orderPreparedToReady = async (orderIdx) => {
    //let orderIdx = orders.value.findIndex((t) => t.id == orderId);
    let updatedOrder = ordersPreparingOrReady.value[orderIdx];
    updatedOrder.status = "R";
    try {
      loadingStore.toggleLoading();
      const response = await axios.patch(
        "orders/" + updatedOrder.id + "/updateEstadoDaOrder/",
        updatedOrder
      );
      toast.success("Mesagem: Pedido pronto");
      return response.data.data;
    } catch (error) {

    }finally{
      loadingStore.toggleLoading();
    }
  };

  let orderReadyToDelivery = async (orderId) => {
    usersStore.loadUser()
    let orderIdx = ordersPreparingOrReady.value.findIndex(
      (t) => t.id == orderId
    );
    let updatedOrder = ordersPreparingOrReady.value[orderIdx];
    updatedOrder.status = "D";
    updatedOrder.delivered_by = usersStore.user.id;
    toast.success("Mesagem: Pedido entregue");
     try {
      loadingStore.toggleLoading();
      const response = await axios.patch(
        "orders/" + orderId + "/updateEstadoDaOrder/",
        ordersPreparingOrReady.value[orderIdx]
      );
      return response.data.data;
    } catch (error) {

    }finally{
      loadingStore.toggleLoading();
    }
  };

  let orderNotCanceled = computed(() => {
    return ordersPreparingOrReady.value.filter((order) => order.status != "C");
  });

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
      loadingStore.toggleLoading();
      const response = await axios.post("orders", cartStore.cart);
      toast.success("Mesagem: pagamento feito com sucesso");
      socket.emit("newOrder", response.data.data);
      cartStore.clearCart();
      return response.data.data;
    } catch (error) {
      toast.error("Mesagem:" + error.response.data.message);
    }finally{
      loadingStore.toggleLoading();
    }
  }

  let cancelOrder = async (orderId) => {
    let orderIdx = ordersPreparingOrReady.value.findIndex(
      (t) => t.id == orderId
    );
    if (orderIdx >= 0) ordersPreparingOrReady.value[orderIdx].status = "C";
    try {
      loadingStore.toggleLoading();
      const response = await axios.patch(
        "orders/" + orderId + "/updateEstadoDaOrder/",
        ordersPreparingOrReady.value[orderIdx]
      );
      toast.success("Mesagem: pedido cancelado com com sucesso");
      return response.data.data;
    } catch (error) {
      toast.error("Mesagem:" + error.response.data.message);
    }finally{
      loadingStore.toggleLoading();
    }
  };

  function isAllReadyForDelivering(idx) {
    let boolean = true;
    ordersPreparingOrReady.value[idx].products.forEach((el) => {
      if (el.pivot.status != "R") boolean = false;
    });

    return boolean;
  }

  function clearOrders() {
    orders.value = [];
  }

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
