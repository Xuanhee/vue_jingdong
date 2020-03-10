<template>
  <!-- 直营标签 -->
  <span class="goods-item-name-direct">{{text}}</span>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '直营'
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/css/variable.scss';
.goods-item-name-direct {
  padding: 0 px2rem(4);
  font-size: $mInfoFontSize;
  color: $color-text-w;
  border-radius: px2rem(2);
  background-color: $color-theme;
  margin-right: px2rem(2);
}
</style>
