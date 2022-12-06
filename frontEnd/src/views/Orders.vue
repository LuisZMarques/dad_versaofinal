<template>
    <div class="componentes-litas" >
      <h1 class="lista-pedidos-titulo-estatico">Lista Pedidos:</h1>
      <div class="lista-pedidos-container1 container-listas-info">
        <div class="container-listas-info">
          <span class="texto">Nº Pedido:</span>
        </div>
        <div class="container-listas-info">
          <span class="texto">Estado Pedido:</span>
        </div>
        <div class="lista-pedidos-container-acoes container-listas-info">
          <span class="texto">Acções:</span>
        </div>
      </div>
      <ul class="lista-pedidos-ul list">
        <li class="list-item" v-for="order in ordersStore.orders">
            <order-detail :order="order"></order-detail>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
import OrderDetail from "@/components/orders/OrderDetail.vue";
import { useOrdersStore } from "../stores/orders";
import { onMounted } from "vue";

const ordersStore = useOrdersStore();

onMounted(() => {
    ordersStore.loadOrders()
})
  </script>
  
  <style scoped>
  .lista-pedidos-titulo-estatico {
    color: var(--dl-color-gray-white);
    text-align: center;
  }
  .lista-pedidos-container1 {
    flex: 0 0 auto;
    width: 100%;
    height: 4rem;
    display: flex;
    align-items: flex-start;
  }
  .lista-pedidos-container-acoes {
    width: 50%;
  }
  .lista-pedidos-ul {
    padding-left: 0px;
  }
  .lista-pedidos-root-class-name1 {
    top: 0px;
    right: 0px;
    width: 100%;
    height: auto;
    position: static;
    align-self: flex-start;
    background-color: var(--dl-color-pimary-900);
  }
  .lista-pedidos-root-class-name2 {
    top: 0px;
    right: 0px;
    width: 100%;
    height: auto;
    position: static;
    align-self: flex-start;
    background-color: var(--dl-color-pimary-900);
  }
  </style>
  