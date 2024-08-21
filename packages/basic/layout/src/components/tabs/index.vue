<template>
  <div class="tabs">
    <el-tabs
      v-model="component.config.active"
      :type="component.config.type"
      @tab-click="handleClick"
    >
      <el-tabs-pane
        v-for="item in component.config.options"
        :key="item"
        :label="item.label"
        :name="item.name"
      />
      {{ item.label }}
    </el-tabs>
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
      },
    },
    factory: {
      type: Object,
      required: false,
      default: function() {
        return {};
      },
    },
  },
  mounted() {
    this.$emit("triggerEvent", {
      name: "init",
    });
  },
  computed: {},
  data() {
    return {};
  },
  methods: {
    handleClick(tab, event) {
      this.$emit("triggerEvent", {
        name: "tabClick",
        data: {
          tab,
          event,
          active: this.component.config.active,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
