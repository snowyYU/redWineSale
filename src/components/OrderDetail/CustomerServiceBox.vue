<template>
  <van-popup class="customer-service-box" v-model="isShow" round closeable close-icon="clear" safe-area-inset-bottom>
    <div class="customer-service-box__title">客服经理电话</div>
    <div class="customer-service-box__icon"></div>
    <div class="customer-service-box__phone">{{customerServicePhone}}</div>
    <a class="call-button" :href="'tel:' + customerServicePhone">
      <van-button text="立即拨打" color="#d62435" />
    </a>
  </van-popup>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CustomerServiceBox',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState(['customerServicePhone']),
    isShow: {
      get () {
        return this.show
      },
      set (val) {
        this.$emit('update:show', false)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.customer-service-box::v-deep {
  padding-bottom: 44px;
  width: 512px;
  overflow: hidden;

  .van-icon {

    &.van-popup__close-icon {
      font-size: 30px;
      color: #ccc;
    }

    &.van-popup__close-icon--top-right {
      top: 30px;
      right: 30px;
    }
  }

  .customer-service-box__title {
    padding: 28px 0;
    font-size: 34px;
    color: #333;
    text-align: center;
    line-height: 1;
    cursor: default;
    user-select: none;
  }

  .customer-service-box__icon {
    margin: 60px auto 16px;
    width: 96px;
    height: 95px;
    background-color: transparent;
    background-image: url('../../assets/img/icon-phone.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
  }

  .customer-service-box__phone {
    margin-bottom: 90px;
    font-size: 34px;
    color: #333;
    text-align: center;
    line-height: 1;
  }

  .call-button {
    .van-button {
      display: block;
      margin: 0 auto;
      width: 408px;
      height: 80px;
      border-radius: 20px;
      border: 0;
      font-size: 0;
      line-height: unset;

      .van-button__text {
        font-size: 34px;
        color: #fff;
      }
    }
  }
}
</style>
