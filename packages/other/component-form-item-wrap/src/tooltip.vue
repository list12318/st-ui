<template>
  <el-tooltip
    :effect="effect"
    :content="content"
    :placement="placement"
    :value="show"
    manual
    :popper-class="{
      'stms-component-form-item-wrap-error-message-tooltip': true,
      [type]: !!type,
    }"
  >
    <span class="el-form-item__error"> </span>
  </el-tooltip>
</template>

<script>
export default {
  props: {
    effect: {
      type: String,
      required: false,
      default: "dark",
    },
    type: {
      type: String,
      required: false,
      default: "default",
    },
    content: {
      type: String,
      required: false,
      default: "",
    },
    placement: {
      type: String,
      required: false,
      default: "bottom-start",
    },
  },
  data() {
    return {
      show: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.show = true;
    });
  },
};
</script>

<style lang="less">
@import "./index.less";
</style>
