<template>
  <!-- 自定义变量 新 -->
  <el-form :model="{ value }" ref="form" class="customVarible">
    <div>
      <el-button type="primary" icon="plus" class="btn" @click="add"
        >添加</el-button
      >
      <el-table :data="value" height="370">
        <el-table-column label="选择" width="50">
          <template slot="header" slot-scope="scope">
            <el-checkbox
                    :indeterminate="isIndeterminate"
                    v-model="checkAll"
                    @change="handleCheckAllChange"
            ></el-checkbox>
          </template>
          <template slot-scope="scope">
            <el-checkbox
                    :value="scope.row.flag"
                    @input="check(...arguments, scope.row)"
            ></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号" width="70"></el-table-column>
        <el-table-column label="占位符名称" width="150">
          <template slot-scope="scope">
            <el-form-item
              :prop="'value.' + scope.$index + '.placeholderName'"
              :rules="[
                { required: true, message: '请输入占位符名称' },
                {
                  pattern: /^[\u4E00-\u9FA50-9a-zA-Z_\-.]+$/,
                  message: '请勿输入特殊字符',
                },
              ]"
            >
              <el-input
                show-word-limit
                type="text"
                placeholder="请输入占位符名称"
                :value="scope.row.placeholderName"
                @input="changePlaceholderName(...arguments, scope.row)"
                maxlength="50"
              ></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="比较类型" width="120">
          <template slot-scope="scope">
            <el-select
                    :value="scope.row.compareType"
                    @input="changeCompareType(...arguments, scope.row)"
                    placeholder="比较类型"
                    filterable
            >
              <el-option v-for="item in compareTypeList" :key="item" :value="item">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="字段名称" width="150">
          <template slot-scope="scope">
            <el-form-item
                    :prop="'value.' + scope.$index + '.fieldNameEn'"
                    :rules="[
                { required: true, message: '请输入字段名称' },
                {
                  pattern: /^[\u4E00-\u9FA50-9a-zA-Z_\-.]+$/,
                  message: '请勿输入特殊字符',
                },
              ]"
            >
              <el-input
                      show-word-limit
                      type="text"
                      placeholder="请输入字段名称"
                      :value="scope.row.fieldNameEn"
                      @input="changeName(...arguments, scope.row)"
                      maxlength="50"
              ></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="条件" width="120">
          <template slot-scope="scope">
            <el-select
                    :value="scope.row.operation"
                    @input="changeOperation(...arguments, scope.row)"
                    placeholder="条件"
                    filterable
            >
              <el-option
                      v-for="item in dbTypeList"
                      :key="item"
                      :value="item"
                      :label="item"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="参数名称" width="150">
          <template slot-scope="scope">
            <el-form-item
                    :prop="'value.' + scope.$index + '.paramName'"
                    :rules="[
                { required: true, message: '请输入参数名称' },
                {
                  pattern: /^[\u4E00-\u9FA50-9a-zA-Z_\-.]+$/,
                  message: '请勿输入特殊字符',
                },
              ]"
            >
              <el-input
                      show-word-limit
                      type="text"
                      placeholder="请输入参数名称"
                      :value="scope.row.paramName"
                      @input="changeParamName(...arguments, scope.row)"
                      maxlength="50"
              ></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="数据类型" width="120">
          <template slot-scope="scope">
            <el-select
              :value="scope.row.type"
              @input="changeType(...arguments, scope.row)"
              placeholder="数据类型"
              filterable
            >
              <el-option v-for="item in typeList" :key="item" :value="item">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="说明" width="150">
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
        <el-table-column label="默认值" width="150">
          <template slot-scope="scope">
            <!-- 默认input -->
            <el-input
              show-word-limit
              type="text"
              maxlength="50"
              placeholder="默认值"
              v-if="scope.row.type != 'DATE'"
              :value="scope.row.value"
              @input="changeDefaultValue(...arguments, scope.row)"
            >
            </el-input>
            <!-- 默认日历插件 -->
            <el-date-picker
              type="date"
              value-format="yyyy-MM-dd"
              class="el-date"
              v-else
              :value="scope.row.value"
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
  name: "stms-api-design-custom-varible-new",
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
      checkAll: false,
      isIndeterminate: false,
      // 数据类型
      typeList: ["VARCHAR", "DATE", "INT", "ARRAY"],
      dbTypeList: [
        ">",
        ">=",
        "=",
        "!=",
        "<",
        "<=",
        "like",
        "between",
        "is",
        "is not",
        "in",
      ], // 条件
      // 比较类型
      compareTypeList: ["and", "or"],
    };
  },
  methods: {
    add() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.value.push({
            flag: false,
            placeholderName: "",
            compareType: "and",
            fieldNameEn: "",
            operation: "=",
            paramName: "",
            type: "",
            des: "",
            value: "",
          });
          this.$emit("input", this.value);
        }
      });
    },
    deleting(index) {
      this.value.splice(index, 1);
    },
    handleCheckAllChange(val) {
      this.isIndeterminate = false;
      this.value.forEach((item) => {
        item.flag = val;
      });
    },
    check(value, item) {
      item.flag = value;
      let totalCount = this.value.length;
      const someStatusCount = this.value.filter((v) => v.flag === value)
              .length;
      this.checkAll = totalCount === someStatusCount ? value : !value;
      this.isIndeterminate =
              someStatusCount > 0 && someStatusCount < totalCount;
      this.$emit("input", this.value);
    },
    changePlaceholderName(value, item) {
      item.placeholderName = value;
      this.$emit("input", this.value);
    },
    changeName(value, item) {
      item.fieldNameEn = value;
      this.$emit("input", this.value);
    },
    changeParamName(value, item) {
      item.paramName = value;
      this.$emit("input", this.value);
    },
    changeType(value, item) {
      item.type = value;
      this.$emit("input", this.value);
    },
    changeOperation(value, item) {
      item.operation = value;
      this.$emit("input", this.value);
    },
    changeCompareType(value, item) {
      item.compareType = value;
      this.$emit("input", this.value);
    },
    changeDes(value, item) {
      item.des = value;
      this.$emit("input", this.value);
    },
    changeDefaultValue(value, item) {
      item.value = value;
      this.$emit("input", this.value);
    },
  },
};
</script>

<style lang="less">
.customVarible .btn {
  margin-bottom: 6px;
  margin-left: 10px;
}
.customVarible .el-form-item {
  margin-bottom: 15px !important;
  padding-top: 16px !important;
}
.customVarible .el-table__row td {
  padding: 0 !important;
}
</style>
