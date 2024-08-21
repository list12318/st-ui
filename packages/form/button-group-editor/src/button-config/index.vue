<template>
  <el-dialog
    class="stms-button-group-editor-button-config-dialog"
    :close-on-click-modal="false"
    :visible.sync="visible"
    width="600px"
  >
    <span class="el-dialog__title" slot="title">
      按钮设计视图
      <span class="template"
        >使用配置模板：
        <el-button
          type="text"
          v-for="(item, index) in templateList"
          :key="index"
          @click="useTemplate(item)"
          >{{ item.text }}</el-button
        >
      </span>
    </span>
    <el-form
      ref="form"
      label-position="top"
      :rules="rules"
      :model="form"
      label-width="80px"
      :size="size"
    >
      <el-form-item label="按钮预览" prop="preview">
        <div class="preview">
          <el-button
            :type="form.type"
            :icon="form.icon"
            :size="form.size"
            :plain="form.plain"
            :round="form.round"
            :circle="form.circle"
            ><span v-if="form.text">{{ form.text }}</span></el-button
          >
        </div>
      </el-form-item>
      <el-form-item label="按钮基本信息" prop="text">
        <div class="info-raw">
          <el-input
            class="info-raw-text"
            v-model="form.text"
            placeholder="按钮文案"
            :size="size"
          />
          <el-select
            class="info-raw-type"
            v-model="form.icon"
            placeholder="按钮图标"
            :size="size"
            allow-create
            filterable
          >
            <el-option value="el-icon-plus" label="新建" />
            <el-option value="el-icon-edit" label="编辑" />
            <el-option value="el-icon-delete" label="删除" />
            <el-option value="el-icon-search" label="搜索" />
          </el-select>
          <el-select
            class="info-raw-type"
            v-model="form.type"
            placeholder="按钮类型"
            :size="size"
          >
            <el-option value="default" label="默认" />
            <el-option value="primary" label="普通" />
            <el-option value="success" label="成功" />
            <el-option value="warning" label="警告" />
            <el-option value="danger" label="危险" />
            <el-option value="info" label="信息" />
            <el-option value="text" label="文字" />
          </el-select>
          <el-select
            class="info-raw-size"
            v-model="form.size"
            placeholder="按钮尺寸"
            :size="size"
          >
            <el-option value="medium" label="中等" />
            <el-option value="small" label="小" />
            <el-option value="mini" label="迷你" />
          </el-select>
        </div>
        <div class="info-raw">
          <el-checkbox :size="size" v-model="form.plain">朴素按钮</el-checkbox>
          <el-checkbox :size="size" v-model="form.round">圆角按钮</el-checkbox>
          <el-checkbox :size="size" v-model="form.circle">圆形按钮</el-checkbox>
        </div>
      </el-form-item>
      <el-form-item label="按钮key" prop="key">
        <el-input
          v-model="form.key"
          placeholder="请填写按钮key"
          :size="size"
        />
      </el-form-item>
      <el-form-item label="点击事件类型" prop="clickType">
        <el-select
          v-model="form.clickType"
          placeholder="请选择点击事件类型"
          :size="size"
        >
          <el-option value="dialog-form" label="表单弹窗" />
          <el-option value="confirm" label="确认弹框" />
          <el-option value="custom" label="自定义处理" />
        </el-select>
      </el-form-item>
      <div class="config-content" v-if="form.clickType === 'dialog-form'">
        <el-form-item label="表单弹窗标题" prop="dialogFormProps.title">
          <el-input
            v-model="form.dialogFormProps.title"
            placeholder="请填写表单弹窗标题"
            :size="size"
          />
        </el-form-item>
        <el-form-item label="表单项配置" prop="dialogFormProps.schema">
          <stms-form-editor
            v-model="form.dialogFormProps.schema"
            :size="size"
          />
        </el-form-item>
      </div>
      <div class="config-content" v-if="form.clickType === 'confirm'">
        <el-form-item label="弹窗标题" prop="confirmProps.title">
          <el-input
            v-model="form.confirmProps.title"
            placeholder="请填写弹窗标题"
            :size="size"
          />
        </el-form-item>
        <el-form-item label="弹窗内容" prop="confirmProps.content">
          <el-input
            v-model="form.confirmProps.content"
            placeholder="请填写弹窗内容"
            :size="size"
          />
        </el-form-item>
        <el-form-item
          label="确认按钮文案"
          prop="confirmProps.confirmButtonText"
        >
          <el-input
            v-model="form.confirmProps.confirmButtonText"
            placeholder="请填写确认按钮文案"
            :size="size"
          />
        </el-form-item>
        <el-form-item label="取消按钮文案" prop="confirmProps.cancelButtonText">
          <el-input
            v-model="form.confirmProps.cancelButtonText"
            placeholder="请填写取消按钮文案"
            :size="size"
          />
        </el-form-item>
        <el-form-item label="弹窗颜色类型" prop="confirmProps.type">
          <el-select
            v-model="form.confirmProps.type"
            placeholder="请选择弹窗颜色类型"
            :size="size"
          >
            <el-option value="success" label="成功" />
            <el-option value="warning" label="警告" />
            <el-option value="info" label="信息" />
            <el-option value="error" label="错误" />
          </el-select>
        </el-form-item>
      </div>
      <el-form-item class="footer">
        <el-button @click="confirm" type="primary">
          保存
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import { CreateConfig, EditConfig, DeleteConfig } from "./template";

export default {
  props: {
    size: {
      type: String,
      required: false,
      default: "small",
    },
  },
  data() {
    return {
      visible: false,
      form: {},
      rules: {},
      templateList: [
        {
          text: "[新建]",
          config: CreateConfig,
        },
        {
          text: "[编辑]",
          config: EditConfig,
        },
        {
          text: "[删除]",
          config: DeleteConfig,
        },
      ],
    };
  },
  methods: {
    show(data) {
      this.visible = true;
      this.form = data || { dialogFormProps: {}, confirmProps: {} };
    },
    useTemplate(item) {
      this.form = item.config();
    },
    cancel() {
      this.visible = false;
    },
    confirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit("confirm", this.form, this.cancel);
        }
      });
    },
  },
};
</script>

<style lang="less">
@import "./index.less";
</style>
