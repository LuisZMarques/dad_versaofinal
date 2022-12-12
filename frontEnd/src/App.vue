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

import { useUsersStore } from './stores/users.js'

import { ref } from "vue"

const usersStore = useUsersStore()
const sidebarstate = ref(false)

const sideToggle = () => {
  sidebarstate.value = !sidebarstate.value
}

</script>