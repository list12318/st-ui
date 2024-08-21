<template>
  <el-form
    :class="{
      'stms-simple-form': true,
      [fullScreen ? 'full' : 'common']: true,
    }"
    ref="form"
    :model="value"
    :label-position="labelPosition"
    :label-width="labelWidth"
    :size="size"
    :rules="rules"
    :disabled="disabled"
  >
    <stms-flex-layout direction="column" v-if="value">
      <template slot="wrap">
        <component :is="fullScreen ? 'stms-scrollbar' : 'div'">
          <div class="form-container">
            <template v-if="layout.length">
              <template v-if="formTabs.length">
                <el-tabs v-model="activeTab">
                  <el-tab-pane
                    v-for="item in formTabs"
                    :key="item.name"
                    :label="item.label"
                    :name="item.name"
                  ></el-tab-pane>
                </el-tabs>
              </template>
              <div class="form-layout">
                <template v-for="(item, index) in formLayout">
                  <component-item :key="index" :data="item" />
                </template>
              </div>
            </template>
            <template v-else-if="schema.length">
              <template v-for="(item, index) in schema">
                <el-form-item
                  :class="'form-item-' + item.prop"
                  :label="item.label + '：'"
                  :prop="item.prop"
                  :key="index"
                  v-if="isShow(item)"
                >
                  <stms-form-item-lib
                    :type="item.type"
                    :props="item.props"
                    :on="item.on"
                    :size="size"
                    :value="value[item.prop]"
                    @input="change(item.prop, ...arguments)"
                  />
                </el-form-item>
              </template>
            </template>
          </div>
        </component>
      </template>
      <el-form-item class="footer" v-if="showFooter" slot="append">
        <slot name="footer-button" />
        <el-button @click="cancel" v-if="showCancel">{{
          cancelText
        }}</el-button>
        <el-button type="primary" @click="confirm">{{ confirmText }}</el-button>
      </el-form-item>
    </stms-flex-layout>
    <slot />
  </el-form>
</template>

<script>
import ComponentItem from "./component-item";

export default {
  name: "stms-simple-form",
  components: { ComponentItem },
  provide() {
    return {
      $store: this,
    };
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
    schema: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
    layout: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    size: {
      type: String,
      required: false,
      default: "small",
    },
    labelWidth: {
      type: String,
      required: false,
      default: "80px",
    },
    labelPosition: {
      type: String,
      required: false,
      default: "top",
    },
    confirmText: {
      type: String,
      required: false,
      default: "确定",
    },
    cancelText: {
      type: String,
      required: false,
      default: "取消",
    },
    showFooter: {
      type: Boolean,
      required: false,
      default: true,
    },
    showCancel: {
      type: Boolean,
      required: false,
      default: true,
    },
    fullScreen: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    rules() {
      const rules = {};
      this.schema.forEach((v) => {
        if (v.rules) {
          rules[v.prop] = v.rules;
        }
      });
      return rules;
    },
    formTabs() {
      if (this.layout) {
        return this.layout
          .filter((v) => v.type === "tabs")
          .map((v) => {
            return {
              label: v.props.label,
              name: v.props.name || v.props.label,
              content: v.children,
            };
          });
      }
      return [];
    },
    formLayout() {
      if (this.layout) {
        if (this.formTabs.length) {
          const activeTab = this.formTabs.find(
            (v) => v.name === this.activeTab
          );
          return (activeTab && activeTab.content) || [];
        } else {
          return this.layout;
        }
      }
      return [];
    },

    isShow() {
      return (item) => {
        const { show, prop } = item;
        try {
          if (_.isUndefined(show)) {
            return true;
          }
          if (_.isBoolean(show)) {
            return show;
          }
          if (_.isFunction(show)) {
            return show(this.value[prop], this.value);
          }
          if (_.isString(show)) {
            const form = this.value;
            return eval(show);
          }
        } catch (e) {
          console.error(e);
        }
        return true;
      };
    },
    getValue() {
      return (prop) => {
        return this.getObjValue(this.value, prop);
      };
    },
  },
  data() {
    return {
      activeTab: null,
      isInit: false,
    };
  },
  mounted() {
    this.formTabs[0] && (this.activeTab = this.formTabs[0].name);
    this.isInit = true;
  },
  methods: {
    resetFields() {
      this.$refs.form.resetFields();
    },
    clearValidate() {
      this.$refs.form.clearValidate();
    },
    change(key, value) {
      this.setObjValue(this.value, key, value);
      this.$emit("input", this.value);
      if (this.isInit) {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$emit("change", this.value);
          }
        });
      }
    },
    confirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit("confirm", this.value);
        }
      });
    },
    cancel() {
      this.$emit("cancel");
    },
    setObjValue(data, key, value) {
      const arr = key.split(".");
      let obj = data;
      if (arr.length === 1) {
        Vue.set(obj, arr[0], value);
      } else {
        try {
          for (let i = 0; i < arr.length - 1; i++) {
            if (!obj[arr[i]]) {
              Vue.set(obj, arr[i], {});
            }
            obj = obj[arr[i]];
          }
          Vue.set(obj, arr[arr.length - 1], value);
        } catch (e) {}
      }
    },
    getObjValue(data, key) {
      const arr = key.split(".");
      let obj = data;
      if (arr.length === 1) {
        return obj[arr[0]];
      } else {
        try {
          for (let i = 0; i < arr.length - 1; i++) {
            if (!obj[arr[i]]) {
              obj[arr[i]] = {};
            }
            obj = obj[arr[i]];
          }
          return obj[arr[arr.length - 1]];
        } catch (e) {
          return null;
        }
      }
    },
  },
};
</script>

<style lang="less">
@import "./index.less";
</style>
