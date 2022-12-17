<script setup>
    import { onMounted, inject } from "vue";
    import { useOrdersStore } from "@/stores/orders.js"
    import OrdersPublicBoardVue from '../components/modals/OrdersPublicBoard.vue';

    const ordersStore = useOrdersStore()
    const serverBaseUrl = inject("serverBaseUrl");

    onMounted(() => {
        if (ordersStore.orders.length == 0)
            ordersStore.getOrders()
    })

</script>

<template>
    <div style="width: 100%; height: auto;">
        <div class="row bg-primary rounded" >
        <div class="col-12 col-md-6" style="background-color:#e92b2bff">
            <table class="table text-center table-borderless">
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
        </div>

        <div class="col-12 col-md-6" style="background-color:#e92b2bff">
            <table class="table text-center table-borderless" >
                <thead>
                    <tr>
                        <th style="color:white">Ready</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="orderReady in ordersStore.ordersReady" :key="orderReady.id">
                        <td>{{ orderReady.ticket_number }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    </div>
</template>