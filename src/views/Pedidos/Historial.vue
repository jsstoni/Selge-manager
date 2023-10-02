<template>
  <section class="side-content">
    <h1 class="title-main">Historial</h1>
    <div class="cols">
      <div v-if="loading">
        <div class="col-4 cols-sm-6" v-for="op in 3" :key="op">
          <div class="status">
            <div
              style="
                width: 20px;
                background: #ddd;
                padding: 5px;
                border-radius: 8px;
                margin: 0 0 10px 0;
              "
            ></div>
            <div
              :style="`width: ${
                Math.floor(Math.random() * 51) + 50
              }%; background: #ddd; padding: 5px; border-radius: 8px;`"
            ></div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="col-4 col-sm-6"
        v-for="(item, index) in reportes"
        :key="index"
      >
        <div class="status">
          {{ item.total }}<small>{{ item.estado }}</small>
        </div>
      </div>
    </div>

    <div class="content-table h-no">
      <table class="table">
        <thead>
          <th>N° Pedido</th>
          <th>Pago</th>
          <th>Fecha</th>
          <th>Cliente</th>
          <th>Vendedor</th>
          <th>Total</th>
          <th>Artículos</th>
          <th></th>
        </thead>
        <table-loader :rows="7" :columns="5" v-if="loading" />
        <tbody v-for="(item, index) in historial" :key="index" v-else>
          <tr :ref="`lista-${item.ID}`">
            <td data-label="N° Pedido">#{{ item.npedido }}</td>
            <td data-label="Pago">
              <p class="badge" style="background: #eaf2f8">Por pagar</p>
            </td>
            <td data-label="Fecha">{{ item.fecha }}</td>
            <td data-label="Cliente">{{ item.nombre }}</td>
            <td data-label="Vendedor">
              {{ item.vendedor }}
            </td>
            <td data-label="Total">
              <span class="precio">{{ $precioFormat(item.total) }}</span>
            </td>
            <td data-label="Artículos">{{ item.cantidad }}</td>
            <td style="text-align: right">
              <p
                v-if="item.cantidad == item.terminado"
                class="badge"
                style="background: #e9f7ef; color: #66c28e"
              >
                Terminado
              </p>
              <p
                v-else
                class="badge"
                style="background: #fff8dd; color: #d5ba59"
              >
                En espera
              </p>
              <button class="btn-3" @click="verDetalles(item.order_id)">
                <i class="icon-ver"></i>
              </button>
              <button class="btn-3" @click="$refs.shipping.open()">
                <i class="icon-despacho"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <paginacion-item :paginas="paginas" :actual="page" name="hispage" />
  </section>

  <modal-dialogo ref="hecho" :data="models" @delete="accionHecho">
    <cantidad-item
      :num="models.disponible"
      :max="models.max"
      @update="models.disponible = $event"
    />
  </modal-dialogo>
  <lateral-item ref="detalles">
    <detalles-item
      :data="detalles"
      @available="loTengo"
      @cerrar="$refs.detalles.close()"
    />
  </lateral-item>

  <modal-item ref="shipping" size="col-5">
    Enviar
    <button @click="$refs.shipping.close()">Cerrar</button>
  </modal-item>
</template>

<script>
import CantidadItem from "@/components/Cantidad.vue";
import pedidos from "@/api/pedidos";
import PaginacionItem from "@/components/Paginacion.vue";
import ModalDialogo from "@/components/Modal/ModalDialogo.vue";
import DetallesItem from "@/components/Detalles.vue";
import LateralItem from "@/components/Lateral.vue";
import TableLoader from "@/components/TableLoader.vue";
import ModalItem from "@/components/Modal.vue";
export default {
  name: "HistorialView",
  components: {
    PaginacionItem,
    ModalDialogo,
    DetallesItem,
    LateralItem,
    CantidadItem,
    TableLoader,
    ModalItem,
  },
  data() {
    return {
      reportes: [],
      historial: [],
      paginas: null,
      detalles: [],
      pedidos: [],
      loading: true,
      error: "",
      models: {},
    };
  },
  methods: {
    async listarHistorial(id) {
      let { error, lista, numeroDePaginas, status } = await pedidos.history(id);
      this.loading = false;
      if (error) {
        this.error = error;
      } else {
        this.historial = lista;
        this.paginas = numeroDePaginas;
        this.reportes = status;
      }
    },
    async verDetalles(npedido) {
      this.$loader(document.querySelector("#loader"));
      let { error, lista } = await pedidos.orderDetails(npedido);
      if (error) this.$toast.error(error);
      else {
        this.$refs.detalles.open();
        this.detalles = lista;
      }
    },
    loTengo({ ID, producto, opcion, cantidad, disponible }) {
      const mensaje = `Tiene disponible el producto: ${producto}, Opción: ${opcion}`;
      this.models = {
        id: ID,
        mensaje: mensaje,
        cantidad,
        disponible: 1,
        max: cantidad - disponible,
      };
      this.$refs.hecho.show();
    },
    async accionHecho({ id, disponible: quantity }) {
      this.$loader(document.querySelector("#ldelete"));
      let { error, mensaje } = await pedidos.haveIt({
        id,
        disponible: quantity,
      });
      this.$refs.hecho.hide();
      if (error) this.$toast.error(error);
      else {
        const item = this.$encontrarIndice(this.detalles, id);
        const { cantidad, disponible } = this.detalles[item];
        const completado = disponible + quantity;
        if (completado == cantidad) {
          this.detalles[item].disponible = completado;
          this.detalles[item].estado = 2;
        }
        this.$toast.success(mensaje);
      }
    },
  },
  created() {
    this.listarHistorial(this.page);
  },
  computed: {
    page() {
      return this.$route.params.page ? this.$route.params.page : 1;
    },
    totalPedir() {
      return this.pedidos.length;
    },
  },
  watch: {
    page(val) {
      this.loading = true;
      this.historial = [];
      this.listarHistorial(val);
    },
  },
};
</script>

<style scoped>
.status {
  border-radius: 8px;
  display: block;
  padding: 15px;
  background: #fff;
  border: #e0e6ed solid 1px;
  margin: 10px 0;
}

.status small {
  display: block;
  margin: 0;
  font-size: 0.8em;
  text-transform: uppercase;
}
</style>
