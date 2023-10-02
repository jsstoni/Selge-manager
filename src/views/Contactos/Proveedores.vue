<template>
  <section class="side-content">
    <div class="side-top">
      <h1 class="title-main">Proveedores</h1>
      <button @click.stop.prevent="nuevoCliente()" class="btn-3">
        <i class="icon-plus"></i> Crear
      </button>
    </div>

    <div class="content-table">
      <tabla-usuarios
        :clientes="clientes"
        :loading="loading"
        :error="error"
        @update="editarCliente"
        @delete="borrarCliente"
      />
    </div>
    <paginacion-item :paginas="paginas" :actual="page" name="proveedorpage" />
  </section>
  <modal-cliente ref="cliente" :data="models" @update="actualizarCliente" />
  <modal-dialogo ref="borrarCliente" :data="models" @delete="accionBorrar" />
</template>

<script>
import contactos from "@/api/contactos";
import PaginacionItem from "@/components/Paginacion.vue";
import ModalCliente from "@/components/Modal/ModalCliente.vue";
import ModalDialogo from "@/components/Modal/ModalDialogo.vue";
import TablaUsuarios from "@/components/TablaUsuarios.vue";
export default {
  name: "ProveedoresView",
  components: {
    PaginacionItem,
    ModalCliente,
    ModalDialogo,
    TablaUsuarios,
  },
  data() {
    return {
      clientes: [],
      paginas: null,
      loading: true,
      error: "",
      models: null /* Data */,
    };
  },
  computed: {
    page() {
      return this.$route.params.page ? this.$route.params.page : 1;
    },
  },
  methods: {
    async listarClientes(id) {
      let { error, lista, numeroDePaginas } = await contactos.allProveedor(id);
      this.loading = false;
      if (error) {
        this.error = error;
      } else {
        this.clientes = lista;
        this.paginas = numeroDePaginas;
      }
    },
    nuevoCliente() {
      this.$refs.cliente.show();
      this.models = {};
    },
    async editarCliente(id) {
      this.$loader(document.querySelector("#loader"));
      let { error, usuario } = await contactos.getClient({
        id,
        tipo: "proveedores",
      });
      if (error) this.$toast.error(error);
      else {
        this.$refs.cliente.show();
        this.models = usuario;
      }
    },
    async actualizarCliente(cliente) {
      this.$loader(document.querySelector("#form-cliente"));
      cliente.tipo = "proveedores";
      let { error, mensaje } = await contactos.update(cliente);
      if (error) this.$toast.error(error);
      else {
        this.$refs.cliente.hide();
        this.$toast.success(mensaje);
        this.listarClientes(this.page);
      }
    },
    borrarCliente(id, nombre) {
      this.$refs.borrarCliente.show();
      this.models = { id, mensaje: `¿Confirma borrar proveedor: ${nombre}?` };
    },
    async accionBorrar({ id }) {
      this.$loader(document.querySelector("#ldelete"));
      let { error, mensaje } = await contactos.delete({
        id,
        tipo: "proveedores",
      });
      if (error) this.$toast.error(error);
      else {
        this.$refs.borrarCliente.hide();
        this.clientes = this.clientes.filter((x) => x.ID != id);
        this.$toast.success(mensaje);
      }
    },
    async formularioBuscar(info) {
      this.$loader(document.querySelector("#loader"));
      let { error, lista } = await contactos.formSearch(info, "proveedores");
      if (error) this.$toast.error(error);
      else this.clientes = lista;
    },
  },
  created() {
    this.listarClientes(this.page);
  },
  watch: {
    page(val) {
      this.loading = true;
      this.clientes = [];
      this.listarClientes(val);
    },
  },
};
</script>
