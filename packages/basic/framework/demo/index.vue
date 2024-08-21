<template>
  <stms-framework :menu="menu" :path="path" :params="params">
    <div class="system" slot="tool">
      <el-cascader
        :show-all-levels="false"
        :props="props"
        filterable
        :options="appList"
        placeholder="请选择应用"
        @change="handleChange"
        v-model="appId"
      ></el-cascader>
    </div>
  </stms-framework>
</template>

<script>
export default {
  data() {
    return {
      path: "/app/a",
      params: {},
      menu: [
        {
          id: "CD3FFA085659BF113854BF4E49A309DC",
          name: "应用开发",
          icon: "/cdn/icon/menu/panelTheme.svg",
          path: "/app",
          children: [
            {
              id: "907DD3BDFC2CC0A555A63D1B45A2A544",
              name: "服务开发",
              icon: "/cdn/icon/menu/serviceDevelopment.svg",
              path: "/app/service",
            },
            {
              id: "04149AFEE14A3143FEE2785AB78F8A76",
              name: "基础数据",
              icon: "/cdn/icon/menu/dataBase.svg",
              children: [
                {
                  id: "10E319D01B328B5F649D49A73E60762A",
                  name: "数据字典",
                  icon: "/cdn/icon/menu/default.svg",
                  path: "/app/dictionary",
                },
                {
                  id: "5C29492361C3B318051924D1262ECEEA",
                  name: "业务表",
                  icon: "/cdn/icon/menu/default.svg",
                  path: "/app/table",
                },
              ],
            },
            {
              id: "0D6AB21FF6840B10FB13D164187C83E6",
              name: "配置中心",
              icon: "/cdn/icon/menu/default.svg",
              children: [
                {
                  id: "37CB266558270C1AAB4894E71782FB6E",
                  name: "管理员设置",
                  icon: "/cdn/icon/menu/default.svg",
                  path: "/app/admin",
                },
                {
                  id: "B93510057771D2FC7FC8438FBD16EEA0",
                  name: "运行组",
                  icon: "/cdn/icon/menu/default.svg",
                  path: "/app/group",
                },
                {
                  id: "774531D936E2CDE7C05FF1EE9B1580CE",
                  name: "应用设置",
                  icon: "/cdn/icon/menu/default.svg",
                  path: "/app/app",
                },
              ],
            },
            {
              id: "A98BF3572224B16FB31D6B463DB1278B",
              name: "BPM定义",
              icon: "/cdn/icon/menu/processDevelopment.svg",
              path: "/app/bpmdefine",
            },
            {
              id: "E38C2075FBADE5D53D9797747B00A911",
              name: "BPM监控",
              icon: "/cdn/icon/menu/processMonitor.svg",
              path: "/app/bpmmonitor",
            },
            {
              id: "00CE427AA48D1E71BDAC6871D4E80CB5",
              name: "BPM仿真",
              icon: "/cdn/icon/menu/processSimulation.svg",
              path: "/app/bpmsimulation",
            },
            {
              id: "97395BD3F998DFBE7AF1355771594E48",
              name: "服务地图",
              icon: "/cdn/icon/menu/serviceMap.svg",
              path: "/app/map",
            },
            {
              id: "5C1A9F8964574823C2F0A2F5F5FCE4C1",
              name: "内容管理",
              icon: "/cdn/icon/menu/default.svg",
              path: "/app/content",
            },
          ],
        },
        {
          id: "DA70922BA29FB186E7805FEB87600CC3",
          name: "门户开发",
          icon: "/cdn/icon/menu/gatewayDevelop.svg",
          path: "/portal",
          children: [
            {
              id: "256CF3D533AE676C7D70EF058795A6A9",
              name: "服务开发",
              icon: "/cdn/icon/menu/serviceDevelopment.svg",
              path: "/portal/service",
            },
            {
              id: "2360C29A569D882BF2E836628AFF1D35",
              name: "基础数据",
              icon: "/cdn/icon/menu/dataBase.svg",
              children: [
                {
                  id: "255E33D6F32516E76D3C58D78C574159",
                  name: "数据字典",
                  icon: "/cdn/icon/menu/default.svg",
                  path: "/portal/dictionary",
                },
                {
                  id: "E216528C9E7EB6EE1493071D149A75BA",
                  name: "业务表",
                  icon: "/cdn/icon/menu/default.svg",
                  path: "/portal/table",
                },
              ],
            },
            {
              id: "7C8CEA68F2F547A24132409CBDA51202",
              name: "配置中心",
              icon: "/cdn/icon/menu/default.svg",
              children: [
                {
                  id: "30ED776E85710361E7CB1329EE59C27C",
                  name: "管理员设置",
                  icon: "/cdn/icon/menu/default.svg",
                  path: "/portal/admin",
                },
                {
                  id: "46FAFA4CBB031F1E44B5D96189EE3585",
                  name: "运行组",
                  icon: "/cdn/icon/menu/default.svg",
                  path: "/portal/group",
                },
                {
                  id: "C88C34845F210817FEAE94AE80EB8671",
                  name: "应用设置",
                  icon: "/cdn/icon/menu/default.svg",
                  path: "/portal/app",
                },
              ],
            },
            {
              id: "6517D2981F7BEEB27CA08FEDC5076948",
              name: "BPM定义",
              icon: "/cdn/icon/menu/processDevelopment.svg",
              path: "/portal/bpmdefine",
            },
            {
              id: "63D09EE29628E201077664801EFCBF30",
              name: "BPM监控",
              icon: "/cdn/icon/menu/processMonitor.svg",
              path: "/portal/bpmmonitor",
            },
            {
              id: "61FD9A41F4EAC44483563C5B49671515",
              name: "BPM仿真",
              icon: "/cdn/icon/menu/processSimulation.svg",
              path: "/portal/bpmsimulation",
            },
            {
              id: "21F3CBD9F409E65B87A388ABE0CDF6AA",
              name: "服务地图",
              icon: "/cdn/icon/menu/serviceMap.svg",
              path: "/portal/map",
            },
            {
              id: "C0EFA202C2A5CCC8053365CFFBAE2C13",
              name: "内容管理",
              icon: "/cdn/icon/menu/default.svg",
              path: "/portal/content",
            },
          ],
        },
        {
          id: "4135EAD6D9A49ADA1CE14268F8677976",
          name: "Api定义",
          icon: "/cdn/icon/menu/inlatformSet.svg",
          path: "/api",
        },
        {
          id: "F79C92091A1645C8836AA29B50D6353F",
          name: "服务编排",
          icon: "/cdn/icon/menu/serviceOrchestration.svg",
          path: "/pipeline",
        },
        {
          id: "410D0B1E3E01896BBF684B01A7946C0E",
          name: "Java仓库",
          icon: "/cdn/icon/menu/componentWarehouseJava.svg",
          path: "/java",
          children: [
            {
              id: "21A2DBE0AA1A072C4E69E71655975099",
              name: "公共组件",
              icon: "/cdn/icon/menu/commonComponents.svg",
              path: "/java/public",
            },
            {
              id: "7F1908C64597603AD28C3C96256AC265",
              name: "应用组件",
              icon: "/cdn/icon/menu/appComponents.svg",
              path: "/java/app",
            },
          ],
        },
        {
          id: "D5BBDE60BB54200C7767435B97FBF67F",
          name: "搜索中心",
          icon: "/cdn/icon/menu/searchCenter.svg",
          path: "/search",
          children: [
            {
              id: "398E8B7A4F717759EE992FD14601CE8E",
              name: "数据源配置",
              icon: "/cdn/icon/menu/dataConfig.svg",
              path: "/search/data",
            },
            {
              id: "1289097DEB4EC379BBB8F16BE896725B",
              name: "搜索",
              icon: "/cdn/icon/menu/search.svg",
              path: "/search/app",
            },
          ],
        },
        {
          id: "9953DD45B6E721C1EF1CBC28ACD3148F",
          name: "调度中心",
          icon: "/cdn/icon/menu/dispatchCenter.svg",
          path: "/schedule",
          children: [
            {
              id: "0D2359A7D91A85887AC9A22B7959A789",
              name: "调度任务",
              icon: "/cdn/icon/menu/taskschedule.svg",
              path: "/schedule/task",
              children: [
                {
                  id: "ADAB2F2E374FF873D12C139B6B266A8D",
                  name: "服务开发",
                  icon: "/cdn/icon/menu/default.svg",
                  path: "/schedule/task/develop",
                },
                {
                  id: "D3F1472AEFA15B8C78618C53DD32B2A0",
                  name: "服务编排",
                  icon: "/cdn/icon/menu/default.svg",
                  path: "/schedule/task/pipeline",
                },
                {
                  id: "B365C1EB74C735F0B74AF524C415679E",
                  name: "服务接入",
                  icon: "/cdn/icon/menu/default.svg",
                  path: "/schedule/task/access",
                },
              ],
            },
          ],
        },
      ],
      appId: "",
      appList: [],
      props: {
        value: "id",
        label: "nameCn",
      },
    };
  },
  mounted() {
    this.AuthDao = dao.create({
      getApp: {
        url: "/design/app/findAppByProject",
      },
    });
    this.getApp();
  },
  methods: {
    //获取应用
    async getApp() {
      const res = await this.AuthDao.getApp();
      const { status, content } = res.data;
      if (status === "success") {
        this.appList = content;
        const appId = sessionStorage.getItem("appId");
        if (appId) {
          this.appId = JSON.parse(appId);
        } else {
          if (this.appList[0]?.children[0]) {
            this.appId = [this.appList[0].id, this.appList[0].children[0].id];
            sessionStorage.setItem("appId", JSON.stringify(this.appId));
          }
        }
      }
    },
    //选择应用
    handleChange() {
      sessionStorage.setItem("appId", JSON.stringify(this.appId));
    },
  },
};
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.system {
  padding: 0px 10px 0 0;
  display: flex;
  align-items: center;
  .el-input__inner {
    color: #fff;
    background: transparent;
    border: none;
  }
}
</style>
