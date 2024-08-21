<template>
  <component
    ref="component"
    :is="componentName"
    :component="component"
    :factory="factory"
    @triggerEvent="triggerEvent"
  />
</template>

<script>
import ComponentList from "./list";
import ComponentTree from "./tree";
import ComponentTabs from "./tabs";
import ComponentBreadcrumb from "./breadcrumb";
import ComponentTable from "./table";

export default {
  props: {
    options: {
      type: Object,
      required: false,
      default: function() {
        return {};
      },
    },
    component: {
      type: Object,
      required: false,
      default: function() {
        return {};
      },
    },
    factory: {
      type: Object,
      required: false,
      default: function() {
        return {};
      },
    },
  },
  components: {
    ComponentList,
    ComponentTree,
    ComponentTabs,
    ComponentBreadcrumb,
    ComponentTable,
  },
  computed: {
    componentName() {
      const { type } = this.component;
      const map = {
        list: "ComponentList",
        tree: "ComponentTree",
        tabs: "ComponentTabs",
        breadcrumb: "ComponentBreadcrumb",
        table: "ComponentTable",
      };
      return map[type];
    },
  },
  methods: {
    triggerEvent(event) {
      this.$emit("triggerEvent", event, this.component);
    },
    triggerAction(name, data) {
      if (!this.$refs.component) {
        return;
      }
      if (!this.$refs.component.triggerAction) {
        return;
      }
      return this.$refs.component.triggerAction(name, data);
    },
  },
};
</script>
