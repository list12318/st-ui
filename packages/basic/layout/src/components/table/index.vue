<template>
  <div class="table-content">
    <div class="toolbar">
      <div class="btn-group">
        <el-button
          v-for="(item, index) in toolbar"
          :key="index"
          :type="item.type"
          :size="item.size"
          :icon="item.icon"
          :disabled="toolbarDisabled(item)"
          @click="toolbarClick(item)"
        >
          <span v-if="item.text">{{ item.text }}</span>
        </el-button>
      </div>
      <div class="search">
        <el-input
          show-word-limit
          placeholder="请填写搜索信息"
          v-model="component.config.condition.keyword"
          @keyup.enter.native="search"
          maxlength="50"
        >
          <i
            slot="suffix"
            class="el-input__icon el-icon-search"
            @click="search"
          ></i>
        </el-input>
      </div>
    </div>
    <div class="table">
      <div class="table-flex">
        <stms-table
          full
          :data="component.config.data"
          :schema="component.config.schema"
          :loading="component.config.loading"
          :pagination="{
            pageNum: component.config.pageNum,
            pageSize: component.config.pageSize,
            total: component.config.total,
            onChange: pageChange,
          }"
          row-selection
          @selection-change="selectionChange"
        >
          <el-table-column
            fixed="right"
            label="操作"
            :width="component.config.actionbarWidth"
            slot="end"
          >
            <template slot-scope="scope">
              <template v-if="actionbar.length > 2">
                <el-dropdown trigger="click">
                  <el-button type="default" size="mini">
                    操作
                    <i class="el-icon-caret-bottom el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <template v-for="(item, index) in actionbar">
                      <el-dropdown-item
                        v-if="actionbarShow(item, scope.row)"
                        :key="index"
                        @click.native.prevent="actionbarClick(item, scope.row)"
                        :disabled="actionbarDisabled(item, scope.row)"
                        ><i :class="item.icon" v-if="item.icon"></i
                        >{{ item.text }}</el-dropdown-item
                      >
                    </template>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
              <template v-else>
                <template v-for="(item, index) in actionbar">
                  <el-button
                    v-if="actionbarShow(item, scope.row)"
                    :key="index"
                    :type="item.type"
                    :size="item.size"
                    :icon="item.icon"
                    :disabled="actionbarDisabled(item, scope.row)"
                    @click="actionbarClick(item, scope.row)"
                  >
                    <span>{{ item.text }}</span>
                  </el-button>
                </template>
              </template>
            </template>
          </el-table-column>
        </stms-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    component: {
      type: Object,
      required: false,
      default: function() {
        return {};
      },
    },
    factory: {
      type: Object,
      required: false,
      default: function() {
        return {};
      },
    },
  },
  mounted() {
    this.$emit("triggerEvent", {
      name: "init",
    });
    this.init = true;
  },
  data() {
    return {
      init: false,
    };
  },
  computed: {
    actionbar() {
      if (!this.init) {
        return [];
      }
      const { actionbar } = this.component.config;
      const list = Object.keys(actionbar || {}).map((key) => {
        const item = actionbar[key];
        this.$set(item, "key", key);
        return item;
      });
      list.sort((a, b) => {
        return a.order > b.order;
      });
      return list;
    },
    toolbar() {
      if (!this.init) {
        return [];
      }
      const { toolbar } = this.component.config;
      const list = Object.keys(toolbar || {})
        .map((key) => {
          const item = toolbar[key];
          this.$set(item, "key", key);
          return item;
        })
        .filter((item) => {
          const { show } = item;
          if (typeof show === "undefined") {
            return false;
          }
          if (typeof show === "boolean") {
            return show;
          }
          if (typeof show === "function") {
            return show(this.factory, item);
          }
          return false;
        });
      list.sort((a, b) => {
        return a.order > b.order;
      });
      return list;
    },
  },
  methods: {
    actionbarShow(item, data) {
      if (!this.init) {
        return true;
      }
      const { show } = item;
      if (typeof show === "undefined") {
        return false;
      }
      if (typeof show === "boolean") {
        return show;
      }
      if (typeof show === "function") {
        return show(this.factory, item, data);
      }
      return false;
    },
    actionbarDisabled(item, data) {
      if (!this.init) {
        return true;
      }
      const { disabled } = item;
      if (typeof disabled === "undefined") {
        return false;
      }
      if (typeof disabled === "boolean") {
        return disabled;
      }
      if (typeof disabled === "function") {
        return disabled(this.factory, item, data);
      }
      return false;
    },
    actionbarClick(item, row) {
      this.$emit("triggerEvent", {
        name: "actionbarClick/" + item.key,
        data: {
          item,
          row,
        },
      });
    },
    toolbarDisabled(item) {
      if (!this.init) {
        return true;
      }
      const { disabled } = item;
      if (typeof disabled === "undefined") {
        return false;
      }
      if (typeof disabled === "boolean") {
        return disabled;
      }
      if (typeof disabled === "function") {
        return disabled(this.factory, item);
      }
      return false;
    },
    toolbarClick(item) {
      this.$emit("triggerEvent", {
        name: "toolbarClick/" + item.key,
        data: {
          item,
        },
      });
    },
    search() {
      this.$emit("triggerEvent", {
        name: "search",
      });
    },
    pageChange(pageNum, pageSize) {
      this.component.config.pageNum = pageNum;
      this.component.config.pageSize = pageSize;
      this.$emit("triggerEvent", {
        name: "pageChange",
        data: {
          pageNum,
          pageSize,
        },
      });
    },
    selectionChange(selection) {
      this.component.config.selection = selection;
    },

    triggerAction(name, data) {
      const { config } = this.component;
      if (name === "getQueryData") {
        const { condition, pageNum, pageSize } = config;
        return {
          condition,
          pageNum,
          pageSize,
        };
      }
      if (name === "getSelection") {
        return config.selection;
      }
      if (name === "clearData") {
        config.data = [];
        config.selection = [];
        config.total = 0;
        if (data) {
          config.pageNum = 1;
          config.condition = {
            keyword: "",
          };
        }
      }
      if (name === "setData") {
        config.data = data.data;
        config.total = data.total;
      }
      if (name === "setLoading") {
        config.loading = data;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
