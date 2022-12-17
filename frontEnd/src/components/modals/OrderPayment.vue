<template>
  <modal :show="props.show">
    <div class="row justify-content-center">
      <div class="card text-center" style="background-color: rebeccapurple;max-width: 80%;padding: 1rem;">
        <h2 style="color: white;">Portal de Pagamento</h2>
        <!-- 
        <div class="metodo-pagamento-modal-container-metodos-pagamento">
          <button class="metodo-pagamento-modal-button button">
            <img :alt="visacard_image" src="https://seeklogo.com/images/V/visa-logo-6F4057663D-seeklogo.com.png"
              class="containers-metodoPagamento-imagens" />
          </button>
          <button class="metodo-pagamento-modal-button1 button">
            <img :alt="paypal_image"
              src="https://play-lh.googleusercontent.com/bDCkDV64ZPT38q44KBEWgicFt2gDHdYPgCHbA3knlieeYpNqbliEqBI90Wr6Tu8YOw"
              class="containers-metodoPagamento-imagens" />
          </button>
          <button class="metodo-pagamento-modal-button2 button">
            <img :alt="nbway_image"
              src="https://play-lh.googleusercontent.com/nDKhDELMEjag8qJ9aKAjfTSzWZKVg3tY2OZ-eo8Jp8hxYDgifCFQoNOqxDwTaAW-O8o"
              class="containers-metodoPagamento-imagens" />
          </button>
        </div> -->
        <div class="metodo-pagamento-modal-container-inputs-metodos-pagamento">
          <a>{{ordersStore.selectedDiscount}}</a>
          <a>{{ordersStore.newOrder()}}</a>
          
          <a style="color: white;">Selecione o método de pagamento.</a>
          <select class="form-select" aria-label="Default select example" v-model="ordersStore.paymentMethod">
            <option :value="item" v-for="item in paymentMethods">{{ item }}</option>
          </select>
            <div class="containers-modals-inputs" v-if="ordersStore.paymentMethod == 'visa'">
              <label class="labels-modals">Nº Cartão VISA:</label>
              <input type="text" v-model="ordersStore.paymentInput" class="input inputs-modals" />
            </div>
            <div class="containers-modals-inputs" v-if="ordersStore.paymentMethod == 'paypal'">
              <label class="labels-modals">Email:</label>
              <input type="text" v-model="ordersStore.paymentInput" class="input inputs-modals" />
            </div>
            <div class="containers-modals-inputs" v-if=" ordersStore.paymentMethod == 'mbway'">
              <label class="labels-modals">Nº Telemóvel:</label>
              <input type="text" v-model="ordersStore.paymentInput" class="input inputs-modals" />
            </div>
          <div class="d-grid">
            <div class="btn-group" style="margin-bottom : 0.5rem">
              <button class="btn btrn-sm btn-outline-danger" type="button" @click="$emit('close')">Cancel</button>
              <button class="btn btrn-sm btn-outline-success" type="button" @click="ordersStore.createPayment()">Confirmar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>
  
<script setup>
import { ref, watch } from "vue";
import Modal from '@/components/global/modal.vue'
import { useUsersStore } from '@/stores/users.js'
import { useOrdersStore } from '@/stores/orders.js'

const ordersStore = useOrdersStore()

defineEmits(['close'])
const props = defineProps(['show'])
const usersStore = useUsersStore()
const paymentMethods = ['visa', 'paypal', 'mbway']

</script>
  
<style scoped>

input, select, textarea{
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

@media(max-width: 767px) {
  .metodo-pagamento-modal-container-metodos-pagamento {
    width: 80%;
  }

  .metodo-pagamento-modal-text11 {
    width: auto;
  }
}

@media(max-width: 479px) {
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
  