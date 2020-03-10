<template>
  <div class="main">
    <!-- 动态组件 -->
    <keep-alive>
      <component :is="currentComponent"></component>
    </keep-alive>
    <tool-bar @select="selectItem"></tool-bar>
  </div>
</template>

<script>
import ToolBar from 'components/tool-bar/tool-bar'
export default {
  name: 'firsPage',
  data () {
    return {
      currentComponent: 'home'
    }
  },
  // 监听来自tool-bar的事件 通过动态组件的形式来切换组件
  methods: {
    selectItem (item, index) {
      // console.log(item)
      // 设置动态绑定的组件为 子组件传递过来的数据
      this.currentComponent = item.componentName
    }
  },
  components: {
    ToolBar,
    // 异步组件引入方式 异步组件: 只有在需要去展示这个组件的时候才会把组件进行渲染, 和路由懒加载的写法一样
    Home: () => import('components/home/home'),
    Shopping: () => import('components/shopping/shopping'),
    My: () => import('components/my/my')
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/css/variable.scss';
.main {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
