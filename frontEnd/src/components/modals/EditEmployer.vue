<template>
  <modal :show="props.show">
    <div class="row justify-content-center">
      <div class="col-4">
        <div class="card text-white"
          style="background-color: rebeccapurple;max-width: 80%;padding: 1rem;text-align: center;">
          <div class="card-body">
            <h2 class="fw-bold mb-2 text-center">Atualizar Empregado</h2>
            <div class="mb-3 margin-divs">
              <p class="text-center margin-texts"><label for="email" class="form-label fw-bold">Nome:</label></p>
              <input type="text" class="form-control" id="name" placeholder="name" v-model="employer.name">
            </div>
            <div class=" mb-3 margin-divs">
              <p class="text-center margin-texts"><label for="email" class="form-label fw-bold">Email:</label></p>
              <input type="email" class="form-control" id="email" placeholder="name@example.com"
                v-model="employer.email">
            </div>
            <div class="mb-3 margin-divs">
              <p class="text-cente margin-texts">
                <label for="password" class="form-label fw-bold">Password:</label>
              </p>
              <input type="password" class="form-control" id="password" placeholder="*******"
                v-model="employer.password">
            </div>
            <div class="md-3 margin-divs">
              <p class="text-cente margin-texts">
                <label for="password" class="form-label fw-bold">Tipo de Funcionário:</label>
              </p>
              <select class="form-select" aria-label=".form-select-sm example" v-model="employer.type">
                <option selected value="EM">EM</option>
                <option value="EC">EC</option>
                <option value="ED">ED</option>
              </select>
            </div>
            <div class="md-3 margin-divs">
              <p class="text-center margin-texts">
                <label for="photo_do_user" class="form-label fw-bold">Foto:</label>
              </p>
              <input class="form-control form-control-sm" id="photo_url" type="file" @change="uploadImage($event)">
            </div>
            <div class="d-grid">
              <div class="btn-group" style="margin-top : 1rem">
                <button class="btn btrn-sm btn-outline-danger" type="button" @click="$emit('close')">Cancelar</button>
                <button class="btn btrn-sm btn-outline-success" type="button" @click="updateEmployer">Atualizar
                  Funcionário</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>
  
<script setup>
import { ref, inject, onMounted } from "vue";
import Modal from '@/components/global/modal.vue'
import { useUsersStore } from '@/stores/users.js'

const axios = inject("axios");
const toast = inject("toast");
const socket = inject("socket");

const emit = defineEmits(['close'])

const usersStore = useUsersStore()

let props = defineProps({
  show: {
    type: Boolean
  },
  id: {
    type: Number,
    required: true
  }

})
const base64 = ref(null);

const newEmployer = () => {
  return {
    email: '',
    name: '',
    password: '',
    type: '',
    photo_url: null
  }
}

let employer = ref(newEmployer())

let loadEmployer = async (id) => {
  try {
    const response = await axios.get(
      "users/" + id
    );
    employer.value = response.data.data
  } catch (error) {

  }
}

onMounted(() => {
  loadEmployer(props.id)
})

let updateEmployer = async () => {
  try {
    if (base64.value)
      employer.value.photo_url = base64.value;
    else
      employer.value.photo_url = null
    const response = await axios.put(
      "users/" + props.id,
      employer.value
    );
    toast.success(`Empregado atualizado com sucesso`);
    base64.value = null;
    emit("close");
    updateUserOnArray(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error)
    Object.values(error.response.data.errors).forEach(errorMessage => toast.error(errorMessage.toString()));
  }
}

function updateUserOnArray(user) {
  let idx = usersStore.users.findIndex((t) => t.id === user.id);
  if (idx >= 0) {
    usersStore.users[idx] = user;
  }
  if (usersStore.user.id == user.id)
    usersStore.user = user
}


let uploadImage = (e) => {
  createBase64Image(e.target.files[0]);
};

function createBase64Image(FileObject) {
  const reader = new FileReader();
  reader.onload = (event) => {
    base64.value = event.target.result;
  };
  reader.readAsDataURL(FileObject);
}

</script>

<style scoped>
.margin-divs {
  margin-bottom: 0.5rem;
}

.margin-texts {
  margin-bottom: 0;
}

.margin-inputs {
  margin-bottom: 2rem;
}
</style>
