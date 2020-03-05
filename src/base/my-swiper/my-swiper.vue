<template>
  <swiper :options="swiperOptions" v-if="swiperImgs.length">
    <swiper-slide v-for="(item,index) in swiperImgs" :key="index">
      <img :src="item" class="swiper-slide-img" :style="{height:swiperHeight }" />
    </swiper-slide>
    <!-- 通过插槽的方式添加分页器 -->
    <template #pagination>
      <div class="swiper-pagination"></div>
    </template>
  </swiper>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  props: {
    // 是否自动播放
    autoplay: {
      // 接收一个对象类型的数据
      type: Object,
      default () {
        return {
          // 默认轮播图间隔时间3秒
          delay: 3000,
          // 点击轮播图后还会自动播放
          disableOnInteraction: false,
          // 当切换到最后一个slide时不停止自动切换
          stopOnLastSlide: false
        }
      }
    },
    // 高度是否自适应
    autoHeight: {
      type: Boolean,
      default: true
    },
    // 轮播图的高度
    swiperHeight: {
      type: String,
      default: 'auto'
    },
    // 设置循环播放
    loop: {
      type: Boolean,
      default: true
    },
    // 图片数据源
    swiperImgs: {
      type: Array,
      // 必须传入的属性
      required: true,
      deafult () {
        return []
      }
    }
  },
  data () {
    return {
      // swiper 配置
      swiperOptions: {
        // 自动滚动
        autoplay: this.autoplay,
        // swiper高度跟随slide高度变化
        autoHeight: this.autoHeight,
        // 循环播放
        loop: this.loop,
        // 分页器设置效果
        pagination: {
          // 分页器对应的html元素
          el: '.swiper-pagination',
          // 分页器样式
          type: 'bullets',
          // // 分页器内的元素
          bulletClass: 'my-bullet'
        }
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style lang="scss">
@import '~assets/css/variable.scss';
.swiper-slide-img {
  width: 100%;
}
.swiper-pagination {
  bottom: px2rem(12);
  .my-bullet {
    box-sizing: border-box;
    display: inline-block;
    width: px2rem(8);
    height: px2rem(8);
    margin: 0 px2rem(4);
    border: px2rem(1) solid $color-background;
    border-radius: 50%;
    opacity: 1;
  }
  &-bullet-active {
    background-color: $color-background;
  }
}
</style>
