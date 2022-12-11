<template>
  <div class="flex flex-column">
    <header-page @sidebar-toggle="sideToggle" @cart-toggle="cartModalToggle" />
    <div class="flex">
      <SideBar v-if="sidebarstate" @login-toggle="loginModalToggle" @perfil-toggle="perfilModalToggle" />
      <cart-modal v-if="cartModalState" @pagamento-toggle="pagamentoModalToggle" />

      <order-payment v-if="pagamentoModalState" />
      <register-user v-if="registarModalState" />
      <profile-user v-if="usersStore.perfilModalState" />

    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>

import HeaderPage from "@/components/mainPage/Header.vue"
import SideBar from "@/components/mainPage/SideBar.vue"
import CartModal from "@/components/modals/CartModal.vue"
import RegisterUser from "@/components/modals/RegisterUser.vue"
import ProfileUser from "@/components/modals/ProfileUser.vue"
import OrderPayment from "@/components/modals/OrderPayment.vue"

import { useUsersStore } from './stores/users.js'

import { ref } from "vue"

const usersStore = useUsersStore()


const sidebarstate = ref(false)

const cartModalState = ref(false)

const registarModalState = ref(false)

const pagamentoModalState = ref(false)

const sideToggle = () => {
  sidebarstate.value = !sidebarstate.value
  console.log(sidebarstate.value)
}
const cartModalToggle = () => {
  cartModalState.value = !cartModalState.value
}
const loginModalToggle = () => {
  loginModalState.value = !loginModalState.value
}
const registarModalToggle = () => {
  registarModalState.value = !registarModalState.value
}
const perfilModalToggle = () => {
  perfilModalState.value = !perfilModalState.value
}
const pagamentoModalToggle = () => {
  pagamentoModalState.value = !pagamentoModalState.value
}
</script>