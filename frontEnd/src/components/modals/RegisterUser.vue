<template>
  <modal :show="props.show">
    <div class="row justify-content-center">
      <div class="col-4">
        <div class="card text-white"
          style="background-color: rebeccapurple;max-width: 80%;padding: 1rem;text-align: center;">
          <div class="card-body">
            <h2 class="fw-bold mb-2 text-center">Registar</h2>
            <div class="mb-3">
              <p class="text-center"><label for="email" class="form-label fw-bold">Nome:</label></p>
              <input type="text" class="form-control" id="name" placeholder="name" v-model="createUser.name">
            </div>
            <div class=" mb-3">
              <p class="text-center"><label for="email" class="form-label fw-bold">Email:</label></p>
              <p>message : {{ createUser.email }}</p>
              <input type="email" class="form-control" id="email" placeholder="name@example.com"
                v-model="createUser.email">
            </div>
            <div class="mb-3">
              <p class="text-center">
                <label for="password" class="form-label fw-bold">Password:</label>
              </p>
              <input type="password" class="form-control" id="password" placeholder="*******"
                v-model="createUser.password">
            </div>
            <div class="md-3">
              <p class="text-center">
                <label for="photo_do_user" class="form-label fw-bold">Foto:</label>
              </p>
              <input class="form-control form-control-sm" id="photo_url" type="file"
                @change="usersStore.uploadImage($event)">
            </div>
            <div class="md-3">
              <label class="labels-modals">Nº de Telemóvel:</label>
              <input type="text" size="16" v-model="createCustomer.phone" class="input"
                placeholder="colocar o seu numero de telemóvel" />
            </div>
            <div class="md-3">
              <label class="labels-modals">NIF(Número de Identificação Fiscal):</label>
              <input type="text" size="16" v-model="createCustomer.nif" class="input" placeholder="colocar o seu NIF" />
            </div>
            <div class="md-3">
              <label for="tipo_de_producto text-center" class="form-label fw-bold">Tipo:</label>
              <select class="form-select form-select-sm" aria-label=".form-select-sm example"
                v-model="createCustomer.default_payment_type">
                <option selected>Selecionar</option>
                <option value="VISA">VISA</option>
                <option value="PAYPAL">PAYPAL</option>
                <option value="MBWAY">MBWAY</option>
              </select>
            </div>
            <div class="md-3" v-if="createCustomer.default_payment_type == 'PAYPAL'">
              <label class="labels-modals">Email do Paypal:</label>
              <p>message : {{ createCustomer.default_payment_reference }}</p>
              <input type="email" v-model="createCustomer.default_payment_reference" class="input"
                placeholder="colocar o seu email" />
            </div>
            <div class="md-3" v-if="createCustomer.default_payment_type == 'VISA'">
              <label class="labels-modals">Nº Cartão VISA:</label>
              <input type="text" size="16" v-model="createCustomer.default_payment_reference" class="input"
                placeholder="colocar o seu numero de cartão" />
            </div>
            <div class="md-3" v-if="createCustomer.default_payment_type == 'MBWAY'">
              <label class="labels-modals">Nº Telemóvel:</label>
              <input type="text" size="9" v-model="createCustomer.default_payment_reference" class="input"
                placeholder="colocar o seu nº de telemóvel" />
            </div>
            <div class="d-grid">
              <div class="btn-group" style="margin-bottom : 0.5rem">
                <button class="btn btrn-sm btn-outline-danger" type="button" @click="$emit('close')">Cancel</button>
                <button class="btn btrn-sm btn-outline-success" type="button" @click="checkInputs">Registar</button>
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
import { useCustomerStore } from '@/stores/customer.js'

const toast = inject("toast");
const emit = defineEmits(['close'])

const usersStore = useUsersStore()
const customersStore = useCustomerStore()

let props = defineProps({
  user: {
    type: Object,
    required: true
  },
  customer: {
    type: Object,
    required: true
  },
  show: {
    type: Boolean
  }
})

let createUser = ref(props.user)
let createCustomer = ref(props.customer)

/* 
const save = async () => {
  try {
    if(editingCustomer.value.default_payment_reference == null)
      throw("Dados em falta")
    const responseUserId = await usersStore.register(editingUser.value)
    const responseCustomer = await customersStore.register(editingCustomer.value, responseUserId)
    if(responseCustomer instanceof Error)
      throw new Error("Formulário inválido")
    else if (responseCustomer)
          emit('close')
  } catch (error) {
    toast.error("dados em falta")
    console.log(error)
  }
} */


const checkInputs = async () => {
  if (createUser.value.name == null) {
    return toast.error("Nome em falta")
  }
  if (createUser.value.email == null) {
    return toast.error("Email em falta")
  }

  if (createUser.value.password == null) {
    return toast.error("Password em falta")
  }
  if (createCustomer.value.phone == null) {
    return toast.error("Telemóvel em falta")
  }
  if (createCustomer.value.nif == null) {
    return toast.error("NIF em falta")
  }
  if (createCustomer.value.default_payment_type == null) {
    return toast.error("Tipo de pagamento em falta")
  }
  if (createCustomer.value.default_payment_reference == null) {
    return toast.error("Referência de pagamento em falta")
  }
  //Registar user e receber ID
  const responseUserId = await usersStore.register(createUser.value);

  //Registar customer com ID do user
  const responseCustomer = await usersStore.register(createCustomer.value);

  if (responseCustomer instanceof Error)
    throw new Error("Erro a criar customer")

  if (responseUserId instanceof Error)
    throw new Error("Erro a obter id do user")
  
  
return toast.sucess("Cliente" + createUser.value.name + "registado com sucesso com nº de Cliente :" + responseCustomer.value.id)
}
</script>

