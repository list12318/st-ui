<template>
  <el-input-number
    v-bind="attrs"
    v-on="listeners"
    :value="value"
    @change="change"
  />
</template>
<script>
export default {
  name: "stms-input-number",
  props: {
    value: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  computed: {
    attrs() {
      const attrs = {};
      for (let x in this.$attrs) {
        if (x !== "value") {
          attrs[x] = this.$attrs[x];
        }
      }
      return attrs;
    },
    listeners() {
      const listeners = {};
      for (let x in this.$listeners) {
        if (x !== "input") {
          listeners[x] = this.$listeners[x];
        }
      }
      return listeners;
    },
  },
  methods: {
    change(e) {
      this.$emit("input", e);
    },
  },
};
</script>

<style lang="less">
@import "./index.less";
</style>
