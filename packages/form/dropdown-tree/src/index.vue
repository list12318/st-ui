<template>
  <div class="stms-dropdown-tree">
    <div class="mask" v-show="visible" @click="visible = !visible"></div>
    <el-popover
      placement="bottom-start"
      :width="width"
      trigger="manual"
      v-model="visible"
    >
      <div :style="style">
        <stms-tree
          ref="tree"
          :check-strictly="checkStrictly"
          :default-checked-keys="value"
          :showCheckbox="showCheckbox"
          :single-checkbox="singleCheckbox"
          :item-label="itemLabel"
          :item-key="itemKey"
          :render-icon="renderIcon"
          :load="load"
          :data="data"
          :lazy="lazy"
          :pagination="pagination"
          @search="search"
          @check-change="checkChange"
          @node-click="nodeClick"
        />
      </div>
      <stms-select
        :popper-append-to-body="popperAppendToBody"
        style="width: 100%"
        popper-class="tree-select"
        slot="reference"
        :multiple="true"
        ref="select"
        :collapse-tags="true"
        :size="size"
        :value="value"
        class="stms-dropdown-tree-select"
        :options="allTreeData"
        @input="onSelectChange"
        @click.native="visibleClick"
      >
      </stms-select>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: "stms-dropdown-tree",
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    value: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
    itemLabel: {
      type: String,
      required: false,
      default: "name",
    },
    itemKey: {
      type: String,
      required: false,
      default: "id",
    },
    load: {
      type: Function,
      required: false,
      default: null,
    },
    lazy: {
      required: false,
      type: Boolean,
      default: false,
    },
    singleCheckbox: {
      required: false,
      type: Boolean,
      default: false,
    },
    renderIcon: {
      required: false,
      type: Function,
      default: null,
    },
    size: {
      type: String,
      default() {
        return "small";
      },
    },
    width: {
      type: Number,
      default() {
        return 342;
      },
    },
    height: {
      type: Number,
      default() {
        return 400;
      },
    },
    popperAppendToBody: {
      required: false,
      type: Boolean,
      default: false,
    },
    showCheckbox: {
      required: false,
      type: Boolean,
      default: true,
    },
    checkStrictly: {
      required: false,
      type: Boolean,
      default: true,
    },
    pagination: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      visible: false,
      options: [],
      style: `height:${this.height}px;`,
      selectTreeData: [],
    };
  },
  computed: {
    allTreeData() {
      const forEach = function (data, callback) {
        data.forEach((v) => {
          callback(v);
          if (v.children) {
            forEach(v.children, callback);
          }
        });
      };
      const list = [];
      const { itemLabel, itemKey } = this;
      forEach(this.data, (v) => {
        list.push({
          label: v[itemLabel],
          value: v[itemKey],
        });
      });
      return list.concat(this.selectTreeData);
    },
  },
  watch: {
    value(value) {
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedKeys(value);
      }
    },
  },
  methods: {
    checkChange(data, node) {
      const checkedKeys = this.$refs.tree.getCheckedKeys();
      this.$emit("input", checkedKeys);
      this.selectTreeData.push({
        label: data[this.itemLabel],
        value: data[this.itemKey],
      });
    },
    visibleClick() {
      this.visible = !this.visible;
      // 下拉框再次展开时，清楚上次搜索后的数据
      if (this.visible) {
        this.$refs.tree.search = this.$refs.tree.searchStr = "";
      }
      this.$emit("visibleClick", this.visible);
    },
    onSelectChange(data) {
      this.$emit("input", data);
    },
    nodeClick(data) {
      if (this.singleCheckbox) {
        this.$emit("input", [data]);
        this.selectTreeData.push({
          label: data[this.itemLabel],
          value: data[this.itemKey],
        });
        this.visible = false;
      }
    },
    getCheckedNodes() {
      return this.$refs.tree.getCheckedNodes();
    },
    search(data) {
      this.$emit("tree-search", data);
    },
  },
};
</script>

<style lang="less">
@import "./index.less";
</style>
