import { ref, inject } from "vue";
import { defineStore } from "pinia";

export const useOrdersStore = defineStore("orders", () => {
  const axios = inject("axios");
  const toast = inject("toast");

  const orders = ref([]);

  function clearOrders() {
    orders.value = [];
  }

  async function loadOrders() {
    try {
      const response = await axios.get("orders");
      orders.value = response.data.data;
      toast.success(
        `Orders loaded com successo`
      );
      return orders.value;
    } catch (error) {
      clearOrders();
      throw error;
    }
  }

  return { orders, loadOrders };
});