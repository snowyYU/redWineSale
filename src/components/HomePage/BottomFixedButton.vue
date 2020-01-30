<template>
  <div class="bottom-fixed-button">
    <van-button
      class="bottomBuyBtn"
      size="large"
      block
      @click="handleButtonClick"
    >立即免费领取 ({{limitTime}}截止)</van-button>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'BottomFixedButton',
  data () {
    return {
      // 截止时间
      limitTime: moment(moment().add(3, 'd')).format('MM月DD日')
    }
  },
  methods: {
    // 按钮点击事件
    handleButtonClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
$bttomFixedButtonHeight: 97px;

.bottom-fixed-button {
  width: 100%;
  height: calc(#{$bttomFixedButtonHeight} + constant(safe-area-inset-bottom));
  height: calc(#{$bttomFixedButtonHeight} + env(safe-area-inset-bottom));
  text-align: center;

  // width: 686px;
  // height: 97px;

  .bottomBuyBtn {
    display: inline-block;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 10;
    width: 686px;
    height: $bttomFixedButtonHeight;
    margin-bottom: constant(safe-area-inset-bottom);
    margin-bottom: env(safe-area-inset-bottom);
    font-size: 14px;
    background-image: url('../../assets/img/bg-buy-now-fixed-button.png');
    background-repeat: no-repeat;
    background-position: 100% 100%;
    background-size: 100% 100%;
  }
}

@media (min-width: 600px) {
  .bottomBuyBtn {
    left: calc((100% - 600px) / 2) !important;
  }
}
</style>
