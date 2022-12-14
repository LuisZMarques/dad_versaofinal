<script setup>
import { onMounted, inject } from "vue";
import { useOrdersStore } from "@/stores/orders.js"

const ordersStore = useOrdersStore()
const serverBaseUrl = inject("serverBaseUrl");

onMounted(() => {
    ordersStore.getOrders()
})

</script>

<template>
    <div class="m-3">
        <div class="row">
            <div class="col-12 ">Cozinha - Lista de pedidos </div>
        </div>
        <div class="row">
            <div class="col-12 table-responsive ">
                <table class="table table-primary">
                    <tbody v-for="product, index in ordersStore.getHotDishs">
                        <tr>
                            <td>{{ index }}</td>
                            <td>{{ product.name }}</td>
                            <td>{{ product }}</td>
                            <td>{{ product.type }}</td>
                            <td>{{ product.pivot.order_id }}</td>
                            <td>
                                <button class="btn btn-sm btn-primary" v-if="product.pivot.status == 'W'"
                                    @click="ordersStore.productPreparing(product.pivot.order_id, product.id)">A
                                    prepara</button>

                                <button class="btn btn-sm btn-primary" v-if="product.pivot.status == 'P'"
                                    @click="ordersStore.productReady(product.pivot.order_id, product.id)">Pronto</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>