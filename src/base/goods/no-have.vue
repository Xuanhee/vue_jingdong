<template>
  <span class="goods-item-name-noHave">{{text}}</span>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '缺货'
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/css/variable.scss';
.goods-item-name-noHave {
  padding: 0 px2rem(2);
  font-size: $mInfoFontSize;
  color: $color-text-w;
  background-color: $color-background-d;
  border-radius: px2rem(2);
  margin-right: px2rem(2);
}
</style>
