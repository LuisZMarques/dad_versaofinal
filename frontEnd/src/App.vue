<template>
  <div class="flex flex-column">
    <header-page @sidebar-toggle="sideToggle"/>
    <div class="flex">
      <SideBar v-if="sidebarstate"/>
      <router-view/>
    </div>
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

const sideToggle = () => {
  sidebarstate.value = !sidebarstate.value
}

</script>