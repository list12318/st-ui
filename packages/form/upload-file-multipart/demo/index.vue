<template>
  <stms-upload-file-multipart
    ref="global_uploade"
    :options="options"
    :mergeFile="mergeFile"
    @onFileSuccess="onFileSuccess"
  ></stms-upload-file-multipart>
</template>
<script>
export default {
  data() {
    return {
      options: {
        target: "/dataV/component/devResource/chunk", // 上传接口
        chunkSize: "100", // 上传数据大小
        fileParameterName: "upfile", // 文件参数名称
        maxChunkRetries: 3, // 最大上传次数
        testChunks: true,
      },
    };
  },
  mounted() {},
  methods: {
    async onFileSuccess(rootFile, file, response, chunk) {
      console.log(response);
      if (response) {
        const { status } = JSON.parse(response);
        if (status === "success") {
          this.$message({
            message: `文件上传成功`,
            type: "success",
          });
        } else {
          this.$message({
            message: `文件上传失败`,
            type: "error",
          });
        }
      }
    },
  },
};
</script>
