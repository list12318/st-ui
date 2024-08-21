<template>
  <div :class="'stms-framework ' + wrapperClassName">
    <stms-navigator :title="title" @init="onInit">
      <slot name="tool" slot="tool"></slot>
      <head-menu :menu="headMenu" />
    </stms-navigator>
    <div class="stms-framework-container" v-if="init">
      <side-menu :menu="sideMenu" v-if="sideMenu.length" :active="activePath" />
      <div class="stms-framework-content">
        <div class="stms-framework-content-flex">
          <keep-alive>
            <router-view
              v-if="$route.meta.keepAlive"
            ></router-view> </keep-alive
          ><router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeadMenu from "./head-menu";
import SideMenu from "./side-menu";

export default {
  name: "stms-framework",
  props: {
    title: {
      type: String,
      required: false,
      default: "",
    },
    menu: {
      type: Array,
      required: false,
      default: function () {
        return [];
      },
    },
    path: {
      type: Object,
      required: false,
      default: "",
    },
    params: {
      type: Object,
      required: false,
      default: function () {
        return {};
      },
    },
    wrapperClassName: {
      type: String,
      required: false,
      default: "",
    },
  },
  components: {
    HeadMenu,
    SideMenu,
  },
  computed: {
    activePath() {
      return this.path
        ? __.url.pathToRegexp.compile(this.path)(this.params)
        : null;
    },
    headMenu() {
      return this.menu
        .filter((v) => !v.parentId)
        .map((v) => {
          return {
            id: v.id,
            name: v.name,
            path: v.url,
            icon: v.image,
          };
        });
    },
    sideMenu() {
      const current = this.menu.find((v) => this.path === v.url);
      if (!current) {
        return [];
      }
      return this.buildMenu(current);
    },
  },
  data() {
    return {
      init: false,
    };
  },
  methods: {
    onInit() {
      this.init = true;
      this.$emit("init");
    },
    buildMenu(current) {
      const { menu, params } = this;
      let root = current;
      {
        const getRoot = (id) => {
          const value = menu.find((v) => id === v.id);
          if (value) {
            root = value;
            if (value.parentId) {
              getRoot(value.parentId);
            }
          }
        };
        getRoot(root.id);
      }
      const execute = (parentId) => {
        const list = [];
        menu
          .filter((v) => v.parentId === parentId)
          .forEach((v) => {
            const item = {
              id: v.id,
              name: v.name,
              path: v.url ? __.url.pathToRegexp.compile(v.url)(params) : null,
              icon: v.image,
            };
            const children = execute(v.id);
            children.length && (item.children = children);
            list.push(item);
          });
        return list;
      };
      return execute(root.id);
    },
    refresh() {
      this.init = false;
      this.$nextTick(() => {
        this.init = true;
      });
    },
  },
};
</script>

<style lang="less">
.stms-framework {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  > .stms-framework-container {
    height: 0;
    width: 100%;
    flex: auto;
    display: flex;
    > .stms-framework-content {
      width: 0;
      flex: auto;
      position: relative;
      > .stms-framework-content-flex {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        > * {
          height: 100%;
          width: 100%;
        }
      }
    }
  }
}
</style>
