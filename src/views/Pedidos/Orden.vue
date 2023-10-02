<template>
  <section class="side-content">
    <div class="cols">
      <div class="col-7">
        <div class="side-top">
          <h1 class="printable">N° Pedido # {{ ordendata.npedido }}</h1>
          <div>
            <button @click="printable"><i class="icon-printer"></i> Imprimir</button>
          </div>
        </div>

        <div class="content-table h-no">
          <table class="table">
            <tbody v-for="(item, index) in orden" :key="index">
              <tr>
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
                  {{ item.opcion }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <input type="text" class="form" placeholder="Añade un mensaje" />
      </div>
      <div class="col-5">
        <div class="panel">
          <h3>Información del cliente</h3>
          <p><i class="icon-user"></i> Nombre: {{ ordendata["nombre"] }}</p>
          <p>
            <i class="icon-phone"></i> Teléfono: {{ ordendata["phone"] }}
            <a href="#">Contactar Whatsapp</a>
          </p>
          <p><i class="icon-email"></i> Correo: {{ ordendata["email"] }}</p>
          <p>
            <i class="icon-mapa"></i> Dirección: {{ ordendata["direccion"] }}
            <strong></strong>
          </p>
          <hr />
          <h3>Información de envío</h3>

          <div class="content-table h-no">
            <table class="table">
              <tbody>
                <tr>
                  <td>
                    {{ ordendata["empresa"] }}
                  </td>
                  <td>
                    <input
                      type="text"
                      class="form"
                      placeholder="ej: 1029870920"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import pedidos from "@/api/pedidos";
import PedidoItem from "@/components/Pedido.vue";
export default {
  name: "OrdenView",
  components: {
    PedidoItem,
  },
  data() {
    return {
      orden: [],
      id: null,
    };
  },
  methods: {
    async cargarOrden() {
      let { error, lista, orden } = await pedidos.getOrder(
        this.$route.params.orden
      );
      if (error) this.$toast.error(error);
      else {
        this.orden = lista;
        this.id = orden;
      }
    },
    printable() {
      window.print();
    }
  },
  created() {
    this.cargarOrden();
  },
  computed: {
    ordendata() {
      return this.orden[0];
    },
  },
};
</script>
