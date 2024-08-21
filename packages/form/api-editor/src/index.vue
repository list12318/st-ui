<template>
  <div class="stms-api-editor">
    <div class="info">
      <el-select
        class="method"
        placeholder="请求方法"
        :size="size"
        :value="value.method"
        @input="change('method', ...arguments)"
      >
        <el-option label="GET" value="get" />
        <el-option label="POST" value="post" />
        <el-option label="DELETE" value="delete" />
        <el-option label="PUT" value="put" />
      </el-select>
      <el-input
        placeholder="请填写请求网址"
        :size="size"
        :value="value.url"
        @input="change('url', ...arguments)"
      />
      <div class="tips">
        <el-tooltip effect="light" placement="top">
          <div style="width:200px" slot="content">
            <p>
              请求网址可使用表单内数据作为变量，填写方式例如：http://api.com/rest/{type}/create?id={id}
            </p>
            <p>
              请求主体格式为json，也可使用表单内数据作为变量，填写方式例如：{"id":"{id}","name":"{name}"}。
            </p>
          </div>
          <i class="el-icon-question" />
        </el-tooltip>
      </div>
    </div>
    <div class="body">
      <el-input
        type="textarea"
        placeholder="请填写请求主体"
        :rows="4"
        :size="size"
        :value="value.body"
        @input="change('body', ...arguments)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "stms-api-editor",
  props: {
    value: {
      type: Object,
      required: false,
      default() {
        return {};
      },
    },
    size: {
      type: String,
      required: false,
      default: "small",
    },
  },
  data() {
    return {};
  },
  methods: {
    change(key, value) {
      this.$emit("input", {
        ...this.value,
        [key]: value,
      });
    },
  },
};
</script>

<style lang="less">
@import "./index.less";
</style>
