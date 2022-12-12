<template>
  <modal :show="props.show">
    <div class="modals">
      <div class="header-modals">
        <div class="registar-modal-container1">
          <span class="texto-logo">
            <span>FasTuga</span>
            <br />
          </span>
        </div>
        <span class="registar-modal-login">
          <span>Registo</span>
          <br />
        </span>
      </div>
      <div class="containers-modals-inputs">
        <label class="labels-modals">Nome:</label>
        <input type="text" placeholder="inserir o nome" class="input inputs-modals" v-model="user.nome_registo" />
      </div>
      <div class="containers-modals-inputs">
        <label class="labels-modals">Email:</label>
        <input type="text" placeholder="inserir o mail" class="input inputs-modals" v-model="user.email_registo" />
      </div>
      <div class="containers-modals-inputs">
        <label class="labels-modals">Password:</label>
        <input type="text" placeholder="inserir password" class="input inputs-modals" v-model="user.password_registo" />
      </div>
      <div class="d-grid">
        <div class="btn-group" style="margin-bottom : 0.5rem">
          <button class="btn btrn-sm btn-outline-danger" type="button" @click="$emit('close')">Cancel</button>
          <button class="btn btrn-sm btn-outline-success" type="button" @click="usersStore.login">Registar</button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script setup>
import { ref } from "vue";
import Modal from '@/components/global/modal.vue'
import { useUsersStore } from '@/stores/users.js'

defineEmits(['close'])
const props = defineProps(['show'])

const usersStore = useUsersStore()

let user = ref({
  nome_registo: null,
  email_registo: null,
  password_registo: null,
});
</script>

<style scoped>
.registar-modal-container1 {
  flex: 0 0 auto;
  width: 100%;
  height: 75%;
  display: flex;
  align-items: flex-start;
}

.registar-modal-login {
  color: var(--dl-color-pimary-900);
  align-self: center;
}

.registar-modal-text05 {
  color: var(--dl-color-gray-white);
}

.registar-modal-text08 {
  color: var(--dl-color-gray-white);
}

@media (max-width: 767px) {
  .registar-modal-text08 {
    width: auto;
  }
}
</style>
