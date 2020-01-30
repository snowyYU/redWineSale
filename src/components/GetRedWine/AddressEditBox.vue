<template>
  <van-popup class="address-edit-box" v-model="isShow" closeable close-icon="clear">
    <div class="address-edit-box__title">修改收获地址</div>
    <userInfoForm />
    <van-button text="确认修改" color="#d62435" @click="onConfirm" />
  </van-popup>
</template>

<script>
import userInfoForm from '@/components/common/userInfoForm'

export default {
  name: 'AddressEditBox',
  components: {
    userInfoForm
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  },
  computed: {
    isShow: {
      get () {
        return this.show
      },
      set () {
        this.$emit('update:show', false)
      }
    }
  },
  methods: {
    // 确认修改
    onConfirm () {

    }
  }
}
</script>

<style lang="scss" scoped>
.address-edit-box::v-deep {
  padding-bottom: 28px;
  width: 660px;
  border-radius: 14px 14px 0 0;

  .address-edit-box__title {
    height: 80px;
    font-size: 34px;
    color: #333;
    text-align: center;
    line-height: 80px;
  }

  .van-button {
    display: block;
    margin: 0 auto;
    width: 408px;
    height: 80px;
    border: 0;
    border-radius: 20px;
    line-height: 80px;

    .van-button__text {
      font-size: 32px;
      color: #f5f5f5;
    }
  }

  .van-icon {

    &.van-popup__close-icon--top-right {
      top: 25px;
      right: 30px;
      font-size: 30px;
      color: #ccc;
    }
  }
}

.user-info-form::v-deep {
  margin-bottom: 38px;
  padding: 0 32px;

  .van-field {
    padding: 0 15px;
    border-radius: 8px;
    background-color: #f2f2f2;

    &:not(:last-child) {
      height: 65px;
      margin-bottom: 30px;

      .van-field__label {
        span {
          line-height: 65px;
        }
      }
    }

    &:last-child {
      padding: 18px 15px;

      .van-field__label {
        span {
          display: inline-block;
          line-height: 1.2;
        }
      }

      .van-cell__value {
        .van-field__body {
          .van-field__control {
            height: 114px;
            line-height: 1.2;
          }
        }
      }
    }

    &.van-cell--clickable:active {
      background-color: rgba(0, 0, 0, .1);
    }

    .van-field__label {
      width: 145px;
      span {
        font-size: 26px;
      }
    }

    .van-cell__value {
      .van-field__body {
        .van-field__control {
          font-size: 26px;
        }
      }
    }
  }
}
</style>
