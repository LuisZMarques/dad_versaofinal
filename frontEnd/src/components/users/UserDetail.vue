<template :user="user">
  <tr>
    <th scope="row">
      <img alt="image" :src="photoFullUrl" class="img-fluid img-thumbnail" style="width: 75px; height: 75px" />
    </th>
    <td class="texto" style="font-size: medium;" colspan="4">{{user.name}}</td>
    <td class="texto">{{user.type}}</td>
    <td class="text-center">
      <div style="display:flex;flex-direction: row;align-items: center;justify-content: center;">
        <button class="btn btn-sm btn-outline-secondary" v-if="!user.blocked" @click="user.blocked = 1" data-toggle="tooltip" title="Bloquear">
          <svg viewBox="0 0 1024 1024" class="icons-listas" >
            <path
              d="M512 854q140 0 241-101t101-241q0-48-21-110t-51-100l-480 480q90 72 210 72zM170 512q0 48 21 110t51 100l480-480q-90-72-210-72-140 0-241 101t-101 241zM512 86q176 0 301 125t125 301-125 301-301 125-301-125-125-301 125-301 301-125z">
            </path>
          </svg>
        </button>
        <button class="btn btn-sm btn-outline-secondary" v-if="user.blocked" @click="user.blocked = 0" data-toggle="tooltip" title="Desbloquear">
          <svg viewBox="0 0 1024 1024" class="icons-listas">
            <path
              d="M660 874l-148-148 60-60 88 88 218-220 60 60zM470 512q-70 0-121-50t-51-120 51-121 121-51 120 51 50 121-50 120-120 50zM384 726l128 128h-384v-86q0-76 117-123t225-47q30 0 42 2z">
            </path>
          </svg>
        </button>
        <button class="btn btn-sm btn-outline-secondary" @click="editModal = true" data-toggle="tooltip" title="Editar">
          <svg viewBox="0 0 1024 1024" class="icons-listas">
            <path
                d="M469.333 128h-298.667c-35.328 0-67.413 14.379-90.496 37.504s-37.504 55.168-37.504 90.496v597.333c0 35.328 14.379 67.413 37.504 90.496s55.168 37.504 90.496 37.504h597.333c35.328 0 67.413-14.379 90.496-37.504s37.504-55.168 37.504-90.496v-298.667c0-23.552-19.115-42.667-42.667-42.667s-42.667 19.115-42.667 42.667v298.667c0 11.776-4.736 22.4-12.501 30.165s-18.389 12.501-30.165 12.501h-597.333c-11.776 0-22.4-4.736-30.165-12.501s-12.501-18.389-12.501-30.165v-597.333c0-11.776 4.736-22.4 12.501-30.165s18.389-12.501 30.165-12.501h298.667c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667zM759.168 76.501l-405.333 405.333c-5.205 5.163-9.259 11.947-11.221 19.84l-42.667 170.667c-1.664 6.4-1.792 13.568 0 20.693 5.717 22.869 28.885 36.779 51.755 31.061l170.667-42.667c7.125-1.749 14.080-5.504 19.84-11.221l405.333-405.333c25.984-25.984 38.997-60.16 38.997-94.165s-13.013-68.181-38.997-94.165-60.203-39.040-94.208-39.040-68.181 13.013-94.165 38.997zM819.499 136.832c9.344-9.344 21.504-13.995 33.835-13.995s24.491 4.651 33.835 13.995 13.995 21.504 13.995 33.835-4.651 24.491-13.995 33.835l-396.971 396.971-90.197 22.571 22.571-90.197z"
              ></path>
          </svg>
        </button>
        <button class="btn btn-sm btn-outline-secondary" @click="deleteUser(user.id)" data-toggle="tooltip" title="Eliminar" >
          <svg viewBox="0 0 1024 1024" class="icons-listas">
            <path
              d="M512 170.667c-188.544 0-341.333 152.832-341.333 341.333s152.789 341.333 341.333 341.333 341.333-152.832 341.333-341.333-152.789-341.333-341.333-341.333zM670.165 609.835c16.683 16.683 16.683 43.648 0 60.331-8.32 8.32-19.243 12.501-30.165 12.501s-21.845-4.181-30.165-12.501l-97.835-97.835-97.835 97.835c-8.32 8.32-19.243 12.501-30.165 12.501s-21.845-4.181-30.165-12.501c-16.683-16.683-16.683-43.648 0-60.331l97.835-97.835-97.835-97.835c-16.683-16.683-16.683-43.648 0-60.331s43.648-16.683 60.331 0l97.835 97.835 97.835-97.835c16.683-16.683 43.648-16.683 60.331 0s16.683 43.648 0 60.331l-97.835 97.835 97.835 97.835z">
            </path>
          </svg>
        </button>
      </div>
    </td>
  </tr>
  <edit-user :show="editModal" @close="editModal = false" :id="user.id" v-if="user.type=='C'" />
  <edit-employer :show="editModal" @close="editModal = false" :id="user.id" v-if="user.type!='C'" />
</template>
  
<script setup>
import { inject, computed, ref } from 'vue';
import EditUser from "@/components/modals/EditUser.vue"
import EditEmployer from "@/components/modals/EditEmployer.vue"
import { useUsersStore } from "@/stores/users.js";

const serverBaseUrl = inject("serverBaseUrl");
let editModal = ref(false)

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const usersStore = useUsersStore();

const photoFullUrl = computed(() => {
        return props.user.photo_url
            ? serverBaseUrl + "/storage/fotos/" + props.user.photo_url
            : null
    }) 

function deleteUser(id) {
  usersStore.deleteUser(id);
}

</script>
  
<style scoped>
</style>
  