<template>
  <div>
    <div class="bp-management-navigator" v-if="isInit">
      <div class="logo">
        <img src="./img/title.png" />
        <span>{{ title }}</span>
      </div>
      <div class="menu">
        <slot></slot>
      </div>
      <div class="loginBox">
        <div class="tool">
          <slot name="tool"></slot>
          <div class="user">
            <div class="userIcon">
              <i class="el-icon-user-solid"></i>
            </div>
            <div class="userDropdown">
              <el-dropdown @command="logout" trigger="click">
                <span class="el-dropdown-link">
                  <marquee direction="left" width="86px" scrollamount="4"
                    >Hi，{{ userInfo.name }}</marquee
                  ><i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    ><i class="el-icon-back"></i>退出系统</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <!-- <div class="off" @click="logout">
            <span class="fa fa-power-off"></span>
            <span>退出</span>
          </div>
          <div class="username">
           
          </div> -->
        </div>
      </div>
    </div>

    <login ref="loginForm" />
    <userAuthorization ref="user_authorization"></userAuthorization>
  </div>
</template>

<script>
import Login from "./login";
import UserAuthorization from "./login/userAuthorization";
let timer = null;
export default {
  name: "stms-navigator",
  props: {
    title: {
      type: String,
      required: false,
      default: "业务开发平台",
    },
  },
  components: {
    Login,
    UserAuthorization,
  },
  computed: {
    pathname() {
      return window.location.pathname;
    },
  },
  data() {
    return {
      isInit: false,
      userInfo: {
        name: "",
      },
      webSocket: null,
      moToken: __.storage.cookieStorage.get("tokenId"),
    };
  },
  mounted() {
    // 注册接口
    this.AuthDao = dao.create({
      autoLogin: {
        url: "/ipms/sysUser/autoLogin",
      },
      logout: {
        url: "/ipms/sysUser/logout",
      },
    });
    // dao拦截器
    this.daoInterceptor();
    this.autoLogin();
  },

  methods: {
    async autoLogin() {
      try {
        const { _token } = __.url.getUrlParams();
        const headers = {};
        if (_token) {
          headers.tokenId = _token;
        }
        const resp = await this.AuthDao.autoLogin({
          headers,
        });
        const { content, status } = resp.data;
        if (status === "success") {
          this.userInfo = content;
          localStorage.setItem("userId", content.id);
          sessionStorage.setItem("tokenId", content.token);
          // this.initWebSocket();
          this.isInit = true;
          this.$emit("init");
        } else {
          this.redirectToLogin();
        }
      } catch (e) {
        // console.error(e);
        this.redirectToLogin();
      }
    },
    async logout() {
      try {
        const resp = await this.AuthDao.logout();
        const { content, status } = resp.data;
        if (status === "success") {
          this.redirectToLogin();
        }
      } catch (e) {
        console.error(e);
        this.redirectToLogin();
      }
    },
    // 初始化dao拦截器
    daoInterceptor() {
      dao.interceptors.request.use((config) => {
        const tokenId = sessionStorage.getItem("tokenId");
        if (tokenId) {
          config.headers.tokenId = tokenId;
        }
        return config;
      });
      dao.interceptors.response.use(
        (response) => {
          const { notify, skipInterceptors } = response.config;
          if (!skipInterceptors) {
            const text = notify || "处理";
            // 成功的处理
            if (response.data.status === "success") {
              if (notify) {
                this.$message({
                  type: "success",
                  message: `${text}成功`,
                  duration: 3000,
                });
              }
            }
            // 授权过期
            else if (response.data.code === 10401) {
              this.$message({
                type: "error",
                message: "用户授权失效,请重新授权",
                duration: 3000,
              });
              setTimeout(() => {
                this.$refs.user_authorization.getPage(response.data);
              }, 3000);
            }
            // 错误处理
            else {
              if (notify) {
                this.$message({
                  type: "error",
                  message: `${text}失败！${response.data.message || ""}`,
                  duration: 3000,
                });
              }
            }
          }
          return response;
        },
        (error) => {
          const {
            status,
            data: { message },
            config: { notify, skipInterceptors },
          } = error.response;
          if (!skipInterceptors) {
            const text = notify || "处理";
            // 如果token过期或者鉴权失败，就重新登录
            if (status === 401) {
              // 如果登录弹窗没弹出，那么才提示，否则就不提示，为了在登录页时候刷新就别提示了
              if (!this.$refs.loginForm.show) {
                this.$message({
                  type: "error",
                  message: "登录授权失效,3秒后退出登录",
                  duration: 3000,
                });
              }
              setTimeout(() => {
                // 弹出登录页
                this.redirectToLogin();
              }, 3000);
            } else {
              this.$message({
                type: "error",
                message: `${text}失败！${message || ""}`,
                duration: 3000,
              });
            }
          }
        }
      );
    },
    // 退出登录并弹出登录页
    redirectToLogin() {
      // 清除session的tokenId
      __.storage.cookieStorage.remove("tokenId");
      window.localStorage.clear();
      window.sessionStorage.clear();
      if (this.webSocket) {
        this.webSocket.close();
      }
      // 弹登录页
      this.$refs.loginForm.getPage();
    },
    //跳转子系统
    goSubSystem(item) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const { url } = item;
        window.location.href = url;
      }, 300);
    },
    dblclickLinkTo(item) {
      clearTimeout(timer);
      const { url } = item;
      window.open(url);
    },
    //websocket统计在线人数
    initWebSocket() {
      if (location.protocol == "http:") {
        this.wsUrl = "ws";
      } else if (location.protocol == "https:") {
        this.wsUrl = "wss";
      }
      let userId = localStorage.getItem("userId");
      const wsuri =
        this.wsUrl +
        "://" +
        location.host +
        "/user/common/" +
        this.moToken +
        "?user=" +
        userId;
      this.webSocket = new Websocket(wsuri);
      this.webSocket.onclose = () => {
        setTimeout(() => {
          this.initWebSocket();
        }, 3000);
      };
    },
  },
  destroyed() {
    if (this.webSocket) {
      this.webSocket.close();
    }
  },
};
</script>

<style lang="less">
@import "./index.less";
</style>
