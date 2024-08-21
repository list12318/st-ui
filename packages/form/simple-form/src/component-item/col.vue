<template>
  <el-col :span="props.span" :gutter="props.gutter">
    <slot :data="children" />
  </el-col>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
  },
  computed: {
    props() {
      const defaultProps = {
        span: 24,
        gutter: 0,
      };
      if (this.data.props) {
        _.merge(defaultProps, this.data.props);
      }
      return defaultProps;
    },
    children() {
      return this.data.children || [];
    },
  },
};
</script>