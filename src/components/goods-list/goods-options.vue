<template>
  <div class="options">
    <ul class="options-content">
      <li
        class="options-content-item"
        v-for="(item,index) in optionsData"
        :key="index"
        @click="selectItem(item,index)"
      >
        <span
          class="options-content-item-text"
          :class="{'active' : item.id === selectOptions.id}"
        >{{item.name}}</span>
        <span
          class="options-content-item-icon"
          v-show="item.subs.length"
          :class="{'open' : isShowSubContent,'close': !isShowSubContent}"
        ></span>
      </li>
    </ul>
    <transition name="options-subs-content-show">
      <div class="options-subs-content" v-show="isShowSubContent">
        <ul>
          <li
            class="options-subs-content-item"
            v-for="(item,index) in selectOptions.subs"
            :key="index"
            @click="subsClick(item,index)"
            :class="{'active': item.id===selectOptions.id}"
          >
            <span class="options-subs-content-item-text">{{item.name}}</span>
            <img
              class="options-subs-content-item-icon"
              src="@img/options-select.svg"
              v-show=" item.id===selectOptions.id"
            />
          </li>
        </ul>
      </div>
    </transition>
    <div class="options-cover" v-show="isShowSubContent" @click="isShowSubContent = false"></div>
  </div>
</template>

<script>
export default {
  created () {
    this.optionsData = [{
      id: '1',
      name: '默认',
      subs: [{
        id: '1',
        name: '默认'
      }, {
        id: '1-2',
        name: '价格由高到低'
      }, {
        id: '1-3',
        name: '价格由低到高'
      }, {
        id: '1-4',
        name: '销量高到低'
      }]
    }, {
      id: '2',
      name: '有货优先',
      subs: []
    }, {
      id: '3',
      name: '直营优先',
      subs: []
    }]
  },
  data () {
    return {
      // 子选项
      selectOptions: {
        id: '1'
      },
      // 子选项框是否展开
      isShowSubContent: false
    }
  },
  methods: {
    selectItem (item, index) {
      // 如果有子选项内容那么才控制子选项是否显示
      if (item.subs.length) {
        // 避免第一次点击时不显示子选项框
        this.isShowSubContent = !this.isShowSubContent
      } else {
        // 没有子选项当点击到选项卡时隐藏子选项框
        this.isShowSubContent = false
      }
      // 对象赋值 把optionsData数组内的选中对象赋值给了selectOptions  修改selectOptions就会修改原item值
      this.selectOptions = item
      this.$emit('select', item, index)
    },
    // 点击子选项框的事件
    subsClick (item, index) {
      // 将选中选项名称置顶到一级选项
      this.selectOptions.id = item.id
      this.selectOptions.name = item.name
      this.$emit('subsClick', item, index)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/css/variable.scss';
@import 'assets/css/mixin.scss';
.options {
  width: 100%;
  z-index: 2;
  border-bottom: px2rem(1) solid $color-line;
  &-content {
    display: flex;
    width: 100%;
    height: px2rem(46);
    background-color: $color-background-w;
    align-items: center;
    &-item {
      flex: 1;
      display: flex;
      height: 100%;
      justify-content: center;
      align-items: center;
      &-text {
        font-size: $mInfoFontSize;
        margin-right: px2rem(6);
      }
      &-icon {
        @include triangle();
        &.open {
          transition: all 0.3s;
          transform: rotate(-180deg);
        }
        &.close {
          transition: all 0.3s;
          transform: rotate(0, 0, 0);
        }
      }
    }
  }
  &-subs-content {
    position: absolute;
    max-height: px2rem(140);
    overflow: hidden;
    overflow-y: auto;
    width: 100%;
    z-index: 2;
    background-color: $color-background-w;
    &-item {
      display: flex;
      align-items: center;
      width: 100%;
      border-top: px2rem(1) solid $color-line;
      padding: px2rem(8);
      height: px2rem(44);
      box-sizing: border-box;
      &-text {
        font-size: $infoFontSize;
        flex: 1;
      }
      &-icon {
        width: px2rem(18);
        height: px2rem(18);
      }
    }
    &-show-enter-active {
      animation: show 0.3s linear;
    }
    &-show-leave-active {
      animation: close 0.3s linear;
    }
  }
  &-cover {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: $color-background-dd;
    opacity: 0.5;
  }
  .active {
    color: $color-theme;
  }
  @keyframes show {
    100% {
      max-height: px2rem(140);
    }
    0% {
      max-height: 0;
    }
  }
  @keyframes close {
    0% {
      max-height: x2rem(140);
    }
    100% {
      max-height: 0;
    }
  }
}
</style>