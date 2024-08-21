<template>
  <el-radio-group v-bind="$attrs" v-on="$listeners">
    <template v-if="$attrs.type === 'button'">
      <el-radio-button
        v-for="x in $attrs.options"
        :key="x.label"
        :label="x.label"
        :size="size"
        >{{ x.text }}</el-radio-button
      ></template
    >
    <template v-else>
      <el-radio
        v-for="x in $attrs.options"
        :key="x.label"
        :label="x.label"
        :size="size"
        >{{ x.text }}</el-radio
      ></template
    >
  </el-radio-group>
</template>
<script>
export default {
  name: "stms-radio-group",
};
</script>

<style lang="less">
@import "./index.less";
</style>
