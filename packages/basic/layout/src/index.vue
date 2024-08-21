<template>
  <layout>
    <template
      slot="breadcrumb"
      v-for="(item, index) in componentMap.breadcrumb"
    >
      <component-render
        :ref="item.key"
        :key="index"
        :component="item"
        :factory="factory"
        @triggerEvent="triggerEvent"
      />
    </template>
    <template slot="sidebar" v-for="(item, index) in componentMap.sidebar">
      <collapse-content :key="index">
        <component-render
          :ref="item.key"
          :component="item"
          :factory="factory"
          @triggerEvent="triggerEvent"
        />
      </collapse-content>
    </template>
    <template slot="tool" v-for="(item, index) in componentMap.tool">
      <component-render
        :ref="item.key"
        :key="index"
        :component="item"
        :factory="factory"
        @triggerEvent="triggerEvent"
      />
    </template>
    <template slot="content" v-for="(item, index) in componentMap.content">
      <component-render
        :ref="item.key"
        :key="index"
        :component="item"
        :factory="factory"
        @triggerEvent="triggerEvent"
      />
    </template>
    <form-modal ref="formModal"></form-modal>
    <slot></slot>
    <template slot="content">
      <slot name="content"></slot>
    </template>
  </layout>
</template>

<script>
import CollapseContent from "./container/collapse-content";
import Layout from "./container/layout";
import FormModal from "./container/form-modal";
import ComponentRender from "./components";

export default {
  name: "stms-layout",
  props: {
    options: {
      type: Object,
      required: false,
      default: function() {
        return {};
      },
    },
  },
  components: {
    Layout,
    CollapseContent,
    FormModal,
    ComponentRender,
  },
  computed: {
    componentMap() {
      const sidebar = [];
      const breadcrumb = [];
      const tool = [];
      const content = [];
      Object.keys(this.options)
        .map((key) => {
          const component = this.options[key];
          this.$set(component, "key", key);
          return component;
        })
        .filter((component) => {
          const { show } = component;
          if (typeof show === "undefined") {
            return false;
          }
          if (typeof show === "boolean") {
            return show;
          }
          if (typeof show === "function") {
            return show(component, this.options);
          }
          return false;
        })
        .forEach((component) => {
          const { slot } = component;
          if (slot === "sidebar") {
            sidebar.push(component);
          } else if (slot === "breadcrumb") {
            breadcrumb.push(component);
          } else if (slot === "tool") {
            tool.push(component);
          } else if (slot === "content") {
            content.push(component);
          }
        });

      sidebar.sort((a, b) => {
        return a.order > b.order;
      });
      breadcrumb.sort((a, b) => {
        return a.order > b.order;
      });
      tool.sort((a, b) => {
        return a.order > b.order;
      });
      content.sort((a, b) => {
        return a.order > b.order;
      });
      return {
        breadcrumb,
        sidebar,
        tool,
        content,
      };
    },
    factory() {
      return {
        options: this.options,
        dispatch: this.dispatch,
        component: this.component,
        modal: this.modal,
        confirm: this.confirm,
      };
    },
  },
  data() {
    return {};
  },
  methods: {
    async triggerEvent(event, component) {
      const { name, data } = event;
      if (!component.events) {
        return;
      }
      if (!component.events[name]) {
        return;
      }
      await component.events[name](this.factory, data);
    },
    modal(config) {
      this.$refs.formModal.show(config);
    },
    confirm(config) {
      const {
        title,
        content,
        confirmButtonText,
        cancelButtonText,
        onConfirm,
      } = config;
      this.$confirm(content, title, {
        confirmButtonText,
        cancelButtonText,
        type: "warning",
      }).then(() => {
        onConfirm(this.factory);
      });
    },
    async dispatch(name, data) {
      if (!this.options._actions) {
        return;
      }
      if (!this.options._actions[name]) {
        return;
      }
      await this.options._actions[name](this.factory, data);
    },
    component(name) {
      if (!this.$refs[name]) {
        return;
      }
      if (!this.$refs[name][0]) {
        return;
      }
      if (!this.$refs[name][0].triggerAction) {
        return;
      }
      if (!this.options[name]) {
        return;
      }
      function Component(ref, component) {
        this.ref = ref;
        this.component = component;
        this.action = function(name, data) {
          return this.ref.triggerAction(name, data);
        };
        this.setConfig = function(config) {
          return Object.assign(this.component.config, config);
        };
        this.getConfig = function(config) {
          return this.component.config;
        };
      }
      return new Component(this.$refs[name][0], this.options[name]);
    },
  },
};
</script>
