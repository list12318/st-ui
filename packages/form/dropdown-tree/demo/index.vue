<template>
    <div style="height: 100%">
        <stms-dropdown-tree singleCheckbox :data="data" v-model="defaultCheckedKeys">
        </stms-dropdown-tree>
    </div>
</template>
<script>
export default {
    data() {
        return {
            value: [],
            options: [
                {
                    value: "1",
                    label: "HTML",
                },
                {
                    value: "2",
                    label: "HTML",
                },
                {
                    value: "3",
                    label: "HTML",
                },
            ],
            data: [
                {
                    id: "2996D6F3E8D0446684B6ECAF0FAD1BBB",
                    name: "业务平台",
                    children: [
                        {
                            id: "FB7B5CB489FD471FA890A600B92E8E9C",
                            name: "业务平台",
                            children: null,
                            data: {
                                id: "FB7B5CB489FD471FA890A600B92E8E9C",
                                createDate: null,
                                updateDate: null,
                                expandMap: null,
                                organizationId: "2996D6F3E8D0446684B6ECAF0FAD1BBB",
                                parentId: "",
                                code: "sk",
                                name: "业务平台",
                                fullName: "",
                                identification: "department",
                            },
                            checked: false,
                            chkDisabled: false,
                            flag: false,
                            disabled: false,
                            open: false,
                            isOtherBean: null,
                            pid: "2996D6F3E8D0446684B6ECAF0FAD1BBB",
                        },
                        {
                            id: "2",
                            name: "业务平台2",
                            children: null,
                            data: {
                                id: "2",
                                createDate: null,
                                updateDate: null,
                                expandMap: null,
                                organizationId: "2996D6F3E8D0446684B6ECAF0FAD1BBB",
                                parentId: "",
                                code: "sk",
                                name: "业务平台2",
                                fullName: "",
                                identification: "department",
                            },
                            checked: false,
                            chkDisabled: false,
                            flag: false,
                            disabled: false,
                            open: false,
                            isOtherBean: null,
                            pid: "2996D6F3E8D0446684B6ECAF0FAD1BBB",
                        },
                    ],
                    data: "company",
                    checked: false,
                    chkDisabled: false,
                    flag: false,
                    disabled: true,
                    open: false,
                    isOtherBean: null,
                    pid: null,
                },
            ],
            defaultCheckedKeys: ["FB7B5CB489FD471FA890A600B92E8E9C"],
        };
    },
};
</script>
