<template>
  <modal :show="props.show">
    <div class="row justify-content-center">
      <div class="col-4">
        <div class="card" style="background-color: rebeccapurple">
          <div class="card-body">
            <h2 class="fw-bold mb-2 text-center">Editar</h2>

            <div class="mb-3 margin-divs">
              <p class="text-center margin-texts">
                <label for="email" class="fw-bold">Nome:</label>
              </p>
              <input type="text" class="form-control form-control-sm" id="name" placeholder="name"
                v-model="editUser.name" />
            </div>
            <div class="mb-3 margin-divs">
              <p class="text-center margin-texts">
                <label for="email" class="form-label fw-bold">Email:</label>
              </p>
              <input type="email" class="form-control form-control-sm" id="email" placeholder="name@example.com"
                v-model="editUser.email" />
            </div>
            <div class="mb-3 margin-divs">
              <p class="text-center margin-texts">
                <label for="password" class="form-label fw-bold">Password:</label>
              </p>
              <input type="password" class="form-control form-control-sm" id="password" placeholder="*******"
                v-model="editUser.password" />
            </div>
            <div class="md-3 margin-divs">
              <p class="text-center margin-texts">
                <label for="photo_do_user" class="form-label fw-bold">Foto:</label>
              </p>
              <input class="form-control form-control-sm" id="photo_url" type="file" @change="uploadImage($event)" />
            </div>
            <div class="md-3 margin-divs">
              <p class="text-center margin-texts">
                <label for="telemovel" class="form-label fw-bold">Nº Telemovel:</label>
              </p>
              <input type="text" size="16" v-model="editUser.customer.phone" class="form-control form-control-sm"
                placeholder="colocar o seu numero de telemóvel" />
            </div>
            <div class="md-3 margin-divs">
              <p class="text-center margin-texts">
                <label for="nif" class="form-label fw-bold">NIF:</label>
              </p>
              <input type="text" size="16" v-model="editUser.customer.nif" class="form-control form-control-sm"
                placeholder="colocar o seu NIF" />
            </div>
            <div class="md-3 margin-divs">
              <p class="text-center margin-texts">
                <label for="tipoPagamento" class="form-label fw-bold">Tipo de Pagamento Preferencial:</label>
              </p>
              <select class="form-select form-select-sm" aria-label=".form-select-sm example"
                v-model="editUser.customer.default_payment_type">
                <option selected>Selecionar</option>
                <option value="VISA">VISA</option>
                <option value="PAYPAL">PAYPAL</option>
                <option value="MBWAY">MBWAY</option>
              </select>
            </div>
            <div class="md-3 margin-divs" v-if="editUser.customer.default_payment_type == 'PAYPAL'">
              <p class="text-center margin-texts">
                <label for="emailPaypal" class="form-label fw-bold">Email Paypal:</label>
              </p>
              <input type="email" v-model="editUser.customer.default_payment_reference"
                class="form-control form-control-sm margin-inputs" placeholder="colocar o seu email" />
            </div>
            <div class="md-3 margin-divs" v-if="editUser.customer.default_payment_type == 'VISA'">
              <p class="text-center margin-texts">
                <label for="visa" class="form-label fw-bold">Nº Cartão:</label>
              </p>
              <input type="text" size="16" v-model="editUser.customer.default_payment_reference"
                class="form-control form-control-sm margin-inputs" placeholder="colocar o seu numero de cartão" />
            </div>
            <div class="md-3 margin-divs" v-if="editUser.customer.default_payment_type == 'MBWAY'">
              <p class="text-center margin-texts">
                <label for="telemovelMbway" class="form-label fw-bold">Nº Telemovel:</label>
              </p>
              <input type="text" size="9" v-model="editUser.customer.default_payment_reference"
                class="form-control form-control-sm margin-inputs" placeholder="colocar o seu nº de telemóvel" />
            </div>
            <div class="d-grid">
              <div class="btn-group" style="margin-bottom: 0.5rem">
                <button class="btn btrn-sm btn-outline-danger" type="button" @click="$emit('close')">
                  Cancelar
                </button>
                <button class="btn btrn-sm btn-outline-success" type="button" @click="updateCostumer">
                  Atualizar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>

<script setup>
import { ref, inject, watch, onMounted } from "vue";
import Modal from "@/components/global/modal.vue";
import { useUsersStore } from "@/stores/users.js";

const axios = inject("axios");
const toast = inject("toast");
const socket = inject("socket");
const emit = defineEmits(["close"]);

const usersStore = useUsersStore();

const base64 = ref();

let props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  show: {
    type: Boolean,
  },
});


let newUser = () => {
  return {
    email: "",
    name: "",
    photo_url: "",
    type: "C",
    customer: {
      phone: "",
      nif: "",
      default_payment_reference: "",
      default_payment_type: "",
    },
  }
}

let editUser = ref(newUser())

let loadUser = async (id) => {
  try {
    const response = await axios.get(
      "/users/" + id
    );
    editUser.value = response.data.data
  } catch (error) {

  }
}

onMounted(() => {
  loadUser(props.id)
})


async function updateCostumer() {
  try {
    if (base64.value)
      editUser.value.photo_url = base64.value;
    else
      editUser.value.photo_url = null
    const response = await axios.put(
      "customers/" + editUser.value.customer.id,
      editUser.value
    );
    toast.success(`Costumer atualizado com sucesso`);
    updateUserOnArray(response.data.data)
    base64.value = null;
    emit("close");    
    return response.data.data;
  } catch (error) {
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
