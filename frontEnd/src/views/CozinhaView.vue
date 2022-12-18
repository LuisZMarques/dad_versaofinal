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
<!--         <div class="row">
            <div class="col-12 ">Cozinha - {{ ordersStore.getHotDishs.length }} pratos para cozinhar </div>
            <div class="col-12 ">Cozinha - {{ ordersStore.orders }} pratos para cozinhar </div>
            <div class="col-12 ">Cozinha - {{ ordersStore }} pratos para cozinhar </div>
        </div> -->
        <section class="intro">
            <div class="gradient-custom-2 h-100">
                <div class="mask d-flex align-items-center h-100">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-12">
                                <div class="table-responsive">
                                    <table class="table table-bordered text-center align-middle"
                                        style=" border-color: rebeccapurple">
                                        <thead style="background-color: transparent; color: white">
                                            <tr>
                                                <th scope="row">#</th>
                                                <th scope="row">Nome</th>
                                                <th scope="row">Produto</th>
                                                <th scope="row">Tipo:</th>
                                                <th scope="row">Id do Pedido</th>
                                            </tr>
                                        </thead>
                                        <tbody style="background-color: #C9A2FF;">
                                            <tr v-for="product, index in ordersStore.getHotDishs">
                                                <td>{{ index }}</td>
                                                <td>{{ product.name }}</td>
                                                <td>{{ product }}</td>
                                                <td>{{ product.type }}</td>
                                                <td>{{ product.pivot.order_id }}</td>
                                                <td>
                                                    <div
                                                        style="display:flex;flex-direction: row;align-items: center;justify-content: center;">
                                                        <button class="btn btn-sm btn-outline-secondary"
                                                            data-toggle="tooltip" title="Preparar"
                                                            v-if="product.pivot.status == 'W'"
                                                            @click="ordersStore.productPreparing(product.pivot.order_id, product.id)">
                                                            <svg viewBox="0 0 1024 1024" class="icons-listas">
                                                                <path
                                                                    d="M634 492l-62 62 294 294-60 60-294-294-294 294-60-60 416-416q-24-48-7-112t67-114q62-62 138-71t122 37 37 123-71 139q-50 50-114 66t-112-8zM346 570l-180-180q-50-50-50-120t50-120l300 298z">
                                                                </path>
                                                            </svg>
                                                        </button>
                                                        <button class="btn btn-sm btn-outline-secondary"
                                                            data-toggle="tooltip" title="Pronto"
                                                            v-if="product.pivot.status == 'P'"
                                                            @click="ordersStore.productReady(product.pivot.order_id, product.id)">
                                                            <svg viewBox="0 0 1024 1024" class="icons-listas">
                                                                <path d="M384 692l452-454 60 60-512 512-238-238 58-60z">
                                                                </path>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>