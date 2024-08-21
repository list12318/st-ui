<template>
  <el-select v-bind="$attrs" v-on="$listeners">
    <el-option
      v-for="x in $attrs.options"
      :key="x.value"
      :label="x.label"
      :value="x.value"
      :size="size"
    />
  </el-select>
</template>
<script>
export default {
  name: "stms-select",
};
</script>

<style lang="less">
@import "./index.less";
</style>
