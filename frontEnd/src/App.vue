<script setup>
import HeaderPage from "@/components/mainPage/Header.vue";
import SideBar from "@/components/mainPage/SideBar.vue";
</script>

<template>
  <div class="flex flex-column">
    <header-page></header-page>
    
      <router-view />

  </div>
</template>
