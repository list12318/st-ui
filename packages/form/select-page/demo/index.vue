<template>
  <stms-select-page
    :data="table.data"
    :placeholder="'请选择'"
    v-model="node"
    :pagination="{
      pageNum: table.pageNum,
      pageSize: table.pageSize,
      total: table.pageTotal,
      onChange: pageChange,
    }"
  ></stms-select-page>
</template>
<script>
export default {
  data() {
    return {
      node: "",
      table: {
        data: [
          {
            id: "aaaa",
            name: "1",
          },
          {
            id: "bbbb",
            name: "2",
          },
          {
            id: "cccc",
            name: "3",
          },
        ],
        pageTotal: 200,
        pageSize: 10,
        pageNum: 1,
      },
    };
  },
  mounted() {},
  methods: {
    pageChange(pageNum, pageSize) {
      this.table.pageNum = pageNum;
      this.table.pageSize = pageSize;
    },
  },
};
</script>
