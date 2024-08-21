<template>
    <el-dialog
        class="stuiSignIn"
        :visible.sync="show"
        width="500px"
        append-to-body
        :show-close="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
    >
        <div class="login-box">
            <div class="login-top">
                <img class="logo" src="./img/logo.png" alt="" />
                <span>业务平台</span>
            </div>
            <div class="login-content">
                <div class="loginForm">
                    <div class="login-tag" v-if="!loginTag">
                        <div class="input-group" type="flex" justify="space-between">
                            <big>密码登录</big>

                            <div class="login-icon-list">
                                <div class="login-tip">
                                    <div class="poptip">
                                        <div class="poptip-arrow"><em></em><span></span></div>
                                        <div class="poptip-content">扫码登录</div>
                                    </div>
                                </div>
                                <img
                                    src="https://sti.unistrong.com/group1/M00/00/27/wKgFhWBleWmAAVHVAAAFPELTHVo702.svg"
                                    width="30px"
                                    style="position: relative; top: -4px"
                                    alt=""
                                    @click="loginTag = true"
                                    srcset=""
                                />
                            </div>
                        </div>
                        <div class="input-group">
                            <div class="prepend">用户名</div>
                            <input
                                class="input"
                                type="text"
                                autocomplete="off"
                                name="username"
                                placeholder="请输入用户名"
                                v-model="form.username"
                            />
                        </div>
                        <div class="input-group password">
                            <div class="prepend">密码</div>
                            <input
                                class="input"
                                :type="inputType"
                                autocomplete="off"
                                name="password"
                                placeholder="请输入密码"
                                v-model="form.password"
                                @keydown.enter="login"
                            />
                            <img
                                v-if="inputType === 'password'"
                                class="eye"
                                src="./img/eye.svg"
                                @click="inputType = 'text'"
                            />
                            <img
                                v-else
                                class="eye"
                                src="./img/eye-close.svg"
                                @click="inputType = 'password'"
                            />
                        </div>
                        <input type="text" class="perventAutoComplete" disabled />
                        <div class="error">
                            <span v-if="error">{{ error }}</span>
                        </div>
                        <button
                            type="button"
                            :class="{ button: true, 'is-loading': loading }"
                            @click="login"
                            :disabled="loading"
                        >
                            <span>登录</span>
                        </button>
                    </div>

                    <div class="QRcode-tag" v-if="loginTag">
                        <div class="input-group" type="flex" justify="space-between">
                            <big>扫码登录</big>

                            <div class="login-icon-list">
                                <div class="login-tip">
                                    <div class="poptip">
                                        <div class="poptip-arrow"><em></em><span></span></div>
                                        <div class="poptip-content">账号登录</div>
                                    </div>
                                </div>
                                <div
                                    class="userName"
                                    @click="loginTag = false"
                                    alt=""
                                    srcset=""
                                ></div>
                            </div>
                        </div>
                        <div class="QRcode-img">
                            <img
                                src="https://sti.unistrong.com/group1/M00/00/27/wKgFhWBlrrCAdTsiAAAlgJa2zRY097.png"
                                width="150px"
                                alt=""
                            />
                            <small>扫码登录</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <userAuthorization ref="user_authorization"></userAuthorization>
    </el-dialog>
</template>
<script>
import userAuthorization from "./userAuthorization";
export default {
    inject: ["reload"],
    components: {
        userAuthorization,
    },
    data() {
        return {
            show: false,
            loginTag: false,
            loading: false,
            inputType: "password",
            error: "",
            form: {
                username: "",
                password: "",
            },
            AuthDao: null,
        };
    },
    mounted() {
        this.AuthDao = dao.create({
            login: {
                url: "/ipms/sysUser/login",
                method: "POST",
                headers: {
                    appVersion: "1.0.0",
                    uniId: "100",
                },
            },
            logout: {
                url: "/ipms/sysUser/logout",
                method: "GET",
            },
        });
    },
    methods: {
        getPage() {
            this.show = true;
        },
        async login() {
            this.error = "";
            if (this.form.username && this.form.password) {
                this.loading = true;
                try {
                    const resp = await this.AuthDao.login({
                        data: this.form,
                    });
                    const { content, status, code } = resp.data;
                    if (status === "success") {
                        this.loading = false;
                        location.reload();
                        // this.show = false;
                        // this.redirectToSystem();
                        localStorage.setItem("userId", content.id);
                        // 判断是否要把tokenid存到session
                        sessionStorage.setItem("tokenId", content.token);
                    } else {
                        //如果是未授权状态(code为10401)，弹出框，让他走用户授权
                        if (code === 10401) {
                            this.$refs.user_authorization.getPage(resp);
                        } else {
                            this.error = resp.data.message || "服务器异常，请稍后再试";
                        }
                    }
                    this.loading = false;
                } catch (error) {
                    this.loading = false;
                }
            } else {
                this.error = "请输入用户名和密码";
            }
        },

        redirectToSystem() {
            const { redirectURL } = __.url.getUrlParams();
            if (redirectURL) {
                window.location.href = decodeURIComponent(redirectURL);
            } else {
                this.$router.push("/home");
            }
        },
    },
};
</script>
<style lang="less" scoped>
.stuiSignIn {
    background: url("./img/login-bg.jpg");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    .QRcode-img {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        height: 160px;
    }
    .login-icon-list {
        display: flex;
        width: 34%;
        justify-content: space-between;
        .login-tip {
            .poptip {
                color: #ff6a00;
                .poptip-arrow {
                    position: absolute;
                    z-index: 10;
                    top: 8px;
                    right: 0;

                    span,
                    em {
                        border-width: 6px 0 6px 6px;
                        position: absolute;
                        zoom: 1;
                        width: 0;
                        height: 0;
                        border-color: hsla(0, 0%, 100%, 0);
                        border-style: solid;
                        overflow: hidden;
                        top: 0;
                        left: 0;
                        border-width: 6px 0 6px 6px;
                        border-left-color: #ffe1cc;
                    }
                    em {
                        top: 0;
                        left: 1px;
                        border-left-color: #ff9000;
                        border-width: 6px 0 6px 6px;
                    }
                }

                background-color: #e6f9fc;
                border-color: #00c1de;
                line-height: 16px;
                position: relative;
                z-index: 9999;
                background-color: #fefcee;
                border: 1px solid #ff9000;
                padding: 5px 10px;
                background-color: #ffe1cc;
                border-color: #ff6a00;
            }
        }
        .userName {
            width: 36px;
            background-position-x: -3px;
            background-repeat: no-repeat;
            background-position-y: 0px;
            background-size: cover;
            background-image: url(https://sti.unistrong.com/group1/M00/00/27/wKgFhWBleWGAcz_jAAADQxgSANM529.svg);
        }
    }

    /deep/ .el-dialog__body {
        padding: 0px 41px 0 35px;

        background-color: #f1f3fa;
        margin: 0 auto;
        width: 100%;
        height: 420px;
    }
    /deep/ .el-dialog__header {
        background-color: #f1f3fa;
        border: none;
        .el-dialog__headerbtn .el-dialog__close {
            color: #101010;
        }
    }
    .login-box {
        position: relative;
        top: -15px;

        .login-top {
            display: flex;
            align-items: center;

            .logo {
                width: 40px;
            }
            span {
                font-size: 16px;
                color: #666;
                display: block;
                margin-left: 10px;
            }
        }
        .login-content {
            .loginForm {
                position: relative;
                width: 100%;
                margin: 15px auto;
                background-color: #fff;
                padding: 15% 10%;
                border-radius: 10px;
                height: 350px;
                .input-group {
                    width: 100%;
                    height: 38px;
                    margin: 2px 0;
                    display: flex;
                    font-size: 14px;
                    position: relative;
                    justify-content: space-between;
                    .prepend {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 30%;
                        // border-radius: 24px 0 0 24px;
                        background-color: #fff;
                        border: 1px solid #dcdfe6;
                        border-right: 0;
                        color: #909399;
                        padding: 0 20px;
                        white-space: nowrap;
                    }

                    .eye {
                        position: absolute;
                        width: 26px;
                        height: 26px;
                        right: 9px;
                        top: 8px;
                        cursor: pointer;
                    }

                    .input {
                        height: 38px;
                        width: 100%;
                        // border-radius: 0 24px 24px 0;
                        border: 1px solid #dcdfe6;
                        border-left: none;
                        background-color: #fff;
                        color: #606266;
                        line-height: 40px;
                        padding: 0 40px 0 15px;
                        transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
                        width: 0;
                        flex: auto;
                    }
                }

                .input-group.password {
                    margin-top: 20px;
                }

                .error {
                    height: 20px;
                    margin-top: 12px;

                    span {
                        color: red;
                    }
                }

                .button {
                    //margin-top: 10px;
                    width: 100%;
                    height: 40px;
                    background: #3a84ff;
                    // border-radius: 21px;
                    color: #fff;
                    display: inline-block;
                    line-height: 1;
                    white-space: nowrap;
                    cursor: pointer;
                    border: 1px solid #dcdfe6;
                    -webkit-appearance: none;
                    text-align: center;
                    box-sizing: border-box;
                    outline: 0;
                    //margin: 0;
                    transition: 0.1s;
                    font-weight: 500;
                    padding: 12px 20px;
                    font-size: 14px;
                    -moz-user-select: none;
                    margin-top: 10px;
                }

                .button.is-loading {
                    cursor: not-allowed;
                }

                .button.is-loading:before {
                    pointer-events: none;
                    content: "";
                    position: absolute;
                    left: -1px;
                    top: -1px;
                    right: -1px;
                    bottom: -1px;
                    border-radius: inherit;
                    background-color: hsla(0, 0%, 100%, 0.35);
                }

                .perventAutoComplete {
                    opacity: 0;
                    height: 0;
                    overflow: hidden;
                    display: block;
                    height: 0;
                }
            }
            .login-bg {
                width: 35%;
                margin-top: -12px;
            }
        }
    }
}
</style>
