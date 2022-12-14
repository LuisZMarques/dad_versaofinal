<template>
  <modal :show="show">
    <div class="row justify-content-center">
      <div class="card text-center" style="background-color: rebeccapurple; max-width: 80%; padding: 1rem">
        <h2 style="color: white">Carrinho</h2>
        <table class="table table-bordered" style="background-color: #e92b2bff; border-color: rebeccapurple">
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
            <cart-card v-for="(item, index) in cartStore.cart" :key="index" :item="item" />
          </tbody>
        </table>
        <table class="table table-bordered" style="background-color: #e92b2bff; border-color: rebeccapurple">
          <tbody>
            <tr>
              <td class="texto">Pontos Acumulados:</td>
              <td class="texto">{{ pointsCart }}</td>
            </tr>
            <tr>
              <td class="texto">Desconto 5$:</td>
              <td class="texto">
                <input type="checkbox" checked="true" class="carrinho-modal-checkbox-desconto" />
              </td>
            </tr>
            <tr>
              <td class="texto">Total:</td>
              <td class="texto">{{ cartStore.totalCart }}</td>
            </tr>
          </tbody>
        </table>
        <div class="d-grid">
          <div class="btn-group" style="margin-bottom: 0.5rem">
            <button class="btn btrn-sm btn-outline-danger" type="button" @click="$emit('close')">
              Cancel
            </button>
            <button class="btn btrn-sm btn-outline-success" type="button" @click="paymentModal = true">
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
    <payment-modal :show="paymentModal" @close="paymentModal = false" />
  </modal>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import CartCard from "@/components/modals/CartCard.vue";
import Modal from "@/components/global/modal.vue";
import PaymentModal from "@/components/modals/OrderPayment.vue";
import { useCartStore } from "@/stores/cart.js";

defineEmits(["close"]);

defineProps(["show"]);

const cartStore = useCartStore();

const paymentModal = ref(false);


let pointsCart = ref(0);

</script>
