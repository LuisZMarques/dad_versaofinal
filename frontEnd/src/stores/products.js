import { ref, inject } from "vue";
import { defineStore } from "pinia";

export const useProductsStore = defineStore("products", () => {
  const axios = inject("axios");
  const toast = inject("toast");
  const socket = inject("socket");

  const products = ref([]);

  const base64 = ref();

  function clearProducts() {
    projects.value = [];
  }

  async function loadProducts() {
    try {
      const response = await axios.get("products");
      products.value = response.data.data;
      toast.success(`Produtos loaded com successo`);
      return products.value;
    } catch (error) {
      clearProducts();
      throw error;
    }
  }

  async function updateProduct(updateProduct) {
    try {
      updateProduct.photo_url = base64.value;
      const response = await axios.put(
        "products/" + updateProduct.id,
        updateProduct
      );
      updateProductOnArray(response.data.data);
      socket.emit("updateProduct", response.data.data);
      toast.success(`Produto atualizado com sucesso`);
      base64.value = null;

      return products.value;
    } catch (error) {}

    //updateProjectOnArray(response.data.data)
    //return response.data.data
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
    toast.success(`O producto ${product.name} foi atualizado com sucesso.`);
  });

  return { products, loadProducts, updateProduct, uploadImage, base64 };
});
