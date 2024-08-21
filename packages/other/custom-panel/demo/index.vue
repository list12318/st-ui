<template>
  <div>
    <el-button type="primary" @click="changeMode">设置面板</el-button>
    <stms-panel
      :data="test"
      :isEdit="isEdit"
      @ract="getData"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      isEdit: false,
      test: [{
        id: "9CB0A0B21ED348F3BC140547086273BC",
        width: 200,
        height: 200,
        top: 0,
        left: 0,
        viewer: {
          options: {
            addComponent: () => {},
          },
          defaultValue: null,
          isInit: false,
        }
      },{
        id: "6C328B21D81B414D87187ADE3CF5C6EE",
        width: 200,
        height: 200,
        top: 0,
        left: 300,
        viewer: {
          options: {
            addComponent: () => {},
          },
          defaultValue: null,
          isInit: false,
        }
      },{
        id: "363D2CC769B54397A5C0F4B47DFBDD15",
        width: 200,
        height: 200,
        top: 300,
        left: 0,
        viewer: {
          options: {
            addComponent: () => {},
          },
          defaultValue: null,
          isInit: false,
        }
      },{
        id: "C1C9240A14074785B0F12F313CC069BE",
        width: 200,
        height: 200,
        top: 300,
        left: 300,
        viewer: {
          options: {
            addComponent: () => {},
          },
          defaultValue: null,
          isInit: false,
        }
      }],
    };
  },
  mounted() {},
  methods: {
    getData(data) {
      console.log(data,8)
    },
    changeMode() {
      this.isEdit = !this.isEdit;
    }
  },
};
</script>
