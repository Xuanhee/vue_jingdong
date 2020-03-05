<template>
  <div class="mode-options">
    <div class="mode-options-item" v-for="(item,index) in modeOptions" :key="index">
      <img :src="item.icon" class="mode-options-item-icon" />
      <span class="mode-options-item-title">{{item.title}}</span>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    this.modeOptions = [
      {
        id: '1',
        icon: require('assets/image/jingDongChaoShi.png'),
        title: '京东超市'
      },
      {
        id: '2',
        icon: require('assets/image/haiTunQuanQiu.png'),
        title: '海屯全球'
      },
      {
        id: '3',
        icon: require('assets/image/jingDongFuShi.png'),
        title: '京东服饰'
      },
      {
        id: '4',
        icon: require('assets/image/jingDongShengXian.png'),
        title: '京东生鲜'
      },
      {
        id: '5',
        icon: require('assets/image/jingDongDaoJia.png'),
        title: '京东到家'
      },
      {
        id: '6',
        icon: require('assets/image/chongZhiJiaoFei.png'),
        title: '充值缴费'
      },
      {
        id: '7',
        icon: require('assets/image/jingDongPinGou.png'),
        title: '9.9元拼'
      },
      {
        id: '8',
        icon: require('assets/image/lingJuan.png'),
        title: '领劵'
      },
      {
        id: '9',
        icon: require('assets/image/zhuanQian.png'),
        title: '赚钱'
      },
      {
        id: '10',
        icon: require('assets/image/quanBu.png'),
        title: '全部'
      }]
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/css/variable.scss';
.mode-options {
  display: flex;
  flex-wrap: wrap;
  background-color: $color-background-w;
  padding-bottom: px2rem(20);
  &-item {
    width: 20%;
    height: px2rem(60);
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    margin-top: px2rem(10);
    &-icon {
      width: px2rem(40);
      height: px2rem(40);
    }
    &-title {
      font-size: $mInfoFontSize;
    }
  }
}
</style>
