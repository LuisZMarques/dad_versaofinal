<template>
  <div class="flex flex-column">
    <header-page ></header-page>
    <div class="flex">
        <SideBar></SideBar>
        <router-view/>
    </div>
  </div>
</template>

<script setup>
import HeaderPage from "@/components/mainPage/Header.vue";
import SideBar from "@/components/mainPage/SideBar.vue";

</script>