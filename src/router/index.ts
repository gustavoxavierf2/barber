import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Cadastrar_Cliente from "../components/Cadastrar_Cliente.vue";
import Pesquisar_Cliente from "../components/Pesquisar_Cliente.vue";
import Editar_Cliente from "../components/Editar_Cliente.vue";
import Excluir_Cliente from "../components/Excluir_Cliente.vue";
import Cliente from "../components/Cliente.vue";

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
    path: "/Cadastrar_Cliente",
    name: "CadastrarCliente",
    component: Cadastrar_Cliente,
  },
  {
    path: "/Cliente",
    name: "Cliente",
    component: Cliente,
  },
  {
    path: "/Pesquisar_Cliente",
    name: "PesquisarCliente",
    component: Pesquisar_Cliente,
  },
  {
    path: "/Editar_Cliente",
    name: "EditarCliente",
    component: Editar_Cliente,
  },
  {
    path: "/Excluir_Cliente",
    name: "ExcluirCliente",
    component: Excluir_Cliente,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
