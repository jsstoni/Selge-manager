<template>
  <div>
    <side-component v-if="isLogged" />
    <head-component v-if="isLogged" />
    <router-view></router-view>
    <div id="loader"></div>
  </div>
</template>

<script>
import SideComponent from "@/components/SideComponent.vue";
import HeadComponent from "@/components/HeadComponent.vue";
export default {
  name: "App",
  components: {
    SideComponent,
    HeadComponent,
  },
  computed: {
    isLogged() {
      const session = this.$store.getters.isAuthenticated;
      return session && this.$route.name != "home";
    },
  },
};
</script>

<style>
@import "./assets/css/styles.css";
@import "./assets/css/font.css";
</style>