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

  let orderReadyToDelivery = async (orderId) => {
    usersStore.loadUser();
    let orderIdx = ordersPreparingOrReady.value.findIndex(
      (t) => t.id == orderId
    );
    let updatedOrder = ordersPreparingOrReady.value[orderIdx];
    updatedOrder.status = "D";
    updatedOrder.delivered_by = usersStore.user.id;
    toast.success("Pedido entregue");
    try {
      const response = await axios.patch(
        "orders/" + orderId + "/updateEstadoDaOrder",
        ordersPreparingOrReady.value[orderIdx]
      );
      return response.data.data;
    } catch (error) {}
  };

  let orderNotCanceled = computed(() => {
    return ordersPreparingOrReady.value.filter((order) => order.status != "C");
  });

  // Criar order no backend

  async function createOrder() {
    try {
      loadingStore.toggleLoading();
      const response = await axios.post("orders", cartStore.cart);
      toast.success("Pagamento feito com sucesso");
      socket.emit("newOrder", response.data.data, usersStore.user);
      cartStore.paymentModal = false;
      cartStore.cartModalShow = false;
      response.data.data.products.forEach((el) => {
        if (el.type == "hot dish")
          socket.emit("pratoHot", el);
      });
      cartStore.clearCart();
      return response.data.data;
    } catch (error) {
      if(error.response.data.errors) {
        Object.values(error.response.data.errors).forEach(errorMessage => toast.error(errorMessage.toString()));
      }else{
        toast.error(error.response.data.message);
      }
    }finally{
      loadingStore.toggleLoading();
    }
  }

  //Cancelar Order

  let cancelOrder = async (orderId) => {
    let orderIdx = ordersPreparingOrReady.value.findIndex(
      (t) => t.id == orderId
    );
    if (orderIdx >= 0) ordersPreparingOrReady.value[orderIdx].status = "C";
    try {
      loadingStore.toggleLoading();
      const response = await axios.patch(
        "orders/" + orderId + "/updateEstadoDaOrder",
        ordersPreparingOrReady.value[orderIdx]
      );
      toast.success("Pedido cancelado com com sucesso");
      return response.data.data;
    } catch (error) {
      if(error.response.data.errors) {
        Object.values(error.response.data.errors).forEach(errorMessage => toast.error(errorMessage.toString()));
      }else{
        toast.error(error.message);
      }
    }finally{
      loadingStore.toggleLoading();
    }
  };

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

  // Evento Chefe
  socket.on("pratoParaCozinhar", (product) => {
    toast.success(`Prato para cozinhar. ${product.name}`);
  });

  // Evento Empregado
  socket.on("Prato_Para_Entrega", (order) => {
    toast.success(`Pedido pronto para entrega.`);
  });

  // Evento Cliente
  socket.on("Prato_Pronto", (order) => {
    toast.success(`Pedido está pronto.`);
  });

  return {
    isLoading,
    orders,
    getOrders,
    ordersPreparing,
    ordersReady,
    orderReadyToDelivery,
    getOrderPreparingOrReady,
    hotDishs,
    getHotDishs,
    createOrder,
    loadOrders,
    allOrders,
    getOrdersCustomer,
    ordersCustomer,
    orderNotCanceled,
    ordersPreparingOrReady,
    cancelOrder,
  };
});
