<template>
  <div>
    <span @click="bajar">-</span>
    <small>{{ num }}</small>
    <span @click="subir">+</span>
  </div>
</template>

<script>
export default {
  name: "CantidadItem",
  props: {
    num: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    numero: {
      get() {
        return this.num;
      },
      set(v) {
        this.$emit("update", v);
      },
    },
  },
  methods: {
    bajar: function () {
      if (this.numero > 1) {
        this.numero--;
      }
    },
    subir: function () {
      if (this.max > this.numero) {
        this.numero++;
      }
    },
  },
};
</script>

<style scoped>
span {
  background: #f1f2f9;
  user-select: none;
  display: inline-block;
  border: #e1e2e3 solid 1px;
  border-radius: 50%;
  text-align: center;
  padding: 4px;
  font-weight: bold;
  cursor: pointer;
  width: 20px;
  height: 20px;
}

small {
  margin: 0 6px;
  display: inline-block;
  text-align: center;
  font-size: 1em;
}
</style>