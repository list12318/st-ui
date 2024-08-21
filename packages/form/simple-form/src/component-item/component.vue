<template>
  <el-form-item
    :label="props.label + '：'"
    :prop="props.prop"
    :rules="props.rules"
    v-if="$store.isShow(props)"
  >
    <stms-form-item-lib
      :type="props.type"
      :props="props.props"
      :on="props.on"
      :size="size"
      :value="$store.getValue(props.prop)"
      @input="$store.change(props.prop, ...arguments)"
    />
  </el-form-item>
</template>

<script>
export default {
  inject: ["$store"],
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
      const defaultProps = {};
      if (this.data.props) {
        _.merge(defaultProps, this.data.props);
      }
      return defaultProps;
    },
  },
};
</script>