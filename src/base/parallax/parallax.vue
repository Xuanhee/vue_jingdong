<template>
  <div class="parallx" @scroll="onScrollChange">
    <!-- 缓慢移动区 -->
    <div class="parallx-slow" :style="{top:slowTop}">
      <slot name="parallx-slow"></slot>
    </div>
    <!-- 正常移动区 -->
    <div class="parallx-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// 缓慢移动差
const SLOW_DIFF = 2
export default {
  data () {
    return {
      // 当前滚动距离
      scrollY: 0
    }
  },
  methods: {
    onScrollChange (event) {
      this.scrollY = event.target.scrollTop
      this.$emit('onScroll', this.scrollY)
    }
  },
  computed: {
    slowTop () {
      return (this.scrollY - this.scrollY / SLOW_DIFF) + 'px'
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/css/variable.scss';
.parallx {
  height: 100%;
  width: 100%;
  overflow: hidden;
  overflow-y: auto;
  &-slow {
    position: relative;
    width: 100%;
  }
  &-content {
    position: relative;
    width: 100%;
    z-index: 2;
  }
}
</style>