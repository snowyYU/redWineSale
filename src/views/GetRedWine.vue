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
    <fixed-submit-bar ref="fixed-submit-bar" :productType="productType" :loading="loadingPay" @submit="onSubmit" />
  </div>
</template>

<script>
import _ from 'lodash'
import ProductList from '@/components/GetRedWine/ProductList'
import UserAddress from '@/components/common/UserAddress'
import ProductInfo from '@/components/GetRedWine/ProductInfo'
import PayType from '@/components/GetRedWine/PayType'
import FixedSubmitBar from '@/components/GetRedWine/FixedSubmitBar'
import { mapState, mapActions } from 'vuex'
import { getAddressInfo, orderPay } from '@/api'
import { getToken } from '@/utils'

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
      // 用户地址加载状态
      loading: false,
      // 支付请求加载状态
      loadingPay: false,
      // 底部固定栏遮挡内容时开启安全距离
      isSafePadding: false,
      // 商品类型
      productType: '1',
      // 支付类型 1.微信 2.支付宝
      payType: '2'
    }
  },
  computed: {
    ...mapState(['clientEvn'])
  },
  mounted () {
    this.useSafePadding()
    /**
     * 监听窗口尺寸变化
     * _.throttle() 节流函数，100毫秒执行一次
     */
    window.onresize = _.throttle(this.useSafePadding, 100)

    this.getAddressInfo()
  },
  beforeDestroy () {
    // 取消监听窗口尺寸变化
    window.onresize = null
  },
  methods: {
    ...mapActions(['updateUserInfo']),
    useSafePadding () {
      let fixedSubmitBar = this.$refs['fixed-submit-bar'].$el
      let space = fixedSubmitBar.offsetTop - fixedSubmitBar.parentElement.offsetHeight - fixedSubmitBar.querySelector('.tips-text').offsetHeight
      this.isSafePadding = (space <= 5)
    },

    // 将区域数据结构
    areaStringify (province, city, area) {
      if (province === city) {
        return `${province}/${area}`
      }
      return `${province}/${city}/${area}`
    },

    // 查询用户收货地址
    getAddressInfo () {
      this.loading = true
      getAddressInfo({ token: getToken() }).then(res => {
        if (res.data.code === 200) {
          let { userName, phone, province, city, area, address } = res.data.body
          this.updateUserInfo({
            name: userName,
            phone,
            area: this.areaStringify(province, city, area),
            address
          })
        } else {
          console.log(res)
        }
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        this.loading = false
      })
    },

    // 获取订单类型
    getOrderType (productType) {
      let orderType = ''
      switch (productType) {
        case '1':
          orderType = ''
          break
        case '2':
          orderType = ''
          break
        case '3':
          orderType = ''
          break
      }
      return orderType
    },

    // 支付
    orderPay () {
      this.loadingPay = true
      let data = {
        orderType: this.getOrderType(this.productType),
        type: this.payType,
        token: getToken()
      }
      orderPay(data).then(res => {
        if (res.data.code === 200) {

        } else {
          console.log(res)
        }
      }).catch(err => {
        console.error(err)
      }).finally(() => {
        this.loadingPay = false
      })
    },

    // 提交订单
    onSubmit () {
      // this.$router.push({ name: 'order-detail' })
      this.orderPay()
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
