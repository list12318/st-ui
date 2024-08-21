import dao from "./dao/index";

export default dao.create({
  // 消息中心-菜单树
  // getMenuTreeData: {
  //   url: "/component/calendarEvent/getMenuTreeData',
  //   method: "POST"
  // },
  getMenuTreeData: {
    url: "/component/appPartitionRelation/findCurrentUserMenuList",
    method: "POST",
  },

  // 消息中心-分页信息
  // getCalendarEventByPage: {
  //   url: "/component/calendarEvent/byPage',
  //   method: "POST"
  // },
  getCalendarEventByPage: {
    url: "/component/messageRabbit/byPage",
    method: "POST",
  },

  // 组织机构树
  getTreeData: {
    url: "/manager/imDepartmentMember/getDepartmentAndPersonTreeData",
    method: "GET",
  },

  //办理事件
  handleEvent: {
    url: "/component/calendarEventAttend/handleEvent",
    method: "POST",
  },

  //增加访问量
  createPortalViews: {
    url: "/portal/portalViews/creating",
    method: "POST",
  },

  //查询访问量
  queryPortalViews: {
    url: "/portal/portalViews/byAll",
    method: "GET",
  },
  getIdentityList: {
    url: "/ipms/sysUser/listBusinessAccountsByUserId",
    method: "GET",
  },
  // 获取用户信息接口
  getUserInfo: {
    url: "/manager/imUser/userInfo",
    method: "GET",
  },

  // 获取用户信息接口
  appAuthorizationInfo: {
    url: "/manager/imUser/appAuthorizationInfo",
    method: "GET",
  },
  // im登录
  imLogin: {
    url: "/im/login",
    method: "POST",
  },
  // 上传图片
  uploadImage: {
    url: "/design/resource/uploadWebResource",
    method: "POST",
  },
  // 加查询im id
  findImUserIdByUsername: {
    url: "/im/findImUserIdByUsername",
    method: "POST",
  },
  // 发送文字消息
  sendTextMessage: {
    url: "/im/sendTextMessage",
    method: "POST",
  },
  // 发送图片消息
  sendImageMessage: {
    url: "/im/sendImageMessage",
    method: "POST",
  },
  // 查看消息标记为已读
  checkMessage: {
    url: "/component/messageRabbit/updateStatus",
    method: "POST",
  },
  // 应用订阅信息展示
  findAuthAppList: {
    url: "/component/applicationUserAuth/findAuthAppListByUserId",
    method: "POST",
  },
  // 应用订阅
  subscribeMessage: {
    url: "/component/applicationUserAuth/subscribeMessage",
    method: "POST",
  },
  // 查询共享空间工作台数据
  queryWorkbenchShare: {
    url: "/portal/workbenchShare/byPage",
    method: "POST",
  },
  // 收藏工作台
  collect: {
    url: "/manager/workbenchCollect/creating",
    method: "POST",
  },
  // 取消收藏工作台
  cancelCollect: {
    url: "/manager/workbenchCollect/cancelCollect",
    method: "POST",
  },
  //查询服务开关状态
  queryServeSwitchStatus: {
    url: "/manager/platformConf/B22EE16F22D748S989C0CV6F473F2F09",
    method: "GET",
  },
  //获取service子菜单
  queryServiceSubMenu: {
    url: "/manager/systemsetting/menu/queryMenusByParentId",
    method: "GET",
  },
  //获取developer子菜单
  queryDevelopSubMenu: {
    url: "/design/management/menu/queryMenusByParentId",
    method: "GET",
  },
  //获取identity子菜单
  queryIdentitySubMenu: {
    url: "/ipms/sysMenu/queryMenusByParentId",
    method: "GET",
  },
  //获取synergy子菜单
  querySynergySubMenu: {
    url: "/synergy/systemsetting/menu/queryMenusByParentId",
    method: "GET",
  },
  // im配置
  imConfig: {
    url: "/im/web.config",
    method: "GET",
  },
  // 修改密码
  changePassword: {
    url: "/ipms/sysUser/changeInternalPwd",
    method: "POST",
  },
});
