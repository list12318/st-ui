<template>
  <div>
    <!--编辑内容 -->
    <el-tabs v-model="updateTabName" style="margin-left:1%">
      <el-tab-pane label="属性" name="01"></el-tab-pane>
      <el-tab-pane label="条件" name="02"></el-tab-pane>
      <el-tab-pane label="入参格式" name="03"></el-tab-pane>
      <div v-if="updateTabName === '01'">
        <el-input
          show-word-limit
          placeholder="请输入英文名"
          v-model="search1"
          style="float:right;padding-bottom: 8px;width:250px"
        >
          <i slot="suffix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-form :model="{ searchData1 }" ref="form">
          <el-table
            :data="
              (searchData1 || []).slice(
                (this.page1 - 1) * this.size1,
                (this.page1 - 1) * this.size1 + this.size1
              )
            "
            max-height="370"
          >
            <el-table-column label="选择" width="50" v-if="show">
              <template slot="header" slot-scope="scope">
                <p>是否必填</p>
                <!-- <el-checkbox
                  :indeterminate="isIndeterminateSet"
                  v-model="checkAllSet"
                  @change="handleCheckAllChangeSet"
                ></el-checkbox> -->
              </template>
              <template slot-scope="scope">
                <el-checkbox
                  :value="scope.row.flag"
                  @input="checkSet(...arguments, scope.row)"
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
            <el-table-column prop="value" label="输入参数" v-if="show">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'searchData1.' + scope.$index + '.value'"
                  :rules="tableRules.formNameEn1"
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
                <!-- <el-select
                :value="scope.row.value"
                filterable
                placeholder="选择值"
                :disabled="!scope.row.flag"
                @input="changeValueSet(...arguments, scope.row)"
              >
                <el-option
                  v-for="item in valueList"
                  :key="item"
                  :value="'${' + item + '}'"
                  :label="'${' + item + '}'"
                >
                </el-option>
              </el-select> -->
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
          @size-change="handleSizeChange1"
          @current-change="handleCurrentChange1"
          :current-page="page1"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="size1"
          layout="total, sizes, prev, pager, next, jumper"
          :total="searchData1 && searchData1.length"
          style="float:right"
        >
        </el-pagination>
      </div>
      <div v-if="updateTabName === '02'">
        <el-input
          show-word-limit
          placeholder="请输入英文名"
          v-model="search2"
          style="float:right;padding-bottom: 8px;width:250px"
        >
          <i slot="suffix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-form :model="{ searchData2 }" ref="form">
          <el-table
            :data="
              (searchData2 || []).slice(
                (this.page2 - 1) * this.size2,
                (this.page2 - 1) * this.size2 + this.size2
              )
            "
            max-height="370"
          >
            <el-table-column label="选择" width="50" v-if="show">
              <template slot="header" slot-scope="scope">
                <el-checkbox
                  :indeterminate="isIndeterminateCondition"
                  v-model="checkAllCondition"
                  @change="handleCheckAllChangeCondition"
                ></el-checkbox>
              </template>
              <template slot-scope="scope">
                <el-checkbox
                  :value="scope.row.flag"
                  @input="checkCondition(...arguments, scope.row)"
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
            <el-table-column label="条件">
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
                  :prop="'searchData2.' + scope.$index + '.value'"
                  :rules="tableRules.formNameEn"
                >
                  <el-input
                    show-word-limit
                    type="text"
                    placeholder="请输入参数"
                    v-model="scope.row.value"
                    @input="changeValueCondition(...arguments, scope.row)"
                  >
                  </el-input>
                </el-form-item>
                <!-- <el-select
                  :value="scope.row.value"
                  filterable
                  placeholder="选择值"
                  :disabled="!scope.row.flag"
                  @input="changeValueCondition(...arguments, scope.row)"
                >
                  <el-option
                    v-for="item in valueList"
                    :key="item"
                    :value="'${' + item + '}'"
                    :label="'${' + item + '}'"
                  >
                  </el-option>
                </el-select> -->
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
                  @input="changeValueUp(...arguments, scope.row)"
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
                  @input="changeValueUp(...arguments, scope.row)"
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
                  @input="changeValuesUp(...arguments, scope.row)"
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
                  @input="changeValueUp(...arguments, scope.row)"
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
                  @input="changeValueUp(...arguments, scope.row)"
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
                  @input="changeValuesUp(...arguments, scope.row)"
                ></el-date-picker>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
        <el-pagination
          @size-change="handleSizeChange2"
          @current-change="handleCurrentChange2"
          :current-page="page2"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="size2"
          layout="total, sizes, prev, pager, next, jumper"
          :total="searchData2 && searchData2.length"
          style="float:right"
        >
        </el-pagination>
      </div>
      <div v-if="updateTabName === '03'">
        <stms-ace-editor
          mode="java"
          :readOnly="true"
          v-model="db_update_exampleSql"
          height="300px"
        />
      </div>
    </el-tabs>
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
  name: "stms-api-design-edit-param",
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
  },
  computed: {
    valueList() {
      return (this.value.set || []).map((val) => val.fieldNameEn);
    },
    reqData() {
      return JSON.stringify(this.getReqBody(), null, 4);
    },
    searchData1() {
      return this.value.set.filter(
        (v) =>
          v.fieldNameEn &&
          v.fieldNameEn.toLowerCase().includes(this.search1.toLowerCase())
      );
    },
    searchData2() {
      return this.value.condition.filter(
        (v) =>
          v.fieldNameEn &&
          v.fieldNameEn.toLowerCase().includes(this.search2.toLowerCase())
      );
    },
  },
  data() {
    const formNameEn = (rule, value, callback) => {
      if (value) {
        let arr = [];
        this.value.condition.forEach((v) => {
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
    const formNameEn1 = (rule, value, callback) => {
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
      checkAllSet: false,
      isIndeterminateSet: false,
      checkAllCondition: false,
      isIndeterminateCondition: false,
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
      updateTabName: "01",
      page1: 1,
      size1: 10,
      page2: 1,
      size2: 10,
      search1: "",
      search2: "",
      db_update_exampleSql:
        "{\n" + '   "condition": {},\n' + '   "set": {}\n' + "}",
      tableRules: {
        formNameEn: [
          { required: true, message: "请输入英文名" },
          {
            pattern: /^[a-zA-Z_]{1,50}$/,
            message: "请输入英文及下划线",
          },
          {
            validator: formNameEn,
            trigger: "change",
          },
        ],
        formNameEn1: [
          { required: true, message: "请输入英文名" },
          {
            pattern: /^[a-zA-Z_]{1,50}$/,
            message: "请输入英文及下划线",
          },
          {
            validator: formNameEn1,
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    handleSizeChange1(val) {
      this.size1 = val;
    },
    handleCurrentChange1(val) {
      this.page1 = val;
    },
    handleSizeChange2(val) {
      this.size2 = val;
    },
    handleCurrentChange2(val) {
      this.page2 = val;
    },
    handleCheckAllChangeSet(val) {
      this.isIndeterminateSet = false;
      this.value.set.forEach((item) => {
        item.flag = val;
      });
    },
    handleCheckAllChangeCondition(val) {
      this.isIndeterminateCondition = false;
      this.value.condition.forEach((item) => {
        item.flag = val;
      });
    },
    checkSet(value, item) {
      item.flag = value;
      let totalCount = this.value.set.length;
      const someStatusCount = this.value.set.filter((v) => v.flag === value)
        .length;
      this.checkAllSet = totalCount === someStatusCount ? value : !value;
      this.isIndeterminateSet =
        someStatusCount > 0 && someStatusCount < totalCount;
      this.$emit("input", this.value);
    },
    checkCondition(value, item) {
      item.flag = value;
      let totalCount = this.value.condition.length;
      const someStatusCount = this.value.condition.filter(
        (v) => v.flag === value
      ).length;
      this.checkAllCondition = totalCount === someStatusCount ? value : !value;
      this.isIndeterminateCondition =
        someStatusCount > 0 && someStatusCount < totalCount;
      this.$emit("input", this.value);
    },
    changeValueSet(value, item) {
      item.value = value;
      this.$emit("input", this.value);
    },
    changeValueCondition(value, item) {
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
    changeValueUp(value, item) {
      item.value = value;
      setTimeout(() => {
        this.value.reqData = this.reqData;
      });
      this.$emit("input", this.value);
    },
    changeValuesUp(value, item) {
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
      const { type, set, condition } = this.value;
      let reqResult = {};
      const result = {};
      const resultUp = {};
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
      if (condition) {
        condition.forEach((node) => {
          if (node.operation == "between" && node.value && node.values) {
            resultUp[
              node.fieldNameEn || node.fieldNameCn
            ] = `${node.value}~${node.values}`;
          } else {
            resultUp[node.fieldNameEn || node.fieldNameCn] = node.value;
          }
        });
      }
      if (type == "update") {
        reqResult.condition = resultUp;
        reqResult.set = result;
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
