import { ref, inject } from "vue";
import { defineStore } from "pinia";

export const useProductsStore = defineStore("products", () => {
  const axios = inject("axios");
  const toast = inject("toast");

  const products = ref([]);

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
      const response = await axios.put(
        "products/" + updateProduct.id,
        updateProduct        
      );
      toast.success(`Produto atualizado com sucesso com successo`);
      return 1;
    } catch (error) {}

    //updateProjectOnArray(response.data.data)
    //return response.data.data
  }

  return { products, loadProducts, updateProduct };
});
