<template>
  <div class="stms-breadcrumb" v-if="data.length">
    <div class="breadcrumbContainer">
      <span class="fa fa-map-marker"></span>
      <div class="breadcrumbBody">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item
            v-for="item in data"
            :key="item.path || item.name"
            >{{ item.name }}</el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "stms-breadcrumb",
  computed: {
    data() {
      const menu = this.$store.getters.menu;
      const path = this.$route.path;
      const params = this.$route.params;
      const current = menu.find((v) => v.url === path);
      if (!current) {
        return [];
      }
      const data = [];
      function execute(id) {
        const value = menu.find((v) => v.id === id);
        if (value) {
          data.unshift({
            id: value.id,
            name: value.name,
            path: value.url
              ? __.url.pathToRegexp.compile(value.url)(params)
              : null,
          });
          value.parentId && execute(value.parentId);
        }
      }
      execute(current.id);
      return data;
    },
  },
};
</script>
<style lang="less">
@import "./index.less";
</style>
