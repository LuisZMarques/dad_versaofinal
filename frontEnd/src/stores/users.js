import { ref, computed, inject } from "vue";
import { defineStore } from "pinia";
import { useLoadingStore } from "@/stores/loading.js";

export const useUsersStore = defineStore("users", () => {
  const axios = inject("axios");
  const toast = inject("toast");
  const socket = inject("socket");

  const serverBaseUrl = inject("serverBaseUrl");

  const loadingStore = useLoadingStore();

  const users = ref([]);
  const user = ref();
  const base64 = ref();

  const credentials = ref({
    username: "",
    password: "",
  });

  let loginModal = ref(false);

  let loginModalState = ref(true);
  let perfilModalState = ref(false);

  let errors = ref([]);

  let searchUser = ref("");

  let usersList = computed(() => {
    return users.value.filter((usr) =>
      usr.name.toLowerCase().includes(searchUser.value)
    );
  });

  
  //Funçoes para todos os utilizadores

  function clearUsers() {
    users.value = [];
  }

  async function loadUsers() {
    try {
      loadingStore.toggleLoading();
      const response = await axios.get("users");
      users.value = response.data.data;
      toast.success(`Utilizadores carregados com successo.`);
      return users.value;
    } catch (error) {
      clearUsers();
      throw error;
    } finally {
      loadingStore.toggleLoading();
    }
  }


  //Funçoes Utilizador Individual


  function clearUser() {
    delete axios.defaults.headers.common.Authorization;
    sessionStorage.removeItem("token");
    user.value = null;
  }

  
  async function loadUser() {
    try {
      loadingStore.toggleLoading();
      const response = await axios.get("users/me");
      if (response.data.data.blocked == 1) {
        toast.warning(
          response.data.data.name + ` bloqueado... contactar administrador.`
        );
        await axios.post("logout");
        clearUser();
        return false;
      } else {
        user.value = response.data.data;
        socket.emit("loggedIn", user.value);
        return true;
      }
    } catch (error) {
      clearUser();
      throw error;
    } finally {
      loadingStore.toggleLoading();
    }
  }


  async function login() {
    try {
      loadingStore.toggleLoading();
      const response = await axios.post("login", credentials.value);
      axios.defaults.headers.common.Authorization =
        "Bearer " + response.data.access_token;
      sessionStorage.setItem("token", response.data.access_token);
      const log = await loadUser();
      if (log) {
        toast.success(user.value.name + ` logado com sucesso.`);
        credentials.value.password = "";
        loginModal.value = false;
        socket.emit("loggedIn", user.value);
        return true;
      }
      return false
    } catch (error) {
      console.log(error);
      toast.error(`Credenciais erradas.`);
      clearUser();
    } finally {
      loadingStore.toggleLoading();
    }
  }


  const photoFullUrl = computed(() => {
    return user.value?.photo_url
      ? serverBaseUrl + "/storage/fotos/" + user.value.photo_url
      : serverBaseUrl + "/storage/fotos/anonymos.jpg";
  });

  let userName = computed(() => {
    return user.value?.name ?? "anónimo";
  });

  async function logout() {
    try {
      loadingStore.toggleLoading();
      await axios.post("logout");
      toast.success(
        "User " + user.value.name + " has logged out of the application."
      );
      socket.emit("loggedOut", user);
      clearUser();
      delete axios.defaults.headers.common.Authorization;
      return true;
    } catch (error) {
      return false;
    } finally {
      loadingStore.toggleLoading();
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

  let deleteUser = async (userId) => {
    try {
      loadingStore.toggleLoading();
      const response = await axios.delete("users/" + userId);
      toast.success("Utilizador eliminado com sucesso");
      removeUserOnArray(response.data.data);
      return response.data.data;
    } catch (error) {
      Object.values(error.response.data.errors).forEach((errorMessage) =>
        toast.error(errorMessage.toString())
      );
    } finally {
      loadingStore.toggleLoading();
    }
  };

  let blockUser = async (userId) => {
    try {
      loadingStore.toggleLoading();
      const response = await axios.patch("users/blockUser/" + userId);
      if (response.data.data.blocked == true)
        toast.success("Utilizador bloqueado com sucesso");
      else toast.success("Utilizador desbloqueado com sucesso");
      updateUserOnArray(response.data.data);
      return response.data.data;
    } catch (error) {
      Object.values(error.response.data.errors).forEach((errorMessage) =>
        toast.error(errorMessage.toString())
      );
    } finally {
      loadingStore.toggleLoading();
    }
  };

  function updateUserOnArray(user) {
    let idx = users.value.findIndex((t) => t.id === user.id);
    if (idx >= 0) {
      users.value[idx] = user;
    }
  }

  function removeUserOnArray(user) {
    let idx = users.value.findIndex((t) => t.id === user.id);
    if (idx >= 0) {
      users.value.splice(idx, 1);
    }
  }
  let uploadImage = (e) => {
    createBase64Image(e.target.files[0]);
  };

  function createBase64Image(FileObject) {
    const reader = new FileReader();
    reader.onload = (event) => {
      base64.value = event.target.result;
    };
    reader.readAsDataURL(FileObject);
  }

  // Broadcast from admin 
  socket.on("broadcast", (msg) => {
    toast.informational(`${msg}`);
  });

  // Personal Message from admin
  socket.on("msg", (msg) => {
    toast.success(`${msg}`);
  });

  return {
    users,
    restoreToken,
    uploadImage,
    deleteUser,
    loadUsers,
    user,
    loginModalState,
    perfilModalState,
    login,
    loadUser,
    logout,
    credentials,
    loginModal,
    errors,
    photoFullUrl,
    usersList,
    searchUser,
    userName,
    blockUser,
  };
});
