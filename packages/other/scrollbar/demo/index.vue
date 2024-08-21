<template>
  <div style="height: 600px">
    <stms-scrollbar ref="scrollbar">
      <div style="height: 50px;background:#ccc" v-for="item in 40" :key="item">
        {{ item }}
      </div>
    </stms-scrollbar>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.$refs.scrollbar.moveTo(0, 200);
  },
  methods: {
  },
};
</script>
