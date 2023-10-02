<template>
  <modal-item ref="popup">
    <form @submit.prevent="$emit('update', form)" id="form-cliente">
      <label for="">RUT</label>
      <div class="form-inline-end">
        <input type="text" class="form" v-model="form.rut" @keydown.enter.prevent="$emit('search', form.rut)" />
        <button @click.prevent="$emit('search', form.rut)">
          <i class="icon-buscar"></i>
        </button>
      </div>
      <label for="">Nombre</label>
      <input type="text" class="form" v-model="form.nombre" />

      <label for="">Dirección</label>
      <input type="text" class="form" v-model="form.direccion" />

      <label for="">Teléfono</label>
      <input type="text" class="form" v-model="form.phone" />

      <label for="">Correo electrónico</label>
      <input type="text" class="form" v-model="form.email" />

      <small>Si el rut existe al guardar re-escribirá los datos
        ingresados</small>
      <div class="modal-foot">
        <button type="button" @click="hide()">Cancenlar</button>
        <button type="submit" class="btn-2">Guardar</button>
      </div>
    </form>
  </modal-item>
</template>

<script>
import ModalItem from "./../Modal";
import mixin from "./../../mixins/modal";
export default {
  name: "ModalCliente",
  components: {
    ModalItem
  },
  mixins: [mixin]
};
</script>