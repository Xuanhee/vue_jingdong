<template>
  <div class="my">
    <navigation-bar pageName="个人中心" :isShowBack="true"></navigation-bar>
    <h1>my</h1>
  </div>
</template>

<script>
import NavigationBar from 'base/navigation-bar/navigation-bar'
export default {
  components: {
    NavigationBar
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/variable.scss';
.my {
  width: 100%;
  height: 100%;
  h1 {
    font-size: px2rem(32);
  }
}
</style>
