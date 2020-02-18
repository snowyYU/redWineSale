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

    <!-- 当前进度弹窗 -->
    <progress-box :show.sync="ProgressBoxShow" @confirm="orderPay" @cancel="confirmQuit"/>
  </div>
</template>

<script>
import _ from 'lodash'
import ProductList from '@/components/GetRedWine/ProductList'
import UserAddress from '@/components/common/UserAddress'
import ProductInfo from '@/components/GetRedWine/ProductInfo'
import PayType from '@/components/GetRedWine/PayType'
import FixedSubmitBar from '@/components/GetRedWine/FixedSubmitBar'
import ProgressBox from '@/components/common/ProgressBox'
import { mapState, mapActions } from 'vuex'
import { getAddressInfo, orderPay } from '@/api'
import { getToken, areaStringify, wxConfig, wxReady, wxError, wxChooseWXPay } from '@/utils'

export default {
  name: 'get-red-wine',
  components: {
    ProductList,
    UserAddress,
    ProductInfo,
    PayType,
    FixedSubmitBar,
    ProgressBox
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
      payType: '2',
      // 提示弹窗显示状态
      ProgressBoxShow: false
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

    // 不在H5环境下，获取用户信息
    this.getAddressInfo()

    // 开始做页面的回退拦截
    // 如果支持 popstate 一般移动端都支持了
    if (window.history && window.history.pushState) {
      // 往历史记录里面添加一条新的当前页面的url
      history.pushState(null, null, document.URL)
      // 给 popstate 绑定一个方法 监听页面刷新
      window.addEventListener('popstate', this.backConfirm, false)// false阻止默认事件
    }
  },
  // 页面销毁时，取消监听。否则其他vue路由页面也会被监听
  destroyed () {
    window.removeEventListener('popstate', this.backConfirm, false)// false阻止默认事件
  },
  beforeDestroy () {
    // 取消监听窗口尺寸变化
    window.onresize = null
  },
  methods: {
    ...mapActions(['updateUserInfo', 'saveVisitRecord', 'updateGlobalOverlayData']),
    useSafePadding () {
      let fixedSubmitBar = this.$refs['fixed-submit-bar'].$el
      let space = fixedSubmitBar.offsetTop - fixedSubmitBar.parentElement.offsetHeight - fixedSubmitBar.querySelector('.tips-text').offsetHeight
      this.isSafePadding = (space <= 5)
    },
    backConfirm () {
      this.ProgressBoxShow = true
    },
    confirmQuit () {
      this.$router.replace({ name: 'home-page' })
    },

    // 查询用户收货地址
    getAddressInfo () {
      this.loading = true
      this.updateGlobalOverlayData({ isShow: true, isTransparent: false })
      getAddressInfo({ token: getToken() }).then(res => {
        if (res.data.code === 200) {
          let { userName, phone, province, city, area, address } = res.data.body
          this.updateUserInfo({
            name: userName,
            phone,
            area: areaStringify(province, city, area),
            address
          })
        } else {
          this.$toast('网络错误')
        }
      }).finally(() => {
        this.loading = false
        this.updateGlobalOverlayData({ isShow: false, isTransparent: false })
      })
    },

    // 获取订单类型
    getOrderType (productType) {
      let orderType = ''
      switch (productType) {
        case '1':
          orderType = 'ONE_BOTTLE'
          break
        case '2':
          orderType = 'TWO_BOTTLE'
          break
        case '3':
          orderType = 'SIX_BOTTLE'
          break
      }
      return orderType
    },

    // 支付
    orderPay () {
      this.loadingPay = true
      this.updateGlobalOverlayData({ isShow: true, isTransparent: true })
      let data = {
        orderType: this.getOrderType(this.productType),
        type: this.payType,
        token: getToken(),
        channel: '测试',
        subChannel: '测试'
      }
      orderPay(data).then(res => {
        if (res.data.code === 200) {
          switch (this.clientEvn) {
            case 0:
              // 浏览器
              break
            case 1:
              // 微信
              const { appId, timeStamp, nonceStr, paySign } = res.data.body
              wxConfig(appId, timeStamp, nonceStr, paySign)
              wxReady(() => {
                wxChooseWXPay(res.data.body).then(res => {
                  console.log(res)
                  this.$router.push({ name: 'order-success' })
                })
              })
              wxError((err) => {
                console.error(err)
              })
              break
            case 2:
              // 支付宝
              break
          }
        } else {
          this.$toast('网络错误')
        }
      }).finally(() => {
        this.loadingPay = false
        this.updateGlobalOverlayData({ isShow: false, isTransparent: true })
      })
    },

    // 提交订单
    onSubmit () {
      if (this.loadingPay) {
        return
      }

      this.loadingPay = true
      this.updateGlobalOverlayData({ isShow: true, isTransparent: true })

      let data = {
        visitType: '4',
        type: this.clientEvn,
        token: getToken(),
        channel: '测试',
        subChannel: '测试'
      }
      this.saveVisitRecord({ data,
        cb: () => {
          this.orderPay()
        } })
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
