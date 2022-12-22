import { ref, inject } from "vue";
import { defineStore } from "pinia";
import { useUsersStore } from "./users";
import { useLoadingStore } from "@/stores/loading.js"

export const useCustomerStore = defineStore("customer", () => {
  const axios = inject("axios");
  const toast = inject("toast");

  const loadingStore = useLoadingStore();

  const customer = ref();
  const usersStore = useUsersStore();


  // Funções de Customer
  
  function clearCustomer() {
   customer.value = null;
  }

  async function loadCustomer() {
    try {
      console.log(usersStore.user);
      loadingStore.toggleLoading();
      const response = await axios.get("customers/me");
      customer.value = response.data.data;
      console.log(customer.value);
    } catch (error) {
      clearCustomer();
      throw error;
    }finally{
      loadingStore.toggleLoading();
    }
  }

  async function register(customer,userId) {
    try {
      console.log(customer)
      customer.user_id = userId;
      loadingStore.toggleLoading();
      const response = await axios.post("customers", customer);
      toast.success(`Cliente criado com sucesso`);
      customers.value.push(response.data.data);
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
  }

  return {
    loadCustomer,
    register,
    customer
  };
});
