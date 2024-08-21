<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="item in component.config.data"
        :key="item.id"
        v-show="item.name"
        >{{ item.name }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: {
    component: {
      type: Object,
      required: false,
      default: function() {
        return {};
      }
    },
    factory: {
      type: Object,
      required: false,
      default: function() {
        return {};
      }
    }
  },
  mounted() {
    this.$emit("triggerEvent", {
      name: "init"
    });
  },
  computed: {},
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
