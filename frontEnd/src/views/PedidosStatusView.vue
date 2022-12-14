<script setup>
import { onMounted, inject } from "vue";
import { useOrdersStore } from "@/stores/orders.js"

const ordersStore = useOrdersStore()
const serverBaseUrl = inject("serverBaseUrl");

onMounted(() => {
    if (ordersStore.orders.lenght == 0)
        ordersStore.getOrders()
})

</script>

<template>
    <div class="m-3">
        <div class="row">
            <div class="col-12 ">Total de lista de pedidos </div>
        </div>
        <div class="row">
            <div class="col-12 table-responsive ">
                <table class="table table-primary">
                    <tbody>
                        <tr v-for="order in ordersStore.orders">

                            <td>{{ order.ticket_number }}</td>
                            <td>
                                <ul>
                                    <li v-for="product in order.products">
                                        {{ product.name }} - status {{ product.pivot.status }}
                                    </li>
                                </ul>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>