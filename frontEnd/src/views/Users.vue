<template>
  <div class="componentes-litas">
    <h2 class="text-center" style="color: white">Lista de Utilizadores:</h2>
    <table class="table table-bordered" style="background-color: #e92b2bff; border-color: rebeccapurple">
      <thead>
        <tr>
          <th scope="row">Foto</th>
          <th scope="row" colspan="4">Nome</th>
          <th scope="row">Permissão</th>
          <th scope="row" colspan="4">Acções</th>
        </tr>
      </thead>
      <tbody>
        <user-detail  v-for="user in usersStore.users" :key="user" :user="user"></user-detail>
      </tbody>
    </table>
  </div>
  <!-- <div class="componentes-litas">
    <h1 class="lista-users-titulo-estatico">Lista de Utilizadores:</h1>
    <div class="lista-users-container1 container-listas-info">
      <div class="container-listas-info"><span class="texto">Email:</span></div>
      <div class="container-listas-info"><span class="texto">Foto:</span></div>
      <div class="lista-users-container-admin containers-acoes-individuais">
        <span class="texto">Acções:</span>
      </div>
    </div>
    <ul class="list">
      <li class="list-item" v-for="user in usersStore.users">
        <user-detail :user="user"></user-detail>
      </li>
    </ul>
  </div> -->
</template>

<script setup>
import UserDetail from "@/components/users/UserDetail.vue";
import { useUsersStore } from "../stores/users";
import { onMounted } from "vue";

const usersStore = useUsersStore();

onMounted(() => {
  usersStore.loadUsers()
})
</script>



<style scoped>
.lista-users-titulo-estatico {
  color: var(--dl-color-gray-white);
  text-align: center;
}

.lista-users-container1 {
  width: 100%;
  height: 4rem;
}

.lista-users-container-admin {
  width: 50%;
  background-color: var(--dl-color-pimary-laranjavivo);
}

.lista-users-root-class-name1 {
  top: 3rem;
  left: 15rem;
  right: 15rem;
  bottom: 3rem;
  position: absolute;
  align-self: flex-start;
}

@media (max-width: 479px) {
  .lista-users-container1 {
    flex-direction: row;
  }
}
</style>
