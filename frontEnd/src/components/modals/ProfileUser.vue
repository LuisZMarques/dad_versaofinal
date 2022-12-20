<template>
  <modal :show="props.show" :id="props.id">
    <div class="row justify-content-center">
      <div class="col-4">
        <div class="card text-white" style="background-color: rebeccapurple;max-width: 80%;padding: 1rem;">
          <div class="card-body">
            <h2 class="fw-bold mb-2 text-center">FasTuga</h2>
            <h5 class="fw-bold mb-2 text-center">Perfil</h5>
            <div class="text-center">
              <img :src="usersStore.photoFullUrl" class="rounded img-thumbnail"  height="100" :width="100"/>
            </div>
            <div class="mb-3">
              <label for="email" class=" form-label fw-bold">Nome:</label>
              <input type="text" class="form-control" id="name" placeholder="name" v-model="userEdit.name">
            </div>
            <div class=" mb-3">
              <label for="email" class="form-label fw-bold ">Email:</label>
              <input type="email" class="form-control" id="email" placeholder="name@example.com"
                v-model="userEdit.email">
            </div>
            <div class=" mb-3">
              <label for="photo_do_producto" class="form-label fw-bold ">Atualizar foto perfil:</label>
              <input class="form-control form-control-sm" id="photo_url" type="file"
                @change="usersStore.uploadImage($event)">
            </div>
            <div class="mb-3">
              <label for="password" class="form-label fw-bold">Password:</label>
              <input type="password" class="form-control" id="password" placeholder="*******"
                v-model="userEdit.password">
            </div>
            <div class="d-grid">
              <div class="btn-group" style="margin-bottom : 0.5rem">
                <button class="btn btrn-sm btn-outline-danger" type="button" @click="$emit('close')">Cancel</button>
                <button class="btn btrn-sm btn-outline-success" type="button"
                  @click="usersStore.updateUser(userEdit)">Modificar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>

<script setup>

import { useUsersStore } from '@/stores/users.js'
import { ref, inject, computed, watch } from 'vue';
import Modal from '@/components/global/modal.vue'

const axios = inject('axios')

const props = defineProps(['show',"id"])

const usersStore = useUsersStore()

let userEdit = ref()

let errors = ref()

let loadUser = (id) => { 
  errors.value = null
  axios.get('users/' + id)
    .then((response) => {
      userEdit.value = response.data.data
      console.log(response.data.data)
    })
    .catch((error) => {
      console.log(error)
    })
}

watch(
  () => props.id,
  (newValue) => {
      loadUser(newValue)
  },
)

</script>
