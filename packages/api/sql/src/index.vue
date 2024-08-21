<template>
  <!-- sql内容 -->
  <el-form :model="{ value }" ref="form" class="query">
    <stms-ace-editor :value="value" mode="mysql" @input="changeSql" width="100%" height="335px" />
  </el-form>
</template>

<script>
export default {
  name: "stms-api-design-sql",
  props: {
    value: {
      type: String,
      required: true,
      default: function() {
        return "";
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    changeSql(value) {
      this.value = value;
      this.$emit("input", this.value);
    }
  }
};
</script>

<style lang="less"></style>
