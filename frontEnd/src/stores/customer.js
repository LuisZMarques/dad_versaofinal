import { ref, inject } from "vue";
import { defineStore } from "pinia";
import { useUsersStore } from "./users";

export const useCustomerStore = defineStore("customer", () => {
  const axios = inject("axios");
  const toast = inject("toast");

  const customer = ref();
  const customers = ref([]);
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

  async function register(customer,userId) {
    try {
      console.log(customer)
      customer.user_id = userId;
      const response = await axios.post("customers", customer);
      toast.success(`Cliente criado com sucesso`);
      customers.value.push(response.data.data);
      return response.data.data;
    } catch (error) {
      toast.error(`${error.response.data.message}`);
      throw error;
    }
  }

  return {
    loadCustomer,
    register,
    customer,
    testePontosCliente
  };
});
