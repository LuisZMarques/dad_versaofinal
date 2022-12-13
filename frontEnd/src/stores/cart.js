import { ref, computed, inject } from "vue";
import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", () => {

  const toast = inject("toast");
  const cart = ref([]);

  function clearCart() {
    cart.value = [];
  }

  function addToCart(newItem) {
    cart.value.push(newItem);
    toast.success('Item adicionado ao carrinho!')
  }

  function removeFromCart(item) {
    let idx = cart.value.findIndex((t) => t.id === item.id)
        if (idx >= 0) {
            cart.value.splice(idx, 1)
        }
    toast.success('Item removido do carrinho!')
  }

  const totalCartProducts = computed(() => {
    return cart.value.length
  })




  return { cart, clearCart, addToCart, totalCartProducts, removeFromCart };
});
