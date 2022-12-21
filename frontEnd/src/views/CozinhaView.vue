<script setup>
import { onMounted, inject, computed, ref } from "vue";
import { useOrdersStore } from "@/stores/orders.js"

const axios = inject("axios");
const toast = inject("toast");
const socket = inject("socket");

const ordersStore = useOrdersStore()
const grid = ref(false)

onMounted(() => {
    ordersStore.getOrderPreparingOrReady()
})


let productPreparing = (index) => {
    try {
        ordersStore.hotDishs[index].pivot.status =
            "P";
        const response = axios.patch(
            "orders/" + orderId + "/updateEstadoDosProdutos",
            ordersStore.hotDishs[index].pivot
        );
        toast.success("Mesagem: Producto a preparar");
        return response.data.data;
    } catch (error) { }
};

let productReady = (index) => {
    let orderId = ordersStore.hotDishs[index].pivot.order_id;
    try {
        ordersStore.hotDishs[index].pivot.status =
            "R";
        const response = axios.patch(
            "orders/" + orderId + "/updateEstadoDosProdutos",
            ordersStore.hotDishs[index].pivot
        );
        if (isAllReadyForDelivering(orderId)) {
            orderPreparedToReady(orderId);
        }
        computed(() => orderId, () => {
            grid.value = !grid.value
        })
        return response.data?.data;
    } catch (error) {
        console.log(error)
    }
};

let orderPreparedToReady = (orderId) => {
    let orderIdx = ordersStore.ordersPreparingOrReady.findIndex(
        (t) => t.id == orderId
    );
    let updatedOrder = ordersStore.ordersPreparingOrReady[orderIdx];
    updatedOrder.status = "R";
    try {
        const response = axios.patch(
            "orders/" + updatedOrder.id + "/updateEstadoDaOrder",
            updatedOrder
        );
        toast.success("Mesagem: Pedido pronto");
        return response.data?.data;
    } catch (error) {
        console.log(error)
    }
};

function isAllReadyForDelivering(orderId) {
    let orderIdx = ordersStore.ordersPreparingOrReady.findIndex(
        (t) => t.id == orderId
    );
    let boolean = true;
    ordersStore.ordersPreparingOrReady[orderIdx].products.forEach((el) => {
        if (el.pivot.status != "R") boolean = false;
    });

    return boolean;
}

</script>

<template>
    <div class="componentes-litas">
        <section class="intro">
            <div class="gradient-custom-2 h-100">
                <div class="mask d-flex align-items-center h-100">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-12">
                                <div class="table-responsive" ref="grid">
                                    <table class="table table-bordered text-center align-middle"
                                        style=" border-color: rebeccapurple">
                                        <thead style="background-color: transparent; color: white">
                                            <tr>
                                                <th scope="row">#</th>
                                                <th scope="row">Prato</th>
                                                <th scope="row">Status:</th>
                                                <th scope="row">Notas:</th>
                                                <th scope="row">Acções</th>
                                            </tr>
                                        </thead>
                                        <tbody style="background-color: #C9A2FF;">
                                            <tr v-for="product, index in ordersStore.hotDishs" :key="product">
                                                <td>{{ index + 1 }}</td>
                                                <td>{{ product.name }}</td>
                                                <td>{{ product.pivot.status }}</td>
                                                <td>{{ product.pivot.notes ?? "Sem notas" }}</td>
                                                <td>
                                                    <div
                                                        style="display:flex;flex-direction: row;align-items: center;justify-content: center;">
                                                        <button class="btn btn-sm btn-outline-secondary"
                                                            data-toggle="tooltip" title="Preparar"
                                                            v-if="product.pivot.status == 'W'"
                                                            @click="productPreparing(index)">
                                                            <svg viewBox="0 0 1024 1024" class="icons-listas">
                                                                <path
                                                                    d="M634 492l-62 62 294 294-60 60-294-294-294 294-60-60 416-416q-24-48-7-112t67-114q62-62 138-71t122 37 37 123-71 139q-50 50-114 66t-112-8zM346 570l-180-180q-50-50-50-120t50-120l300 298z">
                                                                </path>
                                                            </svg>
                                                        </button>
                                                        <button class="btn btn-sm btn-outline-secondary"
                                                            data-toggle="tooltip" title="Pronto"
                                                            v-if="product.pivot.status == 'P'"
                                                            @click="productReady(index)">
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