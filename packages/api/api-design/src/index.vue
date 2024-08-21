<template>
    <el-dialog
        title="测试"
        :visible.sync="show"
        size="tiny"
        id="testClass"
        v-if="show"
        :close-on-click-modal="false"
        ref="dialog"
        fullscreen
        append-to-body
    >
        <div id="main">
            <form>
                <el-collapse v-model="defaultDisplay">
                    <el-collapse-item name="url">
                        <template slot="title">
                            <div class="collapseTitle">基本信息</div>
                        </template>
                        <div class="collapseContent">
                            <el-input
                                placeholder="服务器地址"
                                v-model="request.root"
                                class="serverAddress"
                                :title="request.root"
                            >
                                <el-select v-model="request.method" slot="prepend" :disabled="true">
                                    <el-option
                                        v-for="item in methodList"
                                        :key="item"
                                        :label="item"
                                        :value="item"
                                    ></el-option>
                                </el-select>
                                <template slot="append">
                                    <span class="url">{{ request.url }}</span>
                                </template>
                            </el-input>
                            <el-button type="success" class="testButton" @click="test"
                                >测试</el-button
                            >
                        </div>
                    </el-collapse-item>
                    <el-collapse-item name="param" v-if="requestTool.includes('xml')">
                        <template slot="title">
                            <div class="collapseTitle">请求参数</div>
                        </template>
                        <el-tabs v-model="activeName" style="margin-left:1%">
                            <el-tab-pane label="请求模板" name="xml"></el-tab-pane>
                            <el-tab-pane label="请求参数" name="xmlParam"></el-tab-pane>
                        </el-tabs>
                        <stms-ace-editor
                            v-if="activeName === 'xml'"
                            :value="request.requestBody.xml"
                            mode="xml"
                            width="100%"
                            height="335px"
                            @input="changeXml"
                        />
                        <stms-ace-editor
                            v-if="activeName === 'xmlParam'"
                            :value="request.requestBody.xmlParam"
                            mode="json"
                            width="100%"
                            height="335px"
                            @input="changeXmlParam"
                        />
                    </el-collapse-item>
                    <el-collapse-item name="param" v-else>
                        <template slot="title">
                            <div class="collapseTitle">请求参数</div>
                        </template>
                        <el-tabs v-model="activeName" style="margin-left:1%">
                            <el-tab-pane
                                label="Query"
                                name="query"
                                v-if="requestTool.includes('query')"
                            ></el-tab-pane>
                            <el-tab-pane
                                label="Headers"
                                name="headers"
                                v-if="requestTool.includes('headers')"
                            ></el-tab-pane>
                            <el-tab-pane
                                label="Body"
                                name="body"
                                v-if="requestTool.includes('body')"
                            ></el-tab-pane>
                            <el-tab-pane
                                label="pathParam"
                                name="pathParam"
                                v-if="requestTool.includes('pathParam')"
                            ></el-tab-pane>
                            <el-tab-pane
                                label="自定义变量"
                                name="customVarible"
                                v-if="requestTool.includes('customVarible')"
                            ></el-tab-pane>
                            <el-tab-pane
                                label="SQL语句"
                                name="sql"
                                v-if="requestTool.includes('sql')"
                            ></el-tab-pane>
                        </el-tabs>
                        <template>
                            <stms-api-design-query
                                v-if="activeName == 'query'"
                                v-model="request.requestBody.query"
                            ></stms-api-design-query>
                            <stms-api-design-headers
                                v-if="activeName == 'headers'"
                                v-model="request.requestBody.headers"
                            ></stms-api-design-headers>
                            <stms-api-design-bodys
                                v-if="activeName == 'body'"
                                v-model="request.requestBody.body"
                            ></stms-api-design-bodys>
                            <stms-api-design-path-param
                                v-if="activeName == 'pathParam'"
                                v-model="request.requestBody.pathParam"
                            ></stms-api-design-path-param>
                            <stms-api-design-custom-varible
                                v-if="activeName == 'customVarible'"
                                v-model="request.requestBody.customVarible"
                            ></stms-api-design-custom-varible>
                            <stms-api-design-sql
                                v-if="activeName == 'sql'"
                                v-model="request.requestBody.sql"
                            ></stms-api-design-sql>
                            <stms-api-design-request-body
                                v-if="requestTool.includes('requestData')"
                                v-model="request.requestBody.requestData"
                            ></stms-api-design-request-body>
                        </template>
                    </el-collapse-item>
                    <el-collapse-item name="response" v-if="responseTool.includes('webparam')">
                        <template slot="title">
                            <div class="collapseTitle">运行记录</div>
                        </template>
                        <div class="collapseContent">
                            <div class="responseContain">
                                <div class="right">
                                    <form action v-loading="loading">
                                        <stms-ace-editor
                                            :value="response.body"
                                            mode="xml"
                                            width="100%"
                                            height="335px"
                                            readOnly
                                        />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item name="response" v-else>
                        <template slot="title">
                            <div class="collapseTitle">返回信息</div>
                        </template>
                        <div class="collapseContent">
                            <div class="responseContain">
                                <div class="left" v-if="responseTool.includes('headers')">
                                    <div class="resTitle">Headers</div>
                                    <form action v-loading="loading">
                                        <stms-ace-editor
                                            :value="response.headers"
                                            mode="json"
                                            width="100%"
                                            height="335px"
                                            readOnly
                                        />
                                    </form>
                                </div>
                                <div class="right" v-if="responseTool.includes('body')">
                                    <div class="resTitle">Body</div>
                                    <form action v-loading="loading">
                                        <stms-ace-editor
                                            :value="response.body"
                                            mode="json"
                                            width="100%"
                                            height="335px"
                                            readOnly
                                        />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </form>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: "stms-api-design",
    props: {
        requestTool: {
            type: Array,
            required: false,
            default: function() {
                return ["query", "headers", "body"];
            },
        },
        responseTool: {
            type: Array,
            required: false,
            default: function() {
                return ["headers", "body"];
            },
        },
        mode: {
            type: String,
            required: false,
            default: function() {
                return "common";
            },
        },
    },
    data() {
        return {
            loading: false,
            show: false,
            defaultDisplay: ["url", "response"],
            activeName: "query",
            methodList: ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS", "PATCH"],
            request: {
                method: "",
                root: "",
                url: "",
                requestBody: {
                    query: [],
                    headers: [],
                    body: {
                        type: "",
                        param: [],
                    },
                    pathParam: {
                        type: "",
                        param: [],
                    },
                    customVarible: [],
                    sql: "",
                    requestData: {
                        set: [],
                        condition: [],
                        reqData: "",
                        type: "",
                    },
                    xml: "",
                    xmlParam: "",
                },
            },
            response: {
                headers: "",
                body: "",
            },
        };
    },
    methods: {
        getPage(data) {
            this.show = true;
            this.$nextTick(() => {
                this.activeName = this.requestTool[0];
                this.$refs.dialog.$el.querySelector(".el-dialog").style.height = "auto";
            });
            this.loading = false;
            this.request = data;
            this.response = {
                headers: "",
                body: "",
            };
        },

        changeXml(value) {
            const xmlParam = {
                requestXml: value,
            };
            this.request.requestBody.xmlParam = JSON.stringify(xmlParam, null, 4);
        },
        changeXmlParam(value) {
            this.request.requestBody.xmlParam = value;
        },
        test() {
            if (this.mode === "common") {
                this.loading = true;
                var url, body, responseBody;
                const headers = __.request.getQueryOrHeader(this.request.requestBody.headers);
                if (this.request && this.request.publishType === "SOAP") {
                    if (this.request.version) {
                        //有版本设置版本到请求头
                        headers["accept-version"] = this.request.version;
                    }
                    //此处等后台一起重构，设计不合理
                    headers["Content-Type"] = "text/xml";
                    url = this.request.url;
                    body = this.$parent.getReqData(this.request);
                } else if (
                    //TODO注释
                    this.request &&
                    this.request.requestBody &&
                    this.request.requestBody.body &&
                    this.request.requestBody.body.type === "4"
                ) {
                    url = this.request.root + this.request.url;
                    headers["Content-Type"] =
                        "multipart/form-data; boundary=----WebKitFormBoundaryVCFSAonTuDbVCoAN";
                    body = this.$parent.getReqData(this.request);
                } else {
                    if (this.request.version) {
                        //有版本设置版本到请求头
                        headers["accept-version"] = this.request.version;
                    }
                    headers["Content-Type"] = "application/json";
                    if (this.request.root) {
                        url = this.request.root + this.request.url;
                        if (!/[a-z]+:\/\//.test(url)) {
                            url = "http://" + url;
                        }
                    }
                    body = JSON.stringify(this.$parent.getReqData(this.request));
                }
                dao.request({
                    url, //后端访问接口地址
                    data: body,
                    method: "POST",
                    headers,
                    skipInterceptors: true,
                })
                    .then((res) => {
                        if (this.request && this.request.publishType === "SOAP") {
                            responseBody = res.data;
                            this.loading = false;
                            this.response = {
                                body: responseBody,
                            };
                            this.$message({
                                message: "接口测试成功",
                                type: "success",
                            });
                        }
                        if (res.data.code === 200) {
                            this.loading = false;
                            responseBody = JSON.stringify(res.data, null, 4);
                            this.response = {
                                headers: JSON.stringify(res.headers, null, 4),
                                body: responseBody,
                            };
                            this.$message({
                                message: res.data.message || "接口测试成功",
                                type: "success",
                            });
                        }
                        if (res.data.code === 500) {
                            responseBody = JSON.stringify(res.data, null, 4);
                            this.$message({
                                message: res.data.message || "服务器异常",
                                type: "error",
                            });
                            this.loading = false;
                            this.response = {
                                headers: JSON.stringify(res.headers, null, 4),
                                body: responseBody,
                            };
                        }
                    })
                    .catch((e) => {
                        this.loading = false;
                        this.$message({
                            message: e.response.data.message || "服务器异常",
                            type: "error",
                        });
                    });
            } else {
                this.loading = true;
                this.$emit("test", this.request, (response) => {
                    this.response = response;
                    if (this.response) {
                        this.loading = false;
                    }
                });
            }
        },
    },
};
</script>

<style lang="less">
#testClass .el-dialog {
    width: 100%;
    height: 100% !important;
}

#testClass .el-dialog__body {
    padding: 20px 41px 35px 35px;
}

#testClass .el-collapse {
    border-top: 0 !important;
    border-bottom: 1px solid #ebeef5;

    .el-collapse-item__header {
        border-bottom: 1px solid #fff !important;
        border-top: 1px solid #fff !important;
    }

    .el-collapse-item__content {
        background-color: #f2f3f5;
    }

    .CodeMirror-gutters {
        width: 46px;
    }

    .CodeMirror pre.CodeMirror-line {
        margin-left: 46px;
    }
}

#testClass .collapseTitle {
    line-height: 30px;
    padding-left: 15px;
    font-size: 16px;
    border-left: 3px solid #2395f1;
}

#testClass .collapseContent {
    padding: 25px 0 0 15px;
    width: 100%;

    .requestParam {
        width: 98%;
    }

    .requestBody {
        width: 98%;
        height: 100%;
        resize: none;
        border: 1px solid #dde0e7;
        border-radius: 5px;
        outline: none;
    }

    .paramName {
        margin-right: 10px;

        .el-input--small {
            width: 17%;
            margin-right: 5px;
        }
    }

    .paramValue .el-input--small {
        width: 76%;
        margin-left: 10px;
    }

    .headValue .el-input--small {
        width: 77%;
        margin-left: 10px;
    }

    .el-select .el-input {
        width: 110px;
    }

    .serverAddress {
        width: 91%;
        margin-right: 10px;
    }

    .testButton {
        width: 60px;
    }

    .el-input-group__append {
        width: 55%;
    }

    .responseContain {
        overflow: hidden;
        background-color: #f2f3f5;
        display: flex;
        padding-right: 15px;
        .responseContent {
            width: 100%;
            height: 100%;
            resize: none;
            border: 1px solid #dde0e7;
            border-radius: 5px;
            background-color: #fafafa;
            outline: none;
        }

        .resTitle {
            font-size: 13px;
            font-weight: 400;
            margin-bottom: 10px;
        }

        .left {
            height: 100%;
            // float: left;
            width: 37%;
            margin-right: 20px;
            padding-right: 20px;
            border-right: 1px solid #bcbbbb;
        }

        .right {
            height: 100%;
            flex: 1;
        }
    }
}
</style>
