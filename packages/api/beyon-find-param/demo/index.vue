<template>
    <div>
        <stms-api-design-beyon-find-param v-model="bodys" show="true"/>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                bodys: {
                    condition:
                        [
                            {
                                flag: false,
                                fieldNameCn: null,
                                fieldNameEn: "name",
                                type: "VARCHAR",
                                operation: "like",
                                value: "${name}"
                            },
                            {
                                flag: false,
                                fieldNameCn: null,
                                fieldNameEn: "id",
                                type: "INT",
                                operation: "=",
                                value: "${id}"
                            }
                        ],
                    order:[]

                }
            };
        },
        mounted() {
            console.log(this.bodys);
        },
        methods: {},
    };
</script>
