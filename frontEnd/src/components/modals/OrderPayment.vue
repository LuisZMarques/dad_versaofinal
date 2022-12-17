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
            <option :value="item" v-for="item in paymentMethods">
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
                @click="$emit('close')"
              >
                Cancel
              </button>
              <button
                class="btn btrn-sm btn-outline-success"
                type="button"
                @click="ordersStore.createPayment()"
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
.metodo-pagamento-modal-login {
  color: var(--dl-color-pimary-900);
  align-self: center;
}

.metodo-pagamento-modal-container-metodos-pagamento {
  flex: 0 0 auto;
  width: 20rem;
  height: 5rem;
  display: flex;
  align-self: center;
  margin-top: var(--dl-space-space-unit);
  align-items: center;
  justify-content: space-between;
}

.metodo-pagamento-modal-button {
  width: 5rem;
  height: 5rem;
  display: flex;
  flex-direction: row;
  background-color: rebeccapurple;
}

.metodo-pagamento-modal-button1 {
  width: 5rem;
  height: 5rem;
  display: flex;
  flex-direction: row;
  background-color: rebeccapurple;
}

.metodo-pagamento-modal-button2 {
  width: 5rem;
  height: 5rem;
  display: flex;
  flex-direction: row;
  background-color: rebeccapurple;
}

.metodo-pagamento-modal-container-inputs-metodos-pagamento {
  width: 100%;
  height: 80%;
  display: flex;
  position: relative;
  align-self: center;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.metodo-pagamento-modal-text03 {
  align-self: start;
  margin-left: 10%;
}

.metodo-pagamento-modal-text08 {
  color: var(--dl-color-gray-white);
}

.metodo-pagamento-modal-text11 {
  color: var(--dl-color-gray-white);
}

@media (max-width: 767px) {
  .metodo-pagamento-modal-container-metodos-pagamento {
    width: 80%;
  }

  .metodo-pagamento-modal-text11 {
    width: auto;
  }
}

@media (max-width: 479px) {
  .metodo-pagamento-modal-container {
    width: auto;
    height: auto;
  }

  .metodo-pagamento-modal-text03 {
    color: var(--dl-color-gray-white);
    width: 80%;
  }
}
</style>
