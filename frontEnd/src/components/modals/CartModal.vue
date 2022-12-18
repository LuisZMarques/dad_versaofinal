<template>
  <modal :show="show">
    <div class="row justify-content-center">
      <div
        class="card text-center"
        style="
          background-color: rebeccapurple;
          max-width: 80%;
          padding: 1rem;
          overflow-y: auto;
        "
      >
        <h2 style="color: white">Carrinho</h2>
        <table
          class="table table-bordered"
          style="background-color: #e92b2bff; border-color: rebeccapurple"
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Price</th>
              <th>Nota</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <cart-card
              v-for="(item, index) in cartStore.cart.products"
              :key="index"
              :item="item"
              :index="index"
            />
          </tbody>
        </table>
        <table
          class="table table-bordered"
          style="background-color: #e92b2bff; border-color: rebeccapurple"
        >
          <tbody>
            <tr v-if="usersStore.user">
              <td class="texto">Pontos Acumulados:</td>
              <td class="texto">{{ usersStore.user?.customer.points }}</td>
              <td class="texto">Pontos Ganhos:</td>
              <td class="texto">{{ cartStore.cart.points_gained }}</td>
            </tr>
            <tr v-if="usersStore.user && usersStore.user?.customer.points > 10 ">
              <td class="texto">Desconto:</td>
              <td class="texto" colspan="3">
                <select
                  class="form-select"
                  aria-label="Default select example"
                  v-model="cartStore.cart.total_paid_with_points"
                >
                  <option value="0" selected>Nenhum</option>
                  <option :value="item.value" v-for="item in numberOfDiscounts()" :key="item">
                    {{ item.label }} pontos
                  </option>
                </select>
              </td>
            </tr>
            <tr>
              <td class="texto">Total do carrinho:</td>
              <td class="texto">{{ cartStore.cart.total_price }}</td>
              <td class="texto">Total a pagar:</td>
              <td class="texto">{{ cartStore.cart.total_price - cartStore.cart.total_paid_with_points}}</td>
            </tr>
          </tbody>
        </table>
        <div class="d-grid">
          <div class="btn-group" style="margin-bottom: 0.5rem">
            <button
              class="btn btrn-sm btn-outline-danger"
              type="button"
              @click="cartStore.cartModalShow = false"
            >
              Cancel
            </button>
            <button
              class="btn btrn-sm btn-outline-success"
              type="button"
              @click="cartStore.paymentModal = true"
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>

    <payment-modal
      :show="cartStore.paymentModal"
      @close="cartStore.paymentModal = false"
      :card="cartStore.card"
    />
  </modal>
</template>

<script setup>
import { ref, inject, watch, computed } from "vue";
import CartCard from "@/components/modals/CartCard.vue";
import Modal from "@/components/global/modal.vue";
import PaymentModal from "@/components/modals/OrderPayment.vue";
import { useCartStore } from "@/stores/cart.js";
import { useUsersStore } from "@/stores/users.js";
import { useCustomerStore } from "@/stores/customer.js";
import { useOrdersStore } from "@/stores/orders.js";

defineEmits(["close"]);

defineProps(["show"]);

const selected = ref(0);
watch(
  () => selected.value,
  (opcao) => {
    ordersStore.selectedDiscount = opcao;
  }
);

const cartStore = useCartStore();

const ordersStore = useOrdersStore();

const usersStore = useUsersStore();

const customerStore = useCustomerStore();

const axios = inject("axios");

const discount = ref([]);

let numberOfDiscounts = () => {
  //Substituir pelo valor recebido do endpoint do customer

  for (let i = 1; i < usersStore.user.customer.points / 10 ; i++) {
    discount.value[i - 1] = {label:10*i, value: 5*i};
  }
  return discount.value;
};


</script>
