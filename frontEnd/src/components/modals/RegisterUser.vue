<template>
  <modal :show="props.show">
    <div class="row justify-content-center">
      <div class="col-4">
        <div class="card text-white" style="background-color: rebeccapurple;max-width: 80%;padding: 1rem;text-align: center;">
          <div class="card-body">
            <h2 class="fw-bold mb-2 text-center">FasTuga</h2>
            <h5 class="fw-bold mb-2 text-center">Register</h5>
            <div class="mb-3">
              <p class="text-center"><label for="email" class="form-label fw-bold">Nome:</label></p>
              <input type="text" class="form-control" id="name" placeholder="name" v-model="editingUser.name">
            </div>
            <div class=" mb-3">
              <p class="text-center"><label for="email" class="form-label fw-bold">Email:</label></p>
              <input type="email" class="form-control" id="email" placeholder="name@example.com"
                v-model="editingUser.email">
            </div>
            <div class="mb-3">
              <p class="text-center">
                <label for="password" class="form-label fw-bold">Password:</label>
              </p>
              <input type="password" class="form-control" id="password" placeholder="*******"
                v-model="editingUser.password">
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
              <input type="text" size="16" v-model="editingCustomer.phone" class="input"
              placeholder="colocar o seu numero de cartão" />
            </div>
            <div class="md-3">
              <label class="labels-modals">NIF(Número de Identificação Fiscal):</label>
              <input type="text" size="16" v-model="editingCustomer.nif" class="input"
              placeholder="colocar o seu numero de cartão" />
            </div>
            <div class="md-3">
              <label for="tipo_de_producto text-center" class="form-label fw-bold">Tipo:</label>
                                <select class="form-select form-select-sm" aria-label=".form-select-sm example"
                                    v-model="editingCustomer.default_payment_type">
                                    <option selected>Selecionar</option>
                                    <option value="VISA">VISA</option>
                                    <option value="PAYPAL">PAYPAL</option>
                                    <option value="MBWAY">MBWAY</option>
                                </select>
            </div>
            <div class="md-3" v-if="editingCustomer.default_payment_type == 'PAYPAL'">
              <label class="labels-modals">Email do Paypal:</label>
              <input type="email" v-model="editingCustomer.default_payment_reference" class="input"
              placeholder="colocar o seu email" />
            </div>
            <div class="md-3" v-if="editingCustomer.default_payment_type == 'VISA'">
              <label class="labels-modals">Nº Cartão VISA:</label>
              <input type="text" size="16" v-model="editingCustomer.default_payment_reference" class="input"
              placeholder="colocar o seu numero de cartão" />
            </div>
            <div class="md-3" v-if="editingCustomer.default_payment_type == 'MBWAY'">
              <label class="labels-modals">Nº Telemóvel:</label>
              <input type="text" size="9" v-model="editingCustomer.default_payment_reference" class="input"
                placeholder="colocar o seu nº de telefone" />
            </div>
            <div class="d-grid">
              <div class="btn-group" style="margin-bottom : 0.5rem">
                <button class="btn btrn-sm btn-outline-danger" type="button" @click="$emit('close')">Cancel</button>
                <button class="btn btrn-sm btn-outline-success" type="button"
                @click="save">Registar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>

<script setup>
import { ref } from "vue";
import Modal from '@/components/global/modal.vue'
import { useUsersStore } from '@/stores/users.js'
import { useCustomerStore } from '@/stores/customer.js'

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

let editingUser = ref(props.user)
let editingCustomer = ref(props.customer)

/*let user = ref({
  nome_registo: null,
  email_registo: null,
  password_registo: null,
  type:'C',
  blocked:0,
  photo_url:null,
  custom:null
});*/

const save = async () => {
    const responseUserId = await usersStore.register(editingUser.value)
    const responseCustomer = await customersStore.register(editingCustomer.value, responseUserId)
    if (responseCustomer)
          emit('close')
    }
</script>

