import { ref, inject, computed } from "vue";
import { defineStore } from "pinia";

import {useUsersStore} from "../stores/users.js"

export const useOrdersStore = defineStore("orders", () => {
  const axios = inject("axios");
  const toast = inject("toast");

  const usersStore = useUsersStore();

  const orders = ref([]);
  const hotDishs = ref([]);
  let isLoading = ref(false);

  function clearOrders() {
    orders.value = [];
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
  };
});
