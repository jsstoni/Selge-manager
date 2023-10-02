<template>
  <div>
    <label for="">Nombre</label>
    <input type="text" class="form" :value="usuario.nombre" />

    <label for="">Dirección</label>
    <input type="text" class="form" :value="usuario.direccion" />

    <label for="">Teléfono</label>
    <input type="text" class="form" :value="usuario.phone" />

    <label for="">Correo electrónico</label>
    <input type="text" class="form" :value="usuario.email" />
  </div>
</template>

<script>
export default {
  name: "FormUser",
  props: {
    cliente: {
      default: {},
    },
  },
};
</script>