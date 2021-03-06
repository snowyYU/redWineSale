<template>
  <div class="home-page">
    <!-- 商品长图 -->
    <div class="product-image">
      <div class="product-image__item">
        <van-image class="product-image__inner" :src="require('../assets/img/product/long_1.jpg')" />
        <van-button class="product-image__button" ref="buyNowBtn" @click="handleShowUserInfoBox">
          <span class="text">立即免费领酒</span>
          <span class="tips">每人限领1瓶</span>
        </van-button>
      </div>
      <van-image class="product-image__inner" :src="require('../assets/img/product/long_2.jpg')" />
      <div class="product-image__item">
        <van-image class="product-image__inner" :src="require('../assets/img/product/long_3.jpg')" />
        <van-button class="product-image__button2" @click="handleShowUserInfoBox" />
      </div>
      <van-image v-for="item in 11" :key="item" class="product-image__inner" :src="require('../assets/img/product/long_' + (item + 3) + '.jpg')" lazy-load />
    </div>

    <!-- 底部悬浮按钮 -->
    <transition name="van-slide-up">
      <van-submit-bar v-show="bottomBtnShow" class="bottom-fixed-button" :button-text="buttonText" button-type="default" safe-area-inset-bottom @submit="handleShowUserInfoBox" />
    </transition>

    <!-- 用户信息弹窗 -->
    <user-info-box :show.sync="userInfoBoxShow" />
  </div>
</template>

<script>
import _ from 'lodash'
import { alipayAuth, wechatAuth, getUrl, setToken, getToken, buildToken } from '@/utils'
import { getTokenByCode } from '@/api'
import { mapState, mapActions } from 'vuex'
import UserInfoBox from '@/components/HomePage/UserInfoBox'

export default {
  name: 'home-page',
  components: {
    UserInfoBox
  },
  data () {
    return {
      // 底部悬浮按钮显示状态
      bottomBtnShow: false,
      // 用户信息表单显示状态
      userInfoBoxShow: false
    }
  },
  computed: {
    ...mapState(['localData', 'clientEvn']),
    buttonText () {
      return '立即免费领取（' + this.localData.limitTime + '截止）'
    }
  },
  mounted () {
    /**
     * 监听滚动事件
     * _.throttle() 节流函数，100毫秒执行一次
     */
    window.onscroll = _.throttle(this.handleScrollEvent, 100)

    // 已登录跳过后面步骤
    if (!_.isEmpty(getToken())) {
      return
    }

    if (_.isEmpty(this.$route.query)) {
      // url不带参数（未获取code）
      // 如果不在H5环境下，就跳转授权；如果在H5环境下，拿时间戳生成一个Token
      if (this.clientEvn > 0) {
        this.getCode()
      } else {
        const token = buildToken()
        setToken(token)

        // 保存用户访问记录接口
        this.saveRecord(token)
      }
    } else {
      // url带参数（已获取code）
      // 如果不在H5环境下，就拿code获取token；如果在H5环境下，拿时间戳生成一个Token
      if (this.clientEvn > 0 && this.$route.query.code) {
        this.getTokenByCode(this.$route.query.code, this.clientEvn)
      } else {
        const token = buildToken()
        setToken(token)

        // 保存用户访问记录接口
        this.saveRecord(token)
      }
    }
  },
  beforeDestroy () {
    // 取消监听滚动事件
    window.onscroll = null
  },
  methods: {
    ...mapActions(['saveVisitRecord']),
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

    // 判断客户端环境获取用户code
    getCode () {
      switch (this.clientEvn) {
        case 1:
          // 微信环境
          wechatAuth(this.localData.wxAppId, getUrl(), 'code', 'snsapi_base')
          break
        case 2:
          // 支付宝环境
          alipayAuth(this.localData.aliAppId, 'auth_base', getUrl())
          break
      }
    },

    // 获取Token
    getTokenByCode (code, type) {
      getTokenByCode({ code, type }).then(res => {
        if (res.data.code === 200) {
          const { token } = res.data.body
          setToken(token)

          // 保存用户访问记录
          this.saveRecord(token)
        } else {
          console.error('网络错误')
        }
      }).catch(() => console.error('网络错误'))
    },

    // 保存用户访问记录
    saveRecord (token) {
      let data = {
        visitType: '1',
        type: this.clientEvn,
        token,
        channel: 'doumeng',
        subChannel: 'doumenghj1'
      }
      this.saveVisitRecord({ data })
    },

    // 显示用户信息表单事件
    handleShowUserInfoBox () {
      _ai_analysis()
      this.userInfoBoxShow = true
    }
  }
}
</script>

<style lang="scss" scoped>
.home-page {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);

  .product-image {
    user-select: none;

    .product-image__item {
      position: relative;
      overflow: hidden;

      .product-image__button {
        display: block;
        position: absolute;
        left: 50%;
        bottom: 40px;
        z-index: 10;
        transform: translateX(-50%);
        border: 0;
        width: 598px;
        height: 103px;
        border-radius: 103px;
        font-size: 0;
        line-height: normal;
        background-image: url('../assets/img/bg-buy-now-button.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
        box-shadow: 0px 0px 7px 0px rgba(146, 7, 7, 0.75);
        overflow: hidden;

        .van-button__text {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;

          .text {
            display: inline-block;
            margin-top: 18px;
            margin-bottom: 17px;
            font-size: 34px;
            color: #a21a1a;
            line-height: 1;
            text-shadow: 0px 0px 3.84px rgba(236, 209, 84, 0.75);
          }

          .tips {
            display: inline-block;
            font-size: 22px;
            color: #a21a1a;
            line-height: 1;
          }
        }
      }

      .product-image__button2 {
        display: block;
        position: absolute;
        right: 31px;
        bottom: 16px;
        z-index: 10;
        width: 202px;
        height: 163px;
        border: 0;
        background-image: url('../assets/img/get-free.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
        background-color: transparent;
        overflow: hidden;

        &.van-button:active::before {
          opacity: 0;
        }
      }
    }

    .product-image__inner {
      display: block;
    }
  }

  .bottom-fixed-button {

    .van-submit-bar__bar {
      justify-content: flex-start;
      align-items: flex-start;
      padding: 20px 32px 0;
      height: 148px;
      font-size: 0;

      .van-button {
        display: block;
        width: 100%;
        height: 97px;
        border-radius: 97px;
        font-size: 0;
        line-height: normal;
        background-color: transparent;
        background-image: url('../assets/img/bg-buy-now-fixed-button.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;

        .van-button__text {
          font-size: 36px;
          color: #fff;
        }
      }
    }
  }
}

@media (min-width: 750px) {
  .home-page {
    margin: 0 auto;
    max-width: 750px;

    .product-image {

      .product-image__item {

        .product-image__button {
          bottom: 40px;
          width: 598px;
          height: 103px;
          border-radius: 103px;
          box-shadow: 0px 0px 7px 0px rgba(146, 7, 7, 0.75);

          .van-button__text {

            .text {
              margin-top: 18px;
              margin-bottom: 17px;
              font-size: 34px;
              text-shadow: 0px 0px 3.84px rgba(236, 209, 84, 0.75);
            }

            .tips {
              font-size: 22px;
            }
          }
        }

        .product-image__button2 {
          right: 31px;
          bottom: 16px;
          width: 202px;
          height: 163px;
        }
      }
    }

    .bottom-fixed-button {
      max-width: 750px;
      left: calc((100% - 750px) / 2);

      .van-submit-bar__bar {
        padding: 20px 32px 0;
        height: 148px;

        .van-button {
          height: 97px;
          border-radius: 97px;

          .van-button__text {
            font-size: 36px;
          }
        }
      }
    }
  }
}
</style>
