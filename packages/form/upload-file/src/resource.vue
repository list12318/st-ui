<template>
    <el-dialog title="资源库" width="600px" :visible.sync="show" size="tiny" append-to-body>
        <div class="resource-group">
            <div class="group">
                资源类型：
                <el-select
                    clearable
                    v-model="groupId"
                    placeholder="请选择资源分类"
                    @change="queryResource"
                >
                    <el-option
                        v-for="item in resourceGroup"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    >
                    </el-option>
                </el-select>
            </div>

            <div class="resource">
                <div class="search-resource">
                    资源名称：
                    <el-input placeholder="请输入搜索信息" v-model="searchData"> </el-input>
                </div>
                <div class="search-content" v-if="resource.length">
                    <div
                        :class="{ item: true, active: activeResource === item }"
                        v-for="(item, index) in resource"
                        :key="index"
                    >
                        <div class="box" @click="activeResource = item">
                            <img class="img" :src="item.url" alt="" @error="getError" />
                            <div class="rect">
                                <i class="el-icon-success"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="groupId">
                <div class="unData" v-if="resource.length == 0">暂无数据</div>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submit()">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
export default {
    data() {
        return {
            show: false,
            groupId: "",
            resourceGroup: [],
            searchData: "",
            resourceFilterData: [],
            activeResource: null,
        };
    },
    props: {
        filterImage: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    computed: {
        resource: function () {
            if (this.searchData === "") return this.resourceFilterData;
            return this.resourceFilterData.filter(
                (v) => v.name.indexOf(this.searchData) !== -1 || v.name === this.searchData
            );
        },
    },
    mounted() {
        this.queryResourceGroup();
    },
    methods: {
        getPage() {
            this.show = true;
        },
        // 判断图片不展示给默认图片
        getError(e) {
            if (e.type == "error") {
                e.target.src = require("./img/resource-nodata.png");
            }
        },
        async queryResourceGroup() {
            const resp = await dao.request({
                url: "/design/resourceGroup/byAll",
            });
            const {
                data: { content },
            } = resp;
            this.resourceGroup = content;
        },
        async queryResource() {
            const resp = await dao.request({
                url: "/design/resource/byCondition",
                method: "POST",
                data: {
                    groupId: this.groupId,
                },
            });
            const {
                data: { content },
            } = resp;
            if (this.filterImage) {
                this.resourceFilterData = content.filter(
                    (v) => v.suffix === ".svg" || v.suffix === ".png" || v.suffix === ".jpg"
                );
            } else {
                this.resourceFilterData = content;
            }
        },
        submit() {
            if (this.activeResource) {
                this.$emit("change", this.activeResource.url);
            }
            this.show = false;
        },
    },
};
</script>

<style lang="less" scoped>
.resource-group {
    width: 100%;
    max-height: 500px;
    overflow-y: auto;
    .group {
        margin-bottom: 10px;
        .el-select {
            width: 80%;
        }
    }
    .unData {
        text-align: center;
        color: #909399;
    }
    .resource {
        width: 100%;
        .search-resource {
            height: 40px;
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            .el-input {
                width: 80%;
                margin-left: 4px;
            }
        }
        .search-content {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            .item.active {
                .box {
                    .rect {
                        display: block;
                    }
                }
            }
            .item {
                width: 80px;
                height: 80px;
                display: flex;
                justify-content: center;
                .box {
                    width: 60px;
                    height: 60px;
                    position: relative;
                    background: rgb(220, 220, 220);
                    .img {
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        left: 0;
                        top: 0;
                    }
                    .rect {
                        display: none;
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        left: 0;
                        top: 0;
                        z-index: 10;
                        border: 2px solid #88c3fe;
                        opacity: 0.9;
                        i {
                            font-size: 20px;
                            color: #67c23a;
                        }
                    }
                }
            }
        }
    }
}
</style>
