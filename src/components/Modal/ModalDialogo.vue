<template>
  <modal-item ref="popup" size="col-4">
    <form @submit.prevent="$emit('delete', form)" id="ldelete">
      <p>
        {{ form.mensaje }}
      </p>
      <slot></slot>
      <div class="modal-foot">
        <button type="button" @click.prevent="hide()">Cancelar</button>
        <button type="submit" class="btn-2">Confirmar</button>
      </div>
    </form>
  </modal-item>
</template>
<script>
import ModalItem from "./../Modal";
import mixin from "./../../mixins/modal";
export default {
  name: "ModalDialogo",
  components: {
    ModalItem
  },
  mixins: [mixin]
};
</script>