export const transferSchemaToLayout = (schema) => {
  return [
    {
      type: "tabs",
      props: {
        label: "基本属性",
      },
      children: schema.map((v) => {
        return {
          type: "component",
          props: v,
        };
      }),
    },
    {
      type: "tabs",
      props: {
        label: "表单属性",
      },
      children: [
        {
          type: "component",
          props: {
            prop: "form.labelText",
            label: "标签文本",
            type: "input",
            props: {
              placeholder: "请填写标签文本",
            },
          },
        },
        {
          type: "component",
          props: {
            prop: "form.labelWidth",
            label: "标签宽度",
            type: "input",
            props: {
              placeholder: "请填写标签宽度",
            },
          },
        },
        {
          type: "component",
          props: {
            prop: "form.labelPosition",
            label: "标签位置",
            type: "radio-group",
            props: {
              type: "button",
              options: [
                {
                  label: "left",
                  text: "左对齐",
                },
                {
                  label: "right",
                  text: "右对齐",
                },
                {
                  label: "top",
                  text: "顶部对齐",
                },
              ],
            },
          },
        },
        {
          type: "component",
          props: {
            prop: "form.size",
            label: "尺寸",
            type: "radio-group",
            props: {
              type: "button",
              options: [
                {
                  label: "medium",
                  text: "大",
                },
                {
                  label: "small",
                  text: "中",
                },
                {
                  label: "mini",
                  text: "小",
                },
              ],
            },
          },
        },
        {
          type: "component",
          props: {
            prop: "form.field",
            label: "字段名",
            type: "input",
            props: {
              placeholder: "请填写字段名",
            },
          },
        },
        {
          type: "component",
          props: {
            prop: "form.defaultValue",
            label: "默认值",
            type: "input",
            props: {
              placeholder: "请填写默认值",
            },
          },
        },
        {
          type: "component",
          props: {
            prop: "form.validate",
            label: "校验规则",
            type: "param-editor",
            props: {
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
                        label: "最大输入长度",
                        value: "max",
                      },
                      {
                        label: "最小输入长度",
                        value: "min",
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
                        data.content = "^[a-z]+$";
                      } else if (value === "max") {
                        data.content = 0;
                      } else if (value === "min") {
                        data.content = 0;
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
                  width: 250,
                  type: (value, data, item) => {
                    if (data.type === "required") {
                      return "text";
                    }
                    if (data.type === "custom") {
                      return "ace-editor";
                    }
                    if (data.type === "max" || data.type === "min") {
                      return "input-number";
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
                        width: 250,
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
            },
          },
        },
        {
          type: "component",
          props: {
            prop: "form.errorMessageStyle",
            label: "错误提示样式",
            type: "radio-group",
            props: {
              type: "button",
              options: [
                {
                  label: "default",
                  text: "默认",
                },
                {
                  label: "tooltip",
                  text: "气泡",
                },
              ],
            },
          },
        },
        {
          type: "component",
          props: {
            prop: "form.errorMessageStyleTooltipEffect",
            label: "错误提示气泡主题",
            type: "radio-group",
            props: {
              type: "button",
              options: [
                {
                  label: "dark",
                  text: "暗色",
                },
                {
                  label: "light",
                  text: "亮色",
                },
              ],
            },
            show(value, data) {
              return data.form.errorMessageStyle === "tooltip";
            },
          },
        },
        {
          type: "component",
          props: {
            prop: "form.initEvent",
            label: "初始化执行代码",
            type: "ace-editor",
            props: {
              mode: "javascript",
            },
          },
        },
      ],
    },
  ];
};
