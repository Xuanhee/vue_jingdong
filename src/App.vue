<template>
  <div id="app">
    <transition :name="transitionName" appear>
      <keep-alive :include="virtualTaskStack">
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>
<script>
export default {
  data () {
    return {
      transitionName: 'fold-left',
      // 虚拟任务栈 包含在这个数组内的组件将存在缓存中
      virtualTaskStack: [
        'firsPage'
      ]
    }
  },
  watch: {
    '$route' (to, from) {
      // 查询路由跳转组件中含有的routerType属性是不是 push
      const routerType = to.params.routerType
      if (routerType === 'push') {
        this.transitionName = 'fold-left'
        this.virtualTaskStack.push(to.name)
      } else {
        this.transitionName = 'fold-right'
        this.virtualTaskStack.pop()
      }
    }
  }
}
</script>
<style lang="scss">
// push页面进入动画
.fold-left-enter-active {
  animation: fold-left-in 0.4s;
}
.fold-left-leave-active {
  animation: fold-left-out 0.4s;
}
@keyframes fold-left-in {
  0% {
    transform: translate3d(100%, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fold-left-out {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-100%, 0, 0);
  }
}

.fold-right-enter-active {
  animation: fold-right-in 0.4s;
}
.fold-right-leave-active {
  animation: fold-right-out 0.4s;
}

@keyframes fold-right-in {
  0% {
    transform: translate3d(-100%, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fold-right-out {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(100%, 0, 0);
  }
}
</style>
