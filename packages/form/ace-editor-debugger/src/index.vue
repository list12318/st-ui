<template>
  <div class="stms-ace-editor-debugger">
    <div class="top" v-if="tool">
      <el-tooltip effect="dark" content="运行到下一行" placement="bottom">
        <img src="./img/next.png" style="cursor:not-allowed" v-if="status" />
        <img src="./img/next.png" @click="next" v-else />
      </el-tooltip>
      <el-tooltip effect="dark" content="运行到指定行" placement="bottom">
        <img
          src="./img/debugger.png"
          style="cursor:not-allowed"
          v-if="status"
        />
        <img src="./img/debugger.png" @click="start" v-else />
      </el-tooltip>
      <el-tooltip effect="dark" content="重置" placement="bottom">
        <img src="./img/stop.png" @click="stop" />
      </el-tooltip>
    </div>
    <div class="content">
      <stms-ace-editor
        ref="ace_editor"
        :value="value"
        :mode="mode"
        :width="width"
        :height="height"
        :autoComplete="autoComplete"
        @getCompletions="getCompletions"
        @input="onInput"
        @init="onInit"
        @rowClick="rowClick"
        @rowsClick="rowsClick"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "stms-ace-editor-debugger",
  props: {
    value: {
      type: String,
      required: false,
      default() {
        return "";
      },
    },
    mode: {
      type: String,
      required: false,
      default: "json",
    },
    width: {
      type: String,
      required: false,
      default: "100%",
    },
    height: {
      type: String,
      required: false,
      default: "500",
    },
    readOnly: {
      type: Boolean,
      required: false,
      default: false,
    },
    autoComplete: {
      type: Boolean,
      required: false,
      default: false,
    },
    wrapClassName: {
      type: String,
      required: false,
      default: "",
    },
    tool: {
      type: Boolean,
      required: false,
      default: false,
    },
    heightLine: {
      type: Array,
      required: false,
      default: [],
    },
    status: {
      type: Boolean,
      required: false,
      default: false,
    },
    restart: {
      type: Number,
      required: false,
      default: false,
    },
  },
  watch: {
    status: {
      handler(val) {
        this.status = val;
      },
      immediate: true,
    },
    restart: {
      handler() {
        this.nextLine = 0;
      },
      immediate: true,
    },
    heightLine: {
      handler(val) {
        this.heightLine = val;
        this.setHeightLine();
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    if (this.heightLine.length) {
      this.setHeightLine();
    }
  },
  data() {
    return {
      editor: null,
      i: -1,
      nextLine: 0,
      rows: [],
      nextRow: [],
      arr: [],
    };
  },
  methods: {
    onInit(editor) {
      this.editor = editor;
    },
    onInput(value) {
      this.$emit("input", value);
    },
    getCompletions(editor, session, pos, prefix, callback) {
      this.$emit("getCompletions", editor, session, pos, prefix, callback);
    },
    //根据行数高亮行
    setHeightLine() {
      setTimeout(() => {
        Array.from(
          this.$refs.ace_editor.$el.querySelectorAll(".ace_line")
        ).forEach((dom, index) => {
          this.heightLine.forEach((item) => {
            if (index + 1 === item) {
              dom.style.background = "#cad6fa";
            }
          });
        });
      }, 1000);
    },
    //单行点击
    rowClick(row, flag) {
      this.arr.push(row);
      if (flag) {
        this.nextRow.push(Number(row));
      } else {
        this.arr = this.arr.filter((v) => v !== row);
      }
      if (this.arr.includes(row)) {
        Array.from(
          this.$refs.ace_editor.$el.querySelectorAll(".ace_line")
        ).forEach((dom, index) => {
          if (index === row) {
            dom.style.background = "#FAEAE6";
          }
        });
      } else {
        Array.from(
          this.$refs.ace_editor.$el.querySelectorAll(".ace_line")
        ).forEach((dom, index) => {
          if (index === row) {
            dom.style.background = "transparent";
          }
        });
      }
      this.$emit(
        "rowClick",
        Number(row) + 1,
        this.editor.session.getLength(),
        flag
      );
    },
    //多行点击
    rowsClick(rows) {
      this.rows = rows;
    },
    //运行到指定行
    start() {
      this.i = this.i + 1;
      const rows = Number(this.rows[this.i]);
      this.$emit("start", 0);
      //if (isNaN(rows)) return;
      Array.from(
        this.$refs.ace_editor.$el.querySelectorAll(".ace_line")
      ).forEach((dom, index) => {
        if (index === rows) {
          dom.style.background = "#FAEAE6";
        } else {
          dom.style.background = "transparent";
        }
      });
      this.editor.gotoLine(rows + 1);
      // this.$emit("start", rows + 1);
    },
    //运行到下一行
    next() {
      if (isNaN(this.nextRow[0])) return;
      this.nextLine = this.nextLine + 1;
      let a = this.nextRow[0] + 1 + this.nextLine;
      Array.from(
        this.$refs.ace_editor.$el.querySelectorAll(".ace_line")
      ).forEach((dom, index) => {
        if (index + 1 === a) {
          dom.style.background = "#FAEAE6";
        } else {
          dom.style.background = "transparent";
        }
      });
      this.editor.gotoLine(a);
      if (a > this.editor.session.getLength()) {
        this.nextLine = 0;
      }
      this.$emit(
        "next",
        a > this.editor.session.getLength()
          ? this.editor.session.getLength()
          : a
      );
    },
    //停止
    stop() {
      this.i = -1;
      this.nextLine = 0;
      this.rows.forEach((v) => {
        this.editor.session.clearBreakpoint(v);
      });
      this.rows = [];
      this.nextRow = [];
      this.arr = [];
      Array.from(
        this.$refs.ace_editor.$el.querySelectorAll(".ace_line")
      ).forEach((dom, index) => {
        dom.style.background = "transparent";
      });
      this.$emit("stop");
    },
  },
};
</script>

<style lang="less">
@import "./index.less";
</style>
