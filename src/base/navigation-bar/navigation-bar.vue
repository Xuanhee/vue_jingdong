<template>
  <!-- 默认是 左 后退  中间页面名称  右边空白 -->
  <!-- 可以同插槽来配置具体展示内容 -->
  <div class="nav-bar" :class="{'bottom-line': pageName}">
    <div class="nav-bar-left" @click="navBarLeft">
      <img src="@img/back.svg" v-if="isShowBack" />
      <!-- 具名插槽 -->
      <slot name="nav-left"></slot>
    </div>
    <div class="nav-bar-center">
      <span class="nav-bar-center-title" v-if="pageName">{{pageName}}</span>
      <!-- 具名插槽 -->
      <slot name="nav-center"></slot>
    </div>
    <div class="nav-bar-right">
      <!-- 具名插槽 -->
      <slot name="nav-right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 当前页名称
    pageName: {
      type: String,
      default: ''
    },
    // 是否展示后退按钮
    isShowBack: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    navBarLeft () {
      this.$emit('navBarLeft')
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/css/variable.scss';
.nav-bar {
  z-index: 9999;
  // position: fixed;
  width: 100%;
  height: px2rem(44);
  line-height: px2rem(44);
  display: flex;
  justify-content: space-between;
  align-items: center;
  &-left,
  &-right {
    display: flex;
    height: 100%;
    width: px2rem(26);
    padding: 0 px2rem(8);
    img {
      width: 100%;
      align-self: center;
    }
  }
  &-center {
    height: px2rem(30);
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    &-title {
      font-size: $titleFontSize;
      align-self: center;
    }
  }
}
.bottom-line {
  border-bottom: px2rem(1) solid $color-line;
}
</style>
