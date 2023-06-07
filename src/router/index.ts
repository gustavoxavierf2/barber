import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Cliente from "../components/Cliente.vue";
import Funcionario from "../components/Funcionario.vue";
import Servico from "../components/Servico.vue";
import Fornecedor from "../components/Fornecedor.vue";
import Produto from "../components/Produto.vue";
import Agendamento from "../components/Agendamento.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/Cliente",
    name: "Cliente",
    component: Cliente,
  },
  {
    path: "/Funcionario",
    name: "Funcionario",
    component: Funcionario,
  },
  {
    path: "/Servico",
    name: "Servico",
    component: Servico,
  },
  {
    path: "/Fornecedor",
    name: "Fornecedor",
    component: Fornecedor,
  },
  {
    path: "/Produto",
    name: "Produto",
    component: Produto,
  },
  {
    path: "/Agendamento",
    name: "Agendamento",
    component: Agendamento,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
