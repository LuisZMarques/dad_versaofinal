import { ref, computed, inject } from "vue";
import { defineStore } from "pinia";
import avatarNoneUrl from "@/assets/avatar-none.png";

export const useUsersStore = defineStore("users", () => {
  const axios = inject("axios");
  const toast = inject("toast");

  const users = ref([]);
  const user = ref();

  const credentials = ref({
    username: "",
    password: "",
  });

  let loginModalState = ref(true);
  let perfilModalState = ref(false);

  function clearUsers() {
    projects.value = [];
  }

  function clearUser() {
    user.value = null;
  }
  async function loadUsers() {
    try {
      const response = await axios.get("users");
      users.value = response.data.data;
      toast.success(`Utilizadores carregados com successo.`);
      return users.value;
    } catch (error) {
      clearUsers();
      throw error;
    }
  }

  async function loadUser() {
    try {
      const response = await axios.get("users/1");
      user.value = response.data.data;
      toast.success(`Utilizadores carregados com successo.`);
      return user.value;
    } catch (error) {
      user.value = null;
      throw error;
    }
  }

  async function login() {
    try {
      const response = await axios.post("login", credentials.value);
      toast.success(
        "User " + credentials.value.username + " has entered the application."
      );
      axios.defaults.headers.common.Authorization =
        "Bearer " + response.data.access_token;
    } catch (error) {
      delete axios.defaults.headers.common.Authorization;
      credentials.value.password = "";
      toast.error("User credentials are invalid!");
    }
  }

  async function logout() {
    try {
      await axios.post("logout");
      clearUser();
      toast.success("User has logged out of the application.");
      delete axios.defaults.headers.common.Authorization;
      router.push({ name: "login" });
      return true;
    } catch (error) {
      return false;
    }
  }

  async function restoreToken() {
    let storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      axios.defaults.headers.common.Authorization = "Bearer " + storedToken;
      await loadUser();
      return true;
    }
    clearUser();
    return false;
  }

  return {
    users,
    loadUsers,
    user,
    loginModalState,
    perfilModalState,
    login,
    loadUser,
    logout,
    credentials,
  };
});
