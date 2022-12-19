import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import MenuPage from '../views/MenuPage.vue'
import Users from '../views/Users.vue'
import Orders from '../views/Orders.vue'
import CozinhaView from '../views/CozinhaView.vue'
import EmpregadoView from '../views/EmpregadoView.vue'
import PedidosStatusView from '../views/PedidosStatusView.vue'
import CustomerOrdersHistoty from '../views/CustomerOrdersHistoty.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/menu',
      name: 'menu',
      component: MenuPage
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders,
    },
    {
      path: '/cozinha',
      name: 'cozinha',
      component: CozinhaView,
    },
    {
      path: '/pronto-a-entregar',
      name: 'pronto-a-entregar',
      component: EmpregadoView,
    },
    {
      path: '/os-meus-pedidos',
      name: 'customer-orders-history',
      component: CustomerOrdersHistoty,
    },
    {
      path: '/pedidos-em-curso',
      name: 'pedidos-em-curso',
      component: PedidosStatusView,
      props: { orderTitle: 'Pedidos em Curso'}
    }
  ]
})

export default router
