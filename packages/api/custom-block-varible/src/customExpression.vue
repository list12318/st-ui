<template>
    <el-dialog
        title="编辑"
        :visible.sync="show"
        size="tiny"
        :close-on-click-modal="false"
        append-to-body
        width="800px"
    >
        <stms-ace-editor v-model="data" mode="java" width="100%" height="500px" />
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submit">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            index: null,
            type: null,
            data: "",
        };
    },

    methods: {
        // 页面获取时
        getPage(data, index, type) {
            this.type = type;
            this.index = index;
            // 代码块
            if (type === "sqlBlock") {
                this.data = data.sqlBlock;
            }
            // 表达式
            else if (type === "elScript") {
                this.data = data.elScript;
            } else {
                this.data = "";
            }

            this.show = true;
        },

        // 提交
        submit() {
            let data = {
                data: this.data,
                index: this.index,
                type: this.type,
            };
            this.$emit("editExpressionData", data);
            this.show = false;
        },
    },
};
</script>

<style scoped></style>
