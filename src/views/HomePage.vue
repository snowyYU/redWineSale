<template>
  <div :class="['home-page', { 'safe-padding': bottomBtnShow }]">
    <!-- 商品长图 -->
    <div class="product-image">
      <div v-for="item in 13" :key="item" class="product-image__item">
        <van-image class="product-image__inner" :src="require('../assets/img/product/long_' + item + '.jpg')" />
        <van-button v-if="item === 1" class="product-image__button" ref="buyNowBtn" @click="handleShowUserInfoBox"></van-button>
      </div>
    </div>

    <!-- 底部悬浮按钮 -->
    <transition name="van-slide-up">
      <div v-if="bottomBtnShow" class="buy-now-button bottom-fixed">
        <van-button class="buy-now-button__inner" @click="handleShowUserInfoBox">立即免费领取（{{limitTime}}截止）</van-button>
      </div>
    </transition>

    <!-- 用户信息弹窗 -->
    <user-info-box :isShow.sync="userInfoBoxShow" />
  </div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import UserInfoBox from '@/components/HomePage/UserInfoBox'

export default {
  name: 'HomePage',
  components: {
    UserInfoBox
  },
  data () {
    return {
      // 底部悬浮按钮显示状态
      bottomBtnShow: false,
      // 用户信息表单显示状态
      userInfoBoxShow: false,
      // 截止时间
      limitTime: moment(moment().add(3, 'd')).format('M月DD日')
    }
  },
  mounted () {
    /**
     * 监听滚动事件
     * _.throttle() 节流函数，100毫秒执行一次
     */
    window.onscroll = _.throttle(this.handleScrollEvent, 100)
  },
  beforeDestroy () {
    // 取消监听滚动事件
    window.onscroll = null
  },
  methods: {
    // 监听滚动条事件
    handleScrollEvent () {
      // 获取 立即领取按钮 距离顶部高度和自身高度
      let rectObject = this.$refs['buyNowBtn'].getBoundingClientRect()
      if (rectObject.top + rectObject.height < 0) {
        this.bottomBtnShow = true
      } else {
        this.bottomBtnShow = false
      }
    },
    // 显示用户信息表单事件
    handleShowUserInfoBox () {
      this.userInfoBoxShow = true
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin safe-area-padding ($size) {
  padding-bottom: calc(#{ $size } + constant(safe-area-inset-bottom));
  padding-bottom: calc(#{ $size } + env(safe-area-inset-bottom));
}

.home-page {
  &.safe-padding {
    @include safe-area-padding (147px);
  }

  .product-image {
    .product-image__item {
      position: relative;
      .product-image__inner {
        display: block;
        width: 100%;
      }
      .product-image__button {
        position: absolute;
        left: 50%;
        bottom: 40px;
        z-index: 100;
        transform: translateX(-50%);
        width: 598px;
        height: 103px;
        border: 0;
        border-radius: 103px;
        background-image: url('../assets/img/bg-buy-now-button.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
      }
    }
  }

  .buy-now-button {
    @include safe-area-padding (30px);
    padding-top: 20px;
    width: 100%;
    background-color: #fff;

    &.bottom-fixed {
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 100;
    }

    .buy-now-button__inner {
      display: block;
      width: 686px;
      height: 97px;
      margin: 0 auto;
      border: 0;
      border-radius: 97px;
      background-image: url('../assets/img/bg-buy-now-fixed-button.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100% 100%;
      font-size: 36px;
      font-family: "PingFang";
      font-weight: 500;
      color: #fff;
      line-height: 1.2;
      background-color: transparent;
    }
  }
}
</style>
