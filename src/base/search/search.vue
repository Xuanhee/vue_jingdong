<template>
  <div class="search" :style="{backgroundColor: bgColor}">
    <img :src="icon" class="search-icon" />
    <input
      class="search-input"
      :style="{color:hintColor,backgroundColor: bgColor}"
      :placeholder="placeholder"
      :class="{'invalid' : hintColor==='#fff'}"
    />
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: require('@img/search.svg')
    },
    placeholder: {
      type: String,
      default: '京东商城简易版本'
    },
    hintColor: {
      type: String,
      default: '#999'
    },
    bgColor: {
      type: String,
      default: '#fff'
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/css/variable.scss';
.search {
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: px2rem(30);
  padding:  px2rem(2) px2rem(8);
  &-icon {
    width: px2rem(16);
  }
  &-input {
    width: 100%;
    margin-left: px2rem(8);
    font-size: $mInfoFontSize;
    outline: none;
    border: none;
    &.invalid::-webkit-input-placeholder {
      color: $color-text-w;
    }
  }
}
</style>
