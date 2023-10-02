<template>
  <div class="capa">
    <img :src="image" alt="" />
    <p>
      {{ producto }} <span class="sku">{{ sku }} {{ opciones }}</span>
    </p>
    <span class="precio">{{ $precioFormat(precio) }} x {{ cantidad }}</span>
  </div>
</template>

<script>
export default {
  name: "PedidoItem",
  props: {
    image: String,
    precio: [String, Number],
    cantidad: [String, Number],
    disponible: [String, Number],
    producto: String,
    sku: String,
    opcion: {
      default: "",
    },
  },
  computed: {
    opciones() {
      return this.opcion != "" ? ` - ${this.opcion}` : "";
    },
  },
};
</script>

<style scoped>
.capa {
  overflow: auto;
}
.capa p {
  margin: 0;
}
</style>