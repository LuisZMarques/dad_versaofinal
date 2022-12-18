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
.carrinho-card-container {
  flex: 0 0 auto;
  width: 100%;
  height: auto;
  display: flex;
  position: relative;
  align-items: flex-start;
  flex-direction: row;
}

.carrinho-card-item-carrinho {
  width: 100%;
  height: 50%;
  display: flex;
  padding: var(--dl-space-space-unit);
  box-shadow: 5px 5px 10px 0px rgba(18, 18, 18, 0.1);
  transition: 0.3s;
  align-items: center;
  border-radius: var(--dl-radius-radius-radius50);
  flex-direction: column;
  justify-content: center;
  background-color: var(--dl-color-pimary-laranjavivo);
}

.carrinho-card-item-carrinho:hover {
  transform: scale(1.02);
}

.carrinho-card-titulo-item-carrinho {
  height: 20%;
  align-self: center;
  justify-content: center;
}

.carrinho-card-imagem-item-carrinho {
  width: 5rem;
  height: 5rem;
  align-self: center;
  object-fit: cover;
  border-radius: 4px;
}

.carrinho-card-container-gerir-quantidade-item {
  flex: 0 0 auto;
  width: 50%;
  height: var(--dl-size-size-tripleunit);
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: space-between;
}

.carrinho-card-botao-menos-quantidade {
  display: flex;
  flex-direction: row;
}

.carrinho-card-icon {
  width: 24px;
  height: 24px;
}

.carrinho-card-botao-mais-quantidadee {
  display: flex;
  flex-direction: row;
}

.carrinho-card-icon2 {
  width: 24px;
  height: 24px;
}

@media (max-width: 991px) {
  .carrinho-card-titulo-item-carrinho {
    align-self: center;
  }

  .carrinho-card-container-gerir-quantidade-item {
    width: auto;
    height: auto;
  }
}

@media (max-width: 767px) {
  .carrinho-card-titulo-item-carrinho {
    align-self: center;
  }
}
</style>
