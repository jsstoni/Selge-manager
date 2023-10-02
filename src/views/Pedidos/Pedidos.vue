<template>
  <article class="side-content">
    <section>
      <h1 class="title-main">Nuevo pedido</h1>
      <div class="cols" id="pedir">
        <div class="col-8 col-sm-8" id="pedidos">
          <div v-if="!final">
            <div class="content-table h-no">
              <buscador-item style="display: inline-block; margin: 0 5px 0 0" />
              <table class="table">
                <thead>
                  <tr>
                    <th width="70%">Producto</th>
                    <th>Opción</th>
                  </tr>
                </thead>
                <table-loader :rows="2" :columns="5" v-if="loading" />
                <tbody v-for="(item, index) in productos" :key="index">
                  <tr>
                    <td class="producto">
                      <pedido-item
                        :image="item.image"
                        :precio="item.precio"
                        :cantidad="item.cantidad"
                        :producto="item.producto"
                        :sku="item.sku"
                      />
                    </td>
                    <td style="text-align: right">
                      <select
                        class="form"
                        v-if="item.opciones.length > 0"
                        @change="selectOrder($event, item.ID)"
                      >
                        <option value="" selected disabled>
                          Seleccionar opción
                        </option>
                        <option
                          v-for="(opcion, i) in item.opciones"
                          :key="i"
                          :value="opcion.name"
                        >
                          {{ opcion.name }}
                        </option>
                      </select>

                      <span v-else>Sin stock</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ul class="pagination">
              <li>
                <a href="#" @click.prevent="page--" v-if="atras">Atras</a>
              </li>
              <li>Página {{ page }}</li>
              <li>
                <a href="#" @click.prevent="page++" v-if="siguiente"
                  >Siguiente</a
                >
              </li>
            </ul>
          </div>

          <div v-else>
            <p>Información para el pedido</p>
            <div class="cols">
              <div class="col-4">
                <a href="#" @click.prevent="$refs.cliente.show()" class="btn-1"
                  >Seleccionar cliente</a
                >
              </div>
              <div class="col-8">
                <h1>Cliente: {{ usuario.nombre }}</h1>
                <strong>Dirección: </strong>{{ usuario.direccion }}
              </div>
            </div>
            <hr />

            <div class="cols">
              <div class="col-4">
                <h3>Empresa de envío</h3>
                <select class="form" v-model="empresa">
                  <option value="" disabled selected>Medio de envío</option>
                  <option value="Starken">Starken</option>
                  <option value="Correos De Chile">Correos De Chile</option>
                  <option value="Chilexpress">Chilexpress</option>
                  <option value="Blue Express">Blue Express</option>
                  <option value="Personalizado">Personalizado</option>
                </select>
              </div>
              <div class="col-8 shipping">
                <h3>Método de pago</h3>
                <input type="radio" id="pago" value="1" v-model="pago" />
                <label for="pago">Pagar envío</label>

                <input type="radio" id="free" value="2" v-model="pago" />
                <label for="free">Gratis</label>
              </div>
            </div>
            <hr />
            <div style="padding: 20px; background: #eee">
              <h1
                style="
                  display: inline-block;
                  vertical-align: middle;
                  margin: 0 15px 0 0;
                "
              >
                Total: {{ totalPedido }}
              </h1>
              <button class="btn-2" @click.prevent="finalPedido">
                Guardar
              </button>
            </div>
          </div>
        </div>

        <div class="col-4 col-sm-4">
          <div class="panel">
            <div
              v-for="(item, index) in pedido"
              :key="index"
              class="producto item-order"
            >
              <pedido-item
                :image="item.image"
                :precio="item.precio"
                :cantidad="item.cantidad"
                :producto="item.producto"
                :sku="item.sku"
                :opcion="item.opcion"
              />
              <textarea
                class="form"
                v-model="item.nota"
                rows="1"
                placeholder="¿Algo en especial?"
              ></textarea>
              <div class="item-opcion">
                <cantidad-item
                  :num="item.cantidad"
                  :max="item.stock"
                  @update="item.cantidad = $event"
                />

                <div>
                  <button
                    class="btn-xs"
                    @click.prevent="eliminarProducto(index)"
                  >
                    <i class="icon-borrar"></i>
                  </button>
                </div>
              </div>
            </div>

            <p v-if="pedido.length < 1" style="margin: 0 0 10px 0">
              Sin seleccionar productos
            </p>

            <button
              class="btn-block"
              :class="{ 'btn-disabled': final, 'btn-1': !final }"
              @click="seguirPedido"
              :disabled="final"
            >
              Continuar
            </button>
            <a href="#" v-if="final" @click.prevent="final = false">Volver</a>
          </div>
        </div>
      </div>
    </section>
    <modal-cliente
      ref="cliente"
      :data="models"
      @search="buscarCliente"
      @update="guardarCliente"
    />
  </article>
</template>

<script>
import axios from "axios";
import productos from "@/api/productos";
import pedidos from "@/api/pedidos";
import CantidadItem from "@/components/Cantidad.vue";
import BuscadorItem from "@/components/Buscador.vue";
import PedidoItem from "@/components/Pedido.vue";
import ModalCliente from "@/components/Modal/ModalCliente.vue";
import TableLoader from "@/components/TableLoader.vue";
export default {
  name: "PedidosView",
  components: {
    ModalCliente,
    BuscadorItem,
    PedidoItem,
    CantidadItem,
    TableLoader,
  },
  data() {
    return {
      productos: [],
      pedido: [],
      empresa: "",
      pago: 0,
      usuario: {},
      models: {},
      error: "",
      loading: true,
      final: false,
      page: 1,
      paginas: null,
    };
  },
  methods: {
    async listarProductos(id) {
      let { error, lista, numeroDePaginas } = await productos.allProducts(id);
      this.loading = false;
      if (error) {
        this.error = error;
      } else {
        lista = this.$analizarOpciones(lista);
        lista = lista.map((e) => {
          e.cantidad = 1;
          e.nota = "";
          e.opciones = e.opciones.filter((d) => d.stock > 0);
          e.opciones = e.opciones.map((d) => {
            d.precio = d.precio == 0 ? e.precio : d.precio;
            return d;
          });
          return e;
        });
        this.productos = lista;
        this.paginas = numeroDePaginas;
      }
    },
    filterProduct(id) {
      const producto = this.productos.find(({ ID }) => ID == id);
      return JSON.parse(JSON.stringify(producto));
    },
    selectOrder(event, index) {
      let producto = this.filterProduct(index);
      const seleccionado = event.target.value;
      let opcion = producto.opciones.find((e) => seleccionado == e.name);
      producto.precio = opcion.precio;
      producto.stock = opcion.stock;
      producto.opcion = seleccionado;
      producto.sku = opcion.sku;
      const existe = this.pedido.some(
        (b) => b.sku == producto.sku && b.opcion == producto.opcion
      );
      if (!existe) this.pedido.push(producto);
    },
    agregarCliente() {
      this.$refs.cliente.show();
      this.models = {};
    },
    async buscarCliente(rut) {
      this.$loader(document.querySelector("#form-cliente"));
      const usuario = await axios({
        method: "POST",
        url: "/usuario/buscarUsuarios",
        data: {
          rut,
          tipo: "clientes",
        },
      });
      let { error, cliente } = usuario.data.resultado;
      if (error) this.$toast.error(error);
      else {
        this.models = cliente;
      }
    },
    async guardarCliente(cliente) {
      this.$loader(document.querySelector("#form-cliente"));
      cliente.tipo = "clientes";
      const guardar = await axios({
        method: "POST",
        url: "/usuario/actualizarUsuarios",
        data: cliente,
      });
      let { error, mensaje } = guardar.data.resultado;
      if (error) this.$toast.error(error);
      else {
        this.$toast.success(mensaje);
        this.$refs.cliente.$refs.popup.close();
        this.usuario = {
          nombre: cliente.nombre,
          rut: cliente.rut,
          id: cliente.ID,
          direccion: cliente.direccion,
        };
      }
    },
    eliminarProducto(index) {
      this.pedido.splice(index, 1);
    },
    seguirPedido() {
      if (this.pedido.length < 1) {
        this.$toast.warning("No hay productos en la lista");
        return;
      }
      this.final = true;
    },
    async finalPedido() {
      if (this.pedido.length < 1) {
        this.$toast.warning("No hay productos en la lista");
      } else if (this.pago == 0) {
        this.$toast.warning("Seleccione un método de pago");
      } else if (this.usuario.rut == null) {
        this.$toast.warning("Seleccione un cliente");
      } else {
        let data = {};
        data = {
          ...data,
          producto: this.pedido,
          rut: this.usuario.id,
          empresa: this.empresa,
          pago: this.pago,
        };

        //en el mensaje se encuentra el ID de respuesta
        let { error, mensaje } = await pedidos.saveOrder(data);
        if (error) this.$toast.error(error);
        else {
          this.$router.push({ name: "orden", params: { orden: mensaje } });
        }
      }
    },
  },
  created() {
    this.listarProductos(this.page);
  },
  computed: {
    siguiente() {
      return this.page < this.paginas;
    },
    atras() {
      return this.page > 1;
    },
    totalPedido() {
      return this.$precioFormat(
        this.pedido
          .map((item) => [item.precio, item.cantidad])
          .reduce((a, b) => a + parseFloat(b[0]) * parseInt(b[1]), 0)
      );
    },
  },
  watch: {
    page(v) {
      this.loading = true;
      this.productos = [];
      this.listarProductos(v);
    },
  },
};
</script>

<style scoped>
.producto textarea {
  margin: 10px 0 0 0;
}

.item-order {
  margin: 10px 0;
}

.item-opcion {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: #e0e6ed solid 1px;
}
.item-opcion i {
  font-size: 1.3em;
}

.shipping label {
  display: inline-block;
  padding: 10px;
  border: #e1e1e1 solid 1px;
  border-radius: 8px;
  margin: 6px 8px;
  cursor: pointer;
}
.shipping label:before {
  content: " ";
  width: 15px;
  height: 15px;
  display: inline-block;
  vertical-align: middle;
  margin: 0 10px 0 0;
  background: gray;
  border-radius: 50%;
}
.shipping input {
  display: none;
}
.shipping input:checked + label:before {
  background: greenyellow;
}
</style>
