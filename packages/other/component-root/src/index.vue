<template>
  <div :class="className" ref="root">
    <div class="component-root-render">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "stms-component-root",
  props: {
    config: {
      type: Boolean,
      required: false,
      default: false,
    },
    full: {
      type: Boolean,
      required: false,
      default: false,
    },
    customClass: {
      type: String,
      required: false,
      default: "",
    },
  },
  computed: {
    className() {
      return {
        "stms-component-root": true,
        config: this.config,
        full: this.full,
        [this.customClass]: !!this.customClass,
      };
    },
  },
};
</script>

<style lang="less">
@import "./index.less";
</style>
