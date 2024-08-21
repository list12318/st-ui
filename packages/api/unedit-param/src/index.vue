<template>
  <div>
    <!--非编辑的配置 -->
    <el-input
      show-word-limit
      placeholder="请输入英文名"
      v-model="search"
      style="float:right;padding-bottom: 8px;width:250px"
    >
      <i slot="suffix" class="el-input__icon el-icon-search"></i>
    </el-input>
    <el-form :model="{ searchData }" ref="form">
      <el-table
        :data="
          (searchData || []).slice(
            (this.page - 1) * this.size,
            (this.page - 1) * this.size + this.size
          )
        "
        class="unedit"
        max-height="370"
      >
        <el-table-column label="选择" width="50" v-if="show">
          <template slot="header" slot-scope="scope">
            <p>是否必填</p>
            <!-- <el-checkbox
                                :indeterminate="isIndeterminate"
                                v-model="checkAll"
                                @change="handleCheckAllChange"
                        ></el-checkbox> -->
          </template>
          <template slot-scope="scope">
            <el-checkbox
              :value="scope.row.flag"
              @input="checkSet(...arguments, scope.row)"
              :disabled="scope.row.disabled"
            ></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号" width="70">
        </el-table-column>
        <el-table-column label="中文名">
          <template slot-scope="scope">
            <el-input
              show-word-limit
              type="text"
              placeholder="请输入中文名"
              :value="scope.row.fieldNameCn || scope.row.fieldNameEn"
              disabled
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="英文名">
          <template slot-scope="scope">
            <el-input
              show-word-limit
              type="text"
              placeholder="请输入英文名"
              :value="scope.row.fieldNameEn"
              disabled
            >
            </el-input>
          </template>
        </el-table-column>
        <el-table-column label="类型">
          <template slot-scope="scope">
            <el-input
              show-word-limit
              type="text"
              placeholder="请输入类型"
              :value="scope.row.type"
              disabled
            >
            </el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="条件"
          v-if="
            interfaceCode == 'findByPage' ||
              interfaceCode == 'findByWhere' ||
              interfaceCode == 'delete'
          "
        >
          <template slot-scope="scope">
            <el-select
              :value="scope.row.operation"
              placeholder="选择条件"
              @input="changeOperation(...arguments, scope.row)"
              filterable
            >
              <el-option
                v-for="item in dbTypeList"
                :key="item"
                :value="item"
                :label="item"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="value" label="输入参数" v-if="show">
          <template slot-scope="scope">
            <el-form-item
              :prop="'searchData.' + scope.$index + '.value'"
              :rules="tableRules.formNameEn"
            >
              <el-input
                show-word-limit
                type="text"
                placeholder="请输入参数"
                v-model="scope.row.value"
                @input="changeValueSet(...arguments, scope.row)"
              >
              </el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="值" v-else>
          <template slot-scope="scope">
            <!-- 默认input -->
            <el-input
              show-word-limit
              type="text"
              placeholder="默认值"
              v-if="
                ['timestamp', 'time', 'date', 'datetime'].indexOf(
                  scope.row.type.toLowerCase()
                ) == -1 && scope.row.operation != 'between'
              "
              :value="scope.row.value"
              @input="changeValue(...arguments, scope.row)"
            >
            </el-input>
            <!-- 两个input -->
            <el-input
              show-word-limit
              type="text"
              placeholder="默认值"
              v-if="
                ['timestamp', 'time', 'date', 'datetime'].indexOf(
                  scope.row.type.toLowerCase()
                ) == -1 && scope.row.operation == 'between'
              "
              :value="scope.row.value"
              @input="changeValue(...arguments, scope.row)"
            ></el-input>
            <el-input
              show-word-limit
              type="text"
              placeholder="默认值"
              v-if="
                ['timestamp', 'time', 'date', 'datetime'].indexOf(
                  scope.row.type.toLowerCase()
                ) == -1 && scope.row.operation == 'between'
              "
              :value="scope.row.values"
              @input="changeValues(...arguments, scope.row)"
            ></el-input>
            <!-- 默认日历插件 -->
            <el-date-picker
              :type="
                scope.row.type.toLowerCase() === 'datetime'
                  ? 'datetime'
                  : 'date'
              "
              :value-format="
                scope.row.type.toLowerCase() === 'datetime'
                  ? 'yyyy-MM-dd HH:mm:ss'
                  : 'yyyy-MM-dd'
              "
              class="el-date"
              v-if="
                ['timestamp', 'time', 'date', 'datetime'].indexOf(
                  scope.row.type.toLowerCase()
                ) != -1 && scope.row.operation != 'between'
              "
              :value="scope.row.value"
              @input="changeValue(...arguments, scope.row)"
            ></el-date-picker>
            <!-- 两个日历框 -->
            <el-date-picker
              :type="
                scope.row.type.toLowerCase() === 'datetime'
                  ? 'datetime'
                  : 'date'
              "
              :value-format="
                scope.row.type.toLowerCase() === 'datetime'
                  ? 'yyyy-MM-dd HH:mm:ss'
                  : 'yyyy-MM-dd'
              "
              class="el-date"
              v-if="
                ['timestamp', 'time', 'date', 'datetime'].indexOf(
                  scope.row.type.toLowerCase()
                ) != -1 && scope.row.operation == 'between'
              "
              :value="scope.row.value"
              @input="changeValue(...arguments, scope.row)"
            ></el-date-picker>
            <el-date-picker
              :type="
                scope.row.type.toLowerCase() === 'datetime'
                  ? 'datetime'
                  : 'date'
              "
              :value-format="
                scope.row.type.toLowerCase() === 'datetime'
                  ? 'yyyy-MM-dd HH:mm:ss'
                  : 'yyyy-MM-dd'
              "
              class="el-date"
              v-if="
                ['timestamp', 'time', 'date', 'datetime'].indexOf(
                  scope.row.type.toLowerCase()
                ) != -1 && scope.row.operation == 'between'
              "
              :value="scope.row.values"
              @input="changeValues(...arguments, scope.row)"
            ></el-date-picker>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="searchData && searchData.length"
      style="float:right"
    >
    </el-pagination>
    <stms-ace-editor
      v-model="reqData"
      mode="json"
      @input="changeReqData"
      width="100%"
      height="300px"
      v-if="!show"
    />
  </div>
</template>

<script>
export default {
  name: "stms-api-design-unedit-param",
  props: {
    value: {
      type: Object,
      required: true,
      default: function() {
        return {
          set: [],
          condition: [],
          reqData: "",
          type: "",
        };
      },
    },
    show: {
      type: Boolean,
      required: true,
      default: function() {
        return false;
      },
    },
    interfaceCode: {
      type: String,
      required: true,
      default: function() {
        return "";
      },
    },
  },
  computed: {
    valueList() {
      return (this.value.set || []).map((val) => val.fieldNameEn);
    },
    reqData() {
      return JSON.stringify(this.getReqBody(), null, 4);
    },
    searchData() {
      return this.value.set.filter(
        (v) =>
          v.fieldNameEn &&
          v.fieldNameEn.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  data() {
    const formNameEn = (rule, value, callback) => {
      if (value) {
        let arr = [];
        this.value.set.forEach((v) => {
          if (v.value) {
            if (arr.includes(v.value)) {
              if (v.value === value) {
                callback(new Error("该输入参数已被使用"));
              }
            } else {
              arr.push(v.value);
            }
          }
        });
        callback();
      }
    };
    return {
      checkAll: false,
      isIndeterminate: false,
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
      page: 1,
      size: 10,
      search: "",
      tableRules: {
        formNameEn: [
          {
            required: true,
            message: "请输入英文名",
          },
          {
            pattern: /^[a-zA-Z_]{1,50}$/,
            message: "请输入英文及下划线",
          },
          {
            validator: formNameEn,
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    handleSizeChange(val) {
      this.size = val;
    },
    handleCurrentChange(val) {
      this.page = val;
    },
    handleCheckAllChange(val) {
      this.isIndeterminate = false;
      this.value.set.forEach((item) => {
        item.flag = val;
      });
    },
    checkSet(value, item) {
      item.flag = value;
      let totalCount = this.value.set.length;
      const someStatusCount = this.value.set.filter((v) => v.flag === value)
        .length;
      this.checkAll = totalCount === someStatusCount ? value : !value;
      this.isIndeterminate =
        someStatusCount > 0 && someStatusCount < totalCount;
      this.$emit("input", this.value);
    },
    changeValueSet(value, item) {
      item.value = value;
      this.$emit("input", this.value);
    },
    changeOperation(value, item) {
      item.operation = value;
      this.$emit("input", this.value);
    },
    changeValue(value, item) {
      item.value = value;
      setTimeout(() => {
        this.value.reqData = this.reqData;
      });
      this.$emit("input", this.value);
    },
    changeValues(value, item) {
      item.values = value;
      setTimeout(() => {
        this.value.reqData = this.reqData;
      });
      this.$emit("input", this.value);
    },
    changeReqData(val) {
      try {
        this.value.reqData = val;
        this.$emit("input", this.value);
      } catch (error) {}
    },
    //处理单表请求体
    getReqBody() {
      const { type, set } = this.value;
      let reqResult = {};
      const result = {};
      if (set) {
        set.forEach((node) => {
          if (node.operation == "between" && node.value && node.values) {
            result[
              node.fieldNameEn || node.fieldNameCn
            ] = `${node.value}~${node.values}`;
          } else {
            result[node.fieldNameEn || node.fieldNameCn] = node.value;
          }
        });
      }
      if (type == "findByPage") {
        reqResult.pageNum = result.pageNum;
        reqResult.pageSize = result.pageSize;
        reqResult.condition = Object.keys(result).reduce((obj, key) => {
          if (key != "pageNum" && key != "pageSize") {
            obj[key] = result[key];
          }
          return obj;
        }, {});
      } else if (type == "insert") {
        reqResult = result;
      } else {
        reqResult = result;
      }
      return reqResult;
    },
  },
};
</script>

<style lang="less" scoped>
.el-form-item {
  margin-bottom: 0;
}
</style>
