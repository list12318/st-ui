<template>
  <stms-rich-text-editor v-model="content" @input="change" />
</template>
<script>
export default {
  data() {
    return {
      content: "<p>asd王文强无      阿萨德sad</p>",
    };
  },
  mounted() {},
  methods: {
    change(e) {
      console.log(e);
    },
  },
};
</script>
