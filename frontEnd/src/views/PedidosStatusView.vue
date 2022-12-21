<script setup>
import { onMounted, inject } from "vue";
import { useOrdersStore } from "@/stores/orders.js"
import OrdersPublicBoardVue from '../components/modals/OrdersPublicBoard.vue';

const ordersStore = useOrdersStore()
const serverBaseUrl = inject("serverBaseUrl");

onMounted(() => {
    ordersStore.getOrderPreparingOrReady()
})

</script>

<template>
    <div style="width: 100%; height: 100vw; display: flex;background-color:#e92b2bff;">
        <div class="col text-center">
            <p style="color:white; font-size:xx-large"> Preparing </p>
            <div class="col" v-for="orderPreparing in ordersStore.ordersPreparing" :key="orderPreparing.id">
                <div style="color:white; font-size:x-large">{{ orderPreparing.ticket_number }}</div>
            </div>
        </div>
        <div class="col text-center">
            <p style="color:white; font-size:xx-large"> Ready </p>
            <div class="col" v-for="orderReady in ordersStore.ordersReady" :key="orderReady.id">
                <div style="color:white; font-size:x-large">{{ orderReady.ticket_number }}</div>
            </div>
        </div>
    </div>
</template>