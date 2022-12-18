import { ref, inject, computed } from "vue";
import { defineStore } from "pinia";

import {useUsersStore} from "@/stores/users.js"
import {useCartStore} from "@/stores/cart.js"
import { useCustomerStore } from "./customer";

export const useOrdersStore = defineStore("orders", () => {
  const axios = inject("axios");
  const paymentGateway = inject("paymentGateway");
  const toast = inject("toast");

  const customerStore = useCustomerStore();
  const usersStore = useUsersStore();
  const cartStore = useCartStore();
  const allOrders = ref([]);
  const orders = ref([]);
  const hotDishs = ref([]);
  let isLoading = ref(false);

  function clearOrders() {
    orders.value = [];
  }

  async function loadOrders() {
    try {
      const response = await axios.get("orders");
      allOrders.value = response.data.data;
    } catch (error) {
      clearOrders();
      throw error;
    }
  }

  async function getOrders() {
    try {
      isLoading.value = true;
      const response = await axios.get("orders/preparingOrReady");
      orders.value = response.data.data;
      isLoading.value = false;
    } catch (error) {
      clearOrders();
      throw error;
    }
  }
  let ordersReady = computed(() => {
    return orders.value.filter((order) => order.status == "R");
  });
  let ordersPreparing = computed(() => {
    return orders.value.filter((order) => order.status == "P");
  });

  let getHotDishs = computed(() => {
    hotDishs.value = [];
    orders.value.forEach((order) => {
      if (order.status == "P") {
        order.products.forEach((product) => {
          if (product.type == "hot dish" && product.pivot.status != "R")
            hotDishs.value.push(product);
        });
      }
    });
    return hotDishs.value;
  });

  let productPreparing = (orderId, id) => {
    let orderIdx = orders.value.findIndex((t) => t.id == orderId);
    let productIdx = orders.value[orderIdx].products.findIndex(
      (p) => p.id == id
    );
    orders.value[orderIdx].products[productIdx].pivot.status = "P";
  };

  let productReady = (orderId, id) => {
    let orderIdx = orders.value.findIndex((t) => t.id == orderId);
    let productIdx = orders.value[orderIdx].products.findIndex(
      (p) => p.id == id
    );
    orders.value[orderIdx].products[productIdx].pivot.status = "R";
  };

  let orderReadyToDelivery = async (orderId) => {
    let orderIdx = orders.value.findIndex((t) => t.id == orderId);
    let updatedOrder = orders.value[orderIdx];
    updatedOrder.status = "D";
    updatedOrder.delivered_by = useUsersStore.user.id;
    try {
      const response = await axios.patch(
        "orders/" + orderId + "/updateEstadoDaOrder/",
        updatedOrder
      );
      console.log(response.data);
      return response.data.data;
    } catch (error) {}
  };

  let orderPreparedToReady = async (orderId) => {
    let orderIdx = orders.value.findIndex((t) => t.id == orderId);
    let updatedOrder = orders.value[orderIdx];
    updatedOrder.status = "R";
    try {
      const response = await axios.patch(
        "orders/" + orderId + "/updateEstadoDaOrder/",
        updatedOrder
      );
      console.log(response.data);
      return response.data.data;
    } catch (error) {}
  };


  const selectedDiscount = ref(0);
  const paymentMethod = ref('');
  const paymentInput = ref('');
  
//sera preciso ir buscar o proximo id disponivel ,
// o customer id e ver como fazer o ticket number, points_gained e total_paid esta a associar ao null aos campos
  const newOrder = () => {                             
    return {
      type: cartStore.cart.payment_type,
      reference: cartStore.cart.payment_reference,
      value: cartStore.cart.total_price,
    };
  };
  async function createPayment() {
    try {
      let order = newOrder();
      // Busca valores de ultimo pedido registado
      const response = await axios.get("orderinfo");
      console.log(response.data);
      
      // Verifica e Define id de order
      order.id = response.data.id+1;

      // Verifica o counter de ticker number
      if(response.data.ticket_number==99){     
        order.ticket_number = 1;
      }else(order.ticket_number= (response.data.ticket_number)+1)
      
      // Verifica se é customer ou guest
      await customerStore.loadCustomer();
      //console.log(customerStore.customer);
      if(customerStore.customer.id!=null){

        order.customer_id = customerStore.customer.id;
      }
      console.log(order);
      //const response2 = await axios.post("addorder", dataToSend); // To be DONE
      //updateProductOnArray(response.data.data);
      //socket.emit("updateProduct", response.data.data);
      //console.log(response2.data);
      //cartStore.cartModalShow = false;
    } catch (error) {
      console.log(error);
      toast.success(`Pagamento falhado. Verifique os dados inseridos!`);
    }
  }
  // fazer a compra

  async function createOrder() {
    try {
      const response = await axios.post("orders", cartStore.cart);
      //updateProductOnArray(response.data.data);
      //socket.emit("updateProduct", response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }
 

  return {
    isLoading,
    orders,
    getOrders,
    ordersPreparing,
    ordersReady,
    productReady,
    productPreparing,
    orderReadyToDelivery,
    orderPreparedToReady,
    hotDishs,
    getHotDishs,
    //newOrder,
    createOrder,
    //selectedDiscount,
    createPayment,
    //paymentInput,
    //paymentMethod,
    loadOrders,
  };
});
