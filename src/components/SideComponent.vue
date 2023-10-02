<template>
  <transition name="slide" mode="out-in">
    <nav class="side" v-if="sidebar">
      <ul class="menu top">
        <li class="logo">
          <div>S</div>
          Selge
        </li>
        <nav-list
          v-for="(item, i) in menu"
          :key="i"
          :title="item.title"
          :route="item.route"
          :icon="item.icon"
          :submenu="item.submenu"
        >
          <ul v-if="item.itemSubmenu.length > 0">
            <nav-list
              v-for="(sub, e) in item.itemSubmenu"
              :key="e"
              :title="sub.title"
              :route="sub.route"
            />
          </ul>
        </nav-list>
        <hr />
        <nav-list title="Reportes" route="reportes" icon="icon-reportes" />
      </ul>

      <ul class="menu bot">
        <nav-list title="Marketplace" route="marketplace" icon="icon-store" />
        <nav-list title="Ajustes" route="ajustes" icon="icon-ajustes" />
      </ul>
    </nav>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import NavList from "@/components/NavList.vue";
export default {
  name: "SideComponent",
  components: {
    NavList,
  },
  data() {
    return {
      sidebar: true,
      menu: [
        {
          title: "Contactos",
          route: "clientes",
          icon: "icon-contactos",
          submenu: "contacts",
          itemSubmenu: [
            {
              title: "Clientes",
              route: "clientes",
            },
            {
              title: "Proveedores",
              route: "proveedores",
            },
          ],
        },
        {
          title: "Pedidos",
          route: "pedidos",
          icon: "icon-pedidos",
          submenu: "orders",
          itemSubmenu: [
            {
              title: "Nuevo pedido",
              route: "neworder",
            },
            {
              title: "Todos los pedidos",
              route: "pedidos",
            },
          ],
        },
        {
          title: "Productos",
          route: "allproducts",
          icon: "icon-productos",
          submenu: "products",
          itemSubmenu: [
            {
              title: "Mis productos",
              route: "allproducts",
            },
            {
              title: "Categorías",
              route: "tags",
            },
          ],
        },
      ],
    };
  },
  computed: {
    ...mapGetters({ userName: "nickName" }),
    firstLetter() {
      return this.userName.charAt(0).toUpperCase();
    },
  },
  methods: {
    onResize() {
      if (window.innerWidth < 992) this.sidebar = false;
      else this.sidebar = true;
    },
    async logout() {
      await this.$store.dispatch("logOut");
      this.$router.push("/");
    },
  },
  created() {
    window.addEventListener("resize", this.onResize);
  },
};
</script>
