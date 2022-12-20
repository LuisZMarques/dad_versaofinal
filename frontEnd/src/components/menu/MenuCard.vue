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
      <div class="d-flex justify-content-center">
        <button class="btn btn-sm btn-outline-primary" v-if="isUserManager" @click="toogleProductDetail">
          <svg viewBox="0 0 1024 1024"  style="width: 15px;height: 15px;fill: blue; margin: 0.25rem;">
            <path
                d="M469.333 128h-298.667c-35.328 0-67.413 14.379-90.496 37.504s-37.504 55.168-37.504 90.496v597.333c0 35.328 14.379 67.413 37.504 90.496s55.168 37.504 90.496 37.504h597.333c35.328 0 67.413-14.379 90.496-37.504s37.504-55.168 37.504-90.496v-298.667c0-23.552-19.115-42.667-42.667-42.667s-42.667 19.115-42.667 42.667v298.667c0 11.776-4.736 22.4-12.501 30.165s-18.389 12.501-30.165 12.501h-597.333c-11.776 0-22.4-4.736-30.165-12.501s-12.501-18.389-12.501-30.165v-597.333c0-11.776 4.736-22.4 12.501-30.165s18.389-12.501 30.165-12.501h298.667c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667zM759.168 76.501l-405.333 405.333c-5.205 5.163-9.259 11.947-11.221 19.84l-42.667 170.667c-1.664 6.4-1.792 13.568 0 20.693 5.717 22.869 28.885 36.779 51.755 31.061l170.667-42.667c7.125-1.749 14.080-5.504 19.84-11.221l405.333-405.333c25.984-25.984 38.997-60.16 38.997-94.165s-13.013-68.181-38.997-94.165-60.203-39.040-94.208-39.040-68.181 13.013-94.165 38.997zM819.499 136.832c9.344-9.344 21.504-13.995 33.835-13.995s24.491 4.651 33.835 13.995 13.995 21.504 13.995 33.835-4.651 24.491-13.995 33.835l-396.971 396.971-90.197 22.571 22.571-90.197z"
              ></path>
          </svg>
          <span style="color: blue;">Editar</span>
        </button>
        <button class="btn btn-sm btn-outline-primary" @click="cartStore.addToCart(product)" 
        v-if="usersStore.user?.type == null || usersStore.user?.type == 'C'">
          <svg viewBox="0 0 1024 1024" style="width: 15px;height: 15px;fill: blue; margin: 0.25rem;">
          <path
            d="M306 630q0 10 10 10h494v86h-512q-34 0-59-26t-25-60q0-20 10-40l58-106-154-324h-86v-84h140q40 84 80 170 10 18 46 95t56 119h300q150-272 164-300l74 42-164 298q-24 44-74 44h-318l-38 70zM726 768q34 0 59 26t25 60-25 59-59 25-60-25-26-59 26-60 60-26zM298 768q34 0 60 26t26 60-26 59-60 25-59-25-25-59 25-60 59-26zM470 384v-128h-128v-86h128v-128h84v128h128v86h-128v128h-84z"
          ></path>
        </svg>
        <span style="color: blue;">Adicionar</span>
        </button>
      </div>

    </div>
    <product-detail :product="product" :showProduct="showProduct" @close="toogleProductDetail" operationType="Atualizar" />
  </div>
</template>

<script setup>
import { computed, inject, ref } from "vue";
import { useCartStore } from '@/stores/cart.js'

import ProductDetail from '@/components/modals/ProductDetail.vue';

import { useUsersStore } from '@/stores/users.js'

const serverBaseUrl = inject("serverBaseUrl");

const usersStore = useUsersStore()

const cartStore = useCartStore();

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

const isUserManager = computed(() => {
  return usersStore.user?.type == "EM" ? true : false
})

</script>
