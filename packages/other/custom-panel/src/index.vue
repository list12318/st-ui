<template>
  <div class="stms-custom-panel">
    <template v-if="isEdit">
      <VueDragResize
        v-for="x in data"
        :key="x.id"
        :isActive="x.isActive"
        :x="x.left"
        :y="x.top"
        :w="x.width"
        :h="x.height"
        :isDraggable="true"
        :isResizable="true"
        @resizing="resize(x, ...arguments)"
        @dragging="resize(x, ...arguments)"
        @resizestop="getRact"
        @dragstop="getRact"
        @clicked="onActivated(x)"
      >
        <i class="el-icon-error del" @click="deleteModel(x)"></i>
        <div
          class="content"
          :style="{
            position: 'absolute',
            left: 0,
            top: 0,
            width: `${x.width}px`,
            height: `${x.height}px`,
          }"
        >
          <viewer :appId="x.appId" />
        </div>
      </VueDragResize>
    </template>
    <template v-else>
      <div
        v-for="x in data"
        :key="x.id"
        :style="{
          position: 'absolute',
          left: `${x.left}px`,
          top: `${x.top}px`,
          width: `${x.width}px`,
          height: `${x.height}px`,
        }"
      >
        <div
          class="content"
          :style="{
            position: 'absolute',
            left: 0,
            top: 0,
            width: `${x.width}px`,
            height: `${x.height}px`,
          }"
        >
          <viewer :appId="x.appId" />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import VueDragResize from "vue-drag-resize";
import viewer from "./viewer";

export default {
  name: "stms-custom-panel",
  components: { VueDragResize, viewer },
  props: {
    data: {
      type: Array,
      required: true,
      default: function () {
        return [];
      },
    },
    isEdit: {
      type: Boolean,
      required: true,
      default: false,
    },
  },

  data() {
    return {};
  },
  methods: {
    resize(oldValue, newValue) {
      let now = this.data.find((x) => {
        return x.id == oldValue.id;
      });
      now.width = newValue.width;
      now.height = newValue.height;
      now.top = newValue.top;
      now.left = newValue.left;
    },
    getRact() {
      this.$emit("ract", this.data);
    },
    onActivated(data) {
      this.data.forEach((x) => {
        x.isActive = false;
      });
      let now = this.data.find((x) => {
        x.isActive = false;
        return x.id == data.id;
      });
      now.isActive = true;
    },
    async searchStructure(componentId) {
      const resp = await dao.request({
        url: "/design/webPage/byCondition",
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        data: {
          appId: componentId,
        },
      });
      return JSON.parse(resp.data.content[0].structure);
    },
    async addComponent(lib) {
      const { group, key, version } = lib;
      const resp = await dao.request({
        url: "/design/webComponentVersion/findInfo",
        method: "GET",
        params: {
          group,
          key,
          version,
        },
      });
      return resp.data.content;
    },
    deleteModel(data) {
      this.$emit("modelDelete", data);
    },
  },
};
</script>

<style lang="less">
@import "./index.less";
</style>
