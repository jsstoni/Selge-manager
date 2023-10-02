<template>
  <modal-item ref="popup" size="col-5">
    <div style="position: relative">
      <div v-if="form.length < 1">No hay productos en la lista</div>
      <div v-else>
        ¿Confirmas tener los productos que se encuentra en esta lista?
        <table class="table">
          <tbody v-for="(info, index) in form" :key="index">
            <tr>
              <td class="producto">
                <producto-item
                  :image="info.image"
                  :producto="info.producto"
                  :sku="info.sku"
                />
                {{ info.nota }}
              </td>
              <td>
                {{ info.opcion }} x {{ info.pedido }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-foot">
        <button @click="$refs.popup.close()">Seguir</button>
        <button class="btn-2" @click.stop.prevent="$emit('save', form)">
          Confirmar
        </button>
      </div>
    </div>
  </modal-item>
</template>
<script>
import ProductoItem from "../Producto.vue";
import ModalItem from "../Modal.vue";
import mixin from "./../../mixins/modal";
export default {
  name: "ModalCompletarOrden",
  components: {
    ProductoItem,
    ModalItem,
  },
  mixins: [mixin],
};
</script>