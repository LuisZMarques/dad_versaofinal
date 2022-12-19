<template>
  <div class="menu-list-container">
    <div class="justify-content-center text-center" style="display: flex; width: 100%;">
      <span class="texto-logo" style="align-self: center;">Menu</span>
      <button class="btn btn-primary btn-sm" v-if="usersStore.user?.type =='EM'" style="align-self: flex-end;" @click="toogleProductDetail">
        <span>Criar Produto</span>
      </button>
    </div>
    <div>
      <div>
        <div class="row m-3 justify-content-center">
          <input class="form-control mr-sm-2" type="search" placeholder="procurar de produto"
            v-model="productsStore.searchProduct" style="width: 95%;" />
        </div>
      </div>
      <div class="row m-3">
        <div class="col-12 col-md-4 mb-4" v-for="product in productsStore.productsList" :key="product">
          <menu-card :product="product" class="" />
        </div>
      </div>
    </div>
    <product-detail :product="newProduct()" :showProduct="showProduct" @close="toogleProductDetail" />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import MenuCard from "@/components/menu/MenuCard.vue";
import { useProductsStore } from "../stores/products";
import { useUsersStore } from "@/stores/users.js";
import ProductDetail from '@/components/modals/ProductDetail.vue';

const productsStore = useProductsStore();
const usersStore = useUsersStore();
const newProduct = () => {
  return {
    name: "",
    type: "",
    description: "",
    photo_url: "",
  };
};

let showProduct = ref(false)
let toogleProductDetail = () => {
  showProduct.value = !showProduct.value
}
onMounted(() => {
  if (productsStore.productsList.length == 0)
    productsStore.loadProducts();
});
</script>

<style scoped>
.menu-list-container {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  flex-grow: 1;
  align-self: center;
  align-items: flex-start;
  flex-direction: column;
  background-color: rebeccapurple;
}

.menu-list-gallery {
  width: 100%;
  display: grid;
  padding: var(--dl-space-space-fiveunits);
  grid-gap: var(--dl-space-space-unit);
  position: relative;
  max-width: 1200px;
  align-self: center;
  border-color: var(--dl-color-pimary-laranjavivo);
  border-width: 0.25rem;
  border-radius: 5rem;
  grid-template-columns: 1fr 1fr;
}

@media (max-width: 991px) {
  .menu-list-gallery {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 767px) {
  .menu-list-gallery {
    padding-left: 32px;
    padding-right: 32px;
    grid-template-columns: 1fr;
  }
}

@media (max-width: 479px) {
  .menu-list-gallery {
    padding-top: 32px;
    padding-left: var(--dl-space-space-unit);
    padding-right: var(--dl-space-space-unit);
    padding-bottom: 32px;
  }
}
</style>
