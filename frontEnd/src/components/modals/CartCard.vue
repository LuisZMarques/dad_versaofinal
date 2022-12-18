<template>
  <tr>
    <td>
      <img
        alt="image"
        :src="photoFullUrl"
        class="img-fluid img-thumbnail"
        style="width: 30px; height: 30px"
      />
    </td>
    <td class="texto" >{{ item.name }}</td>
    <td class="texto">{{ item.price }}</td>
    <td >
      <input class="form-control form-control-sm" type="text" placeholder="input some notes" v-model="item.notes">
    </td>
    <td>
      <button  type="button" class="btn btn-light btn-sm" @click="cartStore.removeFromCart(index)">remover</button>
    </td>
  </tr>
</template>

<script setup>
import { useCartStore } from "@/stores/cart.js";
import { computed, inject } from "vue";

const serverBaseUrl = inject("serverBaseUrl");
const cartStore = useCartStore();

let props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  index:{
    type: Number
  }
});

const photoFullUrl = computed(() => {
  return props.item.photo_url
    ? serverBaseUrl + "/storage/products/" + props.item.photo_url
    : null;
});
</script>

<style scoped>
</style>
