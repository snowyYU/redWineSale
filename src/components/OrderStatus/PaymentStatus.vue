<template>
  <div class="payment-status">
    <div class="payment-status__username">{{username}}（{{phone}}）</div>
    <div class="payment-status__success" v-if="isPaid">
      <div class="success-icon"></div>
      <div class="success-text">您已成功领取{{name}}！</div>
      <div class="success-tips">红酒付款后预计24小时内发货，请耐心等待</div>
      <van-button class="payment-status__button" text="继续购买（回首页）" color="#d62435" @click="handleButtonClick"></van-button>
    </div>
    <div class="payment-status__loading" v-else>
      <div class="loading-icon"></div>
      <div class="loading-text">正在支付中，请稍后...</div>
      <van-button class="payment-status__button" text="刷新支付情况" color="#d62435" @click="handleButtonClick"></van-button>
      <div class="payment-status__tips">若多次刷新无反应，请电话联系客服</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PaymentStatus',
  props: {
    isPaid: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState(['localData', 'userInfo']),
    name () {
      return this.localData.name
    },
    username () {
      if (this.userInfo.name && this.userInfo.name.length > 5) {
        return this.userInfo.name.substr(0, 5) + '...'
      }
      return this.userInfo.name || ''
    },
    phone () {
      return this.userInfo.phone
    }
  },
  methods: {
    // 按钮点击事件
    handleButtonClick () {
      if (this.isPaid) {
        // 已支付
        this.$router.push({ name: 'home-page' })
      } else {
        // 刷新支付状态
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes animation-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.payment-status {
  overflow: hidden;
  user-select: none;

  .payment-status__username {
    height: 60px;
    font-size: 26px;
    color: #b3b3b3;
    line-height: 60px;
    text-align: center;
  }

  .payment-status__success {
    padding-top: 35px;
    padding-bottom: 33px;
    font-size: 0;
    text-align: center;

    .success-icon {
      display: inline-block;
      width: 96px;
      height: 96px;
      background-image: url('../../assets/img/success-icon.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100% 100%;
    }

    .success-text {
      padding-top: 20px;
      padding-bottom: 10px;
      font-size: 26px;
      color: #333;
      line-height: 1;
    }

    .success-tips {
      padding-bottom: 49px;
      font-size: 22px;
      color: #c3c3c3;
      line-height: 1;
    }
  }

  .payment-status__loading {
    padding-top: 18px;
    font-size: 0;
    text-align: center;

    .loading-icon {
      display: inline-block;
      width: 113px;
      height: 113px;
      background-image: url('../../assets/img/loading-icon.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100% 100%;
      animation: animation-rotate 1s linear 0s infinite;
    }

    .loading-text {
      padding: 20px 0 24px;
      font-size: 26px;
      color: #333;
      line-height: 1;
    }

    .payment-status__tips {
      padding: 19px 0 27px;
      font-size: 24px;
      color: #ccc;
      line-height: 1;
    }
  }

  .payment-status__button {
    display: inline-block;
    border: 0;
    border-radius: 20px;
    width: 628px;
    height: 80px;
    font-size: 0;
    line-height: normal;

    .van-button__text {
      font-size: 34px;
      color: #fff;
    }
  }
}

@media (min-width: 750px) {
  .payment-status {

    .payment-status__username {
      height: 60px;
      font-size: 26px;
      line-height: 60px;
    }

    .payment-status__success {
      padding-top: 35px;
      padding-bottom: 33px;

      .success-icon {
        width: 96px;
        height: 96px;
      }

      .success-text {
        padding-top: 20px;
        padding-bottom: 10px;
        font-size: 26px;
      }

      .success-tips {
        padding-bottom: 49px;
        font-size: 22px;
      }
    }

    .payment-status__loading {
      padding-top: 18px;

      .loading-icon {
        width: 113px;
        height: 113px;
      }

      .loading-text {
        padding: 20px 0 24px;
        font-size: 26px;
      }

      .payment-status__tips {
        padding: 19px 0 27px;
        font-size: 24px;
      }
    }

    .payment-status__button {
      border-radius: 20px;
      width: 628px;
      height: 80px;

      .van-button__text {
        font-size: 34px;
      }
    }
  }
}
</style>
