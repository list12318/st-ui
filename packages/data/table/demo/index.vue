<template>
  <stms-table
    :data="data"
    :schema="schema"
    :loading="loading"
    :total="total"
    :pageNum="pageNum"
    :pageSize="pageSize"
    row-selection
    @page-change="change"
    full
  />
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          name: "namename",
          username: "usernameusername",
          status: "statusstatusstatus",
        },
        {
          name: "namename",
          username: "usernameusername",
          status: "statusstatusstatus",
        },
        {
          name: "namename",
          username: "usernameusername",
          status: "statusstatusstatus",
        },
        {
          name: "namename",
          username: "usernameusername",
          status: "statusstatusstatus",
        },
        {
          name: "namename",
          username: "usernameusername",
          status: "statusstatusstatus",
        },
        {
          name: "namename",
          username: "usernameusername",
          status: "statusstatusstatus",
        },
        {
          name: "namename",
          username: "usernameusername",
          status: "statusstatusstatus",
        },
        {
          name: "namename",
          username: "usernameusername",
          status: "statusstatusstatus",
        },
        {
          name: "namename",
          username: "usernameusername",
          status: "statusstatusstatus",
        },
        {
          name: "namename",
          username: "usernameusername",
          status: "statusstatusstatus",
        },
        {
          name: "namename",
          username: "usernameusername",
          status: "statusstatusstatus",
        },
        {
          name: "namename",
          username: "usernameusername",
          status: "statusstatusstatus",
        },
        {
          name: "namename",
          username: "usernameusername",
          status: "statusstatusstatus",
        },
        {
          name: "namename",
          username: "usernameusername",
          status: "statusstatusstatus",
        },
        {
          name: "namename",
          username: "usernameusername",
          status: "statusstatusstatus",
        },
        {
          name: "namename",
          username: "usernameusername",
          status: "statusstatusstatus",
        },
        {
          name: "namename",
          username: "usernameusername",
          status: "statusstatusstatus",
        },
      ],
      schema: [
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "username",
          label: "用户名",
        },
        {
          prop: "status",
          label: "状态",
        },
      ],
      loading: false,
      total: 220,
      pageNum: 1,
      pageSize: 10,
    };
  },
  mounted() {},
  methods: {
    change(pageNum, pageSize) {
      this.pageNum = pageNum;
      this.pageSize = pageSize;
      console.log(pageNum, pageSize);
    },
  },
};
</script>
