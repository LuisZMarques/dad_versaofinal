<template>
  <div class="card text-center">
    <img
      :src="photoFullUrl"
      class="mx-auto"
      alt="https://a.storyblok.com/f/108717/960x640/7fd6d1bd50/7-tipps-fur-gute-food-fotografie1.jpg"
      height="150"
      width="150"
    />
    <div class="card-body">
      <h5 class="card-title">{{ product.name }}</h5>
      <p class="card-text text-start">{{ product.description }}</p>
    </div>
    <div class="card-footer">
      <button class="btn btn-sm btn-outline-primary" @click="cart.value.push(product)">Adicionar</button>
    </div>
  </div>
</template>

<script setup>
import { computed, inject } from "vue";
import { useCartStore } from '@/stores/cart.js'

const serverBaseUrl = inject("serverBaseUrl");
const cart = useCartStore();

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const photoFullUrl = computed(() => {
  return props.product.photo_url
    ? serverBaseUrl + "/storage/products/" + props.product.photo_url
    : null
})

const image_alt = null;

let image = computed(() => {});
</script>
