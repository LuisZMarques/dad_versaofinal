import { ref, computed, inject } from "vue";
import { defineStore } from "pinia";
import avatarNoneUrl from '@/assets/avatar-none.png'

export const useUsersStore = defineStore("users", () => {
  const axios = inject("axios");
  const toast = inject("toast");

  const users = ref([]);
  const user = ref();

  function clearUsers() {
    projects.value = [];
  }

  async function loadUsers() {
    try {
      const response = await axios.get("users");
      users.value = response.data.data;
      toast.success(
        `Utilizadores carregados com successo.`
      );
      return users.value;
    } catch (error) {
      clearUsers();
      throw error;
    }
  }

  async function getUser() {
    try {
      const response = await axios.get("users/1");
      user.value = response.data.data;
      toast.success(
        `Utilizadores carregados com successo.`
      );
      return user.value;
    } catch (error) {
      user.value = null;
      throw error;
    }
  }

  const userPhotoUrl = computed(() => {
    if (!users.value?.photo_url) {
      return avatarNoneUrl
    }
    return serverBaseUrl + '/storage/fotos/' + users.value.photo_url
  })

  return { users, userPhotoUrl, loadUsers, user, getUser };
});
