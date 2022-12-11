<template>
  <modal v-slot="{ closeModal }">
    <div class="row justify-content-center">
      <div class="col-4">
        <div class="card text-white" style="background-color: rebeccapurple;">
          <div class="card-body">
            <h4 class="fw-bold mb-2">FasTuga</h4>
            <p class="mb-1 fst-italic small">Por favor colocar email e password para se autenticar..</p>
            <div class="mb-3">
              <label for="email" class="form-label fw-bold">Email:</label>
              <input type="email" class="form-control" id="email" placeholder="name@example.com"
                v-model="usersStore.credentials.username">
            </div>
            <div class="mb-3">
              <label for="password" class="form-label fw-bold">Password:</label>
              <input type="password" class="form-control" id="password" placeholder="*******"
                v-model="usersStore.credentials.password">
            </div>
            <p class="small"><a class="text-primary" href="#">Esqueceu-se da password?</a></p>
            <div class="d-grid">
              <div class="btn-group">
                <button class="btn btrn-sm btn-outline-dark" type="button" @click="closeModal">Cancel</button>
                <button class="btn btrn-sm btn-outline-primary" type="button" @click="usersStore.login">Entrar</button>
              </div>
            </div>
            <div class="text-center fst-italic small">
              <p class="mb-0">Sem conta?<a href="#" class="text-white fw-bold"> Autenticar</a>
              </p>
            </div>
          </div>
          <!--  -->
        </div>
      </div>
    </div>
  </modal>
</template>

<script setup>
import Modal from '@/components/global/modal.vue'
import { useUsersStore } from '@/stores/users.js'

defineEmits(['modal-toggle'])

const usersStore = useUsersStore()

</script>
