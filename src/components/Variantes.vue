<template>
  <div>
    <div class="cols">
      <div class="col-6">
        <select class="form" v-model="variante">
          <option value="">Seleccionar variante</option>
          <option v-for="(item, i) in form" :key="i" :value="item">
            {{ item }}
          </option>
        </select>
      </div>
      <div class="col-6">
        <button @click.prevent="addVariant">Agregar</button>
      </div>
    </div>
    <hr />
    <p v-if="existeVariantes">Sin variaciones</p>
    <div class="cols capa-options" v-for="(item, i) in opciones" :key="i">
      <div class="col-4">
        <a
          href="#"
          style="display: block; margin: 0 0 10px 0"
          @click="quitarOpcion(i)"
          ><i class="icon-borrar"></i> Quitar</a
        >
        <strong>{{ item.name }}</strong>
      </div>
      <div class="col-3">
        <label>SKU</label>
        <input type="text" class="form" v-model="item.sku" />
      </div>
      <div class="col-3">
        <label>Precio</label>
        <input type="number" class="form" v-model="item.precio" />
      </div>
      <div class="col-2">
        <label>Stock</label>
        <input type="number" class="form" v-model="item.stock" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VariantesItem",
  props: {
    data: {
      default: [],
    },
    atributos: {
      default: [],
    },
    precio: {
      default: 0,
    },
    referencia: [String, Number],
  },
  data() {
    return {
      variante: "",
    };
  },
  methods: {
    variantes(options) {
      let sets = [[]];
      const id_obj = {};
      options.forEach((option) => {
        const new_sets = [];
        if (option.opciones.length > 0) {
          option.opciones.split(",").forEach((valor) => {
            new_sets.push(Array.from(sets, (set) => [...set, valor]));
            id_obj[valor] = { name: option.opcion, valor: valor };
          });
        }
        sets = new_sets.flatMap((set) => set);
      });
      return sets.map((set) => ({
        opciones: set.map((id) => ({
          valor: id_obj[id].valor,
          name: id_obj[id].name,
        })),
      }));
    },
    addVariant() {
      if (!this.opciones.some((e) => e.name == this.variante)) {
        this.opciones.push({
          name: this.variante,
          sku: this.referencia,
          precio: this.precio,
          stock: 0,
        });
      }
    },
    quitarOpcion(index) {
      this.opciones.splice(index, 1);
    },
  },
  computed: {
    opciones: {
      get() {
        return this.data;
      },
      set(v) {
        this.$emit("update:data", v);
      },
    },
    form() {
      const variantes = this.variantes(this.atributos);
      return variantes.map((option) =>
        option.opciones
          .reduce((acc, el) => [...acc, `${el.name}: ${el.valor}`], [])
          .join(" - ")
      );
    },
    existeVariantes() {
      return !this.opciones.length > 0;
    },
  },
};
</script>

<style scoped>
.capa-options {
  border-bottom: #e0e6ed solid 1px;
  padding: 10px;
  margin: 0;
}

.capa-top {
  background: #eee;
  border-radius: 8px;
  padding: 8px;
  display: inline-block;
  margin: 0 10px 10px 0;
}
</style>
