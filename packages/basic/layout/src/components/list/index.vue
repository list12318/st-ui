<template>
  <stms-list
    :data="component.config.data"
    :value="component.config.active"
    @input="onChange"
    :title="component.config.title"
    :item-key="component.config.itemKey"
    :item-label="component.config.itemLabel"
  >
    <template slot="tool">
      <el-button
        v-for="(item, index) in toolbar"
        :key="index"
        :type="item.type"
        :disabled="toolbarDisabled(item)"
        @click="toolbarClick(item)"
      >
        <el-tooltip
          class="item"
          effect="dark"
          :content="item.text"
          placement="bottom"
        >
          <i :class="item.icon"></i>
        </el-tooltip>
      </el-button>
    </template>
  </stms-list>
</template>

<script>
export default {
  props: {
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
  mounted() {
    this.$emit("triggerEvent", {
      name: "init",
    });
    this.init = true;
  },
  data() {
    return {
      init: false,
    };
  },
  computed: {
    toolbar() {
      if (!this.init) {
        return [];
      }
      const { toolbar } = this.component.config;
      const list = Object.keys(toolbar || {})
        .map((key) => {
          const item = toolbar[key];
          this.$set(item, "key", key);
          return item;
        })
        .filter((item) => {
          const { show } = item;
          if (typeof show === "undefined") {
            return false;
          }
          if (typeof show === "boolean") {
            return show;
          }
          if (typeof show === "function") {
            return show(this.factory, item);
          }
          return false;
        });
      list.sort((a, b) => {
        return a.order > b.order;
      });
      return list;
    },
  },
  methods: {
    toolbarDisabled(item) {
      if (!this.init) {
        return true;
      }
      const { disabled } = item;
      if (typeof disabled === "undefined") {
        return false;
      }
      if (typeof disabled === "boolean") {
        return disabled;
      }
      if (typeof disabled === "function") {
        return disabled(this.factory, item);
      }
      return false;
    },
    onChange(data) {
      if (this.component.config.active !== data) {
        this.component.config.active = data;
        this.$emit("triggerEvent", {
          name: "change",
          data,
        });
      }
    },
    toolbarClick(data) {
      this.$emit("triggerEvent", {
        name: "toolbarClick/" + data.key,
        data,
      });
    },
    triggerAction(name, data) {
      if (name === "setData") {
        this.component.config.data = data;
      }
      if (name === "setActive") {
        const active = data || this.component.config.data[0];
        this.onChange(active);
      }
      if (name === "getActive") {
        return this.component.config.active;
      }
    },
  },
};
</script>
