<template>
  <div class="homeBackground">
    <img src="../assets/img/home.png" />

    <van-button class="oneBuyBtn" ref="buyBtn" round @click="handleShowUserInfoBox">
      <span class="text">立即免费领酒！</span>
      <span class="remark">每人限领1瓶</span>
    </van-button>

    <!-- 必须放在文档流最底部 -->
    <bottom-fixed-button v-show="bottomBtnShow" @click="handleShowUserInfoBox" />

    <user-info-box :isShow.sync="userInfoBoxShow" />
  </div>
</template>

<script>
import _ from 'lodash'
import UserInfoBox from '@/components/HomePage/UserInfoBox'
import BottomFixedButton from '@/components/HomePage/BottomFixedButton'

export default {
  name: '',
  components: {
    UserInfoBox,
    BottomFixedButton
  },
  data () {
    return {
      // 底部悬浮按钮显示状态
      bottomBtnShow: false,
      // 用户信息表单显示状态
      userInfoBoxShow: false
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
      let rectObject = this.$refs['buyBtn'].getBoundingClientRect()
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

<style lang = "scss" scoped>
/* .homeBackground{
    background-image: url(../assets/img/home.png);
    background-position: center center;
    background-repeat: no-repeat;
  } */
.homeBackground {
  position: relative;
  margin: 0 auto;
  max-width: 600px;

  img {
    width: 100vw;
    max-width: 600px;
  }

  .oneBuyBtn {
    position: absolute;
    top: 430px;
    left: 50%;
    z-index: 100;
    transform: translate(-50%, 0);
    width: 75%;
    height: 50px;
    border-color: #747474;
    background-color: #626262;

    .text {
      display: block;
      margin-bottom: 8px;
      font-size: 16px;
      text-align: center;
      line-height: 1;
      color: #fff;
    }

    .remark {
      display: block;
      font-size: 12px;
      text-align: center;
      line-height: 1;
      color: #fff;
    }
  }

  .sellProgress {
    padding: 10px 20px;
  }

  .van-progress__pivot {
    z-index: 100;
  }
}
</style>
