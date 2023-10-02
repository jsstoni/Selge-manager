<template>
  <li :class="{ active: subIsActive(submenu) }">
    <router-link :to="{ name: route }" active-class="active">
      <i :class="icon"></i>
      {{ title }}
      <i
        class="down"
        :class="{
          'icon-abajo': subIsActive(submenu),
          'icon-derecha': !subIsActive(submenu),
        }"
        v-if="submenu"
      ></i>
    </router-link>
    <slot></slot>
  </li>
</template>

<script>
export default {
  name: "NavList",
  props: {
    title: String,
    route: String,
    submenu: String,
    icon: String,
  },
  methods: {
    subIsActive(input) {
      const paths = Array.isArray(input) ? input : [input];
      const ruta = paths.some(
        (path) => this.$route.path.indexOf("/" + path) === 0
      );
      return ruta;
    },
  },
};
</script>