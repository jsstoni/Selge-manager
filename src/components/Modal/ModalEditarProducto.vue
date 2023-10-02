<template>
  <Transition name="modal">
    <div class="modal" v-if="active">
      <div class="modal-content col-7">
        <ul class="menu-producto">
          <li><a href="#" @click="opcion = 'general'">General</a></li>
          <li><a href="#" @click="opcion = 'atributos'">Atributos</a></li>
          <li><a href="#" @click="opcion = 'opciones'">Variantes</a></li>
          <li><a href="#" @click="opcion = 'drop'">Dropshipping</a></li>
        </ul>
        <form
          method="post"
          ref="formProducto"
          @submit.stop.prevent="actualizarProductos()"
          id="nuevoProducto"
        >
          <div v-show="opcion == 'general'">
            <label for="imagen" class="upload"><i class="icon-plus"></i> Subir imágenes</label>
            <input
              type="file"
              accept="image/*"
              ref="archivo"
              id="imagen"
              @change="cambioArchivo()"
            />
            <img :src="producto.image" :key="image" width="100" height="100" alt="">

            <div class="cols capa">
              <div class="col-6">
                <label>Nombre</label>
                <input type="text" class="form" v-model="producto.producto" />
              </div>
              <div class="col-6">
                <label>SKU</label>
                <input type="text" class="form" v-model="producto.sku" />
              </div>
            </div>

            <div class="cols capa">
              <div class="col-4">
                <label>Categoría</label>
                <select class="form" v-model="producto.categoria">
                  <option
                    :value="item.ID"
                    v-for="(item, index) in producto.categorias"
                    :key="index"
                  >
                    {{ item.categoria }}
                  </option>
                </select>
              </div>
              <div class="col-4">
                <label>Precio</label>
                <input type="text" class="form" v-model="producto.precio" />
              </div>
              <div class="col-4">
                <label>Beneficio %</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="5"
                  class="form"
                  v-model="producto.valor"
                />
              </div>
            </div>
            <small>Con este producto el revendedor gana: {{ ganas }}</small>
            <input type="hidden" class="form" v-model="producto.ID" />
          </div>

          <div v-show="opcion == 'atributos'">
            <button
              type="button"
              class="btn-3"
              @click.stop.prevent="agregarAtributo()"
            >
              <i class="icon-plus"></i> Agregar atributos
            </button>
            <hr />
            <div
              class="cols capa-atributo"
              v-for="(item, index) in atributos"
              :key="index"
            >
              <div class="col-6">
                <i class="icon-borrar" @click="quitarAtributo(index)"></i>
                Atributo
                <select class="form" v-model="item.opcion">
                  <option disabled selected value="">Seleccionar opción</option>
                  <option value="Color">Color</option>
                  <option value="Talla">Talla</option>
                  <option value="Peso">Peso</option>
                  <option value="Tamaño">Tamaño</option>
                  <option value="Diseño">Diseño</option>
                  <option value="Olor">Olor</option>
                  <option value="Sensación">Sensación</option>
                  <option value="Ingredientes">Ingredientes</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
              <div class="col-6">
                <label>Opciones</label>
                <input
                  class="form"
                  type="text"
                  v-model="item.opciones"
                  placeholder="eje: S, M, L"
                />
              </div>
            </div>
          </div>

          <div v-show="opcion == 'opciones'">
            <div class="info">
              <p>
                Todos los productos deben almenos tener una variación para
                indicar un stock minimo de 1 o más
              </p>
            </div>
            <variantes-item
              :data="opciones"
              :atributos="atributos"
              :precio="producto.precio"
              :referencia="producto.sku"
            />
          </div>

          <div v-show="opcion == 'drop'">
            <label for="">Descripción del producto:</label>
            <textarea class="form" rows="4" v-model="producto.desc"></textarea>

            <div class="cols">
              <div class="col-6">
                <label>Industria</label>
                <select class="form" v-model="producto.medio">
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
            </div>
            <br />
            <div class="info">
              <p>
                ¿Quieres obtener más ventas atraves del modelo de negocio
                dropshipping?
              </p>
            </div>
            <label for="activar"
              ><input
                type="checkbox"
                id="activar"
                value="true"
                v-model="producto.web"
              />Activar producto</label
            >
          </div>

          <div class="modal-foot">
            <button type="button" @click.stop.prevent="$emit('close')">
              Cancelar
            </button>
            <button type="submit" class="btn-2">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  </Transition>
</template>

<script>
import VariantesItem from "../Variantes.vue";
export default {
  name: "ModalEditarProducto",
  components: { VariantesItem },
  props: ["active", "info", "type"],
  data() {
    return {
      atributos: [],
      opcion: "general",
      opciones: [],
    };
  },
  methods: {
    agregarAtributo() {
      if (this.atributos.length < 2) {
        this.atributos.push({ opcion: "", opciones: [] });
      }
    },
    quitarAtributo(id) {
      this.atributos.splice(id, 1);
    },
    actualizarProductos() {
      if (this.type == "nuevo") {
        this.$emit("new", this.producto, this.atributos, this.opciones);
      } else if (this.type == "editar") {
        this.$emit("update", this.producto, this.atributos, this.opciones);
      } else {
        this.$toast.error("Seleccione el tipo");
      }
    },
    cambioArchivo() {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target.result != this.producto.file) {
          this.producto.file = e.target.result;
        }
        this.producto.image = e.target.result;
      };
      reader.readAsDataURL(this.$refs.archivo.files[0]);
    },
  },
  computed: {
    producto: {
      get() {
        return this.info;
      },
      set(value) {
        this.$emit("update:info", value);
      },
    },
    ganas() {
      return this.producto.precio * (this.producto.valor / 100);
    },
  },
  watch: {
    producto() {
      this.opcion = "general";
      this.opciones = [];
      if (this.info.opciones) this.opciones = JSON.parse(this.info.opciones);
      this.atributos = [];
      if (this.info.atributos) this.atributos = JSON.parse(this.info.atributos);
    },
    active() {
      if (this.active) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    },
  },
};
</script>

<style scoped>
label {
  font-weight: bold;
}
.capa {
  margin: 5px -15px;
}

.menu-producto {
  border-bottom: #ddd solid 1px;
  margin: 0 0 10px 0;
}

.menu-producto li {
  display: inline-table;
}

.menu-producto li a {
  padding: 10px 15px;
  display: block;
}

.menu-producto li a.active {
  border-bottom: #396aff solid 1px;
}

.info p {
  background: #eaf2f8;
  border-radius: 8px;
  display: inline-block;
  padding: 7px 15px;
  margin: 0 0 10px 0;
  font-size: 0.9em;
}

.capa-atributo {
  border-bottom: #e0e6ed solid 1px;
  padding: 10px;
}

.upload {
  border: #396aff dashed 2px;
  display: inline-block;
  vertical-align: top;
  padding: 20px;
  font-weight: normal;
  color: #396aff;
}
.upload + input[type="file"] {
  display: none;
}
.upload i {
  display: block;
  text-align: center;
  font-size: 2em;
}
</style>
