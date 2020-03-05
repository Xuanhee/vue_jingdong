<template>
  <div class="seconds-wrapper">
    <div class="seconds-wrap">
      <p class="seconds-wrap-title">京东秒杀</p>
    </div>
    <div class="seconds-content">
      <div class="seconds-content-item" v-for="(item,index) in secondsData" :key="index">
        <img class="seconds-content-item-img" :src="item.icon" />
        <p class="seconds-content-item-new">￥{{item.price | priceValue}}</p>
        <p class="seconds-content-item-old">￥{{item.oldPrice | priceValue}}</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    secondsData: {
      type: Array,
      default () {
        return []
      }
    },
    methods: {

    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/css/variable.scss';
.seconds-wrapper {
  background-color: $color-background-w;
  border-radius: px2rem(6);
  margin: px2rem(6);
  .seconds-wrap {
    display: flex;
    padding: px2rem(6);
    &-title {
      font-size: $titleFontSize;
    }
  }
  .seconds-content {
    padding: px2rem(6) 0;
    display: flex;
    overflow: hidden;
    overflow-x: scroll;
    &-item {
      padding: 0 px2rem(12);
      text-align: center;
      &-img {
        height: px2rem(66);
        width: px2rem(66);
      }
      &-new {
        font-size: $infoFontSize;
        color: $color-red;
        font-weight: 700;
        margin: px2rem(6) 0;
      }
      &-old {
        font-size: $infoFontSize;
        color: $color-text-b;
        text-decoration: line-through;
      }
    }
  }
}
</style>
