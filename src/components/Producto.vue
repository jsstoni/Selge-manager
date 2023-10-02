<template>
  <div class="capa">
    <img :src="image" alt="" />
    <p>{{ producto }} <span class="sku">{{ sku }}</span></p>
  </div>
</template>

<script>
export default {
  name: "ProductoItem",
  props: ["image", "producto", "sku"],
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