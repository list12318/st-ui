<template>
  <div class="stms-uploadImage">
    <el-input
      :value="value"
      :size="size"
      :disabled="disabled"
      :placeholder="placeholder"
      @input="onInput"
    >
      <el-upload
        :show-file-list="false"
        slot="append"
        :action="action"
        :data="data"
        :on-error="handleErr"
        :auto-upload="autoUpload"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        :on-change="onChange"
        :accept="uploadAccept"
      >
        <el-button icon="el-icon-upload2" :size="size"></el-button>
      </el-upload>
    </el-input>
    <div class="tools" v-if="showResource || clearable">
      <template v-if="showResource">
        <el-link type="primary" @click="showResourceDialog">
          打开资源仓库
        </el-link>
        <resource-form
          ref="resourceForm"
          :filterImage="filterImage"
          @change="changeResource"
        ></resource-form
      ></template>
      <template v-if="clearable">
        <el-link type="primary" @click="clear"> 清空 </el-link></template
      >
    </div>
    <div v-if="type === 'image'">
      <img v-if="value" class="image" :src="value" @error="getError" />
    </div>
  </div>
</template>
<script>
import ResourceForm from "./resource";

export default {
  name: "stms-upload-file",
  components: {
    ResourceForm,
  },
  props: {
    value: {
      type: String,
      required: true,
      default: "",
    },
    disabled: {
      type: Boolean,
      required: false,
      default: true,
    },
    autoUpload: {
      type: Boolean,
      required: false,
      default: true,
    },
    data: {
      type: Object,
      required: false,
      default: function () {
        return {};
      },
    },
    placeholder: {
      type: String,
      required: false,
      default: "请上传图片",
    },
    size: {
      type: String,
      required: false,
      default: "mini",
    },
    type: {
      type: String,
      required: false,
      default: "image",
    },
    accept: {
      type: String,
      required: false,
      default: "image/*",
    },
    action: {
      type: String,
      required: false,
      default: "/design/resource/uploadWebResource",
    },
    deleteUrl: {
      type: String,
      required: false,
      default: "/design/resource/deleting",
    },
    showResource: {
      type: Boolean,
      required: false,
      default: true,
    },
    clearable: {
      type: Boolean,
      required: false,
      default: true,
    },
    filterImage: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      fileId: null,
    };
  },
  computed: {
    uploadAccept() {
      if (this.type === "image") {
        return "image/*";
      }
      if (this.type === "video") {
        return "video/*";
      }
      return this.accept;
    },
  },
  methods: {
    handleErr(err) {
      this.$message.error("上传失败！");
    },
    // 判断图片不展示给默认图片
    getError(e) {
      if (e.type == "error") {
        e.target.src = require("./img/web-component.png");
      }
    },
    handleSuccess(response) {
      const { id, url } = response.content;
      this.fileId = id;
      this.$emit("input", url);
    },
    onChange(file) {
      this.$emit("change", file);
    },
    beforeUpload(file) {
      if (this.fileId) {
        dao.request({
          url: this.deleteUrl,
          params: {
            ids: this.fileId,
          },
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      return true;
    },
    onInput(value) {
      this.$emit("input", value);
    },
    showResourceDialog() {
      this.$refs.resourceForm.getPage();
    },
    changeResource(url) {
      this.$emit("input", url);
    },
    clear() {
      const dom = this.$refs.resourceForm;
      dom.groupId = "";
      dom.resource = [];
      this.$emit("input", "");
    },
  },
};
</script>

<style lang="less">
@import "./index.less";
</style>
