<template>
  <el-color-picker
    :predefine="predefine"
    popper-class="stms-color-picker-popper"
    v-bind="$attrs"
    v-on="$listeners"
    @active-change="activeChange"
  />
</template>
<script>
export default {
  name: "stms-color-picker",
  props: {
    predefine: {
      type: Array,
      required: false,
      default: function() {
        return [
          "#FFFFFF",
          "#000000",
          "#EEECE1",
          "#1F497D",
          "#4F81BD",
          "#C0504D",
          "#9BBB59",
          "#8064A2",
          "#4BACC6",
          "#F79646",
          "#F2F2F2",
          "#DDD9C3",
          "#C6D9F0",
          "#DBE5F1",
          "#F2DCDB",
          "#EBF1DD",
          "#E5E0EC",
          "#DBEEF3",
          "#FDEADA",
          "#D8D8D8",
          "#595959",
          "#C4BD97",
          "#B8CCE4",
          "#E5B9B7",
          "#D7E3BC",
          "#CCC1D9",
          "#B7DDE8",
          "#FBD5B5",
          "#BFBFBF",
          "#3F3F3F",
          "#938953",
          "#8DB3E2",
          "#95B3D7",
          "#D99694",
          "#C3D69B",
          "#B2A1C7",
          "#92CDDC",
          "#FAC08F",
          "#A5A5A5",
          "#262626",
          "#494429",
          "#17365D",
          "#366092",
          "#953734",
          "#76923C",
          "#5F497A",
          "#31859B",
          "#E36C09",
          "#7F7F7F",
          "#0c0c0c",
          "#1D1B10",
          "#0f243E",
          "#244061",
          "#632423",
          "#4F6128",
          "#3F3151",
          "#205867",
          "#974806",
        ];
      },
    },
  },
  methods: {
    activeChange(value) {
      this.$emit("input", value);
      this.$emit("change", value);
    },
  },
};
</script>

<style lang="less">
@import "./index.less";
</style>
