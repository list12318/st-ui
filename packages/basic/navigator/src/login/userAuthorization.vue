<template>
  <div class="user-authorization" v-if="show">
    <div class="user-main">
      <div class="title">
        <span class="title-head">用户授权</span>
        <span class="title-footer" @click="close">X</span>
      </div>
      <div class="content">
        <p class="content-head">{{ loginText }}</p>
        <div class="content-content">
          <p>
            当前系统的ID为： <span ref="copy_text">{{ machineText }}</span>
          </p>
          <div>
            <img src="./img/copy.png" @click="copy" />
            <span v-if="copySuccess">复制成功</span>
          </div>
        </div>
        <div class="content-footer">
          <p>授权码：</p>
          <textarea rows="2" v-model="authorizationCode"></textarea>
          <p v-if="noCode" style="color: #f56c6c">请输入授权码</p>
        </div>
      </div>
      <div class="footer">
        <p
          :class="{
            success: activationStatus === 1,
            error: activationStatus === 0,
          }"
        >
          {{ activationText }}
        </p>
        <button @click="activation">激 活</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "userAuthorization",
  data() {
    return {
      show: false,
      noCode: false,
      loginText: "",
      machineText: "",
      copySuccess: false,
      authorizationCode: "",
      activationStatus: null,
      activationText: null,
    };
  },
  methods: {
    getPage(data) {
      this.loginText = data.message;
      //清空
      this.copySuccess = false;
      this.machineText = "";
      this.authorizationCode = "";
      //激活状态码
      this.activationStatus = null;
      this.activationText = null;
      // 初始化接口
      this.initService();
      this.getMachine();
      this.show = true;
    },
    initService() {
      this.pageDao = dao.create({
        //获取机器码
        getMachine: {
          url: "/ipms/license/api/machineCode",
          method: "GET",
        },
        //激活
        activation: {
          url: "/ipms/license/api/activate",
          method: "POST",
        },
      });
    },
    //查询机器码
    async getMachine() {
      try {
        const res = await this.pageDao.getMachine();
        if (res.data.status === "success") {
          this.machineText = res.data.content;
        }
      } catch (error) {}
    },
    //复制
    copy() {
      let val = this.$refs.copy_text;
      window.getSelection().selectAllChildren(val);
      document.execCommand("Copy");
      this.copySuccess = true;
    },
    //激活
    async activation() {
      if (this.authorizationCode == "") {
        this.noCode = true;
      } else {
        this.noCode = false;
        try {
          const res = await this.pageDao.activation({
            data: {
              machineCode: this.authorizationCode,
            },
          });
          if (res.data.status === "success") {
            this.activationStatus = 1;
            this.activationText = "激活成功";
            this.show = false;
            this.redirectToSystem();
          } else {
            this.activationStatus = 0;
            this.activationText = "激活失败";
          }
        } catch (error) {
          this.activationStatus = 0;
          this.activationText = "激活失败";
        }
      }
    },
    close() {
      this.show = false;
    },
    redirectToSystem() {
      location.reload();
      // const { redirectURL } = __.url.getUrlParams();
      // if (redirectURL) {
      //     window.location.href = decodeURIComponent(redirectURL);
      // } else {
      //     window.location.href = "/service/#/home";
      // }
    },
  },
};
</script>

<style lang="less" scoped>
.user-authorization {
  width: 100%;
  /*height: 100%;*/
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: url("./img/login-bg.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  //   background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  .user-main {
    width: 70%;
    height: 500px;
    background: #ffffff;
    .title {
      background: #ffffff;
      padding: 20px 20px 10px;
      text-align: center;
      position: relative;
      .title-head {
        color: #409eff;
        line-height: 24px;
        font-size: 18px;
        font-weight: bold;
      }
      .title-footer {
        position: absolute;
        right: 20px;
        top: 20px;
        color: #aaa;
        font-size: 18px;
        cursor: pointer;
      }
    }
    .content {
      width: 90%;
      margin: 20px auto 0;
      .content-head {
        color: #097dab;
        font-weight: bold;
      }
      .content-content {
        margin-top: 30px;
        display: flex;
        p {
          color: #097dab;
          font-weight: bold;
        }
        div {
          display: flex;
          align-items: center;
          img {
            width: 14px;
            margin-left: 10px;
            cursor: pointer;
            /*height: 20px;*/
          }
          span {
            color: #909399;
            margin-left: 10px;
          }
        }
      }
      .content-footer {
        margin-top: 20px;
        height: 270px;
        p {
          color: #666;
        }
        textarea {
          width: 100%;
          margin-top: 10px;
          border-color: #dcdfe6;
          /*resize:none;*/
          outline: none;
          max-width: 100%;
          max-height: 240px;
          color: #666666;
        }
      }
    }
    .footer {
      width: 90%;
      margin: 20px auto 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .success {
        font-size: 16px;
        color: #67c23a;
      }
      .error {
        font-size: 16px;
        color: #f56c6c;
      }
      button {
        width: 70px;
        height: 40px;
        background: #3a84ff;
        border-radius: 5px;
        color: #fff;
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        border: 1px solid #dcdfe6;
        -webkit-appearance: none;
        text-align: center;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        outline: 0;
        font-weight: 500;
        font-size: 14px;
      }
    }
  }
}
</style>
