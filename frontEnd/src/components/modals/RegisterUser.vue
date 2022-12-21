<template>
  <modal :show="props.show">
    <div class="row justify-content-center">
      <div class="col-4">
        <div class="card text-white"
          style="background-color: rebeccapurple;max-width: 80%;padding: 1rem;text-align: center;">
          <div class="card-body">
            <h2 class="fw-bold mb-2 text-center">Registar</h2>
            <div class="mb-3 margin-divs">
              <p class="text-center margin-texts"><label for="email" class=" fw-bold">Nome:</label></p>
              <input type="text" class="form-control form-control-sm" id="name" placeholder="name" v-model="createUser.name">
            </div>
            <div class=" mb-3 margin-divs">
              <p class="text-center margin-texts"><label for="email" class="form-label fw-bold">Email:</label></p>
              <input type="email" class="form-control form-control-sm" id="email" placeholder="name@example.com"
                v-model="createUser.email">
            </div>
            <div class="mb-3 margin-divs">
              <p class="text-center margin-texts">
                <label for="password" class="form-label fw-bold">Password:</label>
              </p>
              <input type="password" class="form-control form-control-sm" id="password" placeholder="*******"
                v-model="createUser.password">
            </div>
            <div class="md-3 margin-divs" >
              <p class="text-center margin-texts">
                <label for="photo_do_user" class="form-label fw-bold">Foto:</label>
              </p>
              <input class="form-control form-control-sm" id="photo_url" type="file"
                @change="usersStore.uploadImage($event)">
            </div>
            <div class="md-3 margin-divs">
              <p class="text-center margin-texts">
                <label for="telemovel" class="form-label fw-bold">Nº Telemovel:</label>
              </p>
              <input type="text" size="16" v-model="createCustomer.phone" class="form-control form-control-sm"
                placeholder="colocar o seu numero de telemóvel" />
            </div>
            <div class="md-3 margin-divs">
              <p class="text-center margin-texts"><label for="nif" class="form-label fw-bold">NIF:</label></p>
              <input type="text" size="16" v-model="createCustomer.nif" class="form-control form-control-sm" placeholder="colocar o seu NIF" />
            </div>
            <div class="md-3 margin-divs">
              <p class="text-center margin-texts"><label for="tipoPagamento" class="form-label fw-bold">Tipo de Pagamento Preferencial:</label></p>
              <select class="form-select form-select-sm" aria-label=".form-select-sm example"
                v-model="createCustomer.default_payment_type">
                <option selected>Selecionar</option>
                <option value="VISA">VISA</option>
                <option value="PAYPAL">PAYPAL</option>
                <option value="MBWAY">MBWAY</option>
              </select>
            </div>
            <div class="md-3 margin-divs" v-if="createCustomer.default_payment_type == 'PAYPAL'">
              <p class="text-center margin-texts"><label for="emailPaypal" class="form-label fw-bold">Email Paypal:</label></p>
              <input type="email" v-model="createCustomer.default_payment_reference" class="form-control form-control-sm margin-inputs"
                placeholder="colocar o seu email" />
            </div>
            <div class="md-3 margin-divs" v-if="createCustomer.default_payment_type == 'VISA'">
              <p class="text-center margin-texts"><label for="visa" class="form-label fw-bold">Nº Cartão:</label></p>
              <input type="text" size="16" v-model="createCustomer.default_payment_reference" class="form-control form-control-sm margin-inputs"
                placeholder="colocar o seu numero de cartão" />
            </div>
            <div class="md-3 margin-divs" v-if="createCustomer.default_payment_type == 'MBWAY'">
              <p class="text-center margin-texts"><label for="telemovelMbway" class="form-label fw-bold">Nº Telemovel:</label></p>
              <input type="text" size="9" v-model="createCustomer.default_payment_reference" class="form-control form-control-sm margin-inputs"
                placeholder="colocar o seu nº de telemóvel"  />
            </div>
            <div class="d-grid">
              <div class="btn-group" style="margin-bottom : 0.5rem">
                <button class="btn btrn-sm btn-outline-danger" type="button" @click="$emit('close')">Cancelar</button>
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
  const responseCustomer = await customersStore.register(createCustomer.value,responseUserId);

    if (responseCustomer instanceof Error)
      throw new Error("Erro a criar customer")

    if (responseUserId instanceof Error)
      throw new Error("Erro a obter id do user")
    

  createUser.value = {}
  createCustomer.value = {}
  emit('close')
return toast.success("Cliente" + createUser.value.name + "registado com sucesso com nº de Cliente :" + responseCustomer.id)
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
