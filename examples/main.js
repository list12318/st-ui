import Vue from "vue";
import STMSUI from "./../packages/index";
import App from "./App.vue";
import Router from "vue-router";

Vue.use(Router);

// 配置路由
const router = new Router({
  routes: [
    // {
    //   path: "*",
    //   name: "404",
    //   component: (resolve) => require(["@/views/404/index"], resolve),
    // },
  ],
});

// 注册组件库
Vue.use(STMSUI);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
