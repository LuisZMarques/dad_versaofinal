import { ref, inject, computed } from "vue";
import { defineStore } from "pinia";
import { useLoadingStore } from "@/stores/loading.js";

export const useProductsStore = defineStore("products", () => {
  const axios = inject("axios");
  const toast = inject("toast");
  const socket = inject("socket");

  const loadingStore = useLoadingStore();

  const products = ref([]);

  let searchProduct = ref("");

  const base64 = ref();

  let productsList = computed(() => {
    return products.value
      .filter((proct) => proct.name.toLowerCase().includes(searchProduct.value));
  });

  function clearProducts() {
    products.value = [];
  }

  async function loadProducts() {
    try {
      loadingStore.toggleLoading();
      const response = await axios.get("products");
      products.value = response.data.data;
      toast.success(`Produtos loaded com successo`);
      return products.value;
    } catch (error) {
      clearProducts();
      throw error;
    }finally{
      loadingStore.toggleLoading();
    }
  }

  async function saveProduct(product) {
    if (product.id) {
      try {
        product.photo_url = base64.value;
        loadingStore.toggleLoading();
        const response = await axios.put("products/" + product.id, product);
        updateProductOnArray(response.data.data);
        socket.emit("updateProduct", response.data.data);
        toast.success(`Produto atualizado com sucesso`);
        base64.value = null;

        return products.value;
      } catch (error) {
        if(error.response.data.errors) {
          Object.values(error.response.data.errors).forEach(errorMessage => toast.error(errorMessage.toString()));
        }else{
          toast.error(error.message);
        }
      }finally{
        loadingStore.toggleLoading();
      }
    }
      if (!product.id) {
        try {
            product.photo_url = base64.value;
            loadingStore.toggleLoading();
            const response = await axios.post("products", product);
            //socket.emit("updateProduct", response.data.data);
            toast.success(`Produto adicionado com sucesso`);
            base64.value = null;
            products.value.push(response.data.data);
            return products.value;
        } catch (error) {
          if(error.response.data.errors) {
            Object.values(error.response.data.errors).forEach(errorMessage => toast.error(errorMessage.toString()));
          }else{
            toast.error(error.message);
          }
        }finally{
          loadingStore.toggleLoading();
        } 
      }
  }

  let deleteProduct = async (productId) => {
    try {
      loadingStore.toggleLoading();
      const response = await axios.delete("products/" + productId);
      toast.success("Produto eliminado com sucesso");
      removeProductOnArray(response.data.data);
      return response.data.data;
    } catch (error) {
      Object.values(error.response.data.errors).forEach((errorMessage) =>
        toast.error(errorMessage.toString())
      );
    } finally {
      loadingStore.toggleLoading();
    }
  };

  function removeProductOnArray(product) {
    let idx = products.value.findIndex((t) => t.id === product.id);
    if (idx >= 0) {
      products.value.splice(idx, 1);
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

  function updateProductOnArray(product) {
    let idx = products.value.findIndex((t) => t.id === product.id);
    if (idx >= 0) {
      products.value[idx] = product;
    }
  }

  socket.on("updateProduct", (product) => {
    updateProductOnArray(product);
    toast.success(`O producto ${product.name} foi atualizado.`);
  });

  return {
    products,
    deleteProduct,
    loadProducts,
    saveProduct,
    uploadImage,
    productsList,
    searchProduct
  };
});
