<template>
  <van-cell-group class="product-info" :border="false">
    <van-cell center>
      <template #title>
        <span font-size-2 color-3>{{name}}</span>
      </template>

      <span font-size-3 color-red>￥{{price}}</span>
      <span font-size-3 color-9>（原价：<del>￥{{original}}</del>)</span>
    </van-cell>

    <van-cell center>
      <template #title>
        <span font-size-2 color-3>邮费</span>
        <span font-size-1 color-9>（普通快递，24小时内发货）</span>
      </template>

      <span font-size-3 color-9>￥{{postage}}</span>
    </van-cell>
  </van-cell-group>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ProductInfo',
  props: {
    productType: {
      type: String,
      default: '1'
    }
  },
  computed: {
    ...mapState(['localData']),
    name () {
      return this.localData.name
    },
    price () {
      return this.localData.productList[parseInt(this.productType) - 1].price
    },
    original () {
      return this.localData.productList[parseInt(this.productType) - 1].original
    },
    postage () {
      return this.localData.productList[parseInt(this.productType) - 1].postage
    }
  }
}
</script>

<style lang="scss" scoped>
.product-info::v-deep {
  margin: 0 18px;
  border-radius: 10px;
  user-select: none;
  overflow: hidden;

  .van-cell {
    padding: 0 25px 0 30px;
    height: 76px;
    font-size: 0;
    line-height: normal;

    &:not(:last-child)::after {
      right: 28px;
      left: 28px;
    }

    .van-cell__title {
      flex: 1 0 auto;
    }

    .van-cell__value {
      flex: none;
    }

    [font-size-1] {
      font-size: 21.01px;
    }

    [font-size-2] {
      font-size: 26.74px;
    }

    [font-size-3] {
      font-size: 28.65px;
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

@media (min-width: 750px) {
  .product-info::v-deep {
    margin: 0 18px;
    border-radius: 10px;

    .van-cell {
      padding: 0 25px 0 30px;
      height: 76px;

      &:not(:last-child)::after {
        right: 28px;
        left: 28px;
      }

      [font-size-1] {
        font-size: 21.01px;
      }

      [font-size-2] {
        font-size: 26.74px;
      }

      [font-size-3] {
        font-size: 28.65px;
      }
    }
  }
}
</style>
