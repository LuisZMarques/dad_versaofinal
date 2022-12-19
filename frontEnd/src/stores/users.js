import { ref, computed, inject } from "vue";
import { defineStore } from "pinia";

export const useUsersStore = defineStore("users", () => {
  const axios = inject("axios");
  const toast = inject("toast");
  const serverBaseUrl = inject("serverBaseUrl");

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

  function clearUsers() {
    users.value = [];
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
      const response = await axios.get("users/me");
      user.value = response.data.data;
    } catch (error) {
      clearUser();
      throw error;
    }
  }

  async function login() {
    try {
      const response = await axios.post("login", credentials.value);
      axios.defaults.headers.common.Authorization =
        "Bearer " + response.data.access_token;
      sessionStorage.setItem("token", response.data.access_token);
      await loadUser();
      toast.success(user.value.name + ` logado com sucesso.`);
      credentials.value.password = "";
      loginModal.value = false;
      //socket.emit('loggedIn', user.value)
      return true;
    } catch (error) {
      toast.success(`Credenciais erradas.`);
      clearUser();
      throw error;
    }
  }

  async function register() {
    try {
    } catch (error) {}
  }

  function clearUser() {
    delete axios.defaults.headers.common.Authorization;
    sessionStorage.removeItem("token");
    user.value = null;
  }

  const photoFullUrl = computed(() => {
    return user?.photo_url
      ? serverBaseUrl + "/storage/fotos/" + user.photo_url
      : serverBaseUrl + "/storage/fotos/anonymos.jpg";
  });

  async function logout() {
    try {
      await axios.post("logout");
      toast.success(
        "User " + user.value.name + " has logged out of the application."
      );
      clearUser();
      delete axios.defaults.headers.common.Authorization;
      router.push({ name: "login" });
      return true;
    } catch (error) {
      return false;
    }
  }

  /*   const updateUser = () => {
    errors.value = null
    axios.put('users/' + props.id, user.value)
      .then((response) => {
        user.value = response.data.data
        socket.emit('updateUser', user.value)
        if (user.value.id == userStore.user.id) {
          userStore.user = user.value 
        }
        originalValueStr = dataAsString()
        toast.success('User #' + user.value.id + ' was updated successfully.')
        router.back()
      })
      .catch((error) => {
        if (error.response.status == 422) {
            toast.error('User #' + props.id + ' was not updated due to validation errors!')
            errors.value = error.response.data.errors
          } else {
            toast.error('User #' + props.id + ' was not updated due to unknown server error!')
          }
      })
} */

  async function updateUser(updateProduct) {
    try {
      updateProduct.photo_url = base64.value;
      const response = await axios.put(
        "products/" + updateProduct.id,
        updateProduct
      );
      //updateProductOnArray(response.data.data);
      //socket.emit("updateProduct", response.data.data);
      toast.success(`Produto atualizado com sucesso`);
      base64.value = null;

      return products.value;
    } catch (error) {}

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
    loadUsers,
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
    photoFullUrl
  };
});
