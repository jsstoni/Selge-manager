<template>
  <modal-item ref="popup" size="col-7">
    <div class="cols">
      <div class="col-6">
        <img :src="info.image" style="width: 100%; height: 450px" alt="" />
      </div>
      <div class="col-6">
        <h1>{{ info.producto }}</h1>
        <strong>{{ $precioFormat(info.precio) }}</strong> <br>
        <a href="#">{{ info.proveedor }}</a>
        <table class="table">
          <thead>
            <tr>
              <th colspan="3">Variantes</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(opcion, index) in info.opciones" :key="index">
              <td>{{ opcion.name }}</td>
              <td>{{ $precioFormat(opcion.precio == 0 ? info.precio : opcion.precio) }}</td>
              <td>{{ opcion.stock }} unds</td>
            </tr>
          </tbody>
        </table>
        <p>¿Deseas importar este producto a tu tienda?</p>
        <div class="modal-foot">
          <button @click="this.hide()">No gracias</button>
          <button class="btn-2" @click="$emit('import', info.ID)">
            Importar
          </button>
        </div>
      </div>
    </div>
  </modal-item>
</template>

<script>
import ModalItem from "@/components/Modal.vue";
import mixin from "@/mixins/modal";
export default {
  name: "ModalProducts",
  components: {
    ModalItem,
  },
  mixins: [mixin],
  computed: {
    info() {
      return this.form[0];
    },
  },
};
</script>

<style scoped></style>
