<template>
  <van-popup
    class="user-info-box"
    v-model="isShow"
    closeable
    round
    close-on-popstate
    safe-area-inset-bottom
    position="bottom"
    close-icon="clear"
    :close-on-click-overlay="false"
    @closed="handlePopUpClosed"
  >
    <!-- 标题 -->
    <div class="user-info-box__title">填写收货信息，免费领取红酒</div>

    <!-- 提示文字和进度条 -->
    <div class="user-info-box__progress">
      <!-- 提示文字 -->
      <div class="progress-tips">
        <span class="progress-tips__lable">免费领取名额仅剩：</span>
        <span class="progress-tips__value">{{remain}}%</span>
      </div>

      <!-- 进度条 -->
      <progress-bar :percentage="animatedNumber" />
    </div>

    <!-- 用户信息表单 -->
    <userInfoForm ref="user-info-form" getContainer=".home-page" />

    <!-- 底部提交栏 -->
    <submit-bar :original="localData.original" :price="localData.price" @submit="onSubmit"/>
  </van-popup>
</template>

<script>
import { TimelineLite } from 'gsap'
import { list } from '@/utils/localData'
import userInfoForm from '@/components/common/userInfoForm'
import ProgressBar from '@/components/HomePage/ProgressBar'
import SubmitBar from '@/components/HomePage/SubmitBar'

export default {
  name: 'test',
  components: {
    userInfoForm,
    ProgressBar,
    SubmitBar
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // 加载状态
      loading: false,
      // 进度
      percentage: 0,
      localData: list[0]
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
    },
    animatedNumber () {
      return Math.ceil(this.percentage)
    },
    remain () {
      return 100 - this.animatedNumber
    }
  },
  watch: {
    show (val) {
      if (val) {
        const timeline = new TimelineLite()
        timeline.to(this.$data, 2, { percentage: 95 })
      }
    }
  },
  methods: {
    // 用户信息弹窗关闭后回调
    handlePopUpClosed () {
      this.percentage = 0
      this.$refs['user-info-form'].formData = {
        name: '',
        phone: '',
        area: '',
        address: ''
      }
    },
    // 提交表单
    onSubmit () {
      this.$refs['user-info-form'].onSubmit()
    }
  }
}
</script>

<style lang="scss" scoped>
.user-info-box::v-deep {
  user-select: none;
  overflow-x: hidden;

  .van-popup__close-icon {
    font-size: 30px;
    color: #ccc;
  }

  .van-popup__close-icon--top-right {
    top: 30px;
    right: 30px;
  }

  .user-info-box__title {
    height: 90px;
    font-size: 34px;
    color: #333;
    text-align: center;
    line-height: 90px;
  }

  .user-info-box__progress {
    margin-top: 2px;
    margin-bottom: 40px;

    .progress-tips {
      margin-bottom: 8px;
      font-size: 0;
      text-align: center;

      .progress-tips__lable {
        display: inline-block;
        font-size: 19.95px;
        color: #333;
        line-height: 1;
      }

      .progress-tips__value {
        display: inline-block;
        font-size: 30.83px;
        color: #d62435;
        line-height: 1;
      }
    }

    .progress-bar {
      margin: 0 auto;
      width: 451px;
    }
  }

  .user-info-form {
    padding: 0 36px 33px;

    .van-field {
      border-radius: 9px;
      background-color: #f2f2f2;
      font-size: 0;
      line-height: normal;

      &.van-cell--clickable:active {
        background-color: rgba(0, 0, 0, .1);
      }

      &:not(:last-child) {
        margin-bottom: 36px;
        padding: 0 27px;
        height: 75px;
      }

      .van-field__label {
        width: 128px;

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
        padding: 17px 27px;
      }
    }
  }
}

@media (min-width: 750px) {
  .user-info-box::v-deep {
    max-width: 750px;
    left: calc((100% - 750px) / 2);

    .van-popup__close-icon {
      font-size: 30px;
    }

    .van-popup__close-icon--top-right {
      top: 30px;
      right: 30px;
    }

    .user-info-box__title {
      height: 90px;
      font-size: 34px;
      line-height: 90px;
    }

    .user-info-box__progress {
      margin-top: 2px;
      margin-bottom: 40px;

      .progress-tips {
        margin-bottom: 8px;

        .progress-tips__lable {
          font-size: 19.95px;
        }

        .progress-tips__value {
          font-size: 30.83px;
        }
      }

      .progress-bar {
        width: 451px;
      }
    }

    .user-info-form {
      padding: 0 36px 33px;

      .van-field {
        border-radius: 9px;

        &:not(:last-child) {
          margin-bottom: 36px;
          padding: 0 27px;
          height: 75px;
        }

        .van-field__label {
          width: 128px;

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

        &.textarea {
          padding: 17px 27px;

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
