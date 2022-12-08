<template>
  <div class="flex flex-column">
    <header-page @sidebar-toggle="sideToggle" @cart-toggle="cartModalToggle"></header-page>
    <div class="flex">
        <SideBar v-if="sidebarstate" @login-toggle="loginModalToggle" @perfil-toggle="perfilModalToggle"></SideBar>
        <router-view/>
        <cart-modal v-if="cartModalState" @pagamento-toggle="pagamentoModalToggle"/>
        <login-modal v-if="loginModalState" @registar-toggle="registarModalToggle"/>
        <order-payment v-if="pagamentoModalState"/>
        <register-user v-if="registarModalState"/>
        <profile-user v-if="perfilModalState"/>
    </div>
  </div>
</template>

<script setup>


import HeaderPage from "@/components/mainPage/Header.vue"
import SideBar from "@/components/mainPage/SideBar.vue"
import LoginModal from "@/components/modals/Login.vue"
import CartModal from  "@/components/modals/CartModal.vue"
import RegisterUser from "@/components/modals/RegisterUser.vue"
import ProfileUser from "@/components/modals/ProfileUser.vue"
import OrderPayment from "@/components/modals/OrderPayment.vue"

import { ref } from "vue";

let sidebarstate = ref(false)

let loginModalState = ref(false)

let cartModalState = ref(false)

let registarModalState = ref(false)

let perfilModalState = ref(false)

let pagamentoModalState = ref(false)

const sideToggle = () =>{
  sidebarstate = !sidebarstate 
}
const cartModalToggle = () => {
  cartModalState = !cartModalState
}
const loginModalToggle = () => {
  loginModalState = !loginModalState
}
const registarModalToggle = () => {
  registarModalState = !registarModalState
}
const perfilModalToggle = () => {
  perfilModalState = !perfilModalState
}
const pagamentoModalToggle = () => {
  pagamentoModalState = !pagamentoModalState
}
</script>