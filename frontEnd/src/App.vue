<template>
  <div class="flex flex-column">
    <header-page @sidebar-toggle="sideToggle" />
    <div class="flex">
      <SideBar v-if="sidebarstate"/>

      <router-view />
    </div>
  </div>
</template>

<script setup>

import HeaderPage from "@/components/mainPage/Header.vue"
import SideBar from "@/components/mainPage/SideBar.vue"

import { ref, inject } from "vue"

const toast = inject("toast");
const socket = inject("socket");
const sidebarstate = ref(true)

const sideToggle = () => {
  sidebarstate.value = !sidebarstate.value
}
</script>