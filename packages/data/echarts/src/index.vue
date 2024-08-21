<template>
  <div class="echarts">
    <resize-observer @notify="handleResize" />
    <div class="charts" ref="echarts"></div>
  </div>
</template>

<script>
export default {
  name: "stms-chart",
  props: {
    option: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.chart = echarts.init(this.$refs.echarts);
    this.option && this.chart.setOption(this.option, true);
  },
  watch: {
    option(curVal, oldVal) {
      this.chart.clear();
      this.chart.setOption(curVal, true);
    },
  },
  methods: {
    handleResize() {
      this.chart.resize();
    },
  },
};
</script>

<style scoped>
.echarts,
.charts {
  height: 100%;
  width: 100%;
}
</style>
