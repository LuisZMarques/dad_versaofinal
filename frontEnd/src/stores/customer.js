import { ref, inject } from "vue";
import { defineStore } from "pinia";

export const useCustomerStore = defineStore("customer", () => {
  const axios = inject("axios");

  const customer = ref([]);
  const testePontosCliente = ref("50");

  function clearCustomer() {
   customer.value = null;
  }

  async function loadCustomer() {
    try {
      const response = await axios.get("customer/1");
      customer.value = response.data.data;
    } catch (error) {
      
      //clearCustomer();
      throw error;
    }
  }

  return {
    loadCustomer,
    customer,
    testePontosCliente
  };
});
