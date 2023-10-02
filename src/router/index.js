import { createRouter, createWebHistory, RouterView } from "vue-router";
import store from "../store";
import HomeView from "@/views/Home.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/contacts",
    component: RouterView,
    children: [
      {
        path: "customers",
        name: "clientes",
        component: () =>
          import(
            /* webpackChunkName: "Clientes" */ "@/views/Contactos/Clientes.vue"
          ),
        children: [
          {
            path: "page/:page",
            name: "clipage",
            component: () =>
              import(
                /* webpackChunkName: "pageClientes" */ "@/views/Contactos/Clientes.vue"
              ),
          },
        ],
      },
      {
        path: "providers",
        name: "proveedores",
        component: () =>
          import(
            /* webpackChunkName: "Proveedores" */ "@/views/Contactos/Proveedores.vue"
          ),
        children: [
          {
            path: "page/:page",
            name: "proveedorpage",
            component: () =>
              import(
                /* webpackChunkName: "pageProveedores" */ "@/views/Contactos/Proveedores.vue"
              ),
          },
        ],
      },
    ],
  },
  {
    path: "/products",
    component: RouterView,
    children: [
      {
        path: "all",
        name: "allproducts",
        component: () =>
          import(
            /* webpackChunkName: "Inventario" */ "@/views/Inventario/Inventario.vue"
          ),
        children: [
          {
            path: "page/:page",
            name: "invpage",
            component: () =>
              import(
                /* webpackChunkName: "pageInventario" */ "@/views/Inventario/Inventario.vue"
              ),
          },
        ],
      },
      {
        path: "tags",
        name: "tags",
        component: () =>
          import(/* webpackChunkName: "tags" */ "@/views/Inventario/Tags.vue"),
      },
    ],
  },
  {
    path: "/marketplace",
    name: "marketplace",
    component: () =>
      import(/* webpackChunkName: "Marketplace" */ "@/views/Marketplace.vue"),
  },
  {
    path: "/orders",
    component: RouterView,
    children: [
      {
        path: "list",
        name: "pedidos",
        component: () =>
          import(
            /* webpackChunkName: "Historial" */ "@/views/Pedidos/Historial.vue"
          ),
        children: [
          {
            path: "page/:page",
            name: "hispage",
            component: () =>
              import(
                /* webpackChunkName: "pageHistorial" */ "@/views/Pedidos/Historial.vue"
              ),
          },
        ],
      },
      {
        path: "new",
        name: "neworder",
        component: () =>
          import(
            /* webpackChunkName: "Pedidos" */ "@/views/Pedidos/Pedidos.vue"
          ),
      },
    ],
  },
  {
    path: "/order/:orden",
    name: "orden",
    component: () =>
      import(/* webpackChunkName: "Orden" */ "@/views/Pedidos/Orden.vue"),
  },
  {
    path: "/reports",
    name: "reportes",
    component: () =>
      import(/* webpackChunkName: "Reportes" */ "@/views/Reportes.vue"),
  },
  {
    path: "/settings",
    name: "ajustes",
    component: () =>
      import(/* webpackChunkName: "Ajustes" */ "@/views/Ajustes.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name != "home" && !store.getters.isAuthenticated)
    next({ name: "home" });
  else next();
});

export default router;
