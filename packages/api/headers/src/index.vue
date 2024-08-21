<template>
  <!-- headers内容 -->
  <el-form :model="{ value }" ref="form" class="headers">
    <div>
      <el-button type="primary" icon="plus" class="btn" @click="add"
        >添加</el-button
      >
      <el-table :data="value" height="370">
        <el-table-column type="index" label="序号" width="70"></el-table-column>
        <el-table-column label="名称">
          <template slot-scope="scope">
            <el-form-item
              :prop="'value.' + scope.$index + '.name'"
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
                @input="changeName(...arguments, scope.row)"
                maxlength="50"
              ></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="数据类型" width="150">
          <template slot-scope="scope">
            <el-select
              :value="scope.row.dataType"
              @input="changeType(...arguments, scope.row)"
              placeholder="数据类型"
              filterable
            >
              <el-option v-for="item in typeList" :key="item" :value="item">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="必填" width="100">
          <template slot-scope="scope">
            <el-select
              :value="scope.row.required"
              @input="changeRequired(...arguments, scope.row)"
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
              @input="changeDes(...arguments, scope.row)"
              maxlength="100"
            >
            </el-input>
          </template>
        </el-table-column>
        <el-table-column label="值">
          <template slot-scope="scope">
            <!-- 默认input -->
            <el-input
              show-word-limit
              type="text"
              maxlength="50"
              placeholder="值"
              v-if="
                ['timestamp', 'time', 'date'].indexOf(scope.row.dataType) == -1
              "
              :value="scope.row.defaultValue"
              @input="changeDefaultValue(...arguments, scope.row)"
            >
            </el-input>
            <!-- 默认日历插件 -->
            <el-date-picker
              type="date"
              value-format="yyyy-MM-dd"
              class="el-date"
              v-else
              :value="scope.row.defaultValue"
              @input="changeDefaultValue(...arguments, scope.row)"
            ></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column label="删除" width="90">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleting(scope.$index)"
              type="text"
              size="small"
            >
              <i class="el-icon-delete"></i>&nbsp;&nbsp;删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-form>
</template>

<script>
export default {
  name: "stms-api-design-headers",
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
    return {
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
  methods: {
    add() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.value.push({
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
    deleting(index) {
      this.value.splice(index, 1);
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
.headers .btn {
  margin-bottom: 6px;
  margin-left: 10px;
}
.headers .el-form-item--small.el-form-item {
  margin-bottom: 15px !important;
  padding-top: 16px !important;
}
.headers .el-table__row td {
  padding: 0 !important;
}
</style>
