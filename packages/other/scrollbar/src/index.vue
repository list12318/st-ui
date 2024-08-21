<template>
  <el-scrollbar ref="scrollbar" class="stms-scrollbar" :class="{ scrollX }">
    <slot />
  </el-scrollbar>
</template>
<script>
export default {
  name: "stms-scrollbar",
  props: {
    scrollX: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    moveTo(x = null, y = null) {
      const dom = this.$refs.scrollbar.$el.querySelector(".el-scrollbar__wrap");
      if (dom) {
        if (x !== null) {
          dom.scrollLeft = x;
        }
        if (y !== null) {
          dom.scrollTop = y;
        }
      }
    },
  },
};
</script>

<style lang="less">
@import "./index.less";
</style>
