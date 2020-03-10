<template>
  <div class="number-manager-wrapper">
    <span class="reduce" @click="onReduce" :class="{'disable' :count===1}">-</span>
    <span class="count">{{count}}</span>
    <span class="add" @click="onAdd">+</span>
  </div>
</template>

<script>
export default {
  props: {
    defaultCount: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      count: 1
    }
  },
  methods: {
    // 点击减少事件
    onReduce () {
      if (this.count <= 1) return
      this.count--
    },
    // 点击增加事件
    onAdd () {
      this.count++
    }
  },
  // 但是defaultCount这个值已经从父组件传入进来并且改变了 用这个钩子来个数量重新赋值
  //   created () {
  //     this.count = this.defaultCount
  //   },
  watch: {
    // 点击添加到购物车并不触发这个watch
    defaultCount: {
      immediate: true,
      handler (newValue) {
        this.count = newValue
      }

    },
    count (newValue) {
      this.$emit('countChange', newValue)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/css/variable.scss';
.number-manager-wrapper {
  display: flex;
  height: px2rem(20);
  line-height: px2rem(20);
  font-size: $infoFontSize;
  span {
    width: px2rem(30);
    text-align: center;
    display: inline-block;
    // font-weight: 500;
  }
  .count {
    background-color: $color-background;
    padding: 0 px2rem(4);
  }
  .disable {
    color: $color-text-g;
  }
}
</style>
