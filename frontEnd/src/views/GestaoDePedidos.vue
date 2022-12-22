<template>
  <div class="componentes-litas">
    <section class="intro">
      <div class="gradient-custom-2 h-100">
        <div class="mask d-flex align-items-center h-100">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-12">
                <div class="table-responsive">
                  <table class="table table-bordered text-center align-middle" style=" border-color: rebeccapurple">
                    <thead style="background-color: transparent; color: white">
                      <tr>
                        <th scope="row">Nº Pedido:</th>
                        <th scope="row">Preço</th>
                        <th scope="row">Pontos Usados</th>
                        <th scope="row">Pontos Ganhos</th>
                        <th scope="row">Acções</th>
                      </tr>
                    </thead>
                    <tbody style="background-color: #C9A2FF;" >
                      <tr v-for="order in ordersStore.orderNotCanceled" :key="order" >
                        <td class="texto">{{ order.ticket_number }}</td>
                        <td class="texto">{{ order.total_paid}}</td>
                        <td class="texto">{{ order.points_used_to_pay ? order.points_used_to_pay : 0}}</td>
                        <td class="texto">{{ order.points_gained ? order.points_gained: 0 }}</td>
                        <td>
                          <div style="display:flex;flex-direction: row;align-items: center;justify-content: center;">
                            <button class="btn btn-sm btn-outline-secondary" data-toggle="tooltip" title="Refund" @click="ordersStore.cancelOrder(order.id)">
                              <svg viewBox="0 0 1024 1024" class="icons-listas">
                                <path
                                  d="M512 170.667c-188.544 0-341.333 152.832-341.333 341.333s152.789 341.333 341.333 341.333 341.333-152.832 341.333-341.333-152.789-341.333-341.333-341.333zM670.165 609.835c16.683 16.683 16.683 43.648 0 60.331-8.32 8.32-19.243 12.501-30.165 12.501s-21.845-4.181-30.165-12.501l-97.835-97.835-97.835 97.835c-8.32 8.32-19.243 12.501-30.165 12.501s-21.845-4.181-30.165-12.501c-16.683-16.683-16.683-43.648 0-60.331l97.835-97.835-97.835-97.835c-16.683-16.683-16.683-43.648 0-60.331s43.648-16.683 60.331 0l97.835 97.835 97.835-97.835c16.683-16.683 43.648-16.683 60.331 0s16.683 43.648 0 60.331l-97.835 97.835 97.835 97.835z">
                                </path>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr v-if="ordersStore.orderNotCanceled.length == 0" >
                        <td colspan="5">Sem pedidos para gerir</td>
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

<script setup>
import { useUsersStore } from "@/stores/users.js";
import { useOrdersStore } from "../stores/orders";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const ordersStore = useOrdersStore();
const userStore = useUsersStore();

let orderProducts = ""

let orderItems = (productsList) => {
  productsList.forEach((product,idx,array) => {
    orderProducts += idx==array.length-1 ? product['name'] + '.' : product['name'] + ', ';
  })
  return orderProducts;
}

onMounted(() => {
  userStore.loadUser();
})


onMounted(() => {
  if (ordersStore.ordersPreparingOrReady.length == 0)
    ordersStore.getOrderPreparingOrReady();
})

</script>

  
<style scoped>
.lista-pedidos-titulo-estatico {
  color: var(--dl-color-gray-white);
  text-align: center;
}

.lista-pedidos-container1 {
  flex: 0 0 auto;
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: flex-start;
}

.lista-pedidos-container-acoes {
  width: 50%;
}

.lista-pedidos-ul {
  padding-left: 0px;
}

.lista-pedidos-root-class-name1 {
  top: 0px;
  right: 0px;
  width: 100%;
  height: auto;
  position: static;
  align-self: flex-start;
  background-color: var(--dl-color-pimary-900);
}

.lista-pedidos-root-class-name2 {
  top: 0px;
  right: 0px;
  width: 100%;
  height: auto;
  position: static;
  align-self: flex-start;
  background-color: var(--dl-color-pimary-900);
}
</style>
  