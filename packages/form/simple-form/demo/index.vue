<template>
  <stms-simple-form
    ref="form"
    v-model="form"
    :schema="schema"
    full-screen
    @confirm="confirm"
    @change="change"
    label-position="left"
    label-width="200px"
  >
    <el-button @click="importComponent" slot="footer-button"
      >导入组件</el-button
    >
  </stms-simple-form>
</template>
<script>
export default {
  data() {
    return {
      form: {
        aaa: 1,
        // test1:
        //   "http://192.168.81.134:9528/service/static/img/news.e1a9afcb.png",
        // placeholder: "输入框",
        // rows: "2",
        // type: "text",
        // disabled: false,
        // size: "medium",
        // showLabel: false,
        // labelText: "文字",
        // labelColor: "#606266",
        // labelFontSize: 14,
        // labelFontWeight: 300,
        // labelMargin: 12,
        // form: {
        //   field: "name",
        //   validate: [
        //     {
        //       type: "required",
        //       content: "",
        //       message: "请输入",
        //       trigger: ["change"],
        //     },
        //     {
        //       type: "pattern",
        //       content: "^[a-z]+$",
        //       message: "ssssssss",
        //       trigger: ["change"],
        //     },
        //     {
        //       type: "custom",
        //       content:
        //         "return function(rule, value, callback) {console.log(value);callback(new Error('请输入密码'));}",
        //       message: "ssssssss",
        //       trigger: ["change"],
        //     },
        //   ],
        // },
      },
      schema: [
        {
          label: "aaa",
          type: "button",
          props: {
            text: "导入组件",
          },
        },
        //         {
        //           prop: "test22",
        //           label: "操作按钮设计",
        //           type: "slider",
        //           props: {
        //             showInput: true,
        //           },
        //         },
        //         {
        //           prop: "test1",
        //           label: "操作按钮设计",
        //           type: "upload-file",
        //           props: {
        //             type: "image",
        //             clearable: true,
        //           },
        //         },
        //         {
        //           prop: "test2",
        //           label: "操作按钮设计",
        //           type: "autocomplete",
        //           props: {
        //             fetchSuggestions(queryString, cb) {
        //               const parternList = [
        //                 { value: "三全鲜食（北新泾店）", address: "长宁区新渔路144号" },
        //               ];
        //               console.log(queryString, cb);
        //               var restaurants = this.restaurants;
        //               var results = queryString
        //                 ? restaurants.filter(this.createFilter(queryString))
        //                 : restaurants;
        //               // 调用 callback 返回建议列表的数据
        //               cb(results);
        //             },
        //             placeholder: "请输入内容",
        //           },
        //         },
        //         {
        //           prop: "test3",
        //           label: "操作按钮设计",
        //           type: "color-picker",
        //         },
        //         {
        //           prop: "test3",
        //           label: "操作按钮设计",
        //           type: "ace-editor",
        //           props: {
        //             theme: "ambiance",
        //           },
        //         },
        //         {
        //           prop: "test4",
        //           label: "444",
        //           type: "param-editor",
        //           props: {
        //             columns: [
        //               {
        //                 prop: "type",
        //                 label: "校验方式",
        //                 type: "select",
        //                 props: {
        //                   placeholder: "请选择校验方式",
        //                   options: [
        //                     {
        //                       label: "必填",
        //                       value: "required",
        //                     },
        //                     {
        //                       label: "正则",
        //                       value: "pattern",
        //                     },
        //                     {
        //                       label: "自定义",
        //                       value: "custom",
        //                     },
        //                   ],
        //                 },
        //                 on: {
        //                   change(value, data) {
        //                     if (value === "required") {
        //                       data.content = "-";
        //                     } else if (value === "pattern") {
        //                       data.content = "/^[a-z]+$/";
        //                     } else if (value === "custom") {
        //                       data.message = "";
        //                       data.content = `return function (rule, value, callback) {
        //   callback();
        // };`;
        //                     }
        //                   },
        //                 },
        //               },
        //               {
        //                 prop: "content",
        //                 label: "内容",
        //                 width: 400,
        //                 type: (value, data, item) => {
        //                   if (data.type === "required") {
        //                     return "text";
        //                   }
        //                   if (data.type === "custom") {
        //                     return "ace-editor";
        //                   }
        //                   return "input";
        //                 },
        //                 props: (value, data, item) => {
        //                   if (data.type === "pattern") {
        //                     return {
        //                       placeholder: "请填写校验正则",
        //                       type: "textarea",
        //                     };
        //                   }
        //                   if (data.type === "custom") {
        //                     return {
        //                       placeholder: "请填写校验函数",
        //                       height: 200,
        //                       width: 400,
        //                       mode: "javascript",
        //                     };
        //                   }
        //                   return {
        //                     placeholder: "请填写内容",
        //                   };
        //                 },
        //               },
        //               {
        //                 prop: "message",
        //                 label: "错误信息",
        //                 type: (value, data, item) => {
        //                   if (data.type === "custom") {
        //                     return "text";
        //                   }
        //                   return "input";
        //                 },
        //                 props: {
        //                   placeholder: "请填写错误信息",
        //                 },
        //               },
        //               {
        //                 prop: "trigger",
        //                 label: "触发方式",
        //                 type: "select",
        //                 props: {
        //                   placeholder: "请选择触发方式",
        //                   multiple: true,
        //                   options: [
        //                     {
        //                       label: "值改变",
        //                       value: "change",
        //                     },
        //                     {
        //                       label: "失去焦点",
        //                       value: "blur",
        //                     },
        //                   ],
        //                 },
        //               },
        //             ],
        //             maxHeight: 300,
        //           },
        //         },
      ],
    };
  },
  methods: {
    confirm(data) {
      console.log(JSON.parse(JSON.stringify(data)));
    },
    change(data) {
      console.log(data, 123);
    },
  },
};
</script>
