<template>
    <modal :show="props.show">
      <div class="row justify-content-center">
        <div class="col-4">
          <div class="card text-white" style="background-color: rebeccapurple;max-width: 80%;padding: 1rem;text-align: center;">
            <div class="card-body">
              <h2 class="fw-bold mb-2 text-center">Criar Empregado</h2>
              <div class="mb-3 margin-divs">
                <p class="text-center margin-texts"><label for="email" class="form-label fw-bold">Nome:</label></p>
                <input type="text" class="form-control" id="name" placeholder="name" v-model="createEmployee.name">
              </div>
              <div class=" mb-3 margin-divs">
                <p class="text-center margin-texts"><label for="email" class="form-label fw-bold">Email:</label></p>
                <input type="email" class="form-control" id="email" placeholder="name@example.com"
                  v-model="createEmployee.email">
              </div>
              <div class="mb-3 margin-divs">
                <p class="text-cente margin-texts">
                  <label for="password" class="form-label fw-bold">Password:</label>
                </p>
                <input type="password" class="form-control" id="password" placeholder="*******"
                  v-model="createEmployee.password">
              </div>
              <div class="md-3 margin-divs">
                <p class="text-cente margin-texts">
                  <label for="password" class="form-label fw-bold">Tipo de Funcionário:</label>
                </p>
                    <select class="form-select" aria-label=".form-select-sm example"
                        v-model="createEmployee.type">
                        <option selected value="EM">EM</option>
                        <option value="EC">EC</option>
                        <option value="ED">ED</option>
                    </select>
              </div>
              <div class="md-3 margin-divs">
                <p class="text-center margin-texts">
                <label for="photo_do_user" class="form-label fw-bold">Foto:</label>
                </p>
                <input class="form-control form-control-sm" id="photo_url" type="file"
                    @change="usersStore.uploadImage($event)">
              </div>
              <div class="d-grid">
                <div class="btn-group" style="margin-top : 1rem">
                  <button class="btn btrn-sm btn-outline-danger" type="button" @click="$emit('close')">Cancelar</button>
                  <button class="btn btrn-sm btn-outline-success" type="button"
                  @click="save">Criar Funcionário</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </modal>
  </template>
  
  <script setup>
  import { ref, inject } from "vue";
  import Modal from '@/components/global/modal.vue'
  import { useUsersStore } from '@/stores/users.js'
  
  const toast = inject('toast')

  const emit = defineEmits(['close'])
  
  const usersStore = useUsersStore()

  let props = defineProps({
          user: {
              type: Object,
              required: true
          },
          show: {
              type: Boolean
          }
      })
  
  let createEmployee = ref(props.user)
  
  const save = async () => {
      const responseUserId = await usersStore.register(createEmployee.value)
      if (responseUserId)
        toast.success('Empregado criado com sucesso!')
        createEmployee.value = {}
        emit('close')
      }
  </script>

<style scoped>  
.margin-divs{
  margin-bottom: 0.5rem;
}
.margin-texts{
  margin-bottom: 0;
}
.margin-inputs{
  margin-bottom: 2rem;
}
</style>
