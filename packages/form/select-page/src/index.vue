<template>
    <div>
        <el-select
            :value="value"
            @input="chageValue(...arguments)"
            @keyup.enter.native="searchEnter($event)"
            filterable
            remote
            :placeholder="placeholder"
            :remote-method="remoteMethod"
            clearable
            size="small"
        >
            <el-option
                v-for="item in data"
                :key="item[itemKey]"
                :label="item[itemLabel]"
                :value="item[itemKey]"
            >
            </el-option>
            <div>
                <el-pagination
                    small
                    v-if="pagination"
                    @size-change="sizeChange"
                    @current-change="currentChange"
                    :current-page="pagination.pageNum || 1"
                    :page-size="pagination.pageSize || 10"
                    layout="total, prev, pager, next"
                    :total="pagination.total"
                    :pager-count="5"
                >
                </el-pagination>
            </div>
        </el-select>
    </div>
</template>
<script>
export default {
    name: "stms-select-page",
    props: {
        data: {
            type: Array,
            required: true,
            default: [],
        },
        value: {
            type: String,
            required: true,
            default: "",
        },
        pagination: {
            type: Object,
            required: false,
            default: null,
        },
        placeholder: {
            type: String,
            required: false,
            default: "请选择数据",
        },
        itemKey: {
            type: String,
            required: false,
            default: "id",
        },
        itemLabel: {
            type: String,
            required: false,
            default: "name",
        },
    },
    methods: {
        chageValue(value) {
            this.value = value;
            this.$emit("input", this.value);
        },
        searchEnter(value) {
            this.$emit("searchEnter", value);
        },
        sizeChange(pageSize) {
            const { onChange, pageNum } = this.pagination;
            onChange && onChange(pageNum, pageSize);
        },
        currentChange(pageNum) {
            const { onChange, pageSize } = this.pagination;
            onChange && onChange(pageNum, pageSize);
        },
        remoteMethod(query) {
            this.$emit("remoteMethod", query);
        },
    },
};
</script>
