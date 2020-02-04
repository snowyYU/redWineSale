<template>
  <van-submit-bar :class="['fixed-submit-bar', { 'tag': productType !== '1' }]" button-text="立即领取" button-type="default" safe-area-inset-bottom @submit="onSubmit">
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
  name: 'fixed-submit-bar',
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
