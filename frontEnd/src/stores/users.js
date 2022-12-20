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

  let searchUser = ref('');


  let usersList = computed(() => {
    return users.value
      .filter((usr) => usr.name.toLowerCase().includes(searchUser.value));
  });

  function clearUsers() {
    users.value = [];
  }

  function clearUser() {
    user.value = null;
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
    }finally{
      loadingStore.toggleLoading();
    }
  }

  async function loadUser() {
    try {
      loadingStore.toggleLoading();
      const response = await axios.get("users/me");
      user.value = response.data.data;
      socket.emit('loggedIn', user.value)
    } catch (error) {
      clearUser();
      throw error;
    }finally{
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
      await loadUser();
      toast.success(user.value.name + ` logado com sucesso.`);
      credentials.value.password = "";
      loginModal.value = false;
      socket.emit('loggedIn', user.value)
      return true;
    } catch (error) {
      toast.error(`Credenciais erradas.`);
      clearUser();
      throw error;
    }finally{
      loadingStore.toggleLoading();
    }
  }

  async function register(user) {
    try {
      user.photo_url = base64.value;
      loadingStore.toggleLoading();
      const response = await axios.post("users", user);
      toast.success(`Utilizador criado com sucesso`);
      base64.value = null;
      users.value.push(response.data.data);
      return response.data.data.id;
    } catch (error) {
      toast.error(`Erro no registo do utilizador.`);
      throw error;
    }finally{
      loadingStore.toggleLoading();
    }
  }

  function clearUser() {
    delete axios.defaults.headers.common.Authorization;
    sessionStorage.removeItem("token");
    user.value = null;
  }

  const photoFullUrl = computed(() => {
    return user.value?.photo_url
      ? serverBaseUrl + "/storage/fotos/" + user.value.photo_url
      : serverBaseUrl + "/storage/fotos/anonymos.jpg";
  });

  async function logout() {
    try {
      loadingStore.toggleLoading();
      await axios.post("logout");
      toast.success(
        "User " + user.value.name + " has logged out of the application."
      );
      socket.emit('loggedOut', user)
      clearUser();
      delete axios.defaults.headers.common.Authorization;
      return true;
    } catch (error) {
      return false;
    }finally{
      loadingStore.toggleLoading();
    }
  }

  async function updateUser(updateProduct) {
    try {
      updateProduct.photo_url = base64.value;
      loadingStore.toggleLoading();
      const response = await axios.put(
        "products/" + updateProduct.id,
        updateProduct
      );
      socket.emit("updateUser", response.data.data);
      toast.success(`Produto atualizado com sucesso`);
      base64.value = null;

      return products.value;
    } catch (error) {

    }finally{
      loadingStore.toggleLoading();
    }

    //updateProjectOnArray(response.data.data)
    //return response.data.data
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

  return {
    users,
    restoreToken,
    uploadImage,
    loadUsers,
    register,
    user,
    loginModalState,
    perfilModalState,
    login,
    loadUser,
    logout,
    credentials,
    loginModal,
    updateUser,
    errors,
    photoFullUrl,
    usersList,
    searchUser
  };
});
