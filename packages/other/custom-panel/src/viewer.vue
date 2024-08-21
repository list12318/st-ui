<template>
  <stms-viewer ref="viewer" />
</template>

<script>
export default {
  props: ["appId"],
  mounted() {
    this.$refs.viewer.init({
      systemInfo: {
        appId: this.appId,
      },
    });
  },
};
</script>
