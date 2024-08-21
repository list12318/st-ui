export default function() {
  return {
    order: 1,
    show: true,
    type: "table",
    slot: "content",
    config: {
      data: [],
      selection: [],
      schema: [],
      condition: {
        search: ""
      },
      pageNum: 1,
      pageSize: 10,
      total: 0,
      actionbarWidth: 120,
      actionbar: {
        edit: {
          order: 1,
          show: true,
          disabled: false,
          type: "text",
          size: "small",
          text: "编辑"
        },
        delete: {
          order: 2,
          show: true,
          disabled: false,
          type: "text",
          size: "small",
          text: "删除"
        }
      },
      toolbar: {
        create: {
          order: 1,
          show: true,
          disabled: false,
          type: "primary",
          size: "small",
          text: "新建"
        },
        delete: {
          order: 2,
          show: true,
          disabled: false,
          type: "danger",
          size: "small",
          text: "删除"
        }
      }
    },
    events: {
      async pageChange({ data, options, dispatch, component, modal, confirm }) {},
      async "actionbarClick/edit"({ data, options, dispatch, component, modal, confirm }) {},
      async "actionbarClick/delete"({ data, options, dispatch, component, modal, confirm }) {},
      async "toolbarClick/create"({ data, options, dispatch, component, modal, confirm }) {},
      async "toolbarClick/delete"({ data, options, dispatch, component, modal, confirm }) {}
    }
  };
}
