<template>
  <div class="count-down">
    <span class="count-down-start">{{startHours}}点场</span>
    <span class="count-down-surplus">{{surplus | formatCountDown}}</span>
  </div>
</template>

<script>
export default {
  props: {
    startHours: {
      type: Number,
      defalut: 0
    }
  },
  data () {
    return {
      // 活动是否开始的显示
      surplus: '',
      // 相差的秒数
      diffSeconds: 0,
      interval: null
    }
  },
  created () {
    setTimeout(() => {
      this.surplusTime()
    }, 20)
  },
  methods: {
    // 获取相差的秒数
    surplusTime () {
      if (this.interval) clearInterval(this.interval)
      const date = new Date()
      const currentHour = date.getHours()
      if (this.startHours < currentHour) {
        this.surplus = '活动已经结束'
        return
      }
      if (this.startHours === currentHour) {
        this.surplus = '活动正在进行中'
        return
      }
      const diffHour = this.startHours - currentHour - 1
      const diffMinutes = 60 - date.getMinutes() - 1
      const diffSeconds = 60 - date.getSeconds()
      this.diffSeconds = diffHour * 3600 + diffMinutes * 60 + diffSeconds
      this.interval = setInterval(() => {
        this.diffSeconds -= 1
      }, 1000)
    }
  },
  watch: {
    // 监听相差描述的变化
    diffSeconds (newValue) {
      const hour = newValue / 3600 | 0
      const minutes = newValue / 60 % 60 | 0
      const seconds = newValue % 60
      this.surplus = `${hour}:${minutes}:${seconds}`
    },
    startHours () {
      this.surplusTime()
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/css/variable.scss';
.count-down {
  margin-left: px2rem(6);
  span {
    font-size: $infoFontSize;
    padding: 0 px2rem(4);
  }
  &-start {
    background-color: $color-theme;
    color: $color-text-w;
    border-top-left-radius: px2rem(6);
    border-bottom-left-radius: px2rem(6);
    border: px2rem(1) solid $color-theme;
  }
  &-surplus {
    background-color: $color-background-w;
    color: $color-theme;
    border-top-right-radius: px2rem(6);
    border-bottom-right-radius: px2rem(6);
    border: px2rem(1) solid $color-theme;
  }
}
</style>
