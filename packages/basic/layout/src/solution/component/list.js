export default function() {
  return {
    order: 1,
    show: true,
    type: "list",
    slot: "sidebar",
    config: {
      active: null,
      data: [],
      title: "分类",
      itemKey: "id",
      itemLabel: "name",
      toolbar: {
        create: {
          order: 1,
          show: true,
          disabled: false,
          type: "primary",
          icon: "el-icon-plus",
          text: "新建",
        },
        edit: {
          order: 2,
          show: true,
          disabled: false,
          type: "primary",
          icon: "el-icon-edit",
          text: "编辑",
        },
        delete: {
          order: 3,
          show: true,
          disabled: false,
          type: "primary",
          icon: "el-icon-delete",
          text: "删除",
        },
      },
    },
    events: {
      async init({ data, options, dispatch, component, modal, confirm }) {},
      async change({ data, options, dispatch, component, modal, confirm }) {},
      async "toolbarClick/create"({
        data,
        options,
        dispatch,
        component,
        modal,
        confirm,
      }) {},
      async "toolbarClick/edit"({
        data,
        options,
        dispatch,
        component,
        modal,
        confirm,
      }) {},
      async "toolbarClick/delete"({
        data,
        options,
        dispatch,
        component,
        modal,
        confirm,
      }) {},
    },
  };
}
