import { ref, inject } from "vue";
import { defineStore } from "pinia";

export const useUsersStore = defineStore("users", () => {
  const axios = inject("axios");
  const toast = inject("toast");

  const users = ref([]);

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

  return { users, loadUsers };
});
