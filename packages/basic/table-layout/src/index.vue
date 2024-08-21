<template>
  <div class="stms-table-layout">
    <stms-breadcrumb v-if="!hideCrumb"></stms-breadcrumb>
    <div class="layoutContainer">
      <div class="layoutContainerFlex">
        <div
          v-if="treeData || load"
          class="treeContainer"
          :class="{ collapsed: collapsed }"
        >
          <div class="tapContainer">
            <div class="tap" @click="collapsed = !collapsed"></div>
          </div>
          <stms-list
            :renderTitle="renderTitle"
            v-if="treeStyle === 'list'"
            v-loading="loading"
            element-loading-text="拼命加载中..."
            :title="treeTitle"
            :value="treeValue"
            :item-label="itemLabel"
            :data="computedTreeData"
            :pagination="pagination"
            @node-click="treeClick"
            ref="tree"
          >
            <template slot="extra">
              <slot name="extra"> </slot>
            </template>
            <template slot="tool">
              <slot name="tool"> </slot>
            </template>
          </stms-list>
          <stms-tree
            v-else
            :renderTitle="renderTitle"
            v-loading="loading"
            element-loading-text="拼命加载中..."
            :title="treeTitle"
            :value="treeValue"
            :item-label="itemLabel"
            :tree-data-root="treeDataRoot"
            :lazy-on-search="lazyOnSearch"
            :render-icon="renderIcon"
            :data="computedTreeData"
            :pagination="pagination"
            :load="load"
            :lazy="lazy"
            @search="search"
            @node-click="treeClick"
            @context-menu="contextMenu"
            ref="tree"
            @node-drop="handleDrop"
            draggable
            :allow-drop="allowDrop"
            :allow-drag="allowDrag"
          >
            <template slot="extra">
              <slot name="extra"> </slot>
            </template>
            <template slot="tool">
              <slot name="tool"> </slot>
            </template>
          </stms-tree>
        </div>
        <div class="tableContainer">
          <div class="tableContainerFlex">
            <slot name="container"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "stms-table-layout",
  props: {
    renderTitle: {
      required: false,
      type: Function,
      default: null,
    },
    loading: {
      required: false,
      type: Boolean,
      default: false,
    },
    treeValue: {
      type: Object,
      required: false,
      default: null,
    },
    treeTitle: {
      type: String,
      required: false,
      default: "",
    },
    treeData: {
      type: Array,
      required: false,
      default: function () {
        return null;
      },
    },
    treeStyle: {
      type: String,
      required: false,
      default: function () {
        return "default";
      },
    },
    itemLabel: {
      type: String,
      required: false,
      default: "name",
    },
    treeDataRoot: {
      type: Object,
      required: false,
      default: null,
    },
    hideCrumb: {
      required: false,
      type: Boolean,
      default: false,
    },
    lazyOnSearch: {
      required: false,
      type: Boolean,
      default: false,
    },
    renderIcon: {
      required: false,
      type: Function,
      default: null,
    },
    pagination: {
      type: Object,
      required: false,
      default: null,
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
    allowDrop: {
      required: false,
      type: Function,
      default: null,
    },
    allowDrag: {
      required: false,
      type: Function,
      default: null,
    },
  },
  computed: {
    computedTreeData() {
      if (this.treeStyle === "default") {
        return [
          {
            name: this.treeTitle,
            children: this.treeData,
          },
        ];
      }
      return this.treeData;
    },
  },
  data() {
    return {
      collapsed: false,
    };
  },
  methods: {
    treeClick(data) {
      this.$emit("tree-click", data);
    },
    contextMenu(e, data, node) {
      this.$emit("context-menu", e, data, node);
    },
    search(data) {
      this.$emit("tree-search", data);
    },
    setFirstTreeNode() {
      return this.treeData[0];
    },
    getTreeObj() {
      return this.$refs.tree.getTreeObj();
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      this.$emit("node-drop", ...arguments);
    },
  },
};
</script>

<style lang="less">
@import "./index.less";
</style>
