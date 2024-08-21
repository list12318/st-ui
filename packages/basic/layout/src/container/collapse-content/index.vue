<template>
  <div :class="{ 'stms-collapse-content': true, collapsed }" :style="{ width }">
    <slot></slot>
    <div class="tap-container">
      <div class="tap" @click="collapsed = !collapsed"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      required: false,
      default: "250px"
    }
  },
  data() {
    return {
      collapsed: false
    };
  },
  methods: {}
};
</script>

<style lang="less">
.stms-collapse-content {
  height: 100%;
  position: relative;
  transition: all 0.1s linear;
  border-right: 1px solid #dcdcdc;
  .tap-container {
    position: absolute;
    top: 50%;
    right: -1px;
    height: 40px;
    width: 18px;
    z-index: 99;
    overflow: hidden;
    transform: translateY(-50%);
  }

  .tap {
    height: 100%;
    width: 100%;
    color: #ddd;
    box-shadow: 0 0 8px #ddd;
    border: 1px solid #ddd;
    cursor: pointer;
    position: relative;
    opacity: 0.2;
    transition: all linear 0.1s;
    background: #666;
  }

  .tap-container:hover .tap {
    opacity: 1;
  }

  .tap:after,
  .tap:before {
    content: "";
    display: block;
    height: 3px;
    width: 10px;
    background: #ddd;
    position: absolute;
    left: 3px;
  }

  .tap:before {
    top: 14px;
    transform: rotate(-45deg);
  }

  .tap:after {
    bottom: 15px;
    transform: rotate(45deg);
  }
}

.stms-collapse-content.collapsed {
  width: 0 !important;
  > * {
    display: none;
  }
  > .tap-container {
    display: block;
    right: -17px;
    .tap {
      right: 0;
    }
    .tap:before {
      transform: rotate(45deg);
    }
    .tap:after {
      transform: rotate(-45deg);
    }
  }
}
</style>
