<template>
  <div class="stms-table" :class="{ full }">
    <resize-observer @notify="resize" />
    <div class="table-container">
      <div class="table-container-flex">
        <el-table
          ref="table"
          :row-key="rowKey"
          style="width: 100%"
          :data="data"
          @selection-change="onSelectionChange"
          @select="onSelect"
          @select-all="onSelectAll"
          :stripe="stripe"
          :max-height="maxHeight"
          :height="height"
          v-loading="loading"
          element-loading-text="拼命加载中"
        >
          <el-table-column
            v-if="rowSelection"
            type="selection"
            width="40"
            :reserve-selection="reserveSelection"
          >
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="70"
          ></el-table-column>
          <slot name="start"></slot>
          <el-table-column
            v-for="item in schema"
            :key="item.id"
            :prop="item.prop"
            :label="item.label"
            :min-width="item.width"
            :show-overflow-tooltip="showTips"
          >
            <template slot-scope="scope">
              <span v-if="item.render">{{
                item.render(scope.row[item.prop], scope.row)
              }}</span>
              <span v-else>{{ scope.row[item.prop] || "--" }}</span>
            </template>
          </el-table-column>
          <slot name="end"></slot>
        </el-table>
      </div>
    </div>
    <el-pagination
      background
      v-if="pagination"
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page="pagination.pageNum || 1"
      :page-size="pagination.pageSize || 10"
      :page-sizes="pagination.pageSizes || [10, 20, 30, 40, 50, 100]"
      layout="sizes,total, prev, pager, next, jumper"
      :total="pagination.total"
      :pager-count="5"
    ></el-pagination>
  </div>
</template>

<script>
import ResizeObserver from "vue-resize/src/components/ResizeObserver";

export default {
  name: "stms-table",
  components: {
    ResizeObserver,
  },
  props: {
    rowKey: "",
    reserveSelection: false,
    schema: {
      type: Array,
      required: false,
      default: function () {
        return [];
      },
    },
    data: {
      type: Array,
      required: false,
      default: function () {
        return [];
      },
    },
    rowKey: {
      type: String,
      required: false,
      default: "id",
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    pagination: {
      type: Object,
      required: false,
      default: null,
    },
    stripe: {
      type: Boolean,
      required: false,
      default: false,
    },
    rowSelection: {
      type: Boolean,
      required: false,
      default: false,
    },
    height: {
      type: [String, Number],
      required: false,
      default: null,
    },
    showTips: {
      type: Boolean,
      required: false,
      default: true,
    },
    full: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  mounted() {
    this.resize();
    this.$nextTick(() => {
      this.resize();
    });
  },
  data() {
    return {
      maxHeight: null,
      selection: [],
    };
  },
  methods: {
    resize() {
      if (this.full) {
        this.maxHeight = this.$refs.table.$el.offsetHeight;
      }
    },
    onSelectionChange(selection) {
      this.selection = selection;
      this.$emit("selection-change", selection);
    },
    onSelect(selection, row) {
      this.$emit("select", selection, row);
    },
    onSelectAll(selection) {
      this.$emit("select-all", selection);
    },
    sizeChange(pageSize) {
      const { onChange, pageNum } = this.pagination;
      onChange && onChange(pageNum, pageSize);
    },
    currentChange(pageNum) {
      const { onChange, pageSize } = this.pagination;
      onChange && onChange(pageNum, pageSize);
    },
    getSelection() {
      return this.selection;
    },
    toggleRowSelection(row, selected) {
      this.$refs.table.toggleRowSelection(row, selected);
    },
    clearSelection() {
      this.$refs.table.clearSelection();
    },
    toggleAllSelection() {
      this.$refs.table.toggleAllSelection();
    },
  },
};
</script>

<style lang="less">
@import "./index.less";
</style>
