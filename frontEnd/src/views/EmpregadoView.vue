<script setup>
import { onMounted, inject } from "vue";
import { useOrdersStore } from "@/stores/orders.js";
import { useUsersStore } from "@/stores/users.js";

const ordersStore = useOrdersStore();
const usersStore = useUsersStore();

onMounted(() => {
  usersStore.loadUser()
  ordersStore.getOrderPreparingOrReady();
});
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
                  <table
                    class="table table-bordered text-center align-middle"
                    style="border-color: rebeccapurple"
                  >
                    <thead style="background-color: transparent; color: white">
                      <tr>
                        <th scope="row">Nº Pedido:</th>
                        <th scope="row" colspan="4">Produtos</th>
                        <th scope="row" colspan="4">Acções</th>
                      </tr>
                    </thead>
                    <tbody style="background-color: #c9a2ff">
                      <tr v-for="order in ordersStore.ordersReady">
                        <td>{{ order.ticket_number }}</td>
                        <td>
                          <ul>
                            <li v-for="product in order.products">
                              {{ product.name }} - status
                              {{ product.pivot.status }}
                            </li>
                          </ul>
                        </td>
                        <td>
                          <button
                            class="btn btn-sm btn-outline-secondary"
                            data-toggle="tooltip"
                            title="Entregar"
                            @click="ordersStore.orderReadyToDelivery(order.id)"
                          >
                            <svg viewBox="0 0 1024 1024" class="icons-listas">
                              <path
                                d="M18 572l60-60 238 238-60 60zM948 238l62 60-512 512-240-238 62-60 178 178zM768 298l-270 272-60-60 270-272z"
                              ></path>
                            </svg>
                          </button>
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
