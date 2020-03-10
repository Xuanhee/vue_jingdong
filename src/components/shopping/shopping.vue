<template>
  <div class="shopping">
    <navigation-bar pageName="购物车"></navigation-bar>
    <div class="shopping-goods">
      <ul>
        <li
          class="shopping-goods-item"
          v-for="(item,index) in shoppingData"
          :key="index"
          @click="onCheck(item,index)"
        >
          <img :src="checkImg(item.isCheck)" class="shopping-goods-item-check" />
          <img :src="item.img" class="shopping-goods-item-img" />
          <div class="shopping-goods-item-content">
            <p class="shopping-goods-item-content-desc">
              <direct v-show="item.isDirect"></direct>
              {{item.name}}
            </p>
            <div class="shopping-goods-item-content-priceCount" @click.stop>
              <span class="shopping-goods-item-content-priceCount-price">{{item.price}}</span>
              <number-manager
                @countChange="countChange(arguments,item,index)"
                :defaultCount="item.count"
              ></number-manager>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="shopping-pay">
      <div class="shopping-pay-check" @click="onAllCheck">
        <img :src="checkImg(totalData.isAll)" alt class="shopping-pay-check-img" />
        <span>全选</span>
      </div>
      <div class="shopping-pay-price-content">
        <p class="shopping-pay-price-content-top">合计：￥{{totalData.totalPrice | priceValue}}</p>
        <p
          class="shopping-pay-price-content-bottom"
        >总额:￥{{totalData.totalPrice | priceValue}}&nbsp;&nbsp;立减:￥0.00</p>
      </div>
      <div class="shopping-pay-button">
        <span>去结算({{totalData.goodsNumber}})</span>
      </div>
    </div>
  </div>
</template>
<script>
import NavigationBar from 'base/navigation-bar/navigation-bar'
import Direct from 'base/goods/direct'
import NumberManager from 'base/goods/number-manager'
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      shoppingData: [],
      totalData: {
        // 是否全选
        isAll: false,
        // 总价格
        totalPrice: 0,
        // 总数量
        goodsNumber: 0
      }
    }
  },
  activated () {
    this.shoppingData = this.getShoppingData
  },
  methods: {
    checkGoods () {
      this.check = !this.check
      return this.check ? require('@img/check.svg') : require('@img/no-check.svg')
    },
    // 监听来自number-manager组件的 数量变化事件
    countChange ($arguments, item, index) {
      const count = $arguments[0]
      this.changeShoppingData({
        index,
        count
      })
      this.computedGoodsTotal()
    },
    // 点击选中商品
    onCheck (item, index) {
      if (!item) return
      this.changeGoodsState({
        isCheck: !item.isCheck,
        index
      })
      this.computedGoodsTotal()
    },
    // 点击全选
    onAllCheck () {
      this.totalData.isAll = !this.totalData.isAll
      this.shoppingData.forEach((item, index) => {
        this.changeGoodsState({
          isCheck: this.totalData.isAll,
          index
        })
      })
      this.computedGoodsTotal()
    },
    // 封装计算总价和数量的方法
    computedGoodsTotal () {
      // 初始化数据
      this.totalData = {
        isAll: true,
        // 总价格
        totalPrice: 0,
        // 总数量
        goodsNumber: 0
      }
      this.shoppingData.forEach((item) => {
        if (item.isCheck) {
          this.totalData.goodsNumber += item.count
          this.totalData.totalPrice += parseFloat(item.price) * parseFloat(item.count)
        } else {
          this.totalData.isAll = false
        }
      })
    },
    // 根据点击状态设置icon
    checkImg (isCheck) {
      return isCheck ? require('@img/check.svg') : require('@img/no-check.svg')
    },
    ...mapMutations([
      'changeShoppingData',
      'changeGoodsState'
    ])
  },
  computed: {
    ...mapGetters([
      'getShoppingData'
    ])
  },
  components: {
    NavigationBar,
    Direct,
    NumberManager
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/css/variable.scss';
@import 'assets/css/mixin.scss';
.shopping {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: $color-background;
  justify-content: space-between;
  &-goods {
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    &-item {
      width: 100%;
      height: px2rem(100);
      display: flex;
      align-items: center;
      padding: px2rem(6) px2rem(12);
      background-color: $color-background-w;
      box-sizing: border-box;
      &-check {
        width: px2rem(20);
        height: px2rem(20);
        margin-right: px2rem(6);
      }
      &-img {
        height: 100%;
        margin-right: px2rem(6);
      }
      &-content {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        &-desc {
          font-size: $mInfoFontSize;
          @include text-overflow(2);
          line-height: px2rem(18);
        }
        &-priceCount {
          display: flex;
          justify-content: space-between;
          &-price {
            font-size: $infoFontSize;
            color: $color-theme;
            font-weight: 700;
          }
        }
      }
    }
  }
  &-pay {
    height: px2rem(50);
    width: 100%;
    display: flex;
    align-items: center;
    background-color: $color-background-w;
    &-check {
      flex: 0 0 px2rem(50);
      display: flex;
      padding: px2rem(6);
      justify-content: space-around;
      &-img {
        width: px2rem(16);
        height: px2rem(16);
      }
      span {
        font-size: $mInfoFontSize;
      }
    }
    &-price-content {
      display: flex;
      flex-direction: column;
      padding: px2rem(6);
      margin-right: px2rem(6);
      justify-content: space-around;
      box-sizing: border-box;
      height: 100%;
      flex-grow: 1;
      &-top {
        font-size: $infoFontSize;
        font-weight: 700;
      }
      &-bottom {
        font-size: $mInfoFontSize;
        font-weight: 700;
      }
    }
    &-button {
      background-color: $color-theme;
      height: 100%;
      width: px2rem(120);
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        font-size: $titleFontSize;
        color: $color-text-w;
      }
    }
  }
}
</style>
