<template>
  <div class="stms-rich-text-editor">
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
      v-loading="loading"
    ></quill-editor>
    <!-- 文件上传input 将它隐藏-->
    <el-upload
      class="upload"
      :action="action"
      :data="data"
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
      ref="upload"
      :accept="uploadAccept"
    >
      <el-button
        size="small"
        type="primary"
        id="imgInput"
        v-loading.fullscreen.lock="fullscreenLoading"
        element-loading-text="插入中,请稍候"
        >点击上传</el-button
      >
    </el-upload>
  </div>
</template>

<script>
// 富文本编辑器
import { quillEditor, Quill } from "vue-quill-editor";
import ImageResize from "quill-image-resize-module";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

Quill.register("modules/imageResize", ImageResize);

const FontFamily = [
  "Microsoft-YaHei",
  "SimSun",
  "SimHei",
  "KaiTi",
  "Arial",
  "Times-New-Roman",
];
const QuillFontFamily = Quill.import("formats/font");
QuillFontFamily.whitelist = FontFamily;
Quill.register(QuillFontFamily, true);

const FontSize = [
  "10px",
  "12px",
  "14px",
  "16px",
  "20px",
  "24px",
  "36px",
  false,
];
const QuillFontSize = Quill.import("attributors/style/size");
QuillFontSize.whitelist = FontSize;
Quill.register(QuillFontSize, true);

export default {
  name: "stms-rich-text-editor",
  components: {
    quillEditor,
  },
  props: {
    prefix: {
      type: [String],
    },
    value: {},
  },
  data() {
    return {
      action: "/design/resource/uploadWebResource",
      data: {},
      editorOption: {
        theme: "snow",
        modules: {
          imageResize: {
            displayStyles: {
              backgroundColor: "black",
              border: "none",
              color: "white",
            },
            modules: ["Resize", "DisplaySize", "Toolbar"],
          },
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],

            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],

            [{ size: FontSize }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],

            [{ color: [] }, { background: [] }],
            [{ font: FontFamily }], //把上面定义的字体数组放进来

            [{ align: [] }],

            ["clean"],
            ["image", "video"],
          ],
        },
        placeholder: "输入内容........",
      }, // 编辑器选项
      addRange: [],
      uploadType: "", // 上传的文件类型（图片、视频）
      fullscreenLoading: false,
      loading: false,
    };
  },
  computed: {
    content: {
      get: function () {
        return this.value;
      },
      set: function (val) {
        this.$emit("input", val);
      },
    },
    uploadAccept() {
      if (this.uploadType === "image") {
        return "image/*";
      }
      if (this.uploadType === "video") {
        return "video/*";
      }
      return this.accept;
    },
  },
  // 页面加载后执行 为编辑器的图片图标和视频图标绑定点击事件
  mounted() {
    const quill = this.$refs.myQuillEditor.quill;
    // 为图片ICON绑定事件  getModule 为编辑器的内部属性
    quill.getModule("toolbar").addHandler("image", this.imgHandler);
    quill.getModule("toolbar").addHandler("video", this.videoHandler); // 为视频ICON绑定事件

    //  自定义粘贴图片功能
    quill.root.addEventListener(
      "paste",
      (evt) => {
        if (
          evt.clipboardData &&
          evt.clipboardData.files &&
          evt.clipboardData.files.length
        ) {
          return;
        }
      },
      false
    );
  },
  methods: {
    // 图片上传之前调取的函数
    beforeUpload(file) {
      if ((this.uploadType = "image")) {
        if (file.size > 200 * 1024) {
          this.$message.error(`上传图片大小不能超过200kB`);
          this.$refs.upload.clearFiles();
          return false;
        }
      } else {
        if (file.size > 30 * 1024 * 1024) {
          this.$message.error(`上传视频大小不能超过30MB`);
          this.$refs.upload.clearFiles();
          return false;
        }
      }
      return true;
    },
    handleSuccess(response) {
      const { url } = response.content;
      this.addMedia(url);
    },

    addMedia(url) {
      this.fullscreenLoading = false;
      if (url != null && url.length > 0) {
        this.addRange = this.$refs.myQuillEditor.quill.getSelection();
        const res = this.$refs.myQuillEditor.quill.insertEmbed(
          this.addRange !== null ? this.addRange.index : 0,
          this.uploadType,
          url,
          Quill.sources.USER
        ); // 调用编辑器的 insertEmbed 方法，插入URL
        setTimeout(() => {
          const u = url.replace(/&/g, "&amp;");
          const str = `<img src="${u}">`;
          this.content = this.content.replace(
            str,
            `<img src="${u}" width="100%"/>`
          );
        });
      } else {
        this.$message.error(`${this.uploadType}插入失败`);
      }
      this.$refs["upload"].clearFiles(); // 插入成功后清除input的内容
    },
    // 点击图片ICON触发事件
    imgHandler(state) {
      this.uploadType = "image";
      this.addRange = this.$refs.myQuillEditor.quill.getSelection();
      if (state) {
        let fileInput = document.getElementById("imgInput");
        setTimeout(() => {
          fileInput.click(); // 加一个触发事件
        });
      }
    },

    // 点击视频ICON触发事件
    videoHandler(state) {
      this.uploadType = "video";
      this.addRange = this.$refs.myQuillEditor.quill.getSelection();
      if (state) {
        let fileInput = document.getElementById("imgInput");
        setTimeout(() => {
          fileInput.click(); // 加一个触发事件
        });
      }
    },

    // 编辑器光标离开 将编辑器内容发射给父组件
    onEditorBlur(editor) {
      this.$emit("onChange", this.content);
    },

    // 编辑器获得光标
    onEditorFocus(editor) {
      editor.enable(true); // 实现达到上限字符可删除
    },

    // 编辑器文本发生变化
    onEditorChange({ editor, html, text }) {
      let textLength = text.length;
      if (textLength > 10000) {
        this.$message.error("最多输入10000个字符");
        editor.enable(false);
      }
      this.$emit("onChange", this.content);
    },
  },
};
</script>

<style lang="less">
@import "./index.less";
</style>
