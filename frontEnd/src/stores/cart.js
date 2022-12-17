import { ref, computed, inject } from "vue";
import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", () => {
  const toast = inject("toast");

  let cart = ref([]);
  let totalCart = ref(0);
  let pointsCart = ref();
  let cartModalShow = ref(false);

  let clearCart = () => {
    cart.value = [];
  };

  let addToCart = (item) => {
/*     let item = {
      price : item.price, 
      product_id :item.id, 
    } */
    cart.value.push(item);
    totalCart.value += parseFloat(item.price);
    pointsCart.value = parseInt(totalCart.value / 10)
    toast.success("Item adicionado ao carrinho!");
  };

  let removeFromCart = (item) => {
    let idx = cart.value.findIndex((t) => t.id === item.id);
    if (idx >= 0) {
      cart.value.splice(idx, 1);
    }
    totalCart.value -= parseFloat(item.price);
    toast.success("Item removido do carrinho!");

    if (totalCartProducts.value == 0) cartModalShow.value == false;
  };

  let totalCartProducts = computed(() => {
    return cart.value.length;
  });
  

  return {
    cart,
    clearCart,
    addToCart,
    totalCartProducts,
    removeFromCart,
    totalCart,
    pointsCart,
    cartModalShow,
  };
});
