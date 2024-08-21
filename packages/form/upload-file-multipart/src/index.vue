<template>
  <div class="simple-uploader">
    <!-- 上传 -->
    <uploader
      ref="uploader"
      :options="options"
      :autoStart="false"
      @file-added="onFileAdded"
      @file-success="onFileSuccess"
      @file-progress="onFileProgress"
      @file-error="onFileError"
      class="uploader-app"
    >
      <uploader-unsupport></uploader-unsupport>
      <uploader-btn
        style="background-color: #409eff;border-color: #409eff;color: #fff;"
        id="global-uploader-btn"
        :attrs="attrs"
        ref="uploadBtn"
        >选择文件</uploader-btn
      >
      <uploader-list v-show="panelShow">
        <div class="file-panel" :class="{ collapse: collapse }">
          <ul class="file-list">
            <li v-for="file in fileList" :key="file.id">
              <uploader-file
                :class="'file_' + file.id"
                ref="files"
                :file="file"
                :list="true"
              >
              </uploader-file>
            </li>
            <div class="no-file" v-if="!fileList.length">
              <i class="iconfont icon-empty-file"></i> 暂无待上传文件
            </div>
          </ul>
        </div>
      </uploader-list>
    </uploader>
  </div>
</template>
<script>
import SparkMD5 from "spark-md5";
import uploader from "vue-simple-uploader";
export default {
  name: "stms-upload-file-multipart",
  props: {
    options: {
      type: Object,
      required: true,
      default: function() {
        return {
          target: "", // 目标上传 URL
          chunkSize: "", //分块大小
          fileParameterName: "", //上传文件时文件的参数名，默认file
          maxChunkRetries: "", //最大自动失败重试上传次数
          testChunks: true, //是否开启服务器分片校验
          checkChunkUploadedByResponse: function(chunk, message) {
            // 服务器分片校验函数，秒传及断点续传基础
            var objMessage = {};
            try {
              objMessage = JSON.parse(message);
            } catch (e) {}
            return (
              (objMessage.content.uploaded || []).indexOf(chunk.offset + 1) >= 0
            );
          },
          headers: {
            token: "",
          },
        };
      },
    },
    panelShow: {
      type: Boolean,
      required: true,
      default: function() {
        return false;
      },
    },
    accept: {
      type: Array,
      required: true,
      default: function() {
        return [
          ".doc",
          ".docx",
          ".xls",
          ".xlsx",
          ".ppt",
          ".pptx",
          ".pdf",
          ".txt",
          ".png",
          ".jpg",
          ".jpeg",
          ".gif",
        ];
      },
    },
  },
  data() {
    return {
      collapse: false,
      fileList: [],
    };
  },
  computed: {
    attrs() {
      return {
        accept: (this.accept || []).join(","),
      };
    },
    uploader() {
      return this.$refs.uploader.uploader;
    },
  },
  methods: {
    //添加文件
    onFileAdded(file) {
      this.options.fileParameterName = file.name;
      this.file = file;
      this.fileList.push(file);
      if (this.fileList.length > 1) {
        this.fileList = [this.fileList[this.fileList.length - 1]];
      } else {
        this.fileList = [file];
      }

      this.panelShow = true;
      this.computeMD5(file);
    },
    // 文件进度的回调
    onFileProgress(rootFile, file, chunk) {
      console.log(
        `上传中 ${file.name}，chunk：${chunk.startByte /
          1024 /
          1024} ~ ${chunk.endByte / 1024 / 1024}`
      );
    },
    // 分片上传成功
    onFileSuccess(rootFile, file, response, chunk) {
      this.$emit("onFileSuccess", rootFile, file, response, chunk);
    },
    onFileError(rootFile, file, response, chunk) {
      this.$message({
        message: response,
        type: "error",
      });
    },
    /**
     * 计算md5，实现断点续传及秒传
     */
    computeMD5(file) {
      let fileReader = new FileReader();
      let time = new Date().getTime();
      let blobSlice =
        File.prototype.slice ||
        File.prototype.mozSlice ||
        File.prototype.webkitSlice;
      let currentChunk = 0;
      const chunkSize = 10 * 1024 * 1000;
      let chunks = Math.ceil(file.size / chunkSize);
      let spark = new SparkMD5.ArrayBuffer();
      file.pause();
      loadNext();
      fileReader.onload = (e) => {
        spark.append(e.target.result);
        if (currentChunk < chunks) {
          currentChunk++;
          loadNext();
        } else {
          let md5 = spark.end();
          this.computeMD5Success(md5, file);
        }
      };
      fileReader.onerror = function() {
        this.$message({
          message: `文件${file.name}读取出错，请检查该文件`,
          type: "error",
        });
        file.cancel();
      };

      function loadNext() {
        let start = currentChunk * chunkSize;
        let end =
          start + chunkSize >= file.size ? file.size : start + chunkSize;
        fileReader.readAsArrayBuffer(blobSlice.call(file.file, start, end));
      }
    },
    computeMD5Success(md5, file) {
      // 将自定义参数直接加载uploader实例的opts上
      Object.assign(this.uploader.opts, {
        query: {
          ...this.params,
        },
      });
      file.uniqueIdentifier = md5;
      file.resume();
    },
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
