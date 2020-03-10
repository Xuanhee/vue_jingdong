<template>
  <div class="goods" :class="layoutClass" ref="goods" :style="{'height': goodsHeight}">
    <div
      class="goods-item"
      :class="layoutItemClass"
      v-for="(item,index) in goods"
      :key="index"
      ref="goodsItem"
      @click="goodsDetail(item,index)"
    >
      <img class="goods-item-img" v-lazy="item.img" :style="imgStyles[index]" />
      <div class="goods-item-desc">
        <p class="goods-item-desc-name" :class="{'noHave' : !item.isHave}">
          <direct v-if="item.isDirect"></direct>
          <no-have v-if="!item.isHave"></no-have>
          {{item.name}}
        </p>
        <div class="goods-item-desc-data">
          <p class="goods-item-desc-data-price">￥{{item.price | priceValue}}</p>
          <p class="goods-item-desc-data-volume">销量{{item.volume}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRandomInt } from 'assets/js/util'
import Direct from 'base/goods/direct'
import NoHave from 'base/goods/no-have'
const ITEM_MARGIN_HEIGHT = 8
export default {
  props: {
    // 商品数据
    goods: {
      type: Array,
      default () {
        return []
      }
    },
    // 是否开启瀑布流
    isWaterfall: {
      type: Boolean,
      default: true
    },
    // 默认是瀑布流
    showNum: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      imgStyles: [],
      goodsHeight: '100%',
      layoutClass: 'goods-list',
      layoutItemClass: 'goods-list-item'
    }
  },
  created () {
    // 瀑布流所能接收的最大和最小的高度
    this.MAX_IMG_HEIGHT = 230
    this.MIX_IMG_HEIGHT = 178
    this._initImgStyle()
  },
  // 返回图片随机高度
  methods: {
    _initImgStyle () {
      // 如果是瀑布流,给图片设置随机高度
      if (this.isWaterfall) {
        this.layoutClass = 'goods-waterfall'
        this.layoutItemClass = 'goods-waterfall-item'
        this.goods.forEach((item) => {
          const randomHeight = getRandomInt(this.MIX_IMG_HEIGHT, this.MAX_IMG_HEIGHT)
          this.imgStyles.push({
            height: randomHeight + 'px'
          })
        })
        this.$nextTick(() => {
          this.initWaterfall()
        })
      }
    },
    // 瀑布流布局
    // 判断左右两边距离顶部的距离,哪边小就排在哪边,两边相同排在左边
    initWaterfall () {
      const goodsItem = this.$refs.goodsItem
      if (!goodsItem) return
      let leftHeight = 0
      let rightHeight = 0
      goodsItem.forEach((item, index) => {
        const elHeight = item.clientHeight + ITEM_MARGIN_HEIGHT
        if (leftHeight <= rightHeight) {
          item.style.top = leftHeight + 'px'
          item.style.left = 0
          item.style.right = ''
          leftHeight += elHeight
        } else {
          item.style.top = rightHeight + 'px'
          item.style.right = 0
          item.style.left = ''
          rightHeight += elHeight
        }
      })
      this.goodsHeight = (leftHeight > rightHeight ? leftHeight : rightHeight) + 'px'
    },
    // 封装根据点击展示不同按钮来添加不同的类名
    initMode (newValue) {
      // 初始化数据
      this.imgStyles = []
      this.goodsHeight = '100%'
      // 判断当前是何种显示方式
      if (newValue === 2) {
        this.layoutClass = 'goods-list'
        this.layoutItemClass = 'goods-list-item'
        return
      }
      if (newValue === 3) {
        this.layoutClass = 'goods-grid'
        this.layoutItemClass = 'goods-grid-item'
        return
      }
      this.layoutClass = 'goods-waterfall'
      this.layoutItemClass = 'goods-waterfall-item'
      this._initImgStyle()
    },
    // 点击跳转到详情页面
    goodsDetail (item) {
      // console.log(item)
      this.$router.push({
        name: 'goods-detail',
        params: {
          item,
          routerType: 'push'
        },
        query: {
          goodsId: item.id
        }
      })
    }
  },
  watch: {
    goods () {
      this._initImgStyle()
    },
    showNum (newValue) {
      this.initMode(newValue)
    }
  },
  components: {
    Direct,
    NoHave
  }
}
</script>

<style lang="scss">
@import 'assets/css/variable.scss';
@import 'assets/css/mixin.scss';
.goods {
  background-color: $color-background;
  &-item {
    background-color: $color-background-w;
    padding: px2rem(6);
    box-sizing: border-box;
    &-desc {
      width: 100%;
      &-name {
        @include text-overflow(2);
        font-size: $infoFontSize;
        line-height: px2rem(18);
      }
      .noHave {
        color: $color-text-b;
      }
      &-data {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: px2rem(8);
        &-price {
          font-size: $titleFontSize;
          color: $color-theme;
          font-weight: 700;
        }
        &-volume {
          font-size: $infoFontSize;
          color: $color-text-b;
        }
      }
    }
  }
}
// 垂直列表
.goods-list {
  &-item {
    display: flex;
    border-bottom: 1px solid $color-line;
    .goods-item-img {
      width: px2rem(120);
    }
    .goods-item-desc {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: px2rem(6);
    }
  }
}
// 网格布局
.goods-grid {
  padding: px2rem(6);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  &-item {
    width: 49%;
    border-radius: $radiusSize;
    margin-bottom: px2rem(6);
    .goods-item-img {
      width: 100%;
    }
  }
}
// 瀑布流
.goods-waterfall {
  position: relative;
  margin: px2rem(6);
  &-item {
    position: absolute;
    width: 49%;
    border-radius: $radiusSize;
    .goods-item-img {
      width: 100%;
    }
  }
}
</style>
