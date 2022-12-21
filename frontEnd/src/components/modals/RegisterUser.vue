<template>
  <modal :show="props.show">
    <div class="row justify-content-center">
      <div class="col-4">
        <div class="card" style="background-color: rebeccapurple">
          <div class="card-body">
            <h2 class="fw-bold mb-2 text-center">Registar</h2>

            <div class="mb-3 margin-divs">
              <p class="text-center margin-texts">
                <label for="email" class="fw-bold">Nome:</label>
              </p>
              <input
                type="text"
                class="form-control form-control-sm"
                id="name"
                placeholder="name"
                v-model="user.name"
              />
            </div>
            <div class="mb-3 margin-divs">
              <p class="text-center margin-texts">
                <label for="email" class="form-label fw-bold">Email:</label>
              </p>
              <input
                type="email"
                class="form-control form-control-sm"
                id="email"
                placeholder="name@example.com"
                v-model="user.email"
              />
            </div>
            <div class="mb-3 margin-divs">
              <p class="text-center margin-texts">
                <label for="password" class="form-label fw-bold"
                  >Password:</label
                >
              </p>
              <input
                type="password"
                class="form-control form-control-sm"
                id="password"
                placeholder="*******"
                v-model="user.password"
              />
            </div>
            <div class="md-3 margin-divs">
              <p class="text-center margin-texts">
                <label for="photo_do_user" class="form-label fw-bold"
                  >Foto:</label
                >
              </p>
              <input
                class="form-control form-control-sm"
                id="photo_url"
                type="file"
                @change="uploadImage($event)"
              />
            </div>
            <div class="md-3 margin-divs">
              <p class="text-center margin-texts">
                <label for="telemovel" class="form-label fw-bold"
                  >Nº Telemovel:</label
                >
              </p>
              <input
                type="text"
                size="16"
                v-model="user.customer.phone"
                class="form-control form-control-sm"
                placeholder="colocar o seu numero de telemóvel"
              />
            </div>
            <div class="md-3 margin-divs">
              <p class="text-center margin-texts">
                <label for="nif" class="form-label fw-bold">NIF:</label>
              </p>
              <input
                type="text"
                size="16"
                v-model="user.customer.nif"
                class="form-control form-control-sm"
                placeholder="colocar o seu NIF"
              />
            </div>
            <div class="md-3 margin-divs">
              <p class="text-center margin-texts">
                <label for="tipoPagamento" class="form-label fw-bold"
                  >Tipo de Pagamento Preferencial:</label
                >
              </p>
              <select
                class="form-select form-select-sm"
                aria-label=".form-select-sm example"
                v-model="user.customer.default_payment_type"
              >
                <option value="">Selecionar</option>
                <option value="VISA">VISA</option>
                <option value="PAYPAL">PAYPAL</option>
                <option value="MBWAY">MBWAY</option>
              </select>
            </div>
            <div
              class="md-3 margin-divs"
              v-if="user.customer.default_payment_type == 'PAYPAL'"
            >
              <p class="text-center margin-texts">
                <label for="emailPaypal" class="form-label fw-bold"
                  >Email Paypal:</label
                >
              </p>
              <input
                type="email"
                v-model="user.customer.default_payment_reference"
                class="form-control form-control-sm margin-inputs"
                placeholder="colocar o seu email"
              />
            </div>
            <div
              class="md-3 margin-divs"
              v-if="user.customer.default_payment_type == 'VISA'"
            >
              <p class="text-center margin-texts">
                <label for="visa" class="form-label fw-bold">Nº Cartão:</label>
              </p>
              <input
                type="text"
                size="16"
                v-model="user.customer.default_payment_reference"
                class="form-control form-control-sm margin-inputs"
                placeholder="colocar o seu numero de cartão"
              />
            </div>
            <div
              class="md-3 margin-divs"
              v-if="user.customer.default_payment_type == 'MBWAY'"
            >
              <p class="text-center margin-texts">
                <label for="telemovelMbway" class="form-label fw-bold"
                  >Nº Telemovel:</label
                >
              </p>
              <input
                type="text"
                size="9"
                v-model="user.customer.default_payment_reference"
                class="form-control form-control-sm margin-inputs"
                placeholder="colocar o seu nº de telemóvel"
              />
            </div>
            <div class="d-grid">
              <div class="btn-group" style="margin-bottom: 0.5rem">
                <button
                  class="btn btrn-sm btn-outline-danger"
                  type="button"
                  @click="$emit('close')"
                >
                  Cancelar
                </button>
                <button
                  class="btn btrn-sm btn-outline-success"
                  type="button"
                  @click="createCostumer()"
                >
                  Registar
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
import { ref, inject } from "vue";
import Modal from "@/components/global/modal.vue";
import { useUsersStore } from "@/stores/users.js";

const axios = inject("axios");
const toast = inject("toast");
const socket = inject("socket");
const emit = defineEmits(["close"]);

const usersStore = useUsersStore();

const base64 = ref();

let props = defineProps({
  show: {
    type: Boolean,
  },
});

let user = ref({
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
});

async function createCostumer() {
  try {
    //loadingStore.toggleLoading();
    //updateUser.photo_url = base64.value;
    const response = await axios.post("customers/", user.value);
    //socket.emit("updateUser", response.data.data);
    toast.success(`Costumer criado com sucesso`);
    //base64.value = null;
    usersStore.credentials.username = user.value.email;
    usersStore.credentials.password = user.value.password;
    usersStore.login();
    usersStore.user = response.data.data
    return response.data.data;
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    //loadingStore.toggleLoading();
  }
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
