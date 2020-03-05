<template>
  <div class="home">
    <div class="home-content">
      <!-- 轮播图 -->
      <my-swiper :swiperImgs="swiperImgs" :height="swiperHeight"></my-swiper>
      <!-- 活动 -->
      <div class="activity-wrapper">
        <activity class="activitys">
          <img class="activitys-image" :src="item" v-for="(item,index) in activitys" :key="index" />
        </activity>
      </div>
      <mode-options></mode-options>
      <seconds :secondsData="secondsData"></seconds>
    </div>
  </div>
</template>

<script>
// 引入轮播图的组件
import MySwiper from 'base/my-swiper/my-swiper'
import Activity from 'base/activity/activity'
import ModeOptions from 'components/mode-options/mode-options'
import Seconds from 'components/seconds/seconds'
import { getSwiper } from 'api/swiper'
import { getActivity } from 'api/activity'
import { getSeconds } from 'api/seconds'
import { ERR_OK } from 'api/config'
export default {
  data () {
    return {
      swiperHeight: '184px',
      // 轮播图
      swiperImgs: [],
      // 活动
      activitys: [],
      // 秒杀数据
      secondsData: []
    }
  },
  created () {
    // 调用获取轮播图数据
    this._getSwiper()
    this._getActivity()
    this._getSeconds()
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
    }
  },
  components: {
    MySwiper,
    Activity,
    ModeOptions,
    Seconds
  }
}
</script>

<style scoped lang="scss">
@import '~assets/css/variable.scss';
.home {
  width: 100%;
  height: 100%;
  background-color: $color-background-d;
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
  }
}
</style>
