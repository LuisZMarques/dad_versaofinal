import { ref, computed, inject } from "vue";
import { defineStore } from "pinia";
import { useUsersStore } from "../stores/users.js";

export const useCartStore = defineStore("cart", () => {
  const toast = inject("toast");

  const usersStore = useUsersStore();

  let cart = ref({
    id: null,
    ticket_number: 1,
    status: "P",
    customer_id: usersStore.user?.id ?? null,
    total_price: 0,
    total_paid_with_points: 0,
    points_gained: 0,
    points_used_to_pay: 0,
    payment_type: null,
    payment_reference: null,
    date: null,
    products: [],
  });

  let cartModalShow = ref(false);
  let paymentModal = ref(false);

  let clearCart = () => {
    return (cart.value = {
      id: null,
      ticket_number: 1,
      status: "P",
      customer_id: null,
      total_price: 0,
      total_paid_with_points: 0,
      points_gained: 0,
      points_used_to_pay: 0,
      payment_type: null,
      payment_reference: null,
      date: null,
      products: [],
    });
  };

  let addToCart = (item) => {
    cart.value.products.push({
      product_id: item.id,
      order_local_number: 99,
      status: item.type == "hot dish" ? "W" : "R",
      notes: null,
      price: item.price,
      name: item.name,
      photo_url: item.photo_url,
    });
    cart.value.total_price += parseFloat(item.price);
    cart.value.points_gained = Math.floor(cart.value.total_price / 10);
    toast.success("Item adicionado ao carrinho!");
  };

  let removeFromCart = (index) => {
    cart.value.total_price -= parseFloat(cart.value.products[index].price);
    cart.value.points_gained = Math.floor(cart.value.total_price / 10);
    cart.value.products.splice(index, 1);
    if (cart.value.products.length == 0) {
      cartModalShow.value = false;
      clearCart()
    }

    toast.success("Item removido do carrinho!");

  };

  let totalCartProducts = computed(() => {
    return cart.value.products.length;
  });

  let checkCart = () => {
    let currentDate = new Date();
    if (cart.value.products.length > 0) {
      cartModalShow.value = true;
      (cart.value.customer_id = usersStore.user?.id ?? null),
        (cart.value.payment_reference =
          cart.value.payment_reference ??
          usersStore.user?.customer.default_payment_reference ??
          null);
      cart.value.payment_type =
        cart.value.payment_type ??
        usersStore.user?.customer.default_payment_type ??
        null;
        cart.value.date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    } else {
      toast.success("O carrinho está vazio");
    }
  };

  return {
    cart,
    clearCart,
    addToCart,
    totalCartProducts,
    removeFromCart,
    cartModalShow,
    checkCart,
    paymentModal
  };
});
