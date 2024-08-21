const schema = [
  {
    prop: "name",
    label: "名称",
    type: "input",
    props: {
      placeholder: "请填写名称",
    },
    rules: [
      {
        required: true,
        message: "请填写名称",
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
  "config.title": "组件分类",
  "config.toolbar.edit.disabled": ({ component }) => {
    return !component("tree1").action("getActive");
  },
  "config.toolbar.delete.disabled": ({ component }) => {
    return !component("tree1").action("getActive");
  },
  "events.init": async ({ dispatch, options }) => {
    options.table.show = false;
    options.table2.show = true;
    await dispatch("queryComponentGroup");
  },
  "events.change": async ({ dispatch }) => {
    await dispatch("queryComponent");
  },
  "events.toolbarClick/create": async ({ dispatch, modal }) => {
    modal({
      data: {},
      title: "新建组件组",
      schema,
      onConfirm: async ({ data, close }) => {
        await dispatch("createComponentGroup", data);
        await dispatch("queryComponentGroup");
        close();
      },
    });
  },
  "events.toolbarClick/edit": async ({ dispatch, component, modal }) => {
    const active = component("tree1").action("getActive");
    modal({
      data: active,
      title: "编辑组件组",
      schema,
      onConfirm: async ({ data, close }) => {
        await dispatch("editComponentGroup", data);
        await dispatch("queryComponentGroup");
        close();
      },
    });
  },
  "events.toolbarClick/delete": async ({ dispatch, component, confirm }) => {
    const active = component("tree1").action("getActive");
    confirm({
      title: "是否删除",
      content: "即将删除所选数据，是否继续",
      confirmButtonText: "删除",
      cancelButtonText: "关闭",
      onConfirm: async () => {
        await dispatch("deleteComponentGroup", {
          ids: active.id,
        });
        await dispatch("queryComponentGroup");
      },
    });
  },
};
