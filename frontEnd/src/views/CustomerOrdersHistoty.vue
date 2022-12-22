<script setup>
import { onMounted, inject } from "vue";
import { useOrdersStore } from "@/stores/orders.js"
import { useUsersStore } from "@/stores/users.js";

const ordersStore = useOrdersStore()

onMounted(() => {
    ordersStore.getOrdersCustomer()
})

</script>

<template>
    <div class="componentes-litas">
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
                                                <th scope="row">Nº Pedido:</th>
                                                <th scope="row" >Data do pedido</th>
                                                <th scope="row" colspan="4">Produtos</th>
                                            </tr>
                                        </thead>
                                        <tbody style="background-color: #C9A2FF;">
                                            <tr v-for="order in ordersStore.ordersCustomer" :key="order">
                                                <td>{{ order.ticket_number }}</td>
                                                <td>{{ order.date}}</td>
                                                <td>
                                                    <ul>
                                                        <li v-for="product in order.products" :key="product">
                                                            {{  product.name }} 
                                                        </li>
                                                    </ul>
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