<template>
  <div class="bottom-fixed-button">
    <van-button
      class="bottomBuyBtn"
      color="#333333"
      size="large"
      block
      @click="handleButtonClick"
    >立即免费领取 ({{limitTime}}截止)</van-button>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: '',
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
$bttomFixedButtonHeight: 50px;

.bottom-fixed-button {
  width: 100%;
  max-width: 600px;
  height: calc(#{$bttomFixedButtonHeight} + constant(safe-area-inset-bottom));
  height: calc(#{$bttomFixedButtonHeight} + env(safe-area-inset-bottom));

  .bottomBuyBtn {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 10;
    width: 100%;
    max-width: 600px;
    height: $bttomFixedButtonHeight;
    margin-bottom: constant(safe-area-inset-bottom);
    margin-bottom: env(safe-area-inset-bottom);
    font-size: 14px;
  }
}

@media (min-width: 600px) {
  .bottomBuyBtn {
    left: calc((100% - 600px) / 2) !important;
  }
}
</style>
