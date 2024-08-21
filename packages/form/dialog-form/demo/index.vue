<template>
  <stms-dialog-form
    ref="configDialogForm"
    width="500px"
    :schema="configDialogForm.schema"
    :title="configDialogForm.title"
    @confirm="confirmConfig"
  />
</template>
<script>

export default {
  data() {
    return {
      configDialogForm: {
        schema: [],
        title: "",
      },
    };
  },
  mounted() {
    this.configDialogForm.title = "配置表单弹窗";
    this.configDialogForm.schema = [
      {
        prop: "api",
        label: "接口配置",
        type: "api-editor",
        rules: [
          {
            validator: (rule, value, callback) => {
              if (!value.method) {
                callback(new Error("请选择请求方法"));
              } else if (!value.url) {
                callback(new Error("请填写请求网址"));
              } else if (
                value.body &&
                !Object.keys(JSON.parse(value.body)).length
              ) {
                callback(new Error("请求主体格式应为json"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
      },
      {
        prop: "form",
        label: "表单项配置",
        type: "form-editor",
      },
    ];
    this.$refs.configDialogForm.show({
      api: {},
      form: [
        {
          prop: "username",
          label: "用户名",
          type: "input",
        },
      ],
    });
  },
  methods: {
    confirmConfig(data) {
      console.log(JSON.stringify(data));
    },
  },
};
</script>
