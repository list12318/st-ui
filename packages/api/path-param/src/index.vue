<template>
  <!-- body内容 -->
  <el-form :model="value" ref="form" class="pathParam">
    <el-radio-group
      :value="value.type"
      @input="changeRow(...arguments, value)"
      class="tool"
    >
      <el-radio label="0">json</el-radio>
      <!-- <el-radio label="1">form</el-radio>
      <el-radio label="2">file</el-radio> -->
      <el-radio label="3">raw</el-radio>
    </el-radio-group>
    <div v-if="value.type == '3'">
      <stms-ace-editor
        :value="raw"
        @input="changeRaw"
        mode="json"
        width="100%"
        height="335px"
      />
    </div>
    <div class="treeScroll" v-else>
      <el-tree
        class="postData"
        :data="value.param"
        node-key="treeId"
        :default-expand-all="true"
        :expand-on-click-node="false"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>
            <el-input
              show-word-limit
              type="text"
              maxlength="50"
              :value="data.name"
              @input="changeName(...arguments, data)"
              class="width"
              :disabled="data.treeId == '-1'"
            ></el-input>
            <el-select
              class="selectWidth"
              :value="data.dataType"
              @input="changeType(...arguments, data)"
              :disabled="data.treeId == '-1'"
            >
              <el-option
                v-for="item in typeList"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
            <el-select
              filterable
              placeholder="必填"
              class="selectWidth"
              :value="data.required"
              @input="changeRequired(...arguments, data)"
              :disabled="data.treeId == '-1'"
            >
              <el-option value="1" label="是"></el-option>
              <el-option value="0" label="否"></el-option>
            </el-select>
            <el-input
              show-word-limit
              type="text"
              placeholder="说明"
              maxlength="100"
              class="width"
              :value="data.des"
              @input="changeDes(...arguments, data)"
              :disabled="data.treeId == '-1'"
            ></el-input>
            <!-- 默认input -->
            <el-input
              show-word-limit
              type="text"
              maxlength="50"
              placeholder="值"
              v-if="
                ['timestamp', 'time', 'date'].indexOf(data.dataType) == -1 &&
                  data.des != 'between'
              "
              :value="data.defaultValue"
              @input="changeDefaultValue(...arguments, data)"
              :disabled="data.treeId == '-1'"
              class="width"
            >
            </el-input>
            <!-- 默认日历插件 -->
            <el-date-picker
              type="date"
              value-format="yyyy-MM-dd"
              class="el-date width"
              v-else
              :disabled="data.treeId == '-1'"
              :value="data.defaultValue"
              @input="changeDefaultValue(...arguments, data)"
            ></el-date-picker>
          </span>
          <span class="tools">
            <i
              class="el-icon-plus"
              v-show="data.dataType == 'object'"
              @click="add(data)"
            ></i>
            <i
              class="el-icon-close"
              @click="() => deleting(node, data)"
              v-if="data.treeId != '-1'"
            ></i>
          </span>
        </span>
      </el-tree>
    </div>
  </el-form>
</template>

<script>
export default {
  name: "stms-api-design-path-param",
  props: {
    value: {
      type: Object,
      required: true,
      default: function() {
        return {
          type: "",
          param: [],
        };
      },
    },
  },
  data() {
    return {
      raw: "",
      // 数据类型
      typeList: [
        "string",
        "int",
        "object",
        "char",
        "short",
        "long",
        "float",
        "double",
        "boolean",
        "byte",
        "json",
        "array",
        "file",
        "timestamp",
        "time",
        "date",
      ],
    };
  },
  mounted() {
    this.init();
    if (this.value.type === "3") {
      this.raw = this.value.param;
    }
  },
  methods: {
    init() {
      if (!this.value.param.length && this.value.type !== "3") {
        this.value.param.push({
          name: "root",
          dataType: "object",
          des: "",
          children: [],
          treeId: "-1",
          required: "1",
          defaultValue: "",
        });
        // this.value.type = "0";
        this.$emit("input", this.value);
      }
    },
    add(data) {
      if (!data.children) {
        this.$set(data, "children", []);
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          data.children.push({
            name: "",
            dataType: "object",
            required: "",
            des: "",
            defaultValue: "",
            treeId: "tree_node" + Date.now(),
            treeParentId: data.treeId,
            children: [],
          });
          this.$emit("input", this.value);
        }
      });
    },
    deleting(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.treeId === data.treeId);
      children.splice(index, 1);
    },
    changeRow(value, item) {
      item.type = value;
      this.value.param = [];
      this.init();
      this.$emit("input", this.value);
    },
    changeRaw(value) {
      this.raw = value;
      this.value.param = value;
      this.$emit("input", this.value);
    },
    changeName(value, item) {
      item.name = value;
      this.$emit("input", this.value);
    },
    changeType(value, item) {
      item.dataType = value;
      this.$emit("input", this.value);
    },
    changeRequired(value, item) {
      item.required = value;
      this.$emit("input", this.value);
    },
    changeDes(value, item) {
      item.des = value;
      this.$emit("input", this.value);
    },
    changeDefaultValue(value, item) {
      item.defaultValue = value;
      this.$emit("input", this.value);
    },
  },
};
</script>

<style lang="less">
.pathParam {
  .el-select {
    width: auto !important;
  }
  .tool {
    margin-left: 1%;
  }
  .treeScroll {
    overflow-y: auto;
    height: 370px;
    background: #fff;
    .postData {
      padding-top: 3px;
      display: inline-block;

      .selectWidth {
        width: 100px !important;
        margin-left: 10px;
      }

      .width {
        width: 160px;
        margin-left: 10px;
      }

      .tools {
        margin-left: 10px;
        width: 40px;
        display: inline-flex;
        justify-content: space-between;
      }

      .el-tree-node__content {
        height: 32px;
        margin: 8px 0;
        background: #fff;
      }

      .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
      }
    }
  }
}
</style>
