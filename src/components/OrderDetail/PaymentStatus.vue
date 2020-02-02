<template>
  <div class="payment-status">
    <div class="payment-status__username">张三（18601919665）</div>
    <div class="payment-status__success" v-if="isPaid">
      <div class="success-icon"></div>
      <div class="success-text">您已成功领取和平鸽干红葡萄酒！</div>
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
export default {
  name: 'PaymentStatus',
  props: {
    isPaid: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 按钮点击事件
    handleButtonClick () {

    }
  }
}
</script>

<style lang="scss" scoped>
.payment-status {

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

    .success-icon {
      margin: 0 auto;
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
      text-align: center;
    }

    .success-tips {
      padding-bottom: 49px;
      font-size: 22px;
      color: #c3c3c3;
      line-height: 1;
      text-align: center;
    }
  }

  .payment-status__loading {
    padding-top: 18px;

    .loading-icon {
      margin: 0 auto;
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
      text-align: center;
    }

    .payment-status__tips {
      padding: 19px 0 27px;
      font-size: 24px;
      color: #ccc;
      line-height: 1;
      text-align: center;
    }
  }

  .payment-status__button {
    display: block;
    margin: 0 auto;
    border: 0;
    border-radius: 20px;
    width: 628px;
    height: 80px;
    font-size: 0;
    line-height: unset;

    .van-button__text {
      font-size: 34px;
      color: #fff;
    }
  }
}

@keyframes animation-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
