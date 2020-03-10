<template>
  <div class="goods-detail">
    <navigation-bar class="fixed" :style="{background:navBarOpacity}">
      <template #nav-left>
        <div class="goods-detail-nav-left">
          <img src="@img/back-2.svg" @click="back" :style="{opacity:leftIconOpacity}" />
          <img src="@img/back-white.svg" @click="back" :style="{opacity:navBarSlotOpacity}" />
        </div>
      </template>
      <template #nav-center>
        <span class="goods-detail-nav-title" :style="{opacity:navBarSlotOpacity}">商品详情</span>
      </template>
    </navigation-bar>
    <div class="goods-detail-content">
      <parallax @onScroll="onScrollChange">
        <template #parallx-slow>
          <my-swiper
            :swiperHeight="swiperHeight"
            :autoplay="autoplay"
            :swiperImgs="goodsData.swiperImgs"
            :paginationType="paginationType"
          ></my-swiper>
        </template>
        <template>
          <!-- 内容 -->
          <div class="goods-detail-content-desc">
            <div class="goods-detail-content-desc-item">
              <p class="goods-detail-content-desc-item-price">￥{{goodsData.price | priceValue}}</p>
              <p class="goods-detail-content-desc-item-name">
                <direct v-if="goodsData.isDirect"></direct>
                <no-have v-if="!goodsData.isHave"></no-have>
                {{goodsData.name}}
              </p>
            </div>
            <div class="goods-detail-content-desc-item">
              <p class="goods-detail-content-desc-item-select">
                <span>已选</span>
                <span class="single-row-text">{{goodsData.name}}</span>
              </p>
              <!-- 附加服务 -->
              <div class="goods-detail-content-desc-item-support">
                <ul class="goods-detail-content-desc-item-support-list">
                  <li
                    class="goods-detail-content-desc-item-support-list-item"
                    v-for="(item,index) in attachDatas"
                    :key="index"
                  >
                    <img src="@img/support.svg" />
                    <span>{{item}}</span>
                  </li>
                </ul>
              </div>
              <div class="goods-detail-content-desc-detail">
                <img :src="item" v-for="(item,index) in goodsData.detailImgs" :key="index" />
              </div>
            </div>
          </div>
        </template>
      </parallax>
    </div>
    <!-- 加入购物车 立即购买 -->
    <div class="goods-detail-buy">
      <div class="goods-detail-buy-add" @click="addShopping">加入购物车</div>
      <div class="goods-detail-buy-now" @click="buy">立即购买</div>
    </div>
    <top-tip ref="topTip">
      <div class="top-tip-content">
        <span class="top-tip-content-text">添加购物车成功</span>
      </div>
    </top-tip>
  </div>
</template>

<script>
import NavigationBar from 'base/navigation-bar/navigation-bar'
import MySwiper from 'base/my-swiper/my-swiper'
import Direct from 'base/goods/direct'
import NoHave from 'base/goods/no-have'
import Parallax from 'base/parallax/parallax'
import TopTip from 'base/top-tip/top-tip'
import { getGoodsById } from 'api/goods'
import { mapMutations } from 'vuex'
const MAX_SCROLL_HEIGHT = 310
export default {
  name: 'goodsDetail',
  data () {
    return {
      // swiper高度
      swiperHeight: '384px',
      // 不自动播放
      autoplay: false,
      // 商品数据
      goodsData: {},
      // 分页器显示类型
      paginationType: 'fraction',
      // 附加服务
      attachDatas: [
        '可配送海外',
        '京东发货&售后',
        '京准达',
        '211限时达',
        '可自提',
        '不可使用优惠卷'
      ],
      // 当前滚动距离
      scrollY: 0
    }
  },
  created () {
    // 路由中path 和 params不能一起使用
    this.loadGoods()
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    // 监听滚动事件
    onScrollChange (value) {
      this.scrollY = value
    },
    loadGoods () {
      getGoodsById(this.$route.query.goodsId).then((res) => {
        this.goodsData = res.data.goodsData
      })
    },
    // 点击立即购买向外部派发事件传递商品数据
    buy () {
      this.$router.push({
        name: 'buy',
        params: {
          routerType: 'push'
        },
        query: {
          id: this.goodsData.id
        }
      })
    },
    // 添加商品到购物车
    addShopping () {
      this.addShoppingData(this.goodsData)
      this.$refs.topTip.show()
    },
    ...mapMutations([
      'addShoppingData'
    ])
  },
  // 通过计算属性拿到滚动透明度的比例
  computed: {
    leftIconOpacity () {
      return 1 - this.scrollY / MAX_SCROLL_HEIGHT
    },
    navBarOpacity () {
      return `rgba(216,30,0,${this.scrollY / MAX_SCROLL_HEIGHT})`
    },
    navBarSlotOpacity () {
      return this.scrollY / MAX_SCROLL_HEIGHT
    }
  },
  components: {
    NavigationBar,
    MySwiper,
    Direct,
    NoHave,
    Parallax,
    TopTip
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/css/variable.scss';
@import 'assets/css/mixin.scss';
.goods-detail {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  &-nav-left {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    img {
      position: absolute;
    }
  }
  &-nav-title {
    font-size: $titleFontSize;
    color: $color-text-w;
    text-align: center;
    font-weight: 700;
  }
  &-content {
    height: 100%;
    &-desc {
      width: 100%;
      background-color: $color-background;
      box-shadow: 0 0 px2rem(16) 0 rgba(0, 0, 0, 0.2);
      &-item {
        background-color: $color-background-w;
        padding: px2rem(6);
        margin-bottom: px2rem(6);
        &-price {
          font-size: px2rem(20);
          color: $color-theme;
          font-weight: 700;
        }
        &-name {
          margin-top: px2rem(6);
          font-size: $titleFontSize;
          font-weight: 500;
          line-height: px2rem(20);
        }
        &-select {
          font-size: $infoFontSize;
          color: $color-text-b;
          height: px2rem(44);
          display: flex;
          align-items: center;
          border-bottom: px2rem(1) solid $color-line;
          .single-row-text {
            @include text-overflow;
            color: $color-text;
            font-size: $titleFontSize;
            font-weight: 700;
            margin-left: px2rem(4);
          }
        }
        &-support {
          margin-top: px2rem(6);
          &-list {
            display: flex;
            flex-wrap: wrap;
            &-item {
              display: flex;
              align-items: center;
              padding: px2rem(6) 0;
              margin-right: px2rem(6);
              img {
                width: px2rem(12);
                margin-right: px2rem(4);
              }
              span {
                font-size: $mInfoFontSize;
                color: $color-text-bb;
              }
            }
          }
        }
      }
      &-detail {
        img {
          width: 100%;
        }
      }
    }
  }
  &-buy {
    background: $color-background-w;
    border-top: px2rem(1) solid $color-line;
    height: px2rem(46);
    line-height: px2rem(46);
    text-align: right;
    div {
      display: inline-block;
      width: px2rem(100);
      text-align: center;
      font-size: $infoFontSize;
      color: $color-text-w;
    }
    &-add {
      background-color: $color-theme;
    }
    &-now {
      background-color: darkgoldenrod;
    }
  }
  .top-tip-content {
    text-align: center;
    &-text {
      display: inline-block;
      padding: px2rem(12) 0;
      font-size: $titleFontSize;
    }
  }
}
</style>