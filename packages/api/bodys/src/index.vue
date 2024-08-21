<template>
  <!-- body内容 -->
  <el-form :model="{ value }" ref="form" class="bodys">
    <el-radio-group
      :value="value.type"
      @input="changeRow(...arguments, value)"
      class="tool"
    >
      <el-radio label="0">json</el-radio>
      <!-- <el-radio label="1">form</el-radio>
      <el-radio label="2">file</el-radio> -->
      <el-radio label="3">raw</el-radio>
      <el-radio label="4">text</el-radio>
    </el-radio-group>
    <!-- raw -->
    <div v-if="value.type == '3'">
      <stms-ace-editor
        :value="raw"
        @input="changeRaw"
        mode="json"
        width="100%"
        height="335px"
      />
    </div>
    <!-- 文件上传 -->
    <div v-if="value.type == '4'">
      <el-button type="primary" icon="plus" class="btn" @click="addFile"
        >添加</el-button
      >
      <el-table :data="value.param" height="370">
        <el-table-column type="index" label="序号" width="70"></el-table-column>
        <el-table-column label="名称">
          <template slot-scope="scope">
            <el-form-item
              :prop="'value.' + 'param.' + scope.$index + '.name'"
              :rules="[
                { required: true, message: '请输入名称' },
                {
                  pattern: /^[\u4E00-\u9FA50-9a-zA-Z_\-.]+$/,
                  message: '请勿输入特殊字符',
                },
              ]"
            >
              <el-input
                show-word-limit
                type="text"
                placeholder="请输入名称"
                :value="scope.row.name"
                @input="changeFileName(...arguments, scope.row)"
                maxlength="50"
              ></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="数据类型" width="150">
          <template slot-scope="scope">
            <el-select
              :value="scope.row.dataType"
              @input="changeFileType(...arguments, scope.row)"
              placeholder="数据类型"
              filterable
            >
              <el-option v-for="item in fileTypeList" :key="item" :value="item">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="必填" width="100">
          <template slot-scope="scope">
            <el-select
              :value="scope.row.required"
              @input="changeFileRequired(...arguments, scope.row)"
              filterable
              placeholder="必填"
            >
              <el-option value="1" label="是"></el-option>
              <el-option value="0" label="否"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="说明">
          <template slot-scope="scope">
            <el-input
              show-word-limit
              type="text"
              placeholder="说明"
              :value="scope.row.des"
              @input="changeFileDes(...arguments, scope.row)"
              maxlength="100"
            >
            </el-input>
          </template>
        </el-table-column>
        <el-table-column label="值">
          <template slot-scope="scope">
            <el-input
              show-word-limit
              type="text"
              maxlength="50"
              placeholder="值"
              v-if="scope.row.dataType === 'string'"
              :value="scope.row.defaultValue"
              @input="changeFileDefaultValue(...arguments, scope.row)"
            >
            </el-input>
            <stms-upload-file
              v-else
              placeholder="请上传文件"
              :auto-upload="false"
              accept=""
              :value="scope.row.defaultValue"
              @change="changeFileDefaultValue(...arguments, scope.row)"
              type="file"
            />
          </template>
        </el-table-column>
        <el-table-column label="删除" width="90">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deletingFile(scope.$index)"
              type="text"
              size="small"
            >
              <i class="el-icon-delete"></i>&nbsp;&nbsp;删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- json -->
    <div class="treeScroll" v-if="value.type == '0'">
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
  name: "stms-api-design-bodys",
  props: {
    value: {
      type: Object,
      required: true,
      default: function() {
        return {
          type: "0",
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
      // 数据类型
      fileTypeList: ["string", "file"],
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
      if (
        !this.value.param.length &&
        this.value.type !== "3" &&
        this.value.type !== "4"
      ) {
        this.value.param.push({
          name: "root",
          dataType: "object",
          des: "",
          children: [],
          treeId: "-1",
          required: "1",
          defaultValue: "",
        });
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
    addFile() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.value.param.push({
            name: "",
            dataType: "",
            required: "",
            des: "",
            defaultValue: "",
          });
          this.$emit("input", this.value);
        }
      });
    },
    deletingFile(index) {
      this.value.param.splice(index, 1);
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
    changeFileName(value, item) {
      item.name = value;
      this.$emit("input", this.value);
    },
    changeFileType(value, item) {
      item.dataType = value;
      this.$emit("input", this.value);
    },
    changeFileRequired(value, item) {
      item.required = value;
      this.$emit("input", this.value);
    },
    changeFileDes(value, item) {
      item.des = value;
      this.$emit("input", this.value);
    },
    changeFileDefaultValue(file, item) {
      item.defaultValue = file.name;
      item.file = file;
      this.$emit("input", this.value);
    },
  },
};
</script>

<style lang="less">
.bodys {
  .btn {
    margin-bottom: 6px;
    margin-left: 10px;
  }
  .el-form-item--small.el-form-item {
    margin-bottom: 15px !important;
    padding-top: 16px !important;
  }
  .el-table__row td {
    padding: 0 !important;
  }
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
