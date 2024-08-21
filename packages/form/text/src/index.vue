<template>
  <span v-bind="$attrs" v-on="$listeners">{{ $attrs.value }}</span>
</template>
<script>
export default {
  name: "stms-text",
};
</script>

<style lang="less">
@import "./index.less";
</style>
