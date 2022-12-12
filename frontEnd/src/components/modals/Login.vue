<template>
  <modal :show="props.show">
    <div class="row justify-content-center">
      <div class="col-4">
        <div class="card text-white" style="background-color: rebeccapurple;">
          <div class="card-body">
            <h2 class="fw-bold mb-2 text-center">FasTuga</h2>
            <h5 class="fw-bold mb-2 text-center">Login</h5>
            <p class="mb-1 fst-italic small ">Por favor colocar email e password para se autenticar..</p>
            <div class="mb-3">
              <p class="text-center"><label for="email" class="form-label fw-bold">Email:</label></p>
              <input type="email" class="form-control" id="email" placeholder="name@example.com"
                v-model="usersStore.credentials.username">
            </div>
            <div class="mb-3">
              <p class="text-center">
                <label for="password" class="form-label fw-bold">Password:</label>
              </p>
              <input type="password" class="form-control" id="password" placeholder="*******"
                v-model="usersStore.credentials.password">
            </div>
            <p class="small text-center">
              <a class="text-bg-primary" href="#">Esqueceu-se da password?</a>
            </p>
            <div class="d-grid">
              <div class="btn-group" style="margin-bottom : 0.5rem">
                <button class="btn btrn-sm btn-outline-danger" type="button" @click="$emit('close')">Cancel</button>
                <button class="btn btrn-sm btn-outline-success" type="button" @click="usersStore.login">Entrar</button>
              </div>
            </div>
            <div class="text-center fst-italic small">
              <p class="mb-0 text-center">Sem conta?<a type="button" class="text-white fw-bold" @click="registerModal = true"> Registar</a>
              </p>
            </div>
          </div>
          <!--  -->
        </div>
      </div>
      <register-modal :show="registerModal" @close="registerModal = false"/>
    </div>
  </modal>
</template>

<script setup>
import { ref } from 'vue';
import Modal from '@/components/global/modal.vue'
import RegisterModal from "@/components/modals/RegisterUser.vue"
import { useUsersStore } from '@/stores/users.js'

defineEmits(['close'])

const props = defineProps(['show'])
const registerModal = ref(false)

const usersStore = useUsersStore()

</script>
