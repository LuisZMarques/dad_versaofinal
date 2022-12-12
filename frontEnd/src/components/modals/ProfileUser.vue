<template>
  <modal :show="props.show">
    <div class="modals">
      <div class="header-modals">
        <span class="perfil-modal-login">
          <span>
            <h2>Perfil</h2>
          </span>
          <br />
        </span>
      </div>
      <div class="containers-modals-inputs">
        <label class="labels-modals">Nome:</label>
        <input type="text" placeholder="user.nome" class="input inputs-modals" />
      </div>
      <div class="containers-modals-inputs">
        <label class="labels-modals">Email:</label>
        <input type="text" placeholder="user.email" class="input inputs-modals" />
      </div>
      <div class="containers-modals-inputs">
        <label class="labels-modals">Password:</label>
        <input type="text" placeholder="user.password" class="input inputs-modals" />
      </div>
      <div class="d-grid">
        <div class="btn-group" style="margin-bottom : 0.5rem">
          <button class="btn btrn-sm btn-outline-danger" type="button" @click="$emit('close')">Cancel</button>
          <button class="btn btrn-sm btn-outline-success" type="button" @click="usersStore.login">Confirmar</button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script setup>
import { useUsersStore } from '@/stores/users.js'
import Modal from '@/components/global/modal.vue'

defineEmits(['close'])
const props = defineProps(['show'])

const usersStore = useUsersStore()

/* let props = defineProps({
  user:{
    type:Object,
    required:false
  }


})
  */
</script>

<style scoped>
.perfil-modal-container1 {
  flex: 0 0 auto;
  width: 100%;
  height: 75%;
  display: flex;
  align-items: flex-start;
}

.perfil-modal-login {
  color: var(--dl-color-pimary-900);
  align-self: center;
}

.perfil-modal-text05 {
  color: var(--dl-color-gray-white);
}

.perfil-modal-text08 {
  color: var(--dl-color-gray-white);
}

@media(max-width: 767px) {
  .perfil-modal-text08 {
    width: auto;
  }
}
</style>
