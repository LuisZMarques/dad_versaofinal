<script setup>
import { onMounted } from 'vue';
import { useProductsStore } from '../stores/products';

const productsStore = useProductsStore()

onMounted(() => {
  productsStore.loadProducts()
})

console.log(productsStore.products)
</script>

<template>
 <div>
  <span v-for="product in productsStore.products">
    {{product.name}}<p></p>
  </span>
 </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
