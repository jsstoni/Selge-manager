<template>
  <section class="side-content">
    <div>
      <div class="cols">
        <div class="col-3">
          <label>Buscar</label>
          <input type="text" class="form" placeholder="secador de pelo" />
        </div>
        <div class="col-3">
          <label>Región</label>
          <select class="form"></select>
        </div>
        <div class="col-3">
          <label>Industria</label>
          <select class="form">
            <option value="" selected disabled>Seleccionar industria</option>
            <option value="C01">Arte</option>
            <option value="C02">Librería</option>
            <option value="C03">Automotor</option>
            <option value="C04">Belleza y Cuidado Personal</option>
            <option value="C05">Celulares y Telefonía</option>
            <option value="C06">Computación</option>
            <option value="C07">Consolas y Videojuegos</option>
            <option value="C08">Electrodomésticos</option>
            <option value="C09">Herramientas</option>
            <option value="C10">Hogar y Muebles</option>
            <option value="C11">Instrumentos Musicales</option>
            <option value="C12">Juegos y Juguetes</option>
            <option value="C13">Vestuario y Calzado</option>
          </select>
        </div>
        <div class="col-3">
          <label>Precio</label>
          <select class="form">
            <option value="" selected disabled>Selecciona precio</option>
            <option value="">Menor precio</option>
            <option value="">Mayor precio</option>
          </select>
        </div>
      </div>
    </div>

    <hr />

    <div v-if="!productos.length > 0">
      <div class="lds-dual-ring" v-if="loading"></div>
      <h4 v-else><i class="icon-alert"></i> {{ error }}</h4>
    </div>
    <div v-else>
      <div class="cols">
        <div class="col-3" v-for="(item, index) in productos" :key="index">
          <div class="card" @click.prevent="verProducto(item.ID)">
            <div class="card-content">
              <div class="card-img">
                <img :src="item.image" />
              </div>
              <div class="card-info">
                <h3>{{ item.producto }}</h3>
                <small>
                  {{ this.$sumar(item.opciones, "stock") }}
                  unds.</small
                >
                <br />
                <a href="#">{{ item.proveedor }}</a>
                <br />
                <div class="shipping"><small>Envio</small> 3 - 5 Dias</div>
              </div>
              <div class="card-precio">
                <p>
                  <small>Precio</small><br />{{ $precioFormat(item.precio) }}
                </p>
                <p class="msrp">
                  <small>Ganas</small><br />{{
                    $precioFormat((item.precio * item.valor) / 100)
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <modal-products ref="producto" :data="models" @import="importarProducto" />
</template>

<script>
import productos from "@/api/productos";
import ModalProducts from "@/components/Modal/ModalProducts.vue";
export default {
  name: "MarketplaceView",
  components: {
    ModalProducts,
  },
  data() {
    return {
      lista: "",
      productos: [],
      models: [],
      loading: true,
    };
  },
  methods: {
    async cargarProductos() {
      this.productos = [];
      let { error, lista } = await productos.dropshipping();
      this.loading = false;
      if (error) {
        this.error = error;
      } else this.productos = this.$analizarOpciones(lista);
    },
    verProducto(id) {
      this.models = this.$filterByID(this.productos, "ID", id);
      this.$refs.producto.show();
    },
    async importarProducto(id) {
      this.$loader(document.querySelector("#loader"));
      let { mensaje, error } = await productos.importProduct(id);
      this.$refs.producto.hide();
      if (error) this.$toast.error(error);
      else this.$toast.success(mensaje);
    },
  },
  created() {
    this.cargarProductos();
  },
};
</script>

<style scoped>
.list {
  margin: 15px 0;
  display: block;
}

.card {
  margin: 15px 0;
  border-radius: 8px;
  line-height: 1.6em;
  font-size: 0.9em;
  background: #fff;
  border: #e0e6ed solid 1px;
  padding: 4px;
}

.card-content {
  width: 100%;
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  height: 410px;
}

.card-info {
  margin: 0;
  padding: 15px;
}

.card-info a {
  color: #1363df;
}

.card-info h3 {
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 500;
  flex-grow: 1;
}

.shipping {
  background: #f6f6fc;
  border-radius: 8px;
  padding: 7px;
  margin: 10px 0 0 0;
  font-size: 0.8em;
}
.shipping small {
  display: block;
}

.card-img {
  height: 170px;
}

.card .card-img img {
  width: 100%;
  height: 170px;
  border-radius: 8px;
  position: relative;
  float: none;
}

.card-precio {
  padding: 0 15px;
  display: flex;
  flex-flow: row nowrap;
  margin-top: auto;
}

.card-precio .msrp {
  margin-left: auto;
}

.menu-market {
  overflow: auto;
  margin: 0 0 20px 0;
}
.menu-market li {
  float: left;
  margin: 0 15px 0 0;
}
.menu-market li a {
  display: block;
  border-radius: 10px;
}
</style>
