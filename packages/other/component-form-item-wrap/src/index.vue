<template>
  <div
    class="stms-component-form-item-wrap"
    :style="wrapStyle"
    ref="wrap"
    v-if="wrapConfig"
    tabindex="-1"
  >
    <el-form
      :model="data"
      ref="form"
      :label-position="wrapConfig.labelPosition"
      :label-width="labelWidth"
      :size="wrapConfig.size"
      :rules="formRules"
      @submit.native.prevent
      @validate="onValidate"
    >
      <el-form-item prop="value" :label="wrapConfig.labelText">
        <template slot="error" slot-scope="scope">
          <tooltip
            :type="wrapConfig.errorMessageStyle"
            :content="scope.error"
            :effect="wrapConfig.errorMessageStyleTooltipEffect"
            :placement="wrapConfig.errorMessageStyleTooltipPlacement"
          />
        </template>
        <slot />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import tooltip from "./tooltip";
import { transferSchemaToLayout } from "./util";

export default {
  name: "stms-component-form-item-wrap",
  components: {
    tooltip,
  },
  props: {
    value: {
      type: [Object, Array, String, Number],
      required: false,
      default: null,
    },
    config: {
      type: Object,
      required: false,
      default: function () {
        return {};
      },
    },
  },
  watch: {
    config: {
      deep: true,
      handler() {
        this.wrapConfig = null;
        this.$nextTick(() => {
          this.wrapConfig = this.config;
          this.$nextTick(() => {
            if (this.value) {
              this.$refs.form.validate();
            }
          });
        });
      },
    },
  },
  data() {
    return {
      wrapConfig: null,
    };
  },
  computed: {
    data() {
      return {
        value: this.value,
      };
    },
    formRules() {
      if (!this.wrapConfig) {
        return null;
      }
      const { validate } = this.wrapConfig;
      const rules = (validate || []).map((v) => {
        const { type, message, content, trigger } = v;
        if (type === "required") {
          return {
            required: true,
            message,
            trigger,
          };
        }
        if (type === "pattern") {
          return {
            pattern: new RegExp(content),
            message,
            trigger,
          };
        }
        if (type === "min") {
          return {
            min: Number(content),
            message,
            trigger,
          };
        }
        if (type === "max") {
          return {
            max: Number(content),
            message,
            trigger,
          };
        }
        if (type === "custom") {
          return {
            validator: new Function(content)(),
            trigger,
          };
        }
      });
      return {
        value: rules,
      };
    },
    labelWidth() {
      const { labelWidth } = this.wrapConfig;
      if (!labelWidth) {
        return "auto";
      }
      if (!isNaN(Number(labelWidth))) {
        return labelWidth + "px";
      }
      return labelWidth;
    },
  },
  mounted() {
    this.wrapConfig = this.config;
    window.addEventListener("mousedown", this.clearValidate);
  },
  beforeDestroy() {
    this.$refs.form.clearValidate();
    window.removeEventListener("mousedown", this.clearValidate);
  },
  methods: {
    clearValidate() {
      this.$refs.form.clearValidate();
    },
    validate(callback) {
      this.$refs.form.validate(callback);
    },
    transferSchemaToLayout(schema) {
      return transferSchemaToLayout(schema);
    },
    onValidate(props, isValid, message) {},
  },
};
</script>

<style lang="less">
@import "./index.less";
</style>
