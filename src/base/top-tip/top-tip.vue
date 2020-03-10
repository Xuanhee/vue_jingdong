<template>
  <transition name="top-tip">
    <div class="top" v-show="showFlag" @click.stop="hide">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    delay: {
      type: Number,
      default: 800
    }
  },
  data () {
    return {
      showFlag: false
    }
  },
  methods: {
    show () {
      this.showFlag = true
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.hide()
      }, this.delay)
    },
    hide () {
      this.showFlag = false
    }
  }
}
</script>

<style lang="scss">
@import 'assets/css/variable';
.top {
  position: fixed;
  top: px2rem(60);
  width: 80%;
  z-index: 99999;
  background: $color-background;
  border-radius: px2rem(20);
  left: 10%;
}
.top-tip-enter-active,
.top-tip-leave-active {
  transition: all 0.3s;
}
.top-tip-enter,
.top-tip-leave-to {
  transform: translate3d(0, -100%, 0);
}
</style>