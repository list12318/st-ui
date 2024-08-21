<template>
  <div class="beyon-find">
    <!--编辑内容 -->
    <el-tabs v-model="findTabName" style="margin-left:1%">
      <el-tab-pane label="条件" name="02"></el-tab-pane>
      <el-tab-pane label="排序" name="01"></el-tab-pane>
      <div v-if="findTabName == '01'">
        <el-form :model="{ value }" ref="form">
          <div>
            <el-button type="primary" icon="plus" class="btn" @click="add"
              >添加
            </el-button>
            <div class="order-type-radio">
              <span class="order-type-span">
                排序方式:
              </span>
              <el-radio-group v-model="orderType" @change="selectOrderType">
                <el-radio label="ASC">ASC</el-radio>
                <el-radio label="DESC">DESC</el-radio>
              </el-radio-group>
            </div>

            <el-table :data="value.order" max-height="370">
              <el-table-column type="index" label="排序等级" width="85">
              </el-table-column>
              <el-table-column label="中文名">
                <template slot-scope="scope">
                  <el-input
                    show-word-limit
                    type="text"
                    :value="scope.row.fieldNameCn || scope.row.fieldNameEn"
                    placeholder="请输入中文名"
                    disabled
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column label="英文名">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'value.order.' + scope.$index + '.fieldNameEn'"
                    :rules="[{ required: true, message: '请选择排序字段' }]"
                  >
                    <el-select
                      v-model="scope.row.fieldNameEn"
                      placeholder="请选择英文名"
                      filterable
                      @input="selectFiled(...arguments, scope.row)"
                    >
                      <el-option
                        v-for="item in value.condition"
                        :key="item.fieldNameEn"
                        :label="item.fieldNameEn"
                        :value="item"
                        :disabled="item.fieldNameEn === scope.row.fieldNameEn"
                      >
                        <span style="float: left">{{ item.fieldNameEn }}</span>
                        <span
                          style="float: right; color: #8492a6; font-size: 13px"
                          >{{ item.fieldNameCn }}</span
                        >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="类型">
                <template slot-scope="scope">
                  <el-input
                    :value="scope.row.type"
                    show-word-limit
                    type="text"
                    placeholder="请输入类型"
                    disabled
                  >
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column label="条件">
                <template slot-scope="scope">
                  <el-input
                    :value="scope.row.operation"
                    show-word-limit
                    type="text"
                    disabled
                  >
                  </el-input>
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
      </div>
      <div v-if="findTabName == '02'">
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
            max-height="370"
          >
            <el-table-column label="选择" width="50" v-if="show">
              <template slot="header" slot-scope="scope">
                <p>是否必填</p>
                <!-- <el-checkbox
                  :indeterminate="isIndeterminateCondition"
                  v-model="checkAllCondition"
                  @change="handleCheckAllChangeCondition"
                ></el-checkbox> -->
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
                  :prop="'searchData.' + scope.$index + '.value'"
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
  name: "stms-api-design-beyon-find-param",
  props: {
    value: {
      type: Object,
      required: true,
      default: function() {
        return {
          order: [],
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
      return (this.value.condition || []).map((val) => val.fieldNameEn);
    },
    reqData() {
      return JSON.stringify(this.getReqBody(), null, 4);
    },
    searchData() {
      return this.value.condition.filter(
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
    return {
      orderType: "",
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
      findTabName: "02",
      page: 1,
      size: 10,
      search: "",
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
    selectOrderType(val) {
      if (this.value.order) {
        this.value.order.forEach((item) => {
          item.operation = val;
        });
        this.$emit("input", this.value);
      }
    },

    selectFiled(value, item) {
      item.fieldNameCn = value.fieldNameCn || value.fieldNameEn;
      item.fieldNameEn = value.fieldNameEn;
      item.type = value.type;
      item.operation = this.orderType;
      this.$emit("input", this.value);
    },

    add() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.value.order.push({
            fieldNameCn: "",
            fieldNameEn: "",
            type: "",
            operation: this.orderType,
          });
          this.$emit("input", this.value);
        }
      });
    },

    deleting(index) {
      this.value.order.splice(index, 1);
    },

    handleCheckAllChangeCondition(val) {
      this.isIndeterminateCondition = false;
      this.value.condition.forEach((item) => {
        item.flag = val;
      });
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
      const { type, order, condition } = this.value;
      let reqResult = {};
      const result = {};
      const resultUp = {};
      if (order) {
        order.forEach((node) => {
          result[node.fieldNameEn || node.fieldNameCn] = node.value;
        });
      }
      if (condition) {
        condition.forEach((node) => {
          if (node.operation === "between" && node.value && node.values) {
            resultUp[
              node.fieldNameEn || node.fieldNameCn
            ] = `${node.value}~${node.values}`;
          } else {
            resultUp[node.fieldNameEn || node.fieldNameCn] = node.value;
          }
        });
      }
      if (type === "findByPage" || type === "findByWhere") {
        reqResult.condition = resultUp;
        reqResult.order = result;
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
.beyon-find {
  .order-type-radio {
    margin-top: 16px;
  }
  .order-type-span {
    margin: 10px;
    color: #909399;
  }
}
</style>
