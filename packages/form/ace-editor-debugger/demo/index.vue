<template>
  <div class="demo">
    <stms-ace-editor-debugger
      v-model="content"
      mode="javascript"
      auto-complete
      @getCompletions="getCompletions"
      wrapClassName="import"
      tool
      @start="start"
      @next="next"
      height="700px"
      @rowClick="rowClick"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      content:
        "//导入包示例，以输入变量选择begin和end为例\n" +
        "import java.lang.String;\n" +
        "import com.alibaba.fastjson.JSONObject;\n" +
        "\n" +
        "//构造临时变量\n" +
        "JSONObject temp =new JSONObject()\n" +
        '.fluentPut("name", begin.get("id"));\n' 
    };
  },
  mounted() {},
  methods: {
    start(row) {
      console.log(row, "dasasac");
    },
    next(row) {
      console.log(row);
    },
    rowClick(row, length) {
      console.log(row, length);
    },
    getCompletions(editor, session, pos, prefix, callback) {
      var data = [
        {
          caption: "Component1111111111111111111111111",
          meta: "设计器组件111111111111111111",
          value: 'Component("")',
          score: 1000,
          docHTML: ["<b>11111111111</b>", "<hr>dddddddd</hr>"].join(""),
        },
        {
          caption: "action",
          meta: "行为",
          value: 'action("")',
          score: 1000,
        },
        // { caption: "message", meta: "返回值", value: "message" },
        // { caption: "@name", meta: "mock字段：姓名", value: "@name" },
        // { caption: "@phone", meta: "mock字段：电话", value: "@phone" },
      ];
      // if ((prefix = "s")) {
      return callback(null, data);
      // }
    },
  },
};
</script>

<style lang="less">

</style>
