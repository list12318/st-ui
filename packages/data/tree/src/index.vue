<template>
    <div class="stms-tree">
        <div class="title" v-if="title">
            <span>{{ title }}</span>
            <div class="tool">
                <slot name="tool"></slot>
            </div>
        </div>
        <div class="search" v-if="filterable">
            <el-input
                size="small"
                @keyup.enter.native="handleSearch"
                v-model="searchStr"
                :placeholder="placeholder"
                icon="search"
                maxlength="50"
            >
                <el-button
                    size="small"
                    slot="append"
                    icon="el-icon-search"
                    @click="handleSearch"
                ></el-button>
            </el-input>
        </div>
        <stms-scrollbar>
            <div class="tree-box">
                <el-tree
                    v-if="isInit"
                    ref="tree"
                    :indent="16"
                    :expand-on-click-node="false"
                    :highlight-current="false"
                    :node-key="itemKey"
                    :current-node-key="activeKey"
                    :data="treeData"
                    :default-expand-all="isDefaultExpandAll"
                    :render-content="renderContent"
                    :filter-node-method="filterNode"
                    :show-checkbox="showCheckbox"
                    :default-checked-keys="defaultCheckedKeys"
                    :draggable="draggable"
                    :allow-drop="treeAllowDrop"
                    :allow-drag="treeAllowDrag"
                    :check-strictly="checkStrictly"
                    @node-expand="nodeExpand"
                    @node-click="handleNodeClick"
                    @node-contextmenu="contextMenu"
                    @check="handleCheck"
                    @check-change="checkChange"
                    :load="load"
                    :lazy="isLazy"
                    :props="{
                        isLeaf: 'isLeaf',
                    }"
                    @node-drag-start="handleDragStart"
                    @node-drag-enter="handleDragEnter"
                    @node-drag-leave="handleDragLeave"
                    @node-drag-over="handleDragOver"
                    @node-drag-end="handleDragEnd"
                    @node-drop="handleDrop"
                >
                    >
                </el-tree>
            </div>
        </stms-scrollbar>
        <div class="tree-page" v-if="pagination">
            <el-pagination
                @size-change="
                    (pageSize) => {
                        const { onChange, pageNum } = this.pagination;
                        onChange && onChange(pageNum, pageSize, search);
                    }
                "
                @current-change="
                    (pageNum) => {
                        const { onChange, pageSize } = this.pagination;
                        onChange && onChange(pageNum, pageSize, search);
                    }
                "
                :current-page="pagination.pageNum"
                :page-size="pagination.pageSize"
                layout="prev, pager, next"
                :total="pagination.total"
                :pager-count="4"
            >
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    name: "stms-tree",
    props: {
        value: {
            type: Object,
            required: false,
            default: null,
        },
        title: {
            type: String,
            required: false,
            default: null,
        },
        itemKey: {
            type: String,
            required: false,
            default: "id",
        },
        itemLabel: {
            type: String,
            required: false,
            default: "name",
        },
        itemPid: {
            type: String,
            required: false,
            default: "parentId",
        },
        data: {
            type: Array,
            required: false,
            default: function () {
                return [];
            },
        },
        placeholder: {
            required: false,
            type: String,
            default: "请搜索",
        },
        filterable: {
            required: false,
            type: Boolean,
            default: true,
        },
        showCheckbox: {
            required: false,
            type: Boolean,
            default: false,
        },
        defaultCheckedKeys: {
            required: false,
            type: Array,
            default: function () {
                return [];
            },
        },
        treeDataRoot: {
            required: false,
            type: Object,
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
        lazy: {
            required: false,
            type: Boolean,
            default: false,
        },
        lazyOnSearch: {
            required: false,
            type: Boolean,
            default: false,
        },
        defaultExpandAll: {
            required: false,
            type: Boolean,
            default: true,
        },
        pagination: {
            type: Object,
            required: false,
            default: null,
        },
        draggable: {
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
        levelLinked: {
            required: false,
            type: Boolean,
            default: true,
        },
        checkStrictly: {
            required: false,
            type: Boolean,
            default: true,
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
        renderTitle: {
            required: false,
            type: Function,
            default: null,
        },
    },
    watch: {
        search(val) {
            if (!this.lazy) {
                this.$refs.tree && this.$refs.tree.filter(val.toLowerCase());
            } else {
                this.isInit = false;
                this.$nextTick(() => {
                    this.isInit = true;
                });
            }
        },
    },
    data() {
        return {
            isInit: false,
            searchStr: "",
            search: "",
        };
    },
    mounted() {
        this.isInit = true;
    },
    computed: {
        activeKey() {
            if (this.value) {
                return this.value[this.itemKey];
            }
            return {};
        },
        treeData() {
            const { data, treeDataRoot, isLazy } = this;
            if (isLazy) {
                return undefined;
            }
            if (!treeDataRoot) {
                return data;
            }
            return this.buildTreeData();
        },
        isLazy() {
            if (this.search) {
                return this.lazyOnSearch;
            } else {
                return this.lazy;
            }
        },
        isDefaultExpandAll() {
            if (this.isLazy) {
                return false;
            }
            return this.defaultExpandAll;
        },
    },
    methods: {
        buildTreeData() {
            const { data, treeDataRoot, itemLabel, itemKey, itemPid } = this;
            const root = {
                [itemKey]: treeDataRoot[itemKey],
                [itemLabel]: treeDataRoot[itemLabel],
                data: treeDataRoot,
                disabled: treeDataRoot.disabled,
            };
            const result = [root];

            function build(parent) {
                const child = data.filter((v) => v[itemPid] === parent[itemKey]);
                if (child.length) {
                    !parent.children && (parent.children = []);
                    child.forEach((v) => {
                        const value = {
                            [itemKey]: v[itemKey],
                            [itemLabel]: v[itemLabel],
                            data: v,
                            disabled: v.disabled,
                        };
                        build(value);
                        parent.children.push(value);
                    });
                }
            }

            build(root);
            return result;
        },
        handleNodeClick(data, node, e) {
            if (!node.disabled) {
                this.$emit("input", data);
                this.$emit("node-click", data, node);
            }
        },
        nodeExpand(data, node, e) {
            this.$emit("node-expand", data, node);
        },
        filterNode(value, data, node) {
            //搜索显示子节点
            if (!value) return true;
            let _array = [];
            this.getReturnNode(node, _array, value);
            let result = false;
            _array.forEach((item) => {
                result = result || item;
            });
            return result;
        },
        getReturnNode(node, _array, value) {
            let isPass =
                node.data &&
                node.data[this.itemLabel] &&
                node.data[this.itemLabel].toLowerCase().indexOf(value) !== -1;
            isPass ? _array.push(isPass) : "";
            this.index++;
            if (!isPass && node.level != 1 && node.parent) {
                this.getReturnNode(node.parent, _array, value);
            }
        },
        renderContent(h, { node, data, store }) {
            const { activeKey, itemKey, itemLabel, renderIcon, renderTitle } = this;
            const icon = renderIcon ? renderIcon(node, data) : null;
            const title = renderTitle ? renderTitle(node, data, data[itemLabel]) : data[itemLabel];
            return (
                <div
                    class={"custom-tree-node" + (activeKey === data[itemKey] ? " active" : "")}
                    onmouseenter={() => {
                        this.mouseEnter(node, data);
                    }}
                    onmouseout={() => {
                        this.mouseOut(node, data);
                    }}
                >
                    {(function () {
                        return icon ? (
                            <img class="button" src={icon}>
                                {" "}
                            </img>
                        ) : (
                            <span
                                class={
                                    data.children && data.children.length
                                        ? "button is-parent"
                                        : "button is-leaf"
                                }
                            >
                                {" "}
                            </span>
                        );
                    })()}
                    <span class="text" title={title}>
                        {data[itemLabel]}
                    </span>
                </div>
            );
        },
        mouseEnter(node, data) {
            this.$emit("mouse-enter", node, data);
        },
        mouseOut(node, data) {
            this.$emit("mouse-out", node, data);
        },
        contextMenu(e, data, node) {
            this.$emit("context-menu", e, data, node);
        },

        getCheckedKeys() {
            return this.$refs.tree.getCheckedKeys();
        },
        getCheckedNodes() {
            return this.$refs.tree.getCheckedNodes();
        },
        setCheckedKeys(value) {
            return this.$refs.tree.setCheckedKeys(value);
        },
        setCheckedNodes(value) {
            return this.$refs.tree.setCheckedNodes(value);
        },
        handleCheck(currentObj, treeStatus) {
            const { itemKey, levelLinked, singleCheckbox } = this;
            if (singleCheckbox && treeStatus.checkedKeys.length) {
                this.$refs.tree.setCheckedKeys([currentObj[itemKey]]);
            } else if (levelLinked) {
                const uniteChildSame = (data, isSelected) => {
                    if (!data.disabled) {
                        this.$refs.tree.setChecked(data[itemKey], isSelected);
                    }
                    data.children &&
                        data.children.forEach((v) => {
                            uniteChildSame(v, isSelected);
                        });
                };
                const selectedParent = (data) => {
                    let currentNode = this.$refs.tree.getNode(data);
                    if (currentNode.parent.key !== undefined && !currentNode.parent.disabled) {
                        this.$refs.tree.setChecked(currentNode.parent, true);
                        selectedParent(currentNode.parent);
                    }
                };
                const selected = treeStatus.checkedKeys.find((v) => v === currentObj.id);
                if (selected) {
                    selectedParent(currentObj);
                    uniteChildSame(currentObj, true);
                } else {
                    uniteChildSame(currentObj, false);
                }
            }
        },
        checkChange(data, node) {
            this.$emit("check-change", data, node);
        },
        handleDragStart(node, ev) {
            this.$emit("node-drag-start", ...arguments);
        },
        handleDragEnter(draggingNode, dropNode, ev) {
            this.$emit("node-drag-enter", ...arguments);
        },
        handleDragLeave(draggingNode, dropNode, ev) {
            this.$emit("node-drag-leave", ...arguments);
        },
        handleDragOver(draggingNode, dropNode, ev) {
            this.$emit("node-drag-over", ...arguments);
        },
        handleDragEnd(draggingNode, dropNode, dropType, ev) {
            this.$emit("node-drag-end", ...arguments);
        },
        handleDrop(draggingNode, dropNode, dropType, ev) {
            this.$emit("node-drop", ...arguments);
        },
        treeAllowDrop(draggingNode, dropNode, type) {
            return this.allowDrop ? this.allowDrop(...arguments) : true;
        },
        treeAllowDrag(draggingNode) {
            return this.allowDrag ? this.allowDrag(...arguments) : true;
        },
        handleSearch() {
            this.search = this.searchStr;
            this.$emit("search", this.searchStr);
            if (this.pagination) {
                const { onChange, pageNum, pageSize } = this.pagination;
                onChange && onChange(pageNum, pageSize, this.search);
            }
        },
        updateKeyChildren(data, arr) {
            return this.$refs.tree.updateKeyChildren(data, arr);
        },
        reInit(data) {
            this.isInit = false;
            this.$nextTick(() => {
                this.isInit = true;
            });
        },
    },
};
</script>

<style lang="less">
@import "./index.less";
</style>
