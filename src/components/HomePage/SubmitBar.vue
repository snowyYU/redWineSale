<template>
  <div class="submit-bar">

    <div class="submit-bar__default">
      <div class="submit-bar__label">
        <span>总金额：</span>
        <del>￥{{original}}</del>
      </div>

      <div class="submit-bar__text">￥{{price}}</div>
    </div>

    <van-button class="submit-bar__button" text="申请免费领取" color="#d62435" :loading="loading" loading-text="申请免费领取" @click="handleSubmitClick" />
  </div>
</template>

<script>
export default {
  name: 'submit-bar',
  props: {
    original: {
      type: Number,
      default: 680
    },
    price: {
      type: Number,
      default: 0
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleSubmitClick () {
      this.$emit('submit')
    }
  }
}
</script>

<style lang="scss" scoped>
.submit-bar {
  display: flex;
  align-items: flex-end;
  user-select: none;
  overflow: hidden;

  .submit-bar__default {
    flex-grow: 1;
    display: flex;
    align-items: center;
    height: 101.5px;
    box-shadow: 0px -3px 3px 0px rgba(214, 36, 53, 0.05);

    .submit-bar__label {
      padding-left: 36px;
      flex-grow: 1;

      span,
      del {
        font-size: 30.83px;
        color: #333;
      }
    }

    .submit-bar__text {
      padding-right: 22px;
      font-size: 53.33px;
      color: #d62435;
    }
  }

  .submit-bar__button {
    flex-shrink: 0;
    width: 363px;
    height: 103px;
    border: 0;
    border-radius: 0;
    font-size: 0;
    line-height: normal;

    .van-button__text {
      font-size: 34px;
      color: #fff;
    }
  }
}

@media (min-width: 750px) {
  .submit-bar {

    .submit-bar__default {
      height: 101.5px;
      box-shadow: 0px -3px 3px 0px rgba(214, 36, 53, 0.05);

      .submit-bar__label {
        padding-left: 36px;

        span,
        del {
          font-size: 30.83px;
        }
      }

      .submit-bar__text {
        padding-right: 22px;
        font-size: 53.33px;
      }
    }

    .submit-bar__button {
      width: 363px;
      height: 103px;

      .van-button__text {
        font-size: 34px;
      }
    }
  }
}
</style>
