<template>
  <van-popup
    class="address-edit-box"
    v-model="isShow"
    closeable
    close-icon="clear"
    safe-area-inset-bottom
    :get-container="getContainer"
  >
    <!-- 标题 -->
    <div class="address-edit-box__title">修改收货地址</div>

    <!-- 用户信息表单 -->
    <userInfoForm ref="user-info-form" :getContainer="getContainer" />

    <!-- 确认按钮 -->
    <van-button text="确认修改" color="#d62435" :loading="loading" loading-text="加载中..." @click="onConfirm" />
  </van-popup>
</template>

<script>
import { mapActions } from 'vuex'
import { setUserInfo } from '@/utils'
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
    },
    getContainer: {
      type: String,
      default: 'body'
    }
  },
  data () {
    return {
      // 加载状态
      loading: false
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
  watch: {
    show (val) {
      if (val) {
        this.$refs['user-info-form'].initForm()
      }
    }
  },
  methods: {
    ...mapActions(['updateUserInfo']),
    // 确认修改
    onConfirm () {
      this.loading = true
      this.$refs['user-info-form'].onSubmit().then(res => {
        // 存储用户信息
        setUserInfo(res)
        this.updateUserInfo(res)

        // 跳转
        this.$router.push({ name: 'get-red-wine' })
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        this.loading = false
      })
    }
  },
  mounted () {
    this.$refs['user-info-form'].initForm()
  }
}
</script>

<style lang="scss" scoped>
.address-edit-box::v-deep {
  padding-bottom: 28px;
  width: 660px;
  border-radius: 14px 14px 0 0;
  overflow-x: hidden;
  user-select: none;

  .van-popup__close-icon {
    font-size: 30px;
    color: #ccc;
  }

  .van-popup__close-icon--top-right {
    top: 25px;
    right: 30px;
  }

  .address-edit-box__title {
    height: 80px;
    font-size: 34px;
    color: #333;
    text-align: center;
    line-height: 80px;
  }

  .van-button {
    display: block;
    margin: 38px auto 0;
    width: 408px;
    height: 80px;
    border: 0;
    border-radius: 20px;
    font-size: 0;
    line-height: normal;

    .van-button__text {
      font-size: 32px;
      color: #f5f5f5;
    }
  }

  .user-info-form {
    padding: 0 32px;

    .van-field {
      border-radius: 8px;
      background-color: #f2f2f2;
      font-size: 0;
      line-height: normal;

      &.van-cell--clickable:active {
        background-color: rgba(0, 0, 0, .1);
      }

      &:not(:last-child) {
        margin-bottom: 32px;
        padding: 0 15px;
        height: 65px;
      }

      .van-field__label {
        width: 130px;

        span {
          font-size: 26px;
          color: #333;
        }
      }

      .van-cell__value {

        .van-field__body {

          .van-field__control {
            font-size: 26px;
          }
        }
      }

      &.textarea {
        padding: 21px 15px;
      }
    }
  }
}

@media (min-width: 750px) {
  .address-edit-box::v-deep {
    padding-bottom: 28px;
    width: 660px;
    border-radius: 14px 14px 0 0;

    .van-popup__close-icon {
      font-size: 30px;
    }

    .van-popup__close-icon--top-right {
      top: 25px;
      right: 30px;
    }

    .address-edit-box__title {
      height: 80px;
      font-size: 34px;
      line-height: 80px;
    }

    .van-button {
      margin: 38px auto 0;
      width: 408px;
      height: 80px;
      border-radius: 20px;

      .van-button__text {
        font-size: 32px;
      }
    }

    .user-info-form {
      padding: 0 32px;

      .van-field {
        border-radius: 8px;

        &:not(:last-child) {
          margin-bottom: 32px;
          padding: 0 15px;
          height: 65px;
        }

        .van-field__label {
          width: 130px;

          span {
            font-size: 26px;
            color: #333;
          }
        }

        .van-cell__value {

          .van-field__body {

            .van-field__control {
              font-size: 26px;
            }
          }
        }

        &.textarea {
          padding: 21px 15px;

          .van-cell__value {

            .van-field__body {

              .van-field__control {
                min-height: 120px;
              }
            }
          }
        }
      }
    }
  }
}
</style>