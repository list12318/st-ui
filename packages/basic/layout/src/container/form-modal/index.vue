<template>
  <el-dialog
    class="common-layout-form-modal"
    :title="title"
    :visible.sync="visible"
    :close-on-click-modal="false"
    :width="width"
    destroy-on-close
  >
    <stms-simple-form
      v-model="data"
      ref="form"
      :label-width="labelWidth"
      :label-position="labelPosition"
      :show-cancel="showCancel"
      :schema="schema"
      :confirm-text="confirmText"
      :cancel-text="cancelText"
      @cancel="cancel"
      @confirm="confirm"
    />
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      data: {},
      schema: [],
      title: "",
      width: "600px",
      labelWidth: "80px",
      labelPosition: "right",
      showCancel: true,
      confirmText: "保存",
      cancelText: "取消",
      onConfirm: () => {}
    };
  },
  methods: {
    show(options) {
      const {
        data,
        schema,
        title,
        width,
        labelWidth,
        labelPosition,
        showCancel,
        confirmText,
        cancelText,
        onConfirm
      } = options;
      this.visible = true;
      this.data = {};
      this.schema = schema;
      this.title = title;
      this.width = width || "600px";
      this.labelWidth = labelWidth || "80px";
      this.labelPosition = labelPosition || "right";
      this.showCancel = showCancel;
      this.confirmText = confirmText;
      this.cancelText = cancelText;
      this.onConfirm = onConfirm;
      this.$nextTick(() => {
        this.data = _.cloneDeep(data);
        this.$refs.form && this.$refs.form.resetFields();
      });
    },
    cancel() {
      this.visible = false;
    },
    confirm() {
      this.onConfirm({
        data: this.data,
        close: () => {
          this.visible = false;
        }
      });
    }
  }
};
</script>

<style lang="less">
.common-layout-form-modal {
  .el-dialog__header {
    height: 39px;
    padding: 8px 20px 9px 18px;
    background: #3a84ff;
    border-bottom: 1px solid #d2d2d2;
    font-size: 16px;
  }
  .el-dialog__header .el-dialog__headerbtn {
    position: absolute;
    top: 10px;
    right: 20px;
    padding: 0;
    background: 0 0;
    border: none;
    outline: 0;
    cursor: pointer;
    font-size: 16px;
  }
  .el-dialog__title {
    font-weight: 400;
    letter-spacing: 1px;
    color: #fff;
    font-size: 16px;
  }
  .el-dialog {
    width: 438px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .el-dialog__footer .el-button {
    width: 80px;
    height: 32px;
    background: #3a84ff;
    border-radius: 4px;
    border: 1px solid #3a84ff;
  }

  .el-dialog__body {
    padding: 40px 41px 0 35px;
  }
  .el-dialog__footer {
    padding: 10px 41px 30px;
  }
  .el-dialog__body .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
  .el-dialog__body .el-form-item__label {
    padding: 0 10px 10px 0;
    color: #61666e;
    font-size: 12px;
  }
  .el-dialog__body .el-form-item__content {
    margin-bottom: 0 !important;
  }
  .el-dialog__body .automargin .el-form-item--small.el-form-item {
    margin-bottom: 10px !important;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .el-form-item.footer .el-button {
    width: 80px;
    height: 32px;
    border-radius: 4px;
  }
  .el-form-item.footer .el-button.el-button--primary {
    background: #3a84ff;
    border: 1px solid #3a84ff;
    color: #fff;
  }
}
</style>
