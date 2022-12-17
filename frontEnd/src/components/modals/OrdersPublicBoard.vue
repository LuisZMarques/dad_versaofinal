<script setup>
import { onMounted } from "vue";
import { useOrdersStore } from "@/stores/orders.js"

const ordersStore = useOrdersStore()

onMounted(() => {
    ordersStore.getOrders()
})

</script>
<template>
    <div class="row bg-primary rounded" >
        <div class="col-12 col-md-6" style="background-color:#e92b2bff">
            <table class="table text-center table-borderless">
                <thead>
                    <tr>
                        <th style="color:white">PREPARING</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="order in ordersStore.ordersPreparing" :key="order.id">
                        <td>{{ order.ticket_number }}</td>
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
                    <tr v-for="order in ordersStore.ordersReady" :key="order.id">
                        <td>{{ order.ticket_number }}</td>
                    </tr>
                </tbody>

            </table>
        </div>
    </div>
</template>