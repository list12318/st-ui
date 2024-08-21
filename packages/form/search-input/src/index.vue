<template>
  <div>
    <el-input
      :value="value"
      @input="chageValue(...arguments)"
      :placeholder="placeholder"
      @keyup.enter.native="enterSearch"
      size="small"
    >
      <el-button
        title="当前分类范围内搜索"
        slot="append"
        size="small"
        @click="search"
        ><img src="./img/serach.png" style="vertical-align: middle"
      /></el-button>
      <el-button
        title="所有分类范围内搜索"
        slot="append"
        size="small"
        @click="searchAll"
        ><img src="./img/searchall.png" style="vertical-align: middle"
      /></el-button>
    </el-input>
  </div>
</template>
<script>
export default {
  name: "stms-search-input",
  props: {
    value: {
      type: String,
      required: true,
      default: "",
    },
    placeholder: {
      type: String,
      required: false,
      default: "请输入搜索信息",
    },
  },
  methods: {
    chageValue(value) {
      this.value = value;
      this.$emit("input", this.value);
    },
    search(value) {
      this.$emit("search", value, 0);
    },
    searchAll(value) {
      this.$emit("searchAll", value, 1);
    },
    enterSearch(value) {
      this.searchAll(value);
    },
  },
};
</script>
