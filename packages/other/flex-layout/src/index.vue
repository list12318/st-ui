<template>
  <div
    :class="{ 'stms-flex-layout': true, [direction]: true }"
    v-on="$listeners"
  >
    <slot />
    <slot name="prepend" />
    <div class="wrap">
      <div class="wrap-position">
        <slot name="wrap" />
      </div>
    </div>
    <slot name="append" />
  </div>
</template>

<script>
export default {
  name: "stms-flex-layout",
  props: {
    direction: {
      type: String,
      required: false,
      default: "row",
    },
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
