<template>
  <van-submit-bar :class="['fixed-submit-bar', { 'tag': productType !== '1' }]" :loading="loading" button-text="立即领取" button-type="default" safe-area-inset-bottom @submit="onSubmit">
    <div class="tips-text">{{limitTime}}后，价格恢复¥{{original}}</div>
    <div class="price-text">
      <div class="unit-price">
        <span>{{label}}:{{price}}</span>
        <span>邮费:¥{{postage}}</span>
      </div>
      <div class="sum-price">￥{{sum}}</div>
    </div>
  </van-submit-bar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'fixed-submit-bar',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    productType: {
      type: String,
      default: '1'
    }
  },
  computed: {
    ...mapState(['localData']),
    limitTime () {
      return this.localData.limitTime
    },
    original () {
      return this.localData.productList[parseInt(this.productType) - 1].original
    },
    label () {
      return this.localData.productList[parseInt(this.productType) - 1].label
    },
    price () {
      // if (this.productType === '1') {
      //   return '￥' + this.localData.productList[parseInt(this.productType) - 1].price
      // } else {
      //   const { original, sum } = this.localData.productList[parseInt(this.productType) - 1]
      //   return '-￥' + (original - sum)
      // }
      const { original, price } = this.localData.productList[parseInt(this.productType) - 1]
      return '-￥' + (original - price)
    },
    postage () {
      return this.localData.productList[parseInt(this.productType) - 1].postage
    },
    sum () {
      return this.localData.productList[parseInt(this.productType) - 1].sum
    }
  },
  methods: {
    onSubmit () {
      this.$emit('submit')
    }
  }
}
</script>

<style lang="scss" scoped>
.fixed-submit-bar::v-deep {

  .van-submit-bar__bar {
    justify-content: flex-start;
    align-items: flex-end;
    position: relative;
    padding: 0;
    height: auto;

    .tips-text {
      position: absolute;
      top: -46px;
      left: 14px;
      width: 358px;
      height: 54px;
      font-size: 20px;
      color: #fff;
      text-align: center;
      line-height: 38px;
      background-image: url('../../assets/img/bg-tips.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100% 100%;
    }

    .price-text {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding-left: 18px;
      padding-right: 26px;
      height: 101px;
      box-shadow: 0px -6px 6px 0px rgba(214, 36, 53, 0.05);

      .unit-price {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;

        span {
          font-size: 30.83px;
          color: #333;
          line-height: 1;
        }
      }

      .sum-price {
        margin-bottom: 5px;
        font-size: 53.33px;
        color: #d62435;
        line-height: 1;
      }
    }

    .van-button {
      border: 0;
      width: 320px;
      height: 103px;
      border-radius: 0;
      line-height: normal;
      background-color: #d62435;

      .van-button__text {
        font-size: 34px;
        color: #fff;
      }
    }
  }

  &.tag {
    .van-submit-bar__bar {
      .van-button {
        &::after {
          content: '免运费';
          display: block;
          position: absolute;
          top: 1px;
          left: 1px;
          background-color: #fff;
          padding: 0 10px;
          font-size: 20px;
          color: #000;
          line-height: 1.2;
        }
      }
    }
  }
}

@media (min-width: 750px) {
  .fixed-submit-bar::v-deep {
    max-width: 750px;
    left: calc((100% - 750px) / 2);

    .van-submit-bar__bar {

      .tips-text {
        top: -46px;
        left: 14px;
        width: 358px;
        height: 54px;
        font-size: 20px;
        line-height: 38px;
      }

      .price-text {
        padding-left: 18px;
        padding-right: 26px;
        height: 101px;
        box-shadow: 0px -6px 6px 0px rgba(214, 36, 53, 0.05);

        .unit-price {
          margin-bottom: 5px;

          span {
            font-size: 30.83px;
          }
        }

        .sum-price {
          margin-bottom: 5px;
          font-size: 53.33px;
        }
      }

      .van-button {
        width: 320px;
        height: 103px;

        .van-button__text {
          font-size: 34px;
        }
      }
    }

    &.tag {
      .van-submit-bar__bar {
        .van-button {
          &::after {
            padding: 0 10px;
            font-size: 20px;
          }
        }
      }
    }
  }
}
</style>
