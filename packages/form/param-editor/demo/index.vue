<template>
  <stms-param-editor
    :columns="columns"
    :actions="actions"
    :tools="tools"
    :action-width="160"
    :default-add-value="defaultAddValue"
    column-draggable
    :value="value"
    @input="change"
    @itemChange="itemChange"
  />
</template>
<script>
export default {
  data() {
    return {
      defaultAddValue: {
        type: "required",
        content: "-",
        message: "请填写",
        trigger: ["change"],
      },
      columns: [
        {
          prop: "type",
          label: "校验方式",
          type: "select",
          props: {
            placeholder: "请选择校验方式",
            options: [
              {
                label: "必填",
                value: "required",
              },
              {
                label: "正则",
                value: "pattern",
              },
              {
                label: "自定义",
                value: "custom",
              },
            ],
          },
          on: {
            change(value, data) {
              if (value === "required") {
                data.content = "-";
              } else if (value === "pattern") {
                data.content = "/^[a-z]+$/";
              } else if (value === "custom") {
                data.message = "";
                data.content = `return function (rule, value, callback) {
  callback();
};`;
              }
            },
          },
        },
        {
          prop: "content",
          label: "内容",
          width: 400,
          type: (value, data, item) => {
            if (data.type === "required") {
              return "text";
            }
            if (data.type === "custom") {
              return "ace-editor";
            }
            return "input";
          },
          props: (value, data, item) => {
            if (data.type === "pattern") {
              return {
                placeholder: "请填写校验正则",
                type: "textarea",
              };
            }
            if (data.type === "custom") {
              return {
                placeholder: "请填写校验函数",
                height: 200,
                width: 400,
                mode: "javascript",
              };
            }
            return {
              placeholder: "请填写内容",
            };
          },
        },
        {
          prop: "message",
          label: "错误信息",
          type: (value, data, item) => {
            if (data.type === "custom") {
              return "text";
            }
            return "input";
          },
          props: {
            placeholder: "请填写错误信息",
          },
        },
        {
          prop: "trigger",
          label: "触发方式",
          type: "select",
          props: {
            placeholder: "请选择触发方式",
            multiple: true,
            options: [
              {
                label: "值改变",
                value: "change",
              },
              {
                label: "失去焦点",
                value: "blur",
              },
            ],
          },
        },
      ],
      actions: [
        {
          type: "primary",
          text: "aaa",
          click(data) {
            console.log(data);
          },
        },
      ],
      tools: [
        {
          text: "test",
          type: "primary",
          size: "small",
          click(e) {
            console.log(e);
          },
        },
      ],
      value: [],
    };
  },
  mounted() {},
  methods: {
    change(e) {
      console.log(e);
    },
    itemChange(e) {
      console.log(e);
    },
  },
};
</script>
