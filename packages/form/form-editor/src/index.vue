<template>
  <stms-param-editor
    :value="value"
    @input="change"
    :columns="columns"
    :size="size"
  />
</template>

<script>
export default {
  name: "stms-form-editor",
  props: {
    value: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
    size: {
      type: String,
      required: false,
      default: "small",
    },
  },
  data() {
    return {
      columns: [
        {
          prop: "prop",
          label: "属性名",
          type: "input",
          props: {
            placeholder: "请填写属性名",
          },
        },
        {
          prop: "label",
          label: "字段名",
          type: "input",
          props: {
            placeholder: "请填写字段名",
          },
        },
        {
          prop: "type",
          label: "控件",
          type: "select",
          props: {
            options: [
              {
                label: "输入框",
                value: "input",
              },
              {
                label: "文本框",
                value: "textarea",
              },
              {
                label: "数字输入框",
                value: "input-number",
              },
              {
                label: "日期时间选择器",
                value: "date-picker",
              },
              {
                label: "下拉框",
                value: "select",
              },
              {
                label: "开关选择器",
                value: "swtich",
              },
            ],
          },
        },
      ],
    };
  },
  methods: {
    change(value) {
      this.$emit("input", value);
    },
  },
};
</script>

<style lang="less">
@import "./index.less";
</style>
