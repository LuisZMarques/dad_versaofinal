<template>
  <div data-role="Header" class="header-simples-header">
    <div class="header-simples-container-botao-sidebar">
      <button class="botoes-header botoes-com-border button" @click="$emit('sidebar-toggle')">
        <svg viewBox="0 0 1024 1024" class="icons-botoes-header">
          <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
        </svg>
      </button>
    </div>
    <div class="header-simples-container-logo">
      <router-link to="/" class="header-simples-navlink">
        <h1 class="header-simples-logo-header-estatico texto-logo">FasTuga</h1>
      </router-link>
    </div>
    <div class="header-simples-container-cart">
      <button class="botoes-header botoes-com-border button" @click="cartStore.checkCart()" v-if="usersStore.user?.type == null || usersStore.user?.type == 'C' ">
        <svg viewBox="0 0 1024 1024" class="icons-botoes-header">
          <path
            d="M726 768q34 0 59 26t25 60-25 59-59 25-60-25-26-59 26-60 60-26zM42 86h140l40 84h632q18 0 30 13t12 31q0 2-6 20l-152 276q-24 44-74 44h-318l-38 70-2 6q0 10 10 10h494v86h-512q-34 0-59-26t-25-60q0-20 10-40l58-106-154-324h-86v-84zM298 768q34 0 60 26t26 60-26 59-60 25-59-25-25-59 25-60 59-26z">
          </path>
        </svg>
      </button>
    </div>
    <cart-modal :show="cartStore.cartModalShow" />
  </div>
</template>

<script setup>
import { ref, inject} from "vue";
import CartModal from "@/components/modals/CartModal.vue";
import { useUsersStore } from "@/stores/users.js";
import { useCartStore } from "@/stores/cart.js";

const toast = inject("toast");

const usersStore = useUsersStore();
const cartStore = useCartStore();

defineEmits(["sidebar-toggle"]);

const loginModal = ref(false);
const cartModal = ref(false);

</script>

<style scoped>
.header-simples-header {
  flex: 0 0 auto;
  width: 100%;
  height: 4rem;
  display: flex;
  z-index: 1;
  position: sticky;
  max-width: 100%;
  background-color: rebeccapurple;
  top: 0;
}

.header-simples-container-botao-sidebar {
  flex: 0 0 auto;
  width: 33%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: row;
}

.header-simples-container-logo {
  width: 100%;
  height: var(--dl-size-size-tripleunit);
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: flex-start;
}

.header-simples-navlink {
  display: contents;
}

.header-simples-logo-header-estatico {
  font-family: Pacifico;
}

.header-simples-container-cart {
  flex: 0 0 auto;
  width: 33%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
}

@media (max-width: 991px) {
  .header-simples-header {
    position: sticky;
  }
}



@media (max-width: 479px) {
  .header-simples-header {
    padding-top: 0px;
  }

  .header-simples-container-botao-sidebar {
    width: 25%;
  }

  .header-simples-container-cart {
    width: 25%;
  }

 

}
</style>
