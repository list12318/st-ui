<template>
  <div>
    <!--编辑内容 -->
    <el-tabs v-model="findTabName" style="margin-left:1%">
      <el-tab-pane label="查询" name="03"></el-tab-pane>
      <el-tab-pane label="条件" name="02"></el-tab-pane>
      <el-tab-pane label="排序" name="01"></el-tab-pane>
      <div v-if="findTabName === '01'">
        <el-form :model="{ value }" ref="form">
          <div>
            <el-button type="primary" icon="plus" class="btn" @click="add"
              >添加
            </el-button>
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
                  <el-select
                    placeholder="选择条件"
                    filterable
                    v-model="scope.row.operation"
                  >
                    <el-option
                      v-for="item in orderTypeList"
                      :key="item.value"
                      :value="item.value"
                      :label="item.label"
                    >
                    </el-option>
                  </el-select>
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
      <div v-if="findTabName === '02'">
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
            <el-table-column label="输入参数">
              <template slot-scope="scope">
                <el-input
                  show-word-limit
                  type="text"
                  placeholder="请输入参数"
                  :value="scope.row.formNameEn || scope.row.formNameEn"
                  disabled
                ></el-input>
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
      <div v-if="findTabName === '03'">
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
                        :indeterminate="isIndeterminateFind"
                        v-model="checkAllFind"
                        @change="handleCheckAllChangeFind"
                ></el-checkbox> -->
              </template>
              <template slot-scope="scope">
                <el-checkbox
                  :value="scope.row.flag"
                  @input="checkFind(...arguments, scope.row)"
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
            <el-table-column label="表单中文名">
              <template slot-scope="scope">
                <el-input
                  show-word-limit
                  type="text"
                  placeholder="请输入表单中文名"
                  :value="scope.row.formNameCn || scope.row.formNameCn"
                  disabled
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="表单英文名">
              <template slot-scope="scope">
                <el-input
                  show-word-limit
                  type="text"
                  placeholder="请输入表单英文名"
                  :value="scope.row.formNameEn || scope.row.formNameEn"
                  disabled
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="表单数据类型">
              <template slot-scope="scope">
                <el-input
                  show-word-limit
                  type="text"
                  placeholder="请输入表单数据类型"
                  :value="scope.row.formType || scope.row.formType"
                  disabled
                ></el-input>
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
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "stms-api-design-view-find-param",
  props: {
    value: {
      type: Object,
      required: true,
      default: function() {
        return {
          order: [],
          condition: [],
          find: [],
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
    searchData() {
      return this.value.condition.filter(
        (v) =>
          v.fieldNameEn &&
          v.fieldNameEn.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    searchData1() {
      return this.value.find.filter(
        (v) =>
          v.fieldNameEn &&
          v.fieldNameEn.toLowerCase().includes(this.search1.toLowerCase())
      );
    },
  },
  data() {
    return {
      checkAllCondition: false,
      checkAllFind: false,
      isIndeterminateCondition: false,
      isIndeterminateFind: false,
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
      orderTypeList: [
        { value: "ASC", label: "升序" },
        { value: "DESC", label: "降序" },
      ],
      findTabName: "03",
      page: 1,
      page1: 1,
      size: 10,
      size1: 10,
      search: "",
      search1: "",
    };
  },
  methods: {
    handleSizeChange(val) {
      this.size = val;
    },

    handleSizeChange1(val) {
      this.size1 = val;
    },

    handleCurrentChange(val) {
      this.page = val;
    },

    handleCurrentChange1(val) {
      this.page1 = val;
    },

    selectFiled(value, item) {
      item.fieldNameCn = value.fieldNameCn || value.fieldNameEn;
      item.fieldNameEn = value.fieldNameEn;
      item.type = value.type;
      item.operation = "";
      this.$emit("input", this.value);
    },

    add() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.value.order.push({
            fieldNameCn: "",
            fieldNameEn: "",
            type: "",
            operation: "ASC",
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

    handleCheckAllChangeFind(val) {
      this.isIndeterminateFind = false;
      this.value.find.forEach((item) => {
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

    checkFind(value, item) {
      item.flag = value;
      let totalCount = this.value.find.length;
      const someStatusCount = this.value.find.filter((v) => v.flag === value)
        .length;
      this.checkAllFind = totalCount === someStatusCount ? value : !value;
      this.isIndeterminateFind =
        someStatusCount > 0 && someStatusCount < totalCount;
      this.$emit("input", this.value);
    },

    changeOperation(value, item) {
      item.operation = value;
      this.$emit("input", this.value);
    },
  },
};
</script>

<style lang="less" scoped>
.el-form-item {
  margin-bottom: 0;
}
</style>
