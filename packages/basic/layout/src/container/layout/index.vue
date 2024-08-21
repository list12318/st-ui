<template>
  <div class="stms-layout">
    <slot name="breadcrumb"></slot>
    <div class="stms-layout-container">
      <div class="stms-layout-container-flex">
        <slot name="sidebar"></slot>
        <div class="stms-content">
          <div class="stms-content-flex">
            <slot name="tool"></slot>
            <div class="content">
              <div class="content-flex">
                <slot name="content"></slot>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<style lang="less">
.stms-layout {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  > .stms-layout-breadcrumb {
    width: 100%;
    height: 50px;
  }
  > .stms-layout-container {
    height: 0;
    flex: auto;
    position: relative;
    > .stms-layout-container-flex {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      > .stms-content {
        height: 100%;
        width: 0;
        flex: auto;
        position: relative;
        > .stms-content-flex {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          flex-direction: column;
          > .content {
            width: 100%;
            height: 100%;
            flex: auto;
            position: relative;
            > .content-flex {
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              padding: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
