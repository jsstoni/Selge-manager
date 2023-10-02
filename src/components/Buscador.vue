<template>
  <div class="buscador">
    <form @submit.prevent="hacerBusqueda" class="search">
      <input type="text" v-model="busqueda" class="form" placeholder="Buscar..." />
    </form>
  </div>
</template>

<script>
export default {
  name: "BuscadorItem",
  data() {
    return {
      busqueda: "",
    };
  },
  methods: {
    hacerBusqueda() {
      this.$emit("search", this.busqueda);
      this.busqueda = "";
    },
  },
};
</script>

<style scoped>
.search {
  position: relative;
}
.search input {
  padding-left: 30px;
}
.search:after {
  font-family: "icomoon";
  content: "\e913";
  display: block;
  left: 8px;
  position: absolute;
  top: 16px;
  color: #999;
}
</style>