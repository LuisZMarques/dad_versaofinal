import { ref, inject } from "vue";
import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", () => {
  
  const toast = inject("toast");

  const cart = ref([]);

  function clearCart() {
    cart.value = [];
  }

  
  return { cart };
});