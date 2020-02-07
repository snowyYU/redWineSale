<template>
  <div :class="['get-red-wine', { 'safe-padding': isSafePadding }]">
    <!-- 商品列表 -->
    <product-list :productType.sync="productType" />

    <!-- 收货人地址 -->
    <user-address getContainer=".get-red-wine" />

    <!-- 商品详情 -->
    <product-info :productType="productType" />

    <!-- 选择支付方式 -->
    <pay-type :payType.sync="payType" />

    <!-- 底部浮动按钮 -->
    <fixed-submit-bar ref="fixed-submit-bar" :productType="productType" @submit="onSubmit" />
  </div>
</template>

<script>
import _ from 'lodash'
import ProductList from '@/components/GetRedWine/ProductList'
import UserAddress from '@/components/common/UserAddress'
import ProductInfo from '@/components/GetRedWine/ProductInfo'
import PayType from '@/components/GetRedWine/PayType'
import FixedSubmitBar from '@/components/GetRedWine/FixedSubmitBar'

export default {
  name: 'get-red-wine',
  components: {
    ProductList,
    UserAddress,
    ProductInfo,
    PayType,
    FixedSubmitBar
  },
  data () {
    return {
      loading: false,
      isSafePadding: false,
      productType: '1',
      payType: '1'
    }
  },
  mounted () {
    this.useSafePadding()
    /**
     * 监听窗口尺寸变化
     * _.throttle() 节流函数，100毫秒执行一次
     */
    window.onresize = _.throttle(this.useSafePadding, 100)
  },
  beforeDestroy () {
    // 取消监听窗口尺寸变化
    window.onresize = null
  },
  methods: {
    useSafePadding () {
      let fixedSubmitBar = this.$refs['fixed-submit-bar'].$el
      let space = fixedSubmitBar.offsetTop - fixedSubmitBar.parentElement.offsetHeight - fixedSubmitBar.querySelector('.tips-text').offsetHeight
      this.isSafePadding = (space <= 5)
    },
    // 提交订单
    onSubmit () {
      this.$router({ name: 'order-detai' })
    }
  }
}
</script>

<style lang="scss" scoped>
$submit-bar-height: 152px;
$blank-area: 30px;

@mixin safe-area-padding ($size) {
  padding-bottom: calc(#{ $size } + constant(safe-area-inset-bottom));
  padding-bottom: calc(#{ $size } + env(safe-area-inset-bottom));
}

.get-red-wine {

  &.safe-padding {
    @include safe-area-padding (#{ $submit-bar-height + $blank-area });
  }

  .product-list {
    margin-bottom: 20px;
  }

  .user-address {
    margin-bottom: 29px;
  }

  .product-info {
    margin-bottom: 33px;
  }
}

@media (min-width: 750px) {
  .get-red-wine {
    margin: 0 auto;
    max-width: 750px;

    &.safe-padding {
      @include safe-area-padding (#{ $submit-bar-height + $blank-area });
    }

    .product-list {
      margin-bottom: 20px;
    }

    .user-address {
      margin-bottom: 29px;
    }

    .product-info {
      margin-bottom: 33px;
    }
  }
}
</style>
