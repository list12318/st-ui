<template>
  <div class="stms-ace-editor">
    <resize-observer @notify="handleResize" />
    <ace-editor
      ref="ace_editor"
      :value="value"
      :lang="mode"
      :width="width"
      :height="height"
      @input="onInput"
      @init="onInit"
      @rowClick="rowClick"
      @rowsClick="rowsClick"
    />
    <div class="line" @mousedown="mousedown"></div>
  </div>
</template>

<script>
import AceEditor from "./vue-ace-editor";
import ace from "brace";
import "brace/theme/cobalt";
import "brace/theme/eclipse";
import "brace/theme/pastel_on_dark";
import "brace/theme/solarized_dark";
import "brace/theme/ambiance";
import "brace/theme/idle_fingers";
import "brace/theme/tomorrow";
import "brace/theme/tomorrow_night";
import "brace/ext/language_tools";
import "brace/ext/searchbox";

import "brace/mode/json";
import "brace/mode/xml";
import "brace/mode/html";
import "brace/mode/css";
import "brace/mode/less";
import "brace/mode/javascript";
import "brace/mode/java";
// import "brace/mode/python";
import "brace/mode/mysql";
import "brace/mode/yaml";

import "brace/snippets/json";
import "brace/snippets/xml";
import "brace/snippets/html";
import "brace/snippets/css";
import "brace/snippets/javascript";
import "brace/snippets/java";
// import "brace/snippets/python";
import "brace/snippets/mysql";
import "brace/snippets/yaml";

import beautify from "js-beautify";

export default {
  name: "stms-ace-editor",
  components: { AceEditor },
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
    theme: {
      type: String,
      required: false,
      default: "tomorrow",
    },
    autoCompletePopupWidth: {
      type: String,
      required: false,
      default: null,
    },
    keyboardHandler: {
      type: Array,
      required: false,
      default: function () {
        return [];
      },
    },
  },
  methods: {
    onInput(value) {
      this.$emit("input", value);
    },
    onInit(editor) {
      editor.setOptions({
        // maxLines: Infinity,
        // minLines: 7,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        // enableSnippets: true,
        theme: `ace/theme/${this.theme}`,
      });
      if (this.readOnly) {
        editor.setReadOnly(true);
      }
      if (this.autoComplete) {
        editor.completers = [...editor.completers];
        editor.completers.push({
          maxLength: 100,
          identifierRegexps: [/[a-zA-Z_0-9\.\$\-\u00A2-\uFFFF]/],
          getCompletions: (editor, session, pos, prefix, callback) => {
            this.$emit(
              "getCompletions",
              editor,
              session,
              pos,
              prefix,
              (v1, v2) => {
                const completions = v2
                  .filter((v) =>
                    v.caption.toLowerCase().includes(prefix.toLowerCase())
                  )
                  .slice(0, 50);
                callback(v1, completions);
                if (
                  editor.completer &&
                  editor.completer.popup &&
                  editor.completer.popup.container
                ) {
                  const { container, data } = editor.completer.popup;
                  if (this.autoCompletePopupWidth) {
                    container.style.width = this.autoCompletePopupWidth;
                  } else {
                    if (data.length) {
                      const textDom = document.createElement("span");
                      textDom.style.display.none;
                      document.body.appendChild(textDom);
                      const lengthList = data.map((v) => {
                        const caption = v.caption || v.name || "";
                        const meta = v.meta || "";
                        textDom.innerHTML = caption + meta;
                        return textDom.offsetWidth;
                      });
                      const max = Math.max(...lengthList);
                      container.style.width = max + 60 + "px";
                      document.body.removeChild(textDom);
                    }
                  }
                }
              }
            );
          },
        });
      }
      this.$nextTick(() => {
        editor.getSession().setUndoManager(new ace.UndoManager());
      });
      this.editor = editor;
      this.initBeautify();
      this.initKeyboardHandler();
      this.$emit("init", editor);
    },
    initKeyboardHandler() {
      if (this.keyboardHandler.length) {
        const { HashHandler } = ace.acequire("ace/keyboard/hash_handler");
        this.editor.keyBinding.addKeyboardHandler(
          new HashHandler(this.keyboardHandler)
        );
      }
    },
    initBeautify() {
      const { HashHandler } = ace.acequire("ace/keyboard/hash_handler");
      this.editor.keyBinding.addKeyboardHandler(
        new HashHandler([
          {
            name: "beautify",
            exec: (editor) => {
              this.beautify();
            },
            bindKey: "Alt-Shift-F",
          },
        ])
      );
      // beautify(this.editor.session);
    },
    beautify() {
      const beautifyFn = {
        javascript: beautify.js,
        css: beautify.css,
        less: beautify.css,
        html: beautify.html,
      };
      const fn = beautifyFn[this.mode];
      if (fn) {
        const text = this.editor.session.doc.getValue();
        const code = fn(text);
        this.editor.session.doc.setValue(code);
      }
    },
    rowClick(row, flag) {
      this.$emit("rowClick", row, flag);
    },
    rowsClick(rows) {
      this.$emit("rowsClick", rows);
    },
    //拖动框大小
    mousedown(e) {
      const { pageY } = e;
      const height = Number(_.split(this.height, "p", 1)); //如果携带单位则截取
      const mousemove = (ev) => {
        const newHeight = height + (ev.pageY - pageY);
        if (newHeight >= 200 && newHeight <= document.body.clientHeight - 46) {
          this.height = newHeight;
        }
      };
      const mouseup = (e) => {
        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);
        this.editor.resize();
      };
      window.addEventListener("mousemove", mousemove);
      window.addEventListener("mouseup", mouseup);
    },
    getCompletionPrefix() {
      const { editor } = this;
      const pos = editor.getCursorPosition();
      const line = editor.session.getLine(pos.row);
      let prefix;
      const retrievePrecedingIdentifier = function (text, pos, regex) {
        regex = regex || ID_REGEX;
        var buf = [];
        for (var i = pos - 1; i >= 0; i--) {
          if (regex.test(text[i])) buf.push(text[i]);
          else break;
        }
        return buf.reverse().join("");
      };
      editor.completers.forEach(
        function (completer) {
          if (completer.identifierRegexps) {
            completer.identifierRegexps.forEach(
              function (identifierRegex) {
                if (!prefix && identifierRegex)
                  prefix = retrievePrecedingIdentifier(
                    line,
                    pos.column,
                    identifierRegex
                  );
              }.bind(this)
            );
          }
        }.bind(this)
      );
      return prefix || retrievePrecedingIdentifier(line, pos.column);
    },
    handleResize() {
      this.editor.resize();
    },
  },
};
</script>

<style lang="less">
@import "./index.less";
</style>
