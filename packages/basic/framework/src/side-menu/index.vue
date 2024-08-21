<!--
 * @Author: your name
 * @Date: 2021-02-08 13:48:38
 * @LastEditTime: 2021-08-21 12:00:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \st-ui\packages\basic\framework\src\side-menu\index.vue
-->
<template>
  <div class="stms-framework-side-menu">
    <div class="head">
      <span
        v-if="!collapse"
        class="el-icon-s-fold"
        @click="collapse = !collapse"
      ></span>
      <span
        v-if="collapse"
        class="el-icon-s-unfold"
        @click="collapse = !collapse"
      ></span>
    </div>
    <div class="menuBox">
      <el-menu
        background-color="#324157"
        text-color="rgb(208,222,234)"
        active-text-color="#37CFC9"
        :collapse="collapse"
        menu-trigger="click"
        class="el-menu-vertical-demo"
        :default-active="active"
        router
        unique-opened
      >
        <template v-for="item in menu">
          <el-submenu
            v-if="item.children && item.children.length"
            :index="item.path || item.name"
            :key="item.path || item.name"
          >
            <template slot="title">
              <template v-if="item.icon">
                <i class="iconfont navIcon" :class="item.icon" />
              </template>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item
              v-for="x in item.children"
              :key="x.path || x.name"
              :index="x.path || x.name"
            >
              <span class="split" style="margin-left: 36px;"></span>
              {{ x.name }}
            </el-menu-item>
          </el-submenu>
          <el-menu-item
            v-else
            :index="item.path || item.name"
            :key="item.path || item.name"
          >
            <template v-if="item.icon">
              <i class="iconfont navIcon" :class="item.icon" />
            </template>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: String,
      required: false,
      default: "",
    },
    menu: {
      type: Array,
      required: false,
      default: function() {
        return [];
      },
    },
  },
  data() {
    return {
      collapse: false,
    };
  },
};
</script>

<style lang="less">
@import url("./index.less");
</style>
