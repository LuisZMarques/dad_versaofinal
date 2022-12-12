<template>
  <div class="card text-center">
    <img :src="photoFullUrl" class="mx-auto"
      alt="https://a.storyblok.com/f/108717/960x640/7fd6d1bd50/7-tipps-fur-gute-food-fotografie1.jpg" height="150"
      width="150" />
    <div class="card-body">
      <h5 class="card-title">{{ product.name }}</h5>
      <p class="card-text text-start">{{ product.description }}</p>
    </div>
    <div class="card-footer">
      <div class="d-flex justify-content-between">
        <button class="btn btn-sm btn-outline-info" @click="toogleProductDetail">Edit product</button>
        <button class="btn btn-sm btn-outline-primary" @click="cart.value.push(product)">Adicionar</button>
      </div>

    </div>
    <product-detail :product="product" :showProduct="showProduct" @close="toogleProductDetail" />
  </div>
</template>

<script setup>
import { computed, inject, ref } from "vue";
import { useCartStore } from '@/stores/cart.js'

import ProductDetail from '@/components/modals/ProductDetail.vue';

const serverBaseUrl = inject("serverBaseUrl");
const cart = useCartStore();

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

let showProduct = ref(false)

let toogleProductDetail = () => {
  showProduct.value = !showProduct.value
}

const photoFullUrl = computed(() => {
  return props.product.photo_url
    ? serverBaseUrl + "/storage/products/" + props.product.photo_url
    : null
})

</script>
