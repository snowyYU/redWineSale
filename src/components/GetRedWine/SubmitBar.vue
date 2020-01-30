<template>
  <van-submit-bar :class="['submit-bar', { 'tag': productType !== '1' }]" button-text="立即领取" button-type="default" safe-area-inset-bottom @submit="onSubmit">
    <div class="tips-text">{{limitTime}}后，价格恢复¥{{localData.original}}</div>
    <div class="price-text">
      <div class="unit-price">
        <span>{{localData.label}}:￥{{localData.price}}</span>
        <span>邮费:¥{{localData.postage}}</span>
      </div>
      <div class="sum-price">￥{{localData.sum}}</div>
    </div>
  </van-submit-bar>
</template>

<script>
import moment from 'moment'
import { list } from '@/utils/localData'

export default {
  name: 'SubmitBar',
  props: {
    productType: {
      type: String,
      default: '1'
    }
  },
  data () {
    return {
      // 截止时间
      limitTime: moment(moment().add(3, 'd')).format('M月DD日'),
      localData: list[0]
    }
  },
  watch: {
    productType (val) {
      this.localData = list[parseInt(val) - 1]
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
.submit-bar::v-deep {
  box-shadow: 0px -6px 6px 0px rgba(214, 36, 53, 0.05);

  .van-submit-bar__bar {
    justify-content: flex-start;
    position: relative;
    padding: 0;
    height: 103px;

    .tips-text {
      position: absolute;
      top: -50px;
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
      padding-top: 11px;
      padding-left: 18px;
      padding-right: 26px;

      .unit-price {
        display: flex;
        justify-content: space-between;
        align-items: center;

        span {
          font-size: 30.83px;
          color: #333;
          line-height: 1;
        }
      }

      .sum-price {
        font-size: 53.33px;
        color: #d62435;
        line-height: 1;
      }
    }

    .van-button {
      border: none;
      width: 320px;
      height: 103px;
      border-radius: 0;
      font-size: 34px;
      color: #fff;
      font-weight: 500;
      line-height: 103px;
      background-color: #d62435;
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
</style>
