<script setup>
import { onMounted, inject } from "vue";
import { useOrdersStore } from "@/stores/orders.js"

const ordersStore = useOrdersStore()
const serverBaseUrl = inject("serverBaseUrl");

onMounted(() => {
    if (ordersStore.orders.length == 0)
        ordersStore.getOrders()
})
</script>

<template>
    <div class="componentes-litas">
        <div class="row">
            <div class="col-12 ">Cozinha - {{ ordersStore.getHotDishs.length }} pratos para cozinhar </div>
        </div>
        <table class="table table-bordered" style="background-color: #e92b2bff; border-color: rebeccapurple">
            <thead>
                <tr>
                    <th scope="row">#</th>
                    <th scope="row">Nome</th>
                    <th scope="row">Produto</th>
                    <th scope="row" >Tipo:</th>
                    <th scope="row" >Id do Pedido</th>
                </tr>
            </thead>
            <tbody>
                    <tr v-for="product, index in ordersStore.getHotDishs">
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
</template>