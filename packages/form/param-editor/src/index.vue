<template>
  <div class="stms-param-editor">
    <el-table :data="value" :max-height="maxHeight">
      <el-table-column :width="40" v-if="columnDraggable">
        <template slot-scope="scope">
          <div
            @dragstart="
              (e) => {
                dragstart(e, scope);
              }
            "
            @drop="
              (e) => {
                drop(e, scope);
              }
            "
            draggable
            @dragover="dragover"
          >
            <i class="el-icon-rank drag"></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        v-for="(item, index) in columns"
        :key="index"
      >
        <template slot-scope="scope">
          <stms-form-item-lib
            :type="getType(item, scope.row)"
            :props="getProps(item, scope.row)"
            :on="getListener(item, scope)"
            v-model="scope.row[item.prop]"
            @input="change(scope.row[item.prop], item.prop, item, scope)"
            :size="size"
          />
        </template>
      </el-table-column>
      <el-table-column prop="index" label="操作" :width="actionWidth">
        <template slot-scope="scope">
          <div class="action">
            <el-link
              v-for="(item, index) in actions"
              :key="index"
              :type="item.type"
              :underline="false"
              @click="item.click(scope.row, scope.$index, scope)"
              >{{ item.text }}</el-link
            >
            <el-link
              slot="reference"
              type="danger"
              :underline="false"
              @click="deleteColumn(scope.$index)"
              >删除</el-link
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="stms-param-editor-actions">
      <el-button type="default" @click="addColumn" :size="size">添加</el-button>
      <el-button
        v-for="(item, index) in tools"
        :key="index"
        :type="item.type"
        @click="item.click"
        :size="item.size"
        >{{ item.text }}</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "stms-param-editor",
  props: {
    value: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
    columns: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
    actions: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
    tools: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
    defaultAddValue: {
      type: Object,
      required: false,
      default() {
        return {};
      },
    },
    actionWidth: {
      type: Number,
      required: false,
      default: 80,
    },
    maxHeight: {
      type: Number,
      required: false,
      default: null,
    },
    size: {
      type: String,
      required: false,
      default: "small",
    },
    columnDraggable: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    getListener() {
      return function (item, scope) {
        const listener = item.on || {};
        const result = {};
        for (let x in listener) {
          result[x] = function () {
            listener[x](...arguments, scope.row, scope.$index, scope);
          };
        }
        return result;
      };
    },
    getType() {
      return (item, value) => {
        const { prop, type } = item;
        if (typeof type === "function") {
          return type(value[prop], value, item);
        }
        return type;
      };
    },
    getProps() {
      return (item, value) => {
        const { prop, props } = item;
        if (typeof props === "function") {
          return props(value[prop], value, item);
        }
        return props;
      };
    },
  },
  mounted() {
    this.columns.forEach(({ prop }) => {
      if (typeof this.value[prop] === "undefined") {
        Vue.set(this.value, "prop", "");
      }
    });
    this.$emit("input", this.value);
  },
  methods: {
    addColumn() {
      this.value.push(this.copy(this.defaultAddValue));
      this.$emit("input", this.value);
    },
    deleteColumn(index) {
      this.value.splice(index, 1);
      this.$emit("input", this.value);
    },
    copy(data) {
      let obj;
      if (Object.prototype.toString.call(data) == "[object Array]") {
        obj = [];
        data.forEach((val) => {
          obj.push(this.copy(val));
        });
      } else if (Object.prototype.toString.call(data) == "[object Object]") {
        obj = {};
        for (const key in data) {
          obj[key] = this.copy(data[key]);
        }
      } else {
        return data;
      }
      return obj;
    },
    dragstart(e, scope) {
      e.dataTransfer.setData("index", scope.$index);
    },
    drop(e, scope) {
      const index = e.dataTransfer.getData("index");
      const newIndex = scope.$index;
      this.value.splice(newIndex, 0, this.value.splice(index, 1)[0]);
      this.$emit("input", this.value);
    },
    dragover(e) {
      e.preventDefault();
    },
    change(value, key, item, scope) {
      this.$emit("item-change", value, key, item, scope);
      this.$emit("input", this.value);
    },
  },
};
</script>

<style lang="less">
@import "./index.less";
</style>
