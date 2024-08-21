<template>
  <div class="tree-editor">
    <el-button
      class="root-btn"
      type="primary"
      size="mini"
      @click="showCreateModal()"
      >添加根目录</el-button
    >
    <el-tree
      :data="value"
      :node-key="nodeKey"
      default-expand-all
      :expand-on-click-node="false"
      :render-content="renderContent"
      draggable
      :allow-drop="allowDrop"
      :allow-drag="allowDrag"
    >
    </el-tree>
    <stms-dialog-form
      ref="dialog"
      :schema="schema"
      :size="size"
      :modal="false"
      :width="modalWidth"
      :title="mode === 'create' ? '新建' : '编辑'"
      @confirm="confirm"
    />
  </div>
</template>

<script>
export default {
  name: "stms-tree-editor",
  props: {
    value: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    size: {
      type: String,
      required: false,
      default: "small",
    },
    nodeKey: {
      type: String,
      required: false,
      default: "id",
    },
    label: {
      type: String,
      required: false,
      default: "name",
    },
    schema: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    modalWidth: {
      type: String,
      required: false,
      default: "300px",
    },
    renderName: {
      type: Function,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      activeData: null,
      mode: "create",
    };
  },
  methods: {
    showCreateModal(data) {
      this.activeData = data;
      this.mode = "create";
      this.$refs.dialog.show();
    },
    showEditModal(data) {
      this.activeData = data;
      this.mode = "edit";
      this.$refs.dialog.show(data);
    },
    confirm(data, close) {
      function uuidGenerator() {
        let originStr = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
          originChar = "0123456789ABCDEF",
          len = originChar.length;
        return originStr.replace(/x/g, function(match) {
          return originChar.charAt(Math.floor(Math.random() * len));
        });
      }
      if (this.mode === "create") {
        const pushData = {
          ...data,
          id: uuidGenerator(),
        };
        if (!this.activeData) {
          this.value.push(pushData);
        } else if (!this.activeData.children) {
          this.$set(this.activeData, "children", []);
          this.activeData.children.push(pushData);
        } else {
          this.activeData.children.push(pushData);
        }
      } else if (this.mode === "edit") {
        Object.assign(this.activeData, data);
      }
      this.$emit("input", this.value);
      close();
    },
    deleteMenu(node, data) {
      this.$confirm("此操作将删除该项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let parent = null;
        const findParent = (list) => {
          list.forEach((v) => {
            if (v.children) {
              if (
                v.children.some((c) => c[this.nodeKey] === data[this.nodeKey])
              ) {
                parent = v;
              } else {
                findParent(v.children);
              }
            }
          });
        };
        findParent(this.value);
        const list = parent ? parent.children : this.value;
        list.splice(
          list.findIndex((d) => d[this.nodeKey] === data[this.nodeKey]),
          1
        );
        this.$emit("input", this.value);
      });
    },
    renderContent(h, { node, data, store }) {
      return (
        <div class="custom-tree-node">
          <span class="name" title={data[this.label]}>
            {this.renderName
              ? this.renderName({ node, data, store })
              : data[this.label]}
          </span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.showCreateModal(data)}
            >
              添加子目录
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.showEditModal(data)}
            >
              编辑
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.deleteMenu(node, data)}
            >
              删除
            </el-button>
          </span>
        </div>
      );
    },

    allowDrop(draggingNode, dropNode, type) {
      return true;
    },
    allowDrag(draggingNode) {
      return true;
    },
  },
};
</script>

<style lang="less">
@import "./index.less";
</style>
