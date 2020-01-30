<template>
  <van-cell-group class="product-info" :border="false">
    <van-cell center>
      <template #title>
        <span class="main-text" color-3>和平鸽干红葡萄酒</span>
      </template>

      <span color-red>￥{{localData.price}}</span>
      <span color-9>（原价：<span class="line-through">￥{{localData.original}}</span>)</span>
    </van-cell>

    <van-cell center>
      <template #title>
        <span class="main-text" color-3>邮费</span>
        <span class="small-text" color-9>（普通快递，24小时内发货）</span>
      </template>

      <span color-9>￥{{localData.postage}}</span>
    </van-cell>
  </van-cell-group>
</template>

<script>
import { list } from '@/utils/localData'

export default {
  name: 'ProductInfo',
  props: {
    productType: {
      type: String,
      default: '1'
    }
  },
  data () {
    return {
      localData: list[0]
    }
  },
  watch: {
    productType (val) {
      this.localData = list[parseInt(val) - 1]
    }
  }
}
</script>

<style lang="scss" scoped>
.product-info::v-deep {
  margin: 0 18px 30px;
  border-radius: 10px;
  overflow: hidden;

  .van-cell {
    padding: 0 28px;
    height: 76px;
    line-height: 76px;

    &:not(:last-child)::after {
      right: 28px;
      left: 28px;
    }

    .van-cell__title {
      flex: unset;
      flex-grow: 1;
      flex-shrink: 0;

      .main-text {
        font-size: 26.74px;
      }

      .small-text {
        font-size: 21.01px;
      }
    }

    .van-cell__value {
      flex: unset;
      flex-grow: 0;
      flex-shrink: 0;

      span {
        font-size: 28.65px;
      }
    }

    [color-red] {
      color: #d62435;
    }

    [color-3] {
      color: #333;
    }

    [color-9] {
      color: #999;
    }
  }
}
</style>
