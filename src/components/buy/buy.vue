<template>
  <div class="buy-warpper">
    <navigation-bar class="buy-warpper-nav" @navBarLeft="back" :isShowBack="isShowBack">
      <template #nav-center>
        <span class="nav-center">立即购买</span>
      </template>
    </navigation-bar>
    <div class="goods">
      <img :src="goodsData.img" alt />
      <div class="goods-content">
        <p class="goods-content-desc">{{goodsData.name}}</p>
        <span class="goods-content-price">￥{{goodsData.price}}</span>
      </div>
    </div>
    <div class="buy-warpper-pay">
      <ul>
        <li
          class="buy-warpper-pay-item"
          v-for="(item,index) in paymentDatas"
          :key="index"
          @click="payChange(item)"
        >
          <img :src="item.icon" alt />
          <div class="pay-text">
            <p class="pay-text-name">{{item.name}}</p>
            <p class="pay-text-desc">{{item.desc}}</p>
          </div>
          <img class="cirlce" :src="checkImg(item)" />
        </li>
      </ul>
    </div>
    <div class="buy-warpper-buy-now">立即购买</div>
  </div>
</template>

<script>
import NavigationBar from 'base/navigation-bar/navigation-bar'
import { getGoodsById } from 'api/goods'
export default {
  data () {
    return {
      // 显示后退按钮
      isShowBack: true,
      goodsData: {},
      // 支付方式数据源
      paymentDatas: [{
        id: 1,
        name: '支付宝支付',
        desc: '数亿用户都在用,安全可托付',
        icon: require('@img/alipay.svg')
      }, {
        id: 2,
        name: '微信支付',
        desc: '亿万用户选择,更快更安全',
        icon: require('@img/weichat.png')
      }],
      // 用户选中的支付方式
      selectPayment: {}
    }
  },
  created () {
    this.getGoods()
  },
  methods: {
    // 获取数据
    getGoods () {
      getGoodsById(this.$route.query.id).then((res) => {
        this.goodsData = res.data.goodsData
      })
    },
    // 后退
    back () {
      this.$router.go(-1)
    },
    // 支付方式切换
    payChange (item) {
      this.selectPayment = item
    },
    checkImg (item) {
      return item.id === this.selectPayment.id ? require('@img/check.svg') : require('@img/no-check.svg')
    }
  },
  components: {
    NavigationBar
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/css/variable.scss';
.buy-warpper {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: $color-background;
  &-nav {
    background-color: $color-background-w;
  }
  .nav-center {
    font-size: $titleFontSize;
  }
  .goods {
    margin: px2rem(10) 0;
    padding: px2rem(6) px2rem(12);
    display: flex;
    height: px2rem(100);
    background-color: $color-background-w;
    img {
      height: 100%;
      margin-right: px2rem(6);
    }
    &-content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      &-desc {
        font-size: $mInfoFontSize;
        font-weight: 700;
      }
      &-price {
        font-size: $infoFontSize;
        color: $color-theme;
        font-weight: 700;
      }
    }
  }
  &-pay {
    width: 100%;
    background-color: $color-background-w;
    &-item {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: px2rem(6);
      border-bottom: px2rem(1) solid $color-line;
      height: px2rem(40);
      img {
        width: px2rem(32);
        margin-right: px2rem(6);
      }
      .pay-text {
        flex-grow: 1;
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: space-around;
        &-name {
          font-size: $infoFontSize;
          font-weight: 700;
        }
        &-desc {
          font-size: $mInfoFontSize;
          color: $color-text-b;
        }
      }
      .cirlce {
        width: px2rem(16);
      }
    }
  }
  &-buy-now {
    position: absolute;
    bottom: 10%;
    width: 90%;
    margin-left: 5%;
    height: px2rem(50);
    text-align: center;
    line-height: px2rem(50);
    font-weight: 700;
    font-size: $titleFontSize;
    color: $color-background-w;
    background-color: $color-theme;
    border-radius: px2rem(50);
  }
}
</style>
