<template>
  <section class="side-content">
    <div class="side-top">
      <h1 class="title-main">Mis productos</h1>
      <div>
        <button @click.stop.prevent="nuevoProducto()" class="btn-3">
          <i class="icon-plus"></i> Crear
        </button>
      </div>
    </div>

    <div class="content-table">
      <table class="table">
        <thead>
          <tr>
            <th width="55%">Producto</th>
            <th width="10%">SKU</th>
            <th width="10%">Precio</th>
            <th width="10%">Inventario</th>
            <th></th>
          </tr>
        </thead>
        <table-loader :rows="5" :columns="5" v-if="loading" />
        <tbody
          v-for="(item, index) in productos"
          :key="index"
          :id="'item-' + item.ID"
          v-else
        >
          <tr>
            <td>
              <producto-item
                :image="item.image"
                :producto="item.producto"
                :sku="item.sku"
                class="producto"
              />
            </td>
            <td data-label="SKU">
              {{ item.sku }}
            </td>
            <td data-label="Precio">
              <span class="precio">{{ $precioFormat(item.precio) }}</span>
              {{
                $precioFormat((item.precio * item.valor) / 100) +
                " " +
                item.valor +
                "%"
              }}
            </td>
            <td data-label="Inventario">
              {{ this.$sumar(item.opciones, "stock") }}
              unds.
            </td>
            <td style="text-align: right">
              <button class="btn-3" @click.prevent="infoProducto(item.ID)">
                <i class="icon-ver"></i>
              </button>
              <button class="btn-3" @click="editarPoducto(item.ID)">
                <i class="icon-editar"></i>
              </button>
              <button
                class="btn-3"
                @click="borrarProducto(item.ID, item.producto)"
              >
                <i class="icon-borrar"></i>
              </button>
            </td>
          </tr>
        </tbody>
        <tfoot v-if="!loading && error != '' && productos.length <= 0">
          <tr>
            <td>{{ error }}</td>
          </tr>
        </tfoot>
      </table>
    </div>

    <paginacion-item :paginas="paginas" :actual="page" name="invpage" />

    <modal-editar-producto
      :active="producto"
      :info="formProduct"
      :type="type"
      @new="guardarProducto"
      @update="accionEditar"
      @close="producto = false"
    />

    <modal-dialogo ref="borrar" :data="models" @delete="accionBorrar" />

    <lateral-item ref="infoproducto">
      <img :src="getProduct.image" style="width: 150px; height: 150px" />
      <h1>{{ getProduct.producto }}</h1>
      <small>SKU: {{ getProduct.sku }}</small> <br />
      <small class="precio"
        >Precio: {{ $precioFormat(getProduct.precio) }}</small
      >

      <hr />

      <h3>Atributos</h3>
      <span
        class="atributo"
        v-for="(atributo, k) in getProduct.atributos"
        :key="k"
      >
        {{ atributo.opcion }}:
        <small v-for="(opcion, oi) in atributo.opciones" :key="oi">{{
          opcion
        }}</small>
      </span>
      <p v-if="getProduct.atributos.length < 1">Sin atributos</p>

      <hr />

      <h3>Variantes</h3>
      <table width="100%" v-if="getProduct.opciones.length > 0">
        <thead style="text-align: left">
          <tr>
            <th>Opciones</th>
            <th>Precio</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody v-for="(v, i) in getProduct.opciones" :key="i">
          <tr>
            <td>{{ v.name }}</td>
            <td>{{ v.precio }}</td>
            <td>{{ v.stock }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else>Sin variantes</p>
      <div style="display: flex; flex-wrap: wrap; position: sticky; bottom: 0">
        <button
          class="btn"
          style="flex: 1; margin: 10px"
          @click.prevent="$refs.infoproducto.close()"
        >
          Cerrar
        </button>
        <button
          class="btn-3"
          style="flex: 1; margin: 10px"
          @click.prevent="editarPoducto(getProduct.ID)"
        >
          <i class="icon-editar"></i> Editar
        </button>
        <button
          class="btn-3"
          style="flex: 1; margin: 10px"
          @click.prevent="borrarProducto(getProduct.ID, getProduct.producto)"
        >
          <i class="icon-borrar"></i> Borrar
        </button>
      </div>
    </lateral-item>
  </section>
</template>

<script>
import productos from "@/api/productos";
import PaginacionItem from "@/components/Paginacion.vue";
import ModalEditarProducto from "@/components/Modal/ModalEditarProducto.vue";
import ModalDialogo from "@/components/Modal/ModalDialogo.vue";
import ProductoItem from "@/components/Producto.vue";
import LateralItem from "@/components/Lateral.vue";
import TableLoader from "@/components/TableLoader.vue";
function initialProduct() {
  return {
    image: require("@/assets/image/lista.svg"),
    producto: "",
    sku: "",
    precio: 0,
    valor: 0,
    desc: "",
    medio: "",
    web: false,
  };
}
export default {
  name: "InventarioView",
  components: {
    PaginacionItem,
    ModalEditarProducto,
    ModalDialogo,
    ProductoItem,
    LateralItem,
    TableLoader,
  },
  data() {
    return {
      categorias: [],
      productos: [],
      paginas: null,
      loading: true,
      error: "",
      type: "",
      producto: false,
      models: {},
      formProduct: initialProduct(),
      getProduct: [],
    };
  },
  methods: {
    async listarProductos(id) {
      let { error, categorias, lista, numeroDePaginas } =
        await productos.allProducts(id);
      this.loading = false;
      if (error) {
        this.error = error;
      } else {
        this.categorias = categorias;
        this.productos = this.$analizarOpciones(lista);
        this.productos = this.productos.map((e) => {
          e.atributos = JSON.parse(e.atributos).map((o) => {
            o.opciones = o.opciones.split(",");
            return o;
          });
          return e;
        });
        this.paginas = numeroDePaginas;
      }
    },
    infoProducto(id) {
      const producto = this.productos.find((e) => e.ID == id);
      this.getProduct = producto;
      this.$refs.infoproducto.open();
    },
    nuevoProducto() {
      this.producto = true;
      Object.assign(this.$data.formProduct, initialProduct());
      this.formProduct.categorias = this.categorias;
      this.type = "nuevo";
    },
    async editarPoducto(id) {
      this.$loader(document.querySelector("#loader"));
      this.type = "editar";
      let { error, lista } = await productos.searchProduct(id);
      if (error) this.$toast.error(error);
      else {
        this.producto = true;
        this.formProduct = lista;
        this.formProduct.categorias = this.categorias;
      }
    },
    async guardarProducto(data, attr, opciones) {
      this.$loader(document.querySelector("#nuevoProducto"));
      data.atributos = attr;
      data.opciones = opciones;
      let { error, mensaje } = await productos.save(data);
      if (error) this.$toast.error(error);
      else {
        this.$toast.success(mensaje);
        this.producto = false;
        this.listarProductos(this.page);
      }
    },
    async accionEditar(data, attr, opciones) {
      this.$loader(document.querySelector("#nuevoProducto"));
      data.atributos = attr;
      data.opciones = opciones;
      let { error, mensaje } = await productos.update(data);
      if (error) this.$toast.error(error);
      else {
        this.producto = false;
        const producto = JSON.parse(JSON.stringify(data));
        const i = this.productos.findIndex((x) => x.ID == producto.ID);
        this.productos[i] = producto;
        this.$toast.success(mensaje);
      }
    },
    borrarProducto(id, mensaje) {
      this.$refs.borrar.show();
      this.models = {
        id: id,
        mensaje: `¿Confirmas borrar el producto: ${mensaje} ?`,
      };
    },
    async accionBorrar({ id }) {
      this.$loader(document.querySelector("#ldelete"));
      let { error, mensaje } = await productos.remove(id);
      if (error) this.$toast.error(error);
      else {
        this.$refs.borrar.$refs.popup.close();
        this.productos = this.productos.filter((x) => x.ID != id);
        this.$toast.success(mensaje);
      }
    },
    async formularioBuscar(info) {
      this.$loader(document.querySelector("#loader"));
      let { error, lista } = await productos.formSearch(info);
      if (error) this.$toast.error(error);
      else {
        this.productos = this.$analizarOpciones(lista);
        this.paginas = 1;
      }
    },
  },
  created() {
    this.listarProductos(this.page);
  },
  computed: {
    page() {
      return this.$route.params.page ? this.$route.params.page : 1;
    },
  },
  watch: {
    page(val) {
      this.loading = true;
      this.productos = [];
      this.listarProductos(val);
    },
  },
};
</script>
