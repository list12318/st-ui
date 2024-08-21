const tableSchema = [
  {
    prop: "componentKey",
    label: "名称",
  },
  {
    prop: "version",
    label: "版本",
  },
  {
    prop: "desc",
    label: "描述",
  },
];
const schema = [
  {
    prop: "version",
    label: "版本",
    type: "input",
    props: {
      placeholder: "请填写版本",
      showWordLimit: true,
      maxlength: 50,
    },
    rules: [
      {
        required: true,
        message: "请填写版本",
      },
    ],
  },
  {
    prop: "yaml",
    label: "Yaml",
    type: "ace-editor",
    props: {
      mode: "yaml",
      height: "300px",
      placeholder: "请填写描述",
    },
    rules: [
      {
        required: true,
        message: "请填写版本",
      },
    ],
  },
  {
    prop: "desc",
    label: "描述",
    type: "input",
    props: {
      type: "textarea",
      placeholder: "请填写描述",
    },
  },
];
export default {
  "config.schema": tableSchema,
  "events.pageChange": async ({ dispatch }) => {
    await dispatch("queryComponentVersion");
  },
  "config.actionbar.delete.show": false,
  "config.actionbar.preview": {
    order: 2,
    show: true,
    disabled: false,
    type: "text",
    size: "small",
    text: "预览",
  },
  "config.toolbar.create.text": "新建版本",
  "config.toolbar.create.disabled": ({ component }) => {
    return (
      !component("tree1").action("getActive") ||
      !component("tree2").action("getActive")
    );
  },
  "config.toolbar.delete.disabled": ({ component }) => {
    return !component("table").action("getSelection").length;
  },
  "events.toolbarClick/create": async ({ dispatch, component, modal }) => {
    modal({
      data: {},
      title: "新建组件版本",
      width: "800px",
      confirmText: "确定",
      showCancel: false,
      schema,
      onConfirm: async ({ data, close }) => {
        const { id: groupId, key: groupKey } = component("tree1").action(
          "getActive"
        );
        const { id: componentId, key: componentKey } = component(
          "tree2"
        ).action("getActive");
        await dispatch("createComponentVersion", {
          ...data,
          groupId,
          groupKey,
          componentId,
          componentKey,
        });
        await dispatch("queryComponentVersion");
        close();
      },
    });
  },
  "events.toolbarClick/delete": async ({ dispatch, component, confirm }) => {
    const selection = component("table").action("getSelection");
    const ids = selection.map((v) => v.id).join(",");
    confirm({
      title: "是否删除",
      content: "即将删除所选数据，是否继续",
      confirmButtonText: "删除",
      cancelButtonText: "关闭",
      onConfirm: async () => {
        await dispatch("deleteComponentVersion", {
          ids,
        });
        await dispatch("queryComponentVersion");
      },
    });
  },

  "events.actionbarClick/edit": async ({ dispatch, modal }, payload) => {
    const { row } = payload;
    modal({
      data: row,
      title: "编辑组件版本",
      width: "800px",
      confirmText: "确定",
      showCancel: false,
      schema,
      onConfirm: async ({ data, close }) => {
        await dispatch("editComponentVersion", data);
        await dispatch("queryComponentVersion");
        close();
      },
    });
  },
};
