import { createRouter, createWebHistory } from "vue-router";
import { useUsersStore } from "../stores/users.js";

import HomePage from "../views/HomePage.vue";
import MenuPage from "../views/MenuPage.vue";
import Users from "../views/Users.vue";
import GestaoDePedidos from "../views/GestaoDePedidos.vue";
import CozinhaView from "../views/CozinhaView.vue";
import EmpregadoView from "../views/EmpregadoView.vue";
import PedidosStatusView from "../views/PedidosStatusView.vue";
import CustomerOrdersHistoty from "../views/CustomerOrdersHistoty.vue";
import StatisticsPage from "@/views/StatisticsPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/menu",
      name: "menu",
      component: MenuPage,
    },
    {
      path: "/users",
      name: "users",
      component: Users,
    },
    {
      path: "/gestao-de-pedidos",
      name: "gestao-de-pedidos",
      component: GestaoDePedidos,
    },
    {
      path: "/cozinha",
      name: "cozinha",
      component: CozinhaView,
    },
    {
      path: "/pronto-a-entregar",
      name: "pronto-a-entregar",
      component: EmpregadoView,
    },
    {
      path: "/os-meus-pedidos",
      name: "customer-orders-history",
      component: CustomerOrdersHistoty,
    },
    {
      path: "/pedidos-em-curso",
      name: "pedidos-em-curso",
      component: PedidosStatusView,
      props: { orderTitle: "Pedidos em Curso" },
    },
    {
      path: "/estatisticas",
      name: "statistics",
      component: StatisticsPage,
    }

  ],
});

let handlingFirstRoute = true;

router.beforeEach(async (to, from, next) => {
  const usersStore = useUsersStore();
  if (handlingFirstRoute) {
    handlingFirstRoute = false;
    await usersStore.restoreToken();
  }

  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/menu", "/", "/pedidos-em-curso"];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired && !usersStore.user) {
    next({ name: "home" });
    return;
  }

  if (to.name == "home") {
    next();
    return;
  }
  if (to.name == "customer-orders-history") {
    if (!usersStore.user) {
      next({ name: "home" });
      return;
    }
    next();
    return;
  }
  if (to.name == "users") {
    if (usersStore.user && usersStore.user.type != "EM") {
      next({ name: "home" });
      return;
    }
    next();
    return;
  }
  if (to.name == "cozinha") {
    if (usersStore.user && usersStore.user.type != "EC") {
      next({ name: "home" });
      return;
    }
    next();
    return;
  }
  if (to.name == "pronto-a-entregar") {
    if (usersStore.user && usersStore.user.type != "ED") {
      next({ name: "home" });
      return;
    }
    next();
    return;
  }

  if (to.name == "menu") {
    if (
      usersStore.user &&
      usersStore.user?.type != "C" &&
      usersStore.user?.type != "EM"
    ) {
      next({ name: "home" });
      return;
    }
    next();
    return;
  }

  next();
});

export default router;
