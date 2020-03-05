<template>
  <div class="tool-bar">
    <!-- 通过数据源驱动视图 -->
    <div
      class="tool-bar-item"
      v-for="(item,index) in toolBarData"
      :key="index"
      @click="selectItem(item,index)"
    >
      <img :src="currentIndex === index ? item.hIcon : item.nIcon " class="tool-bar-item-image" />
      <p class="tool-bar-item-text" :class="{'current' : currentIndex === index}">{{item.name}}</p>
    </div>
  </div>
</template>

<script>
export default {
  // 初始化tool-bar显示的数据,如果要发给外部可以写在props里,这里不发出去的话写在created中即可
  created () {
    this.toolBarData = [{
      nIcon: require('assets/image/home-n.svg'),
      hIcon: require('assets/image/home-h.svg'),
      name: '首页',
      componentName: 'home'
    }, {
      nIcon: require('assets/image/shopping-n.svg'),
      hIcon: require('assets/image/shopping-h.svg'),
      name: '购物城',
      componentName: 'shopping'
    }, {
      nIcon: require('assets/image/my-n.svg'),
      hIcon: require('assets/image/my-h.svg'),
      name: '我的',
      componentName: 'my'
    }]
  },
  data () {
    return {
      // 显示的当前索引
      currentIndex: 0
    }
  },
  methods: {
    // 监听点击按钮事件
    selectItem (item, index) {
      // 用户点击当前按钮时,改变当前索引
      this.currentIndex = index
      // 向父组件派发出去一个事件,携带item 和索引
      this.$emit('select', item, index)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/variable.scss';
.tool-bar {
  width: 100%;
  height: px2rem(46);
  display: flex;
  justify-content: space-around;
  background-color: $color-background;
  box-shadow: 0 0 px2rem(16);
  border-top: 1px solid $color-line;
  &-item {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0 0 px2rem(1);
    &-image {
      width: px2rem(22);
      height: px2rem(22);
    }
    &-text {
      font-size: $infoFontSize;
      &.current {
        color: $color-theme;
      }
    }
  }
}
</style>
