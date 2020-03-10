<template>
  <div class="goods-list-page">
    <navigation-bar pageName="商品列表" @navBarLeft="back" :isShowBack="true">
      <template #nav-right>
        <img :src="modeIcon" alt @click="modeChange" />
      </template>
    </navigation-bar>
    <goods-options class="goods-list-page-options" @select="select" @subsClick="subClick"></goods-options>
    <div class="goodsList" @scroll="onScrollChange" ref="goodsList">
      <goods :goods="goodsData" :isWaterfall="isWaterfall" :showNum="showNum"></goods>
    </div>
  </div>
</template>

<script>
import NavigationBar from 'base/navigation-bar/navigation-bar'
import GoodsOptions from 'components/goods-list/goods-options'
import Goods from 'base/goods/goods'
import { getGoods } from 'api/goods'
import { ERR_OK } from 'api/config'
export default {
  name: 'goodsList',
  created () {
    this._getGoods()
  },
  data () {
    return {
      goods: [],
      isWaterfall: false,
      // 展示垂直列表
      showNum: 2,
      goodsData: [],
      scrollY: 0
    }
  },
  methods: {
    // 点击后退,退回上一层路由
    back () {
      this.$router.go(-1)
    },
    // 获取商品列表数据
    _getGoods () {
      getGoods().then((res) => {
        if (res.state === ERR_OK) {
          this.goods = res.data.list
          // 深拷贝数组
          this.goodsData = this.goods.slice()
        }
      })
    },
    // 点击切换展示模式
    modeChange () {
      console.log(this.flag)
      if (!this.flag) {
        this.flag = true
        setTimeout(() => {
          this.flag = false
        }, 30)
        this.showNum = (this.showNum + 1) % 3 + 1
        if (this.showNum === 1) {
          this.isWaterfall = true
          return
        }
        this.isWaterfall = false
      }
    },
    // 监听来自goods-options组件的事件
    select (item, index) {
      if (!item) return
      item.name === '有货优先' && this.getSortGoods('isHave')
      item.name === '直营优先' && this.getSortGoods('isDirect')
    },
    subClick (item, index) {
      // 对属性进行多个判断时用switch更简化
      switch (item.id) {
        case '1':
          this.goodsData = this.goods.slice()
          break
        // 价格由高到低
        case '1-2':
          this.getSortGoods('price')
          break
        // 价格由低到高
        case '1-3':
          this.priceHeigh()
          break
        // 销量由高到低
        case '1-4':
          this.getSortGoods('volume')
          break
      }
    },
    // 利用传参的方式进行排序方法的封装 key是要进行比较的属性
    getSortGoods (key) {
      // -1负值表示a在b前面  1正值表示b在a前面
      this.goodsData.sort((a, b) => {
        const s1 = a[key]
        const s2 = b[key]
        if (typeof s1 === 'boolean') {
          if (s1) return -1
          if (s2) return 1
          return 0
        }
        if (parseFloat(s1) > parseFloat(s2)) {
          return -1
        }
        return 1
      })
    },
    // 价格由低到高
    priceHeigh () {
      this.goodsData.sort((a, b) => {
        return a.price - b.price
      })
    },
    onScrollChange (event) {
      this.scrollY = event.target.scrollTop
    }
  },
  // keep-alive包裹的组件被激活时触发
  activated () {
    this.$refs.goodsList.scrollTop = this.scrollY
  },
  computed: {
    modeIcon () {
      return this.showNum === 1 ? require('@img/waterfall-type.svg') : this.showNum === 2 ? require('@img/list-type.svg') : require('@img/grid-type.svg')
    }
  },
  components: {
    NavigationBar,
    GoodsOptions,
    Goods
  }
}
</script>

<style lang="scss">
@import 'assets/css/variable.scss';
.goods-list-page {
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: $color-background;
  &-options {
    position: relative;
  }
  .goodsList {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
    overflow-y: auto;
  }
}
</style>
