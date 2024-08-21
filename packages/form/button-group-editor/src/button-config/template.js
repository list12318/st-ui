export const CreateConfig = () => {
  return {
    text: "新建",
    key: "create",
    type: "primary",
    size: "small",
    clickType: "dialog-form",
    confirmProps: {},
    dialogFormProps: {
      title: "新建",
      isAutoSet: false,
      schema: [
        {
          prop: "name",
          label: "名称",
          type: "input",
        },
      ],
    },
  };
};

export const EditConfig = () => {
  return {
    text: "编辑",
    key: "edit",
    type: "primary",
    size: "mini",
    clickType: "dialog-form",
    confirmProps: {},
    dialogFormProps: {
      title: "编辑",
      schema: [
        {
          prop: "name",
          label: "名称",
          type: "input",
        },
      ],
    },
  };
};

export const DeleteConfig = () => {
  return {
    text: "删除",
    key: "delete",
    type: "danger",
    size: "mini",
    clickType: "confirm",
    confirmProps: {
      title: "提示",
      content: "此操作将删除该条数据, 是否继续?",
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    },
    dialogFormProps: {},
  };
};
