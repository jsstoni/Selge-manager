<template>
  <Transition name="modal">
    <div class="modal" v-if="isVisible">
      <div :class="['modal-content', size]">
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>

<script>
import toggle from '../mixins/toggle'
export default {
  name: "ModalItem",
  mixins: [toggle],
  props: {
    size: {
      default: 'col-4'
    }
  },
}
</script>