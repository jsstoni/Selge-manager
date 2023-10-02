<template>
  <article class="side-content">
    <section>
      <div class="cols">
        <div class="col-6 col-sm-6">
          <h1 class="title-main">Ordenes</h1>
        </div>
        <div class="col-6 col-sm-6 search">
          <buscador-item
            @search="formularioBuscar"
            style="display: inline-block; margin: 0 10px 0 0"
          ></buscador-item>
          <button @click.stop.prevent="confirmarPedidos()" class="btn-3">
            <i class="icon-plus"></i> Confirmar ordenes
          </button>
        </div>
      </div>

      <div class="content-table">
        <table class="table">
          <thead>
            <tr>
              <th>N° Pedido</th>
              <th width="45%">Producto</th>
              <th>Cantidad</th>
              <th>Opción</th>
              <th colspan="2">Fecha</th>
            </tr>
          </thead>
          <tbody v-if="!ordenes.length > 0">
            <td colspan="8" style="text-align: center">
              <div class="lds-dual-ring" v-if="loading"></div>
              <h3 v-else><i class="icon-alert"></i> {{ error }}</h3>
            </td>
          </tbody>
          <tbody v-for="(item, index) in ordenes" :key="index">
            <tr>
              <td class="vt">
                <input
                  type="checkbox"
                  :value="item.ID"
                  v-model="aprobados"
                  v-if="item.estado == 0"
                />
                #{{ item.npedido }}
              </td>
              <td class="producto">
                <pedido-item
                  :image="item.image"
                  :precio="item.precio"
                  :cantidad="item.cantidad"
                  :producto="item.producto"
                  :sku="item.sku"
                  :opcion="item.opcion"
                />
                {{ item.nota }}
              </td>
              <td>
                {{ item.pedido }}
              </td>
              <td>
                {{ item.opcion }}
              </td>
              <td>{{ item.fecha }}</td>
              <td style="text-align: right">
                <a
                  href="#"
                  class="btn-3"
                  @click="modalAnular(item.id_pedido)"
                  v-if="item.estado == 2"
                  ><i class="icon-ignorar"></i
                ></a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <paginacion-item :paginas="paginas" :actual="page" name="ordenpage" />

      <modal-completar-orden
        ref="aprobar"
        :data="form"
        @save="productosComprobado"
      />

      <modal-dialogo ref="borrar" :data="form" @delete="anularProducto" />
    </section>
  </article>
</template>
<script>
import pedidos from "@/api/pedidos";
import PaginacionItem from "@/components/Paginacion.vue";
import BuscadorItem from "@/components/Buscador.vue";
import ModalCompletarOrden from "@/components/Modal/ModalCompletarOrden.vue";
import PedidoItem from "@/components/Pedido.vue";
import ModalDialogo from "@/components/Modal/ModalDialogo.vue";
export default {
  name: "OrdenesView",
  components: {
    PaginacionItem,
    BuscadorItem,
    ModalCompletarOrden,
    PedidoItem,
    ModalDialogo,
  },
  data() {
    return {
      ordenes: [],
      aprobados: [],
      form: [],
      aprobar: false,
      paginas: null,
      loading: true,
      error: "",
    };
  },
  methods: {
    async listarOrdenes(id) {
      let { error, lista, numeroDePaginas } = await pedidos.listOrder(id);
      this.loading = false;
      if (error) {
        this.error = error;
      } else {
        this.ordenes = lista;
        this.paginas = numeroDePaginas;
      }
    },
    confirmarPedidos() {
      this.form = this.aprobados.reduce(
        (a, b) => [...a, ...this.ordenes.filter((x) => x.ID == b)],
        []
      );
      this.$refs.aprobar.show();
    },
    async productosComprobado(form) {
      let data = Object.assign({}, { id: form.map((x) => x.ID) });
      let { error, mensaje } = await pedidos.confirmOrden(data);
      if (error) this.$toast.error(error);
      else {
        this.$refs.aprobar.hide();
        this.aprobados = [];
        this.$toast.success(mensaje);
        this.$router.go(this.$router.currentRoute);
      }
    },
    modalAnular(id) {
      this.$refs.borrar.show();
      let producto = this.ordenes.filter((x) => x.id_pedido == id);
      this.form = {
        id,
        mensaje: `¿Confirmas anular el producto: ${producto[0].producto} del pedido: # ${producto[0].npedido} ?`,
      };
    },
    async anularProducto({ id }) {
      let { error, mensaje } = await pedidos.cancelProduct(id);
      if (error) this.$toast.error(error);
      else {
        this.$toast.success(mensaje);
        this.$router.go(this.$router.currentRoute);
      }
    },
    async formularioBuscar(info) {
      this.$loader(document.querySelector("#loader"));
      let { error, lista } = await pedidos.searchOrder(info);
      if (error) this.$toast.error(error);
      else this.ordenes = this.$analizarSKU(lista);
    },
  },
  created() {
    this.listarOrdenes(this.page);
  },
  computed: {
    page() {
      return this.$route.params.page ? this.$route.params.page : 1;
    },
  },
  watch: {
    page(val) {
      this.ordenes = [];
      this.listarOrdenes(val);
    },
  },
};
</script>