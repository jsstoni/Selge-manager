<template>
  <div>
    <table class="table">
      <thead>
        <th>Nombre</th>
        <th>RUT</th>
        <th>Dirección</th>
        <th>Correo</th>
        <th colspan="2">Teléfono</th>
      </thead>
      <table-loader :rows="5" :columns="5" v-if="loading" />
      <tbody v-for="(item, index) in clientes" :key="index" v-else>
        <tr>
          <td data-label="Nombre">{{ item.nombre }}</td>
          <td data-label="RUT">{{ item.rut }}</td>
          <td data-label="Dirección">{{ item.direccion }}</td>
          <td data-label="Contactos">{{ item.email }}</td>
          <td data-label="Teléfono">
            <a href="#" class="ws">{{ item.phone }}</a>
          </td>
          <td data-label="Opciones" style="text-align: right">
            <a
              href="#"
              class="btn-3"
              @click.stop.prevent="editarCliente(item.ID)"
            >
              <i class="icon-editar"></i>
            </a>
            <a
              href="#"
              class="btn-3"
              @click.stop.prevent="borrarCliente(item.ID, item.nombre)"
            >
              <i class="icon-borrar"></i>
            </a>
          </td>
        </tr>
      </tbody>
      <tfoot v-if="!loading && error != '' && clientes.length <= 0">
        <tr>
          <td>{{ error }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import TableLoader from "@/components/TableLoader.vue";
export default {
  name: "TablaUsuario",
  components: {
    TableLoader,
  },
  props: ["clientes", "error", "loading"],
  methods: {
    editarCliente(id) {
      this.$emit("update", id);
    },
    borrarCliente(id, nombre) {
      this.$emit("delete", id, nombre);
    },
  },
};
</script>

<style scoped>
.ws {
  background: #25d366;
  border-radius: 10px;
  padding: 5px 10px;
  color: #fff;
}
.ws i {
  color: #fff !important;
}
</style>
