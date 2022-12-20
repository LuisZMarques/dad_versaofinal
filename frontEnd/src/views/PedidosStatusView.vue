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
    <div style="width: 100%; height: 100vw; display: flex;background-color:#e92b2bff;justify-content: space-between;">
            <table class="table text-center table-borderless" style="width: 45%; height: 100%; display: flex;background-color:#e92b2bff; justify-content: center;">
                <thead>
                    <tr>
                        <th style="color:white">PREPARING</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="orderPreparing in ordersStore.ordersPreparing" :key="orderPreparing.id">
                        <td>{{ orderPreparing.ticket_number }}</td>
                    </tr>
                </tbody>
            </table>

            <table class="table text-center table-borderless" style="width: 45%; height: 100%; display: flex;background-color:#e92b2bff; justify-content: center;">
                <thead>
                    <tr>
                        <th style="color:white">Ready</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="orderReady in ordersStore.ordersReady" :key="orderReady.id">
                        <td style="color:white">{{ orderReady.ticket_number }}</td>
                    </tr>
                </tbody>
            </table>
    </div>
</template>