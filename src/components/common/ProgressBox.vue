<template>
<div>
  <van-popup class="progress-box" v-model="isShow" :close-on-click-overlay="false" safe-area-inset-bottom>
    <div class="progress-box__title">当前进度</div>
    <div class="progress-box__content">
      <div class="tips-text" color-3><span color-red>19551</span>人正在申请免费领取红酒</div>
      <div class="progress-text" color-red>5%</div>
      <div class="limit-text" color-3>今日仅剩名额</div>
    </div>
    <div class="progress-box__button">
      <van-button text="放弃领取" @click="onCancel" />
      <van-button text="确认支付" color="#d62435" @click="onConfirm" />
    </div>
  </van-popup>
</div>

</template>

<script>
export default {
  name: 'ProgressBox',
  props: {
    show: {
      type: Boolean,
      default: false
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
    // 取消
    onCancel () {
      this.$emit('cancel')
      this.$emit('update:show', false)
    },
    // 确认
    onConfirm () {
      this.$emit('confirm')
    }
  }
}
</script>

<style lang="scss" scoped>
.progress-box {
  width: 660px;
  padding-bottom: 28px;
  border-radius: 14px 14px 0 0;

  .progress-box__title {
    padding: 20px 0;
    font-size: 34px;
    color: #333;
    text-align: center;
    line-height: 1;
  }

  .progress-box__content {
    padding: 70px 0 80px 0;
    text-align: center;
    line-height: 1;

    .tips-text {
      margin-bottom: 40px;
      font-size: 30px;
    }

    .progress-text {
      margin-bottom: 15px;
      font-size: 90.36px;
    }

    .limit-text {
      font-size: 28px;
    }

    [color-red] {
      color: #d62435;
    }

    [color-3] {
      color: #333;
    }
  }

  .progress-box__button {
    text-align: center;

    .van-button {
      width: 300px;
      height: 90px;
      border: 0;
      border-radius: 10px;
      font-size: 0;
      line-height: normal;

      .van-button__text {
        font-size: 34px;
      }

      &:first-child {
        margin-right: 10px;
        box-shadow: 0px 0px 5px 0px rgba(7, 0, 2, 0.15);

        .van-button__text {
          color: #333;
        }
      }

      &:last-child {
        box-shadow: 0px 0px 5px 0px rgba(123, 8, 19, 0.5);

        .van-button__text {
          color: #fff;
        }
      }
    }
  }
}

@media (min-width: 750px) {
  .progress-box {
    width: 660px;
    padding-bottom: 28px;
    border-radius: 14px 14px 0 0;

    .progress-box__title {
      padding: 20px 0;
      font-size: 34px;
    }

    .progress-box__content {
      padding: 70px 0 80px 0;

      .tips-text {
        margin-bottom: 40px;
        font-size: 30px;
      }

      .progress-text {
        margin-bottom: 15px;
        font-size: 90.36px;
      }

      .limit-text {
        font-size: 28px;
      }
    }

    .progress-box__button {

      .van-button {
        width: 300px;
        height: 90px;
        border-radius: 10px;

        .van-button__text {
          font-size: 34px;
        }

        &:first-child {
          margin-right: 10px;
          box-shadow: 0px 0px 5px 0px rgba(7, 0, 2, 0.15);
        }

        &:last-child {
          box-shadow: 0px 0px 5px 0px rgba(123, 8, 19, 0.5);
        }
      }
    }
  }
}
</style>
