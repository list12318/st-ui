<template>
  <div class="stms-button-group-editor">
    <el-table :data="value">
      <el-table-column prop="button" label="预览">
        <template slot-scope="scope">
          <el-button
            :type="scope.row.type"
            :icon="scope.row.icon"
            :size="scope.row.size"
            :plain="scope.row.plain"
            :round="scope.row.round"
            :circle="scope.row.circle"
            ><span v-if="scope.row.text">{{ scope.row.text }}</span></el-button
          >
        </template>
      </el-table-column>
      <el-table-column prop="index" label="操作" :width="120">
        <template slot-scope="scope">
          <div class="action">
            <el-link
              slot="reference"
              type="primary"
              :underline="false"
              @click="editItem(scope.row, scope.$index)"
              >编辑</el-link
            >
            <el-popconfirm
              title="确定删除吗？"
              @onConfirm="deleteItem(scope.$index)"
            >
              <el-link slot="reference" type="danger" :underline="false"
                >删除</el-link
              >
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="stms-param-editor-actions">
      <el-button type="default" @click="addItem" :size="size"
        >添加操作按钮</el-button
      >
    </div>
    <button-config-dialog ref="dialog" :size="size" @confirm="confirm" />
  </div>
</template>

<script>
import ButtonConfigDialog from "./button-config";

export default {
  name: "stms-button-group-editor",
  components: { ButtonConfigDialog },
  props: {
    value: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
    size: {
      type: String,
      required: false,
      default: "small",
    },
  },
  data() {
    return {
      activeIndex: null,
    };
  },
  methods: {
    addItem() {
      this.$refs.dialog.show();
    },
    editItem(item, index) {
      this.activeIndex = index;
      this.$refs.dialog.show(item);
    },
    confirm(data, close) {
      if (this.activeIndex != null) {
        this.$set(this.value, this.activeIndex, data);
        this.activeIndex = null;
      } else {
        this.value.push(data);
      }
      close();
    },
    deleteItem(index) {
      this.value.splice(index, 1);
    },
  },
};
</script>

<style lang="less">
@import "./index.less";
</style>
