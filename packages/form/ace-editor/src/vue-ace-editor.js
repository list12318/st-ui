import ace from "brace";

export default {
  render: function(h) {
    var height = this.height ? this.px(this.height) : "100%";
    var width = this.width ? this.px(this.width) : "100%";
    return h("div", {
      attrs: {
        style: "height: " + height + "; width: " + width,
      },
    });
  },
  props: {
    value: String,
    lang: true,
    height: true,
    width: true,
    options: Object,
  },
  data: function() {
    return {
      editor: null,
      contentBackup: "",
    };
  },
  methods: {
    px: function(n) {
      if (/^\d*$/.test(n)) {
        return n + "px";
      }
      return n;
    },
  },
  watch: {
    value: function(val) {
      if (this.contentBackup !== val) {
        this.editor.session.setValue(val, 1);
        this.contentBackup = val;
      }
    },
    lang: function(newLang) {
      this.editor
        .getSession()
        .setMode(typeof newLang === "string" ? "ace/mode/" + newLang : newLang);
    },
    options: function(newOption) {
      this.editor.setOptions(newOption);
    },
    height: function() {
      this.$nextTick(function() {
        this.editor.resize();
      });
    },
    width: function() {
      this.$nextTick(function() {
        this.editor.resize();
      });
    },
  },
  beforeDestroy: function() {
    this.editor.destroy();
    this.editor.container.remove();
  },
  mounted: function() {
    var vm = this;
    var lang = this.lang || "text";

    require("brace/ext/emmet");

    var editor = (vm.editor = ace.edit(this.$el));
    editor.$blockScrolling = Infinity;
    this.$emit("init", editor);

    //editor.setOption("enableEmmet", true);
    editor
      .getSession()
      .setMode(typeof lang === "string" ? "ace/mode/" + lang : lang);
    if (this.value) editor.setValue(this.value, 1);
    this.contentBackup = this.value;

    editor.on("change", function() {
      var content = editor.getValue();
      vm.$emit("input", content);
      vm.contentBackup = content;
    });
    editor.on("guttermousedown", function(e) {
      var target = e.domEvent.target;
      var flag = false;
      if (target.className.indexOf("ace_gutter-cell") == -1) return;
      if (!editor.isFocused()) return;
      if (e.clientX > 25 + target.getBoundingClientRect().left) return;
      var row = e.getDocumentPosition().row;
      var breakpoints = e.editor.session.getBreakpoints(row, 0);
      if (typeof breakpoints[row] === typeof undefined) {
        e.editor.session.setBreakpoint(row);
        flag = true;
      } else {
        e.editor.session.clearBreakpoint(row);
        flag = false;
        e.stop();
      }
      vm.$emit("rowClick", row, flag); //单行点击事件
      vm.$emit("rowsClick", Object.keys(breakpoints)); //所有行节点
    });

    if (vm.options) editor.setOptions(vm.options);
  },
};
