<template>
  <van-overlay :show="isShow" :class-name="className" :z-index="zIndex">
    <van-loading v-if="!this.globalOverlayData.isTransparent" class="global-overlay__loading" color="#1989fa">加载中...</van-loading>
  </van-overlay>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'GlobalOverlay',
  data () {
    return {
      zIndex: 9999
    }
  },
  computed: {
    ...mapState(['globalOverlayData']),
    isShow () {
      return this.globalOverlayData.isShow
    },
    className () {
      if (this.globalOverlayData.isTransparent) {
        return 'global-overlay transparent'
      }
      return 'global-overlay'
    }
  },
  watch: {
    globalOverlayShow (val) {
      if (val) {
        document.querySelector('body').classList.add('van-overflow-hidden')
      } else {
        document.querySelector('body').classList.remove('van-overflow-hidden')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.global-overlay {

  &.transparent {
    background-color: transparent;
  }

  .global-overlay__loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    .van-loading__text {
      // color: #fff;
    }
  }
}
</style>
