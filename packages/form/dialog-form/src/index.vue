<template>
  <el-dialog
    :close-on-click-modal="closeOnClickModal"
    :title="title"
    :visible.sync="visible"
    :width="width"
    :modal="modal"
  >
    <stms-simple-form
      ref="simpleForm"
      v-model="form"
      :schema="schema"
      :label-width="labelWidth"
      :size="size"
      @confirm="confirm"
      @cancel="cancel"
    />
  </el-dialog>
</template>

<script>
export default {
  name: "stms-dialog-form",
  props: {
    schema: {
      type: Array,
      required: true,
    },
    labelWidth: {
      type: String,
      required: false,
      default: "80px",
    },
    size: {
      type: String,
      required: false,
      default: "small",
    },
    title: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      required: false,
      default: "300px",
    },
    modal: {
      type: Boolean,
      required: false,
      default: true,
    },
    closeOnClickModal: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      visible: false,
      form: {},
    };
  },
  methods: {
    show(data) {
      this.visible = true;
      this.form = _.cloneDeep(data) || {};
      this.$nextTick(() => {
        this.$refs.simpleForm.clearValidate();
      });
    },
    cancel() {
      this.visible = false;
    },
    confirm(data) {
      this.$emit("confirm", data, this.cancel);
    },
  },
};
</script>

<style lang="less">
@import "./index.less";
</style>
