<template>
  <transition name="slipedido">
    <div class="lateral" v-if="isVisible">
      <div class="col-4 windoworder">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
import toggle from "../mixins/toggle";
export default {
  name: "LateralItem",
  mixins: [toggle],
};
</script>

<style scoped>
.lateral {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 9;
  background: rgba(0, 0, 0, 0.2);
}
</style>