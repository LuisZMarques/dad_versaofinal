<template>
  <div class="flex flex-column">
    <header-page @sidebar-toggle="sideToggle" />
    <div class="flex" style="background-color: rebeccapurple;">
      <SideBar v-if="sidebarstate" />

      <div style="position:absolute; height: 100vh;width: 100vw;" v-if="loadingStore.isLoading">
        <!-- :style="{ 'margin-left': sidebarstate ? '8%' : 0  } " -->
        <semipolar-spinner :animation-duration="2000" :size="200" color="#ff1d5e" v-if="loadingStore.isLoading" style="left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            z-index: 3;" />
      </div>

      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from "vue"
import HeaderPage from "@/components/mainPage/Header.vue"
import SideBar from "@/components/mainPage/SideBar.vue"
import { SemipolarSpinner } from 'epic-spinners'
import { useLoadingStore } from "@/stores/loading";

const toast = inject("toast");
const socket = inject("socket");

const loadingStore = useLoadingStore();


const sidebarstate = ref(true)

const sideToggle = () => {
  sidebarstate.value = !sidebarstate.value
}
</script>