<template>
  <div class="componentes-litas">
    <section class="intro">
      <div class="gradient-custom-2 h-100">
        <div class="mask d-flex align-items-center h-100">
          <div class="container">
            <div class="row justify-content-center">
              <div style="width:100%;padding: 2rem;display: flex;">
                <button
                  style="margin: 0.5rem;background-color: rebeccapurple;border-color: transparent;align-self: flex-start;"
                  @click="toggleSearch()">
                  <svg viewBox="0 0 1024 1024" style="width: 35px;height: 35px;background-color: transparent;">
                    <path
                      d="M992.262 871.396l-242.552-206.294c-25.074-22.566-51.89-32.926-73.552-31.926 57.256-67.068 91.842-154.078 91.842-249.176 0-212.078-171.922-384-384-384-212.076 0-384 171.922-384 384s171.922 384 384 384c95.098 0 182.108-34.586 249.176-91.844-1 21.662 9.36 48.478 31.926 73.552l206.294 242.552c35.322 39.246 93.022 42.554 128.22 7.356s31.892-92.898-7.354-128.22zM384 640c-141.384 0-256-114.616-256-256s114.616-256 256-256 256 114.616 256 256-114.614 256-256 256z">
                    </path>
                  </svg>
                </button>
                <input class="form-control mr-sm-2" type="search" placeholder="Nome do Utilizador"
                  v-model="usersStore.searchUser" style="width: 100%;align-self: center;" v-if="showSearch" />
              </div>
              <div class="col-12">
                <div class="table-responsive" ref="grid">
                  <table class="table table-bordered text-center align-middle" style=" border-color: rebeccapurple">
                    <thead style="background-color: transparent; color: white">
                      <tr>
                        <th scope="row">Foto</th>
                        <th scope="row" colspan="4">Nome</th>
                        <th scope="row">Permissão</th>
                        <th scope="row" colspan="4">Acções
                          <button class="btn btn-primary btn-sm" style="margin-left: 1rem;"
                            @click="registerModal = true">
                            <span>Criar Funcionário</span>
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody style="background-color: #C9A2FF;">
                      <user-detail v-for="user in usersStore.usersList" :key="user" :user="user"></user-detail>
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
  <register-modal :show="registerModal" :user="newUser()" @close="registerModal = false" />
</template>

<script setup>
import UserDetail from "@/components/users/UserDetail.vue";
import RegisterModal from "@/components/modals/RegisterEmployee.vue"
import { useUsersStore } from "../stores/users";
import { ref, onMounted, computed, watch } from "vue";

const registerModal = ref(false)
const usersStore = useUsersStore();

const showSearch = ref(false)
const grid = ref(false)

let toggleSearch = () => {
  showSearch.value = !showSearch.value
}
computed(() => usersStore.searchUser, () => {
  grid.value = !grid.value
}) 

onMounted(() => {
  usersStore.loadUsers()
})

const newUser = () => {
  return {
    name: null,
    email: null,
    password: null,
    type: null,
    blocked: 0,
    photo_url: "",
    custom: null
  };
};

</script>



<style scoped>
@media(max-width: 570px) {
  .table {
    overflow-x: auto;
  }

}
</style>
