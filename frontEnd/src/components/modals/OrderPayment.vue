<script setup>
import { ref, watch } from "vue";
import Modal from "@/components/global/modal.vue";
import { useUsersStore } from "@/stores/users.js";
import { useOrdersStore } from "@/stores/orders.js";
import { useCartStore } from "@/stores/cart.js";

const ordersStore = useOrdersStore();
const cartStore = useCartStore();
const usersStore = useUsersStore();

defineEmits(["close"]);
const props = defineProps(["show"]);

const paymentMethods = ["VISA", "PAYPAL", "MBWAY"];
</script>
<template>
  <modal :show="props.show">
    <div class="row justify-content-center">
      <div
        class="cart text-center"
        style="background-color: rebeccapurple; max-width: 80%; padding: 1rem"
      >
        <h2 style="color: white">Portal de Pagamento</h2>
        <div class="metodo-pagamento-modal-container-inputs-metodos-pagamento">
          <a style="color: white">Selecione o método de pagamento.</a>
          <select
            class="form-select"
            aria-label="Default select example"
            v-model="cartStore.cart.payment_type"
          >
            <option :value="item" v-for="item in paymentMethods" :key="item">
              {{ item }}
            </option>
          </select>
          <div
            class="containers-modals-inputs"
            v-if="cartStore.cart.payment_type == 'PAYPAL'"
          >
            <label class="labels-modals">Nº Cartão VISA:</label>
            <input
              type="email"
              v-model="cartStore.cart.payment_reference"
              class="input inputs-modals"
              placeholder="colocar o seu email"
            />
          </div>
          <div
            class="containers-modals-inputs"
            v-if="cartStore.cart.payment_type == 'VISA'"
          >
            <label class="labels-modals">Nº Cartão VISA:</label>
            <input
              type="text"
              v-model="cartStore.cart.payment_reference"
              class="input inputs-modals"
              placeholder="colocar o seu numero de cartão"
            />
          </div>
          <div
            class="containers-modals-inputs"
            v-if="cartStore.cart.payment_type == 'MBWAY'"
          >
            <label class="labels-modals">Nº Telemóvel:</label>
            <input
              type="text"
              v-model="cartStore.cart.payment_reference"
              class="input inputs-modals"
              placeholder="colocar o seu nº de telefone"
            />
          </div>
          <div class="d-grid">
            <div class="btn-group" style="margin-bottom: 0.5rem">
              <button
                class="btn btrn-sm btn-outline-danger"
                type="button"
                @click="cartStore.paymentModal = false"
              >
                Cancel
              </button>
              <button
                class="btn btrn-sm btn-outline-success"
                type="button"
                @click="ordersStore.createOrder()"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>

<style scoped>
input,
select,
textarea {
  color: #ff0000;
}
</style>
