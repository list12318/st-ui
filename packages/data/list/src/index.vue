<template>
  <div
    :class="{
      'stms-list': true,
      ['stms-list--' + size]: true,
    }"
  >
    <div class="extra">
      <slot name="extra"></slot>
    </div>
    <div class="title" v-if="title">
      <span>{{ title }}</span>
      <div class="tool">
        <slot name="tool"></slot>
      </div>
    </div>
    <div class="search" v-if="filterable">
      <el-input
        :size="size"
        @keyup.enter.native="handleSearch"
        v-model="searchStr"
        :placeholder="placeholder"
        icon="search"
        maxlength="50"
      >
        <el-button
          :size="size"
          slot="append"
          icon="el-icon-search"
          @click="handleSearch"
        ></el-button
      ></el-input>
    </div>
    <stms-scrollbar>
      <div class="list-box">
        <template v-if="listData.length">
          <div
            v-for="(item, index) in listData"
            :key="index"
            :class="{
              'list-item': true,
              active: activeKey === item[itemKey],
            }"
            :title="
              renderTitle
                ? renderTitle(item, index, item[itemLabel])
                : item[itemLabel]
            "
            @click="listClick(item)"
            @dragstart="rowDragstart($event, index)"
            draggable
            @dragover.prevent
            @drop="rowDrop($event, index)"
          >
            <span v-if="renderContent">
              {{ getRenderContent(item) }}
            </span>
            <span v-else>
              {{ item[itemLabel] }}
            </span>
          </div></template
        >
        <div v-else class="empty-block">
          <span class="empty-text">暂无数据</span>
        </div>
      </div>
    </stms-scrollbar>
    <div class="list-page" v-if="pagination">
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
  name: "stms-list",
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
    data: {
      type: Array,
      required: false,
      default: function() {
        return [];
      },
    },
    placeholder: {
      type: String,
      required: false,
      default: "请搜索",
    },
    filterable: {
      type: Boolean,
      required: false,
      default: true,
    },
    pagination: {
      type: Object,
      required: false,
      default: null,
    },
    renderTitle: {
      required: false,
      type: Function,
      default: null,
    },
    size: {
      required: false,
      type: String,
      default: "small",
    },
    renderContent: {
      required: false,
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      search: "",
      searchStr: "",
    };
  },
  computed: {
    activeKey() {
      if (this.value) {
        return this.value[this.itemKey];
      }
      return {};
    },
    listData() {
      const { data, value, itemLabel, search, pagination } = this;
      if (!search) {
        return data;
      }
      if (pagination) {
        return data;
      }
      const filterData = data.filter((v) => {
        let label = v[itemLabel] || "";
        if (this.renderContent) {
          label = this.renderContent(v);
        }
        return label.toLowerCase().includes(search.toLowerCase());
      });
      if (
        value &&
        data.find((v) => v[this.itemKey] === value[this.itemKey]) &&
        !filterData.find((v) => v[this.itemKey] === value[this.itemKey])
      ) {
        // filterData.unshift(value);
      }
      return filterData;
    },
    getRenderContent() {
      return (data) => {
        return this.renderContent(data);
      };
    },
  },
  methods: {
    listClick(data) {
      this.$emit("input", data);
      this.$emit("node-click", data);
    },
    rowDragstart($event, index) {
      this.$emit("node-drag-start", $event, index);
    },
    rowDrop($event, index) {
      this.$emit("node-drag-end", $event, index);
    },
    handleSearch() {
      this.search = this.searchStr;
      if (this.pagination) {
        const { onChange, pageNum, pageSize } = this.pagination;
        onChange && onChange(pageNum, pageSize, this.search);
      }
    },
  },
};
</script>

<style lang="less">
@import "./index.less";
</style>
