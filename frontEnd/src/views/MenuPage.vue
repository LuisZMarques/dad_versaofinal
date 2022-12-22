<template>
  <div class="menu-list-container" style="align-self: flex-start;">
    <div class="justify-content-center text-center" style="display: flex; width: 100%;">
      <span class="texto-logo" style="align-self: center;">Menu</span>
      <button class="btn btn-primary btn-sm" v-if="usersStore.user?.type == 'EM'" style="align-self: flex-end;"
        @click="toogleProductDetail">
        <span>Criar Produto</span>
      </button>
    </div>
    <div>
      <div style="width:100%;padding: 2rem;display: flex;">
        <button style="margin: 0.5rem;background-color: rebeccapurple;border-color: transparent;align-self: flex-start;" @click="toggleSearch()">
          <svg viewBox="0 0 1024 1024" style="width: 35px;height: 35px;background-color: transparent;">
            <path
              d="M992.262 871.396l-242.552-206.294c-25.074-22.566-51.89-32.926-73.552-31.926 57.256-67.068 91.842-154.078 91.842-249.176 0-212.078-171.922-384-384-384-212.076 0-384 171.922-384 384s171.922 384 384 384c95.098 0 182.108-34.586 249.176-91.844-1 21.662 9.36 48.478 31.926 73.552l206.294 242.552c35.322 39.246 93.022 42.554 128.22 7.356s31.892-92.898-7.354-128.22zM384 640c-141.384 0-256-114.616-256-256s114.616-256 256-256 256 114.616 256 256-114.614 256-256 256z">
            </path>
          </svg>
        </button>
        <input class="form-control mr-sm-2" type="search" placeholder="7-UP, Coca-Cola, etc..."
          v-model="productsStore.searchProduct" style="width: 100%;align-self: center;" 
          v-if="showSearch" />
      </div>
      <div class="row m-3">
        <div class="col-12 col-md-4 mb-4" v-for="product in productsStore.productsList" :key="product">
          <menu-card :product="product" />
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
const showSearch = ref(false)

let toggleSearch = () => {
  showSearch.value = !showSearch.value
}

let toogleProductDetail = () => {
  showProduct.value = !showProduct.value
}
onMounted(() => {
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
