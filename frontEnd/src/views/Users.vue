<template>
  <div class="componentes-litas">
    <section class="intro">
      <div class="gradient-custom-2 h-100">
        <div class="mask d-flex align-items-center h-100">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-12">
                <div class="table-responsive">
                  <table class="table table-bordered text-center align-middle"
                    style=" border-color: rebeccapurple">
                    <thead style="background-color: transparent; color: white">
                      <tr>
                        <th scope="row">Foto</th>
                        <th scope="row" colspan="4">Nome</th>
                        <th scope="row">Permissão</th>
                        <th scope="row" colspan="4">Acções</th>
                      </tr>
                    </thead>
                    <tbody style="background-color: #C9A2FF;">
                      <user-detail v-for="user in usersStore.users" :key="user" :user="user"></user-detail>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
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

@media(max-width: 570px) {
  .table {
    overflow-x: auto;
  }

}

</style>
