<!--
 * @Author: your name
 * @Date: 2021-02-08 13:48:38
 * @LastEditTime: 2021-08-21 12:01:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \st-ui\packages\basic\framework\src\head-menu\index.vue
-->
<template>
  <div class="stms-framework-head-menu">
    <div class="menu-item" v-for="item in menu" :key="item.id">
      <router-link :to="{ path: item.path }">
        <template v-if="item.icon">
          <i class="iconfont navIcon" :class="item.icon" />
        </template>
        <span>{{ item.name }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
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
};
</script>

<style lang="less">
@import url("./index.less");
</style>
