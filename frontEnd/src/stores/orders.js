import { ref, inject, computed } from "vue";
import { defineStore } from "pinia";

import {useUsersStore} from "@/stores/users.js"
import {useCartStore} from "@/stores/cart.js"

export const useOrdersStore = defineStore("orders", () => {
  const axios = inject("axios");
  const paymentGateway = inject("paymentGateway");
  const toast = inject("toast");

  const usersStore = useUsersStore();
  const cartStore = useCartStore();
  const allOrders = ref([]);
  const orders = ref([]);
  const hotDishs = ref([]);
  let isLoading = ref(false);

  function clearOrders() {
    orders.value = [];
  }

  async function loadOrders() {
    try {
      const response = await axios.get("orders");
      allOrders.value = response.data.data;
    } catch (error) {
      clearOrders();
      throw error;
    }
  }

  async function getOrders() {
    try {
      isLoading.value = true;
      const response = await axios.get("orders/preparingOrReady");
      orders.value = response.data.data;
      isLoading.value = false;
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

  let getHotDishs = computed(() => {
    hotDishs.value = [];
    orders.value.forEach((order) => {
      if (order.status == "P") {
        order.products.forEach((product) => {
          if (product.type == "hot dish" && product.pivot.status != "R")
            hotDishs.value.push(product);
        });
      }
    });
    return hotDishs.value;
  });

  let productPreparing = (orderId, id) => {
    let orderIdx = orders.value.findIndex((t) => t.id == orderId);
    let productIdx = orders.value[orderIdx].products.findIndex(
      (p) => p.id == id
    );
    orders.value[orderIdx].products[productIdx].pivot.status = "P";
  };

  let productReady = (orderId, id) => {
    let orderIdx = orders.value.findIndex((t) => t.id == orderId);
    let productIdx = orders.value[orderIdx].products.findIndex(
      (p) => p.id == id
    );
    orders.value[orderIdx].products[productIdx].pivot.status = "R";
  };

  let orderReadyToDelivery = async (orderId) => {
    let orderIdx = orders.value.findIndex((t) => t.id == orderId);
    let updatedOrder = orders.value[orderIdx];
    updatedOrder.status = "D";
    updatedOrder.delivered_by = useUsersStore.user.id
    try {
      const response = await axios.patch(
        "orders/" + orderId + "/updateEstadoDaOrder/",
        updatedOrder
      );
      console.log(response.data);
      return response.data.data;
    } catch (error) {}
  };

  let orderPreparedToReady = async (orderId) => {
    let orderIdx = orders.value.findIndex((t) => t.id == orderId);
    let updatedOrder = orders.value[orderIdx];
    updatedOrder.status = "R";
    try {
      const response = await axios.patch(
        "orders/" + orderId + "/updateEstadoDaOrder/",
        updatedOrder
      );
      console.log(response.data);
      return response.data.data;
    } catch (error) {}
  };


  const selectedDiscount = ref(0);
  const paymentMethod = ref('');
  const paymentInput = ref('');
  
//sera preciso ir buscar o proximo id disponivel ,
// o customer id e ver como fazer o ticket number, points_gained e total_paid esta a associar ao null aos campos
  const newOrder = () => {                              
    return {
      id: null,
      ticket_number: 99,
      status: "P",
      customer_id: null,
      total_price: cartStore.totalCart,
      total_paid: (cartStore.totalCart-selectedDiscount),
      total_paid_with_points: selectedDiscount,
      points_gained: cartStore.pointsCart,
      points_used_to_pay: (selectedDiscount*2),
      payment_type: paymentMethod,
      payment_reference: paymentInput,
      products: cartStore.cart,
    };
  };
  const dataToSend = ref(newOrder);
  async function createOrder() {
    try {
      const response = await axios.post("orders", dataToSend);
      //updateProductOnArray(response.data.data);
      //socket.emit("updateProduct", response.data.data);
      console.log(response.data);
      toast.success(`Pagamento concluido a sua ordem vai começar a ser preparada!`);
    } catch (error) {
      console.log(error);
    }
    //updateProjectOnArray(response.data.data)
    //return response.data.data
  }
  const paymentData = () => {                              
    return { 
      type: paymentMethod.value,
      reference: paymentInput.value,
      value: Math.ceil(cartStore.totalCart),
    };
  };
  async function createPayment() {
    try {
      const response = await paymentGateway.post("payments", JSON.stringify(paymentData()));
      console.log(response.data);
      createOrder();
      toast.success(`Pagamento concluido a sua ordem vai começar a ser preparada!`);
    } catch (error) {
      console.log(error);
    }
  }
  
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
    hotDishs,
    getHotDishs,
    newOrder,
    createOrder,
    newOrder,
    selectedDiscount,
    createPayment,
    paymentInput,
    paymentMethod,
    loadOrders
  };
});
