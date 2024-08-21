<template>
  <!-- 自定义变量 -->
  <el-form :model="{ value }" ref="form" class="customVariable">
    <div>
      <el-button type="primary" style="margin-bottom:10px;" @click="addCodeBlock"
      >添加</el-button>
      <el-table :data="value">
        <el-table-column type="index" label="序号" width="70"></el-table-column>
        <el-table-column
                prop="placeholder"
                label="占位符"
                show-overflow-tooltip
                width="200"
        >
          <template slot-scope="scope">
            <el-input
                    v-model="scope.row.placeholder"
                    placeholder="请输入占位符"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="sqlBlock" label="代码块" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-input
                    placeholder="请输入代码块"
                    v-model="scope.row.sqlBlock"
            >
              <el-button
                      slot="append"
                      icon="el-icon-edit"
                      @click="editExpression(scope.row, scope.$index, 'sqlBlock')"
              ></el-button>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column prop="elScript" label="表达式" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-input
                    placeholder="请输入表达式"
                    v-model="scope.row.elScript"
            >
              <el-button
                      slot="append"
                      icon="el-icon-edit"
                      @click="editExpression(scope.row, scope.$index, 'elScript')"
              ></el-button>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="70">
          <template slot-scope="scope">
                                    <span
                                            style="color:#F56C6C;cursor:pointer;"
                                            @click="multiTableDelete(scope.$index)"
                                    >删除</span
                                    >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <customExpression
            ref="customExpression_form"
            @editExpressionData="editExpressionData"
    ></customExpression>
  </el-form>

</template>

<script>
  import customExpression from "./customExpression";
export default {
  components: {
    customExpression,
  },
  name: "stms-api-design-custom-block-varible",
  props: {
    value: {
      type: Array,
      required: true,
      default: function() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    // 添加自定义代码块
    addCodeBlock() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.value.push({
            placeholder: "",
            sqlBlock: "",
            elScript: "",
          });
          this.$emit("input", this.value);
        }
      });
    },
    // 编辑自定义表达式
    editExpression(data, index, type) {
      this.$refs.customExpression_form.getPage(data, index, type);
    },
    // 回显自定义表达式
    editExpressionData(data) {
      // 代码块
      if (data.type === "sqlBlock") {
        this.value[data.index].sqlBlock = data.data;
      }
      // 表达式
      else if (data.type === "elScript") {
        this.value[data.index].elScript = data.data;
      }
    },
    // 删除自定义代码块
    multiTableDelete(data) {
      this.value.splice(data, 1);
    },
  },
};
</script>

<style lang="less">
.customVariable .btn {
  margin-bottom: 6px;
  margin-left: 10px;
}
.customVariable .el-form-item--small.el-form-item {
  margin-bottom: 15px !important;
  padding-top: 16px !important;
}
.customVariable .el-table__row td {
  padding: 0 !important;
}
</style>
