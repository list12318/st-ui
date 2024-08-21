<template>
  <stms-component-root>
    <el-button @click="click"> test </el-button>
    <div
      class="component-managementsystem-form-input-0-0-1"
      v-if="config"
      v-show="test"
      style="height: 40px; overflow: hidden"
    >
      <stms-component-form-item-wrap
        ref="form"
        :value="data"
        :config="config.form"
      >
        <el-input
          v-model="data"
          :disabled="config.disabled"
          :rows="config.rows"
          :placeholder="config.placeholder"
          :type="config.type"
          :resize="config.resize ? 'none' : ''"
          @change="change"
          :suffix-icon="config.icon"
          clearable
        >
        </el-input>
      </stms-component-form-item-wrap>
    </div>
  </stms-component-root>
</template>

<script>
export default {
  data() {
    return {
      config: {},
      data: "eeeeee",
      test: true,
    };
  },
  mounted() {
    this.config = {
      form: {
        size: "medium",
        field: "",
        labelPosition: "right",
        defaultValue: "",
        labelText: "输入框",
        labelWidth: 100,
        disabled: false,
        errorMessageStyle: "default",
        errorMessageStyleTooltipEffect: "dark",
        validate: [
          // {
          //   trigger: ["change"],
          //   type: "required",
          //   message: "请填写111",
          //   content: "-",
          // },
          // {
          //   trigger: ["change"],
          //   type: "min",
          //   message: "最小",
          //   content: "3",
          // },
          {
            trigger: ["change"],
            type: "max",
            message: "最大",
            content: "3",
          },
        ],
      },
      size: "medium",
      icon: "el-icon-c-scale-to-original",
      resize: true,
      disabled: false,
      placeholder: "输入框",
      rows: "2",
      type: "text",
    };
    setTimeout(() => {
      this.data = undefined;
      console.log(this.data);
    }, 3000);
  },
  methods: {
    click() {
      // this.test = false;
      this.$refs.form.validate();
      console.log("click");
    },
  },
};
</script>

<style lang="less"></style>
