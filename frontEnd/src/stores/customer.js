import { ref, inject } from "vue";
import { defineStore } from "pinia";
import { useUsersStore } from "./users";

export const useCustomerStore = defineStore("customer", () => {
  const axios = inject("axios");

  const customer = ref([]);
  const testePontosCliente = ref("50");
  const usersStore = useUsersStore();
  //const userStore = useUsersStore();
  function clearCustomer() {
   customer.value = null;
  }

  async function loadCustomer() {
    try {
      console.log(usersStore.user);
      const response = await axios.get("customers/me");
      customer.value = response.data.data;
      console.log(customer.value);
    } catch (error) {
      
      clearCustomer();
      throw error;
    }
  }

  return {
    loadCustomer,
    customer,
    testePontosCliente
  };
});
