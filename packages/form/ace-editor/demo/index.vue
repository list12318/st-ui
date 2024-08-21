<template>
  <div class="demo">
    <stms-ace-editor
      ref="editor"
      v-model="content"
      mode="javascript"
      auto-complete
      @getCompletions="getCompletions"
      height="700px"
      :keyboard-handler="keyboardHandler"
    />
    <stms-ace-editor
      ref="editor"
      v-model="content2"
      mode="javascript"
      auto-complete
      @getCompletions="getCompletions2"
      height="700px"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: "",
      content2: "",
    };
  },
  mounted() {
    // setTimeout(() => {
    //   this.$refs.editor.beautify();
    // }, 3000);
  },
  computed: {
    keyboardHandler() {
      return [
        {
          name: "test",
          exec: (editor) => {
            console.log("test");
          },
          bindKey: "Ctrl-S",
        },
      ];
    },
  },
  methods: {
    getCompletions(editor, session, pos, prefix, callback) {
      var data = [
        {
          caption: "Component",
          meta: "设计器组件设计器组件设计器组件设计器组件设计器组件设计器组件",
          value: 'Component("")',
          score: 1000,
          docHTML: ["<b>11111111111</b>", "<hr>dddddddd</hr>"].join(""),
        },
        {
          caption: "a.action",
          meta: "行为",
          value: 'a.action("")',
          score: 1000,
        },
        // { caption: "message", meta: "返回值", value: "message" },
        // { caption: "@name", meta: "mock字段：姓名", value: "@name" },
        // { caption: "@phone", meta: "mock字段：电话", value: "@phone" },
      ];
      for (let i = 0; i < 374; i++) {
        data.push({
          caption: "Component" + i,
          meta: "设计器组件设计器组件设计器组件设计器组件设计器组件设计器组件",
          value: 'Component("")',
          score: 1000,
          docHTML: ["<b>11111111111</b>", "<hr>dddddddd</hr>"].join(""),
        });
      }
      // if ((prefix = "s")) {
      return callback(null, data);
      // }
    },
    getCompletions2(editor, session, pos, prefix, callback) {
      var data = [
        {
          caption: "Component",
          meta: "设计器组件设计器组件设计器组件设计器组件设计器组件设计器组件",
          value: 'Component("")',
          score: 1000,
          docHTML: ["<b>11111111111</b>", "<hr>dddddddd</hr>"].join(""),
        },
        {
          caption: "a.action",
          meta: "行为",
          value: 'a.action("")',
          score: 1000,
        },
        // { caption: "message", meta: "返回值", value: "message" },
        // { caption: "@name", meta: "mock字段：姓名", value: "@name" },
        // { caption: "@phone", meta: "mock字段：电话", value: "@phone" },
      ];
      for (let i = 0; i < 374; i++) {
        data.push({
          caption: "Component" + i,
          meta: "设计器组件设计器组件设计器组件设计器组件设计器组件设计器组件",
          value: 'Component("")',
          score: 1000,
          docHTML: ["<b>11111111111</b>", "<hr>dddddddd</hr>"].join(""),
        });
      }
      // if ((prefix = "s")) {
      return callback(null, data);
      // }
    },
  },
};
</script>

<style lang="less"></style>
