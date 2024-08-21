export default {
  async queryComponentGroup({ component }) {
    let list = [];
    const resp = await ComponentGroupDao.findByAll();
    const {
      data: { status, content }
    } = resp;
    if (status == "success") {
      list = content;
    }
    component("tree1").action("setData", list);
    component("tree1").action("setActive");
  },
  async createComponentGroup({ dispatch }, payload) {
    await ComponentGroupDao.create({
      data: {
        parentId: 0,
        ...payload
      }
    });
    await dispatch("queryComponentGroup");
  },
  async editComponentGroup({ dispatch }, payload) {
    await ComponentGroupDao.edit({
      data: payload
    });
    await dispatch("queryComponentGroup");
  },
  async deleteComponentGroup({ dispatch }, payload) {
    await ComponentGroupDao.delete({
      params: payload
    });
    await dispatch("queryComponentGroup");
  },

  async queryComponent({ component }) {
    const active = component("tree1").action("getActive");
    let list = [];
    const resp = await ComponentDao.findByCondition({
      data: { groupId: active.id }
    });
    const {
      data: { status, content }
    } = resp;
    if (status == "success") {
      list = content;
    }
    component("tree2").action("setData", list);
    component("tree2").action("setActive");
  },
  async createComponent({ dispatch }, payload) {
    await ComponentDao.create({
      data: payload
    });
    await dispatch("queryComponent");
  },
  async editComponent({ dispatch }, payload) {
    await ComponentDao.edit({
      data: payload
    });
    await dispatch("queryComponent");
  },
  async deleteComponent({ dispatch }, payload) {
    await ComponentDao.delete({
      params: payload
    });
    await dispatch("queryComponent");
  },

  async queryComponentVersion({ component }, payload) {
    component("table").action("clearData", payload && payload.init);
    const active = component("tree2").action("getActive");
    if (!active) {
      return;
    }
    const data = component("table").action("getQueryData");
    data.condition.componentId = active.id;
    component("table").action("setLoading", true);
    try {
      const resp = await ComponentVersionDao.findByPage({
        data
      });
      const { content, status } = resp.data;
      if (status == "success") {
        component("table").action("setData", {
          data: content.rows,
          total: content.total
        });
      }
      component("table").action("setLoading", false);
    } catch (error) {
      component("table").action("setLoading", false);
    }
  },
  async createComponentVersion({ dispatch }, payload) {
    await ComponentVersionDao.create({
      data: payload
    });
    await dispatch("queryComponentVersion");
  },
  async editComponentVersion({ dispatch }, payload) {
    await ComponentVersionDao.edit({
      data: payload
    });
    await dispatch("queryComponentVersion");
  },
  async deleteComponentVersion({ dispatch }, payload) {
    await ComponentVersionDao.delete({
      params: payload
    });
    await dispatch("queryComponentVersion");
  }
};
