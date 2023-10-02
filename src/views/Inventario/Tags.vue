<template>
  <section class="side-content">
    <h1 class="title-main">Categorías</h1>
    <div class="cols">
      <div class="col-3">
        <div class="new" @click="open">Agregar categoría</div>
      </div>
      <div class="col-3" v-for="(item, index) in tags" :key="index">
        <div class="list-coleccion" @click="editar(item.ID)">
          <button @click.stop.prevent="borrar(item.ID)">
            <i class="icon-borrar"></i>
          </button>
          {{ item.categoria }}
        </div>
      </div>
    </div>
  </section>
  <lateral-item ref="coleccion">
    <form @submit.prevent="nueva" id="load_new">
      <label for="">Nombre</label>
      <input
        type="text"
        class="form"
        v-model="coleccion"
        placeholder="Nueva categoría"
      />
      <button type="button" @click="$refs.coleccion.close()">Cancelar</button>
      <button type="submit" class="btn-2">Guardar</button>
    </form>
  </lateral-item>
  <modal-dialogo ref="borrar" :data="models" @delete="accionBorrar" />
</template>

<script>
import LateralItem from "@/components/Lateral.vue";
import Colecciones from "@/api/Colecciones";
import ModalDialogo from "@/components/Modal/ModalDialogo.vue";
export default {
  name: "TagsView",
  components: {
    LateralItem,
    ModalDialogo,
  },
  data() {
    return {
      coleccion: "",
      id: "",
      tags: [],
      error: "",
      models: {},
    };
  },
  methods: {
    open() {
      this.coleccion = "";
      this.id = "";
      this.$refs.coleccion.open();
    },
    async lista() {
      const { lista, error } = await Colecciones.lista();
      if (error) this.error = error;
      else this.tags = lista;
    },
    async nueva() {
      this.$loader(document.querySelector("#load_new"));
      const { mensaje, error } = await Colecciones.crear({
        tags: this.coleccion,
        id: this.id,
      });
      this.$refs.coleccion.close();
      if (error) this.$toast.error(error);
      else {
        this.$toast.success(mensaje);
        this.lista();
      }
    },
    editar(id) {
      this.$refs.coleccion.open();
      const tag = this.tags.find((e) => e.ID == id);
      this.coleccion = tag.categoria;
      this.id = tag.ID;
    },
    borrar(id) {
      const tag = this.tags.find((e) => e.ID == id);
      this.models = {
        id,
        mensaje: `¿Estas seguro de querer borrar categoria: ${tag.categoria}?`,
      };
      this.$refs.borrar.show();
    },
    async accionBorrar({ id }) {
      this.$loader(document.querySelector("#loader"));
      this.$refs.borrar.hide();
      const { mensaje, error } = await Colecciones.borrar(id);
      if (error) this.$toast.error(error);
      else {
        this.tags = this.tags.filter((e) => e.ID != id);
        this.$toast.success(mensaje);
      }
    },
  },
  created() {
    this.lista();
  },
};
</script>

<style scoped>
.new {
  border: dashed 2px #ddd;
  border-radius: 8px;
  padding: 30px;
  text-transform: uppercase;
  box-sizing: border-box;
  margin: 8px 0;
  font-size: .9em;
}
.new:hover {
  border-color: #1363df;
  cursor: pointer;
}
.list-coleccion {
  background: rgb(229, 242, 255);
  border: transparent dashed 2px;
  border-radius: 8px;
  padding: 40px 20px;
  margin: 8px 0;
  position: relative;
}
.list-coleccion button {
  border-radius: 50%;
  position: absolute;
  top: -10px;
  right: -10px;
  padding: 7px 8px;
}
</style>
