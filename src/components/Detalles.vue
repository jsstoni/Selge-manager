<template>
  <div>
    <h3>N° Pedido: #{{ numberOrder }}</h3>
    <div v-for="(item, i) in data" :key="i" class="producto lista">
      <pedido-item
        :image="item.image"
        :precio="item.precio"
        :cantidad="item.cantidad"
        :producto="item.producto"
        :sku="item.sku"
        :opcion="item.opcion"
      />
      <p>
        {{ item.nota }}
      </p>

      <div class="opcion">
        ({{ item.cantidad }} / {{ item.disponible }})
        <div
          style="display: inline-block"
          v-if="item.editar == 'true' && item.cantidad > item.disponible"
        >
          <button class="btn-3 btn-xs" @click="$emit('available', item)">
            Disponible
          </button>
        </div>
        <small
          class="estado"
          :style="'background:' + $idEstado(item.estado).color"
        >
          {{ $idEstado(item.estado).title }}
        </small>
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; position: sticky; bottom: 0">
      <button
        class="btn"
        style="flex: 1; margin: 10px"
        @click.prevent="$emit('cerrar')"
      >
        Cerrar
      </button>
      <button
        class="btn-2"
        style="flex: 1; margin: 10px"
        @click="$router.push({ name: 'orden', params: { orden: orderID } })"
      >
        <i class="icon-ver"></i> Ver detalles
      </button>
    </div>
  </div>
</template>

<script>
import PedidoItem from "../components/Pedido.vue";
export default {
  name: "DetallesItem",
  components: {
    PedidoItem,
  },
  props: {
    data: {
      default: {},
    },
  },
  computed: {
    numberOrder: function () {
      return this.data[0]["npedido"];
    },
    orderID: function () {
      return this.data[0]["order_id"];
    },
  },
};
</script>

<style scoped>
.lista {
  overflow: auto;
  padding: 10px;
  border-bottom: #e0e6ed solid 1px;
  margin: 8px 0;
}

.lista:nth-child(2n + 1) {
  background: #f7f7f7;
}

.opcion {
  margin: 10px 0 0 0;
  text-align: right;
}

.opcion button {
  margin: 0 3px;
}
</style>