<template>
  <el-button v-bind="$attrs" v-on="$listeners">
    {{ $attrs.text }}
  </el-button>
</template>
<script>
export default {
  name: "stms-button",
};
</script>

<style lang="less">
@import "./index.less";
</style>
