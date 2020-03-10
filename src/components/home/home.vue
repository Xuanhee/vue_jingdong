<template>
  <div class="home" @scroll="onScrollChange" ref="home">
    <navigation-bar ref="navigationBar" class="fixed">
      <!-- 左侧插槽 -->
      <template #nav-left>
        <img src="@img/more-white.svg" ref="leftIcon" />
      </template>
      <!-- 中间插槽 -->
      <template #nav-center>
        <search
          :icon="searchStyle.icon"
          :bgColor="searchStyle.bgColor"
          :hintColor="searchStyle.hintColor"
        ></search>
      </template>
      <!-- 右侧插槽 -->
      <template #nav-right>
        <img src="@img/message-white.svg" ref="rightIcon" />
      </template>
    </navigation-bar>
    <div class="home-content">
      <!-- 轮播图 -->
      <my-swiper :swiperImgs="swiperImgs" :height="swiperHeight" paginationType="bullets"></my-swiper>
      <!-- 活动 -->
      <div class="activity-wrapper">
        <activity class="activitys">
          <img class="activitys-image" v-lazy="item" v-for="(item,index) in activitys" :key="index" />
        </activity>
      </div>
      <!-- 功能选项 -->
      <mode-options @select="select"></mode-options>
      <!-- 秒杀 -->
      <seconds :secondsData="secondsData"></seconds>
      <!-- 拼购节-->
      <activity>
        <div class="activity-pingoujie">
          <img src="@img/pinGouJie.gif" alt />
        </div>
      </activity>
      <goods :goods="goods"></goods>
    </div>
  </div>
</template>

<script>
// 引入轮播图的组件
import MySwiper from 'base/my-swiper/my-swiper'
import Activity from 'base/activity/activity'
import ModeOptions from 'components/mode-options/mode-options'
import Seconds from 'components/seconds/seconds'
import Goods from 'base/goods/goods'
import NavigationBar from 'base/navigation-bar/navigation-bar'
import Search from 'base/search/search'
import { getSwiper } from 'api/swiper'
import { getActivity } from 'api/activity'
import { getSeconds } from 'api/seconds'
import { getGoods } from 'api/goods'
import { ERR_OK } from 'api/config'
// 锚点值
const ANCHOR_SCROLL_TOP = 160
export default {
  data () {
    return {
      swiperHeight: '184px',
      // 轮播图
      swiperImgs: [],
      // 活动
      activitys: [],
      // 秒杀数据
      secondsData: [],
      // 商品列表
      goods: [],
      // 当前页面滑动值
      currentScroll: -1,
      searchStyle: {}
    }
  },
  created () {
    // 调用获取轮播图数据
    this._getSwiper()
    this._getActivity()
    this._getSeconds()
    this._getGoods()
    this.normalSearch = {
      bgColor: '#fff',
      hintColor: '#999',
      icon: require('@img/search.svg')
    }
    this.highSearch = {
      bgColor: '#777',
      hintColor: '#fff',
      icon: require('@img/search-white.svg')
    }
  },
  methods: {
    // 获取轮播图数据
    _getSwiper () {
      getSwiper().then((res) => {
        if (res.state === ERR_OK) {
          // map返回一个新的数组 这个方法可以传入一个方法,方法中定义新数组成员的后返回
          this.swiperImgs = res.data.list.map((item) => {
            return item.icon
          })
        }
      })
    },
    // 获取活动图
    _getActivity () {
      getActivity().then((res) => {
        this.activitys = res.data.list.map((item) => {
          return item.icon
        })
      })
    },
    // 获取秒杀数据
    _getSeconds () {
      getSeconds().then((res) => {
        this.secondsData = res.data.list
      })
    },
    // 获取商品列表
    _getGoods () {
      getGoods().then((res) => {
        if (res.state === ERR_OK) {
          this.goods = res.data.list
        }
      })
    },
    // 监听页面滚动事件
    onScrollChange (event) {
      this.currentScroll = event.target.scrollTop
      let opcity = 1
      opcity = this.currentScroll / ANCHOR_SCROLL_TOP
      if (opcity < 1) {
        this.$refs.leftIcon.src = require('assets/image/more-white.svg')
        this.$refs.rightIcon.src = require('assets/image/message-white.svg')
        this.searchStyle = this.normalSearch
      } else {
        this.$refs.leftIcon.src = require('assets/image/more.svg')
        this.$refs.rightIcon.src = require('assets/image/message.svg')
        this.searchStyle = this.highSearch
      }
      this.$refs.navigationBar.$el.style.background = `rgba(250, 250, 250, ${opcity})`
    },
    select (item) {
      this.$router.push({
        name: 'goodsList',
        params: {
          routerType: 'push'
        }
      })
    }
  },
  // keep-alive 的钩子 用来做一些缓存或者刷新数据之类的操作
  activated () {
    this.$refs.home.scrollTop = this.currentScroll
  },
  components: {
    MySwiper,
    Activity,
    ModeOptions,
    Seconds,
    Goods,
    NavigationBar,
    Search
  }
}
</script>

<style scoped lang="scss">
@import 'assets/css/variable.scss';
.home {
  width: 100%;
  height: 100%;
  background-color: $color-background;
  overflow: hidden;
  overflow-y: auto;
  &-content {
    height: 100%;
    .activity-wrapper {
      position: relative;
      max-height: px2rem(160);
      background-color: $color-background;
      border-top-left-radius: px2rem(8);
      border-top-right-radius: px2rem(8);
      margin-top: px2rem(-6);
      z-index: 3;
      .activitys {
        &-image {
          width: 33.33%;
        }
      }
    }
    .activity-pingoujie {
      background-color: $color-background-w;
      margin-top: px2rem(8);
      img {
        width: 100%;
      }
    }
  }
}
</style>
