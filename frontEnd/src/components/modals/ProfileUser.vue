<template>
  <modal :show="props.show">
    <div class="row justify-content-center">
      <div class="col-4">
        <div class="card text-white" style="background-color: rebeccapurple;max-width: 80%;padding: 1rem;">
          <div class="card-body">
            <h2 class="fw-bold mb-2 text-center">FasTuga</h2>
            <h5 class="fw-bold mb-2 text-center">Perfil</h5>
            <div class="text-center">
              <img :src="(imagemUserDinamica_src)" class="rounded img-thumbnail" alt="...">
            </div>
            <div class="mb-3">
              <p class="text-center"><label for="email" class="form-label fw-bold">Nome:</label></p>
              <input type="text" class="form-control" id="name" placeholder="name"
                v-model="usersStore.name">
            </div>
            <div class=" mb-3">
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
            <div class="d-grid">
              <div class="btn-group" style="margin-bottom : 0.5rem">
                <button class="btn btrn-sm btn-outline-danger" type="button" @click="$emit('close')">Cancel</button>
                <button class="btn btrn-sm btn-outline-success" type="button"
                  @click="usersStore.login">Modificar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>

<script setup>
import { ref } from 'vue'
import { useUsersStore } from '@/stores/users.js'
import Modal from '@/components/global/modal.vue'

defineEmits(['close'])
const props = defineProps(['show'])

const usersStore = useUsersStore()

const imagemUserDinamica_src = ref('https://www.w3schools.com/howto/img_avatar.png')

/* let props = defineProps({
  user:{
    type:Object,
    required:false
  }


})
  */
</script>
