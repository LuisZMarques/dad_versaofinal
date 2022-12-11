<template>
  <div class="menu-list-container">
    <span class="texto-logo">
      <span>Menu</span>
      <br />
    </span>
    <div>
      <div class="row m-3">
        <div class="col-12 col-md-4 mb-4" v-for="product in productsStore.products">
          <menu-card :product="product" class=""/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import MenuCard from "@/components/menu/MenuCard.vue";
import { useProductsStore } from "../stores/products";

const productsStore = useProductsStore();

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
