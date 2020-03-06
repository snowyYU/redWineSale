<template>
  <div class="order-detail">
    <!-- 支付状态 -->
    <payment-status :isPaid="isPaid" @click="handleReloadClick" />

    <!-- 联系客服按钮 -->
    <div class="customer-service" @click="handleCustomerService"></div>

    <!-- 收货人地址 -->
    <user-address :isPaid="isPaid" />

    <!-- 商品信息 -->
    <product-info :isPaid="isPaid" :list="productInfo" title="商品信息" />

    <!-- 底部提示信息 -->
    <div :class="['tips-text', { 'success': isPaid }]">{{tipsText}}</div>

    <!-- 客服弹窗 -->
    <customer-service-box :show.sync="customerServiceBoxShow" />
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState, mapActions } from 'vuex'
import { getAddressInfo, checkOrderStatus } from '@/api'
import { getToken, areaStringify, setData, getData } from '@/utils'
import UserAddress from '@/components/common/UserAddress'
import ProductInfo from '@/components/OrderStatus/ProductInfo'
import PaymentStatus from '@/components/OrderStatus/PaymentStatus'
import CustomerServiceBox from '@/components/OrderStatus/CustomerServiceBox'

export default {
  name: 'order-loading',
  components: {
    UserAddress,
    ProductInfo,
    PaymentStatus,
    CustomerServiceBox
  },
  data () {
    return {
      // 支付状态
      isPaid: false,
      // 联系客服弹窗
      customerServiceBoxShow: false,
      // 定时器id
      intervalId: '',
      // 延时器id
      timeoutId: '',
      // 订单信息
      orderData: {}
    }
  },
  computed: {
    ...mapState(['localData', 'userInfo', 'orderInfo']),
    productInfo () {
      const productList = this.localData.productList[parseInt(this.orderInfo.productType) - 1]

      const list = [
        {
          id: 1,
          label: '订单号',
          value: this.orderInfo.orderNo
        },
        {
          id: 2,
          label: this.localData.name,
          value: `¥ ${productList.price}  (原价：¥<del>${productList.original}</del>)`
        },
        {
          id: 3,
          label: '邮费',
          value: `¥ ${productList.postage}  (24小时内发货)`
        },
        {
          id: 4,
          label: '支付方式',
          value: this.orderInfo.payType === '1' ? '微信支付' : '支付宝支付'
        },
        {
          id: 5,
          label: '下单时间',
          value: this.orderInfo.payTime
        },
        {
          id: 6,
          label: '订单状态',
          value: this.isPaid ? '物流配送中' : '待支付'
        }
      ]
      return list
    },
    // 提示文字
    tipsText () {
      return this.isPaid ? '我们已为您申请加急配送，请耐心等待~' : '红酒付款后预计24小时内发货，请耐心等待'
    }
  },
  created () {
    const orderInfo = getData('orderInfo')
    if (!_.isEmpty(orderInfo)) {
      this.updateOrderInfo(orderInfo)
    }
  },
  mounted () {
    this.getAddressInfo()
    this.checkOrderStatus()

    this.intervalId = this.setCheckOrderInterval()
    this.timeoutId = this.setCheckOrderTimeout(this.intervalId)
  },
  beforeDestroy () {
    // 退出页面前清除下定时器
    this.clearCheckOrderInterval()
  },
  methods: {
    ...mapActions(['updateUserInfo', 'updateGlobalOverlayData', 'updateOrderInfo']),
    // 联系客户按钮点击事件
    handleCustomerService () {
      this.customerServiceBoxShow = true
    },
    // 查询用户收货地址
    getAddressInfo () {
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
      }).catch(err => {
        console.error(err)
        this.$toast('网络错误')
      }).finally(() => {
        this.updateGlobalOverlayData({ isShow: false, isTransparent: false })
      })
    },
    // 轮询查询订单状态
    setCheckOrderInterval () {
      const id = setInterval(this.checkOrderStatus, 5000)
      return id
    },
    // 停止轮询查询订单状态
    clearCheckOrderInterval (id) {
      const intervalId = id || this.intervalId
      if (intervalId) {
        clearInterval(intervalId)
      }
    },
    // 查询订单状态
    checkOrderStatus (mode) {
      const orderNo = getData('orderNo')
      checkOrderStatus(orderNo).then(res => {
        // console.log(res.data)
        if (res.status === 200 && res.data.data.payState === 'SUCCESS') {
          this.clearCheckOrderInterval()

          this.orderData = res.data.data
          let { num, payType, payDate } = res.data.data
          payType = this.payMethodTranslate(payType)
          const productType = this.formatProductType(num)
          const obj = Object.assign({}, this.orderInfo, { productType, payType, payTime: payDate })
          this.updateOrderInfo(obj)
          setData('orderInfo', obj)

          this.isPaid = true
          // this.$router.push({ name: 'order-success' })
        } else {
          if (mode) {
            this.$toast('支付未完成，请稍后')
          }
        }
      }).catch(err => {
        if (mode) {
          this.$toast('网络错误')
        }
        console.error(err)
        this.clearCheckOrderInterval()
      }).finally(() => {
        if (mode) {
          this.updateGlobalOverlayData({ isShow: false, isTransparent: false })
        }
      })
    },
    // 格式化商品类型
    formatProductType (productType) {
      let type = ''
      switch (productType) {
        case 1:
          type = '1'
          break
        case 2:
          type = '2'
          break
        case 6:
          type = '3'
          break
      }
      return type
    },
    // 过滤下收到的数据（支付方式），方便显示
    payMethodTranslate (data) {
      let payType = ''
      switch (data) {
        case 'WeChat':
          payType = '1'
          break
        case 'Alipay':
          payType = '2'
          break
        default:
          payType = ''
          break
      }
      return payType
    },
    // 设置轮询超时时间
    setCheckOrderTimeout (id, delay = 60000) {
      const timeoutId = setTimeout(() => {
        this.clearCheckOrderInterval(id)
      }, delay)
      return timeoutId
    },
    // 停止延时器
    clearCheckOrderTimeout (id) {
      const timeoutId = id || this.timeoutId
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    },
    // 刷新订单状态
    handleReloadClick () {
      this.updateGlobalOverlayData({ isShow: true, isTransparent: false })

      this.clearCheckOrderInterval()
      this.clearCheckOrderTimeout()
      this.checkOrderStatus(1)
      this.intervalId = this.setCheckOrderInterval()
      this.timeoutId = this.setCheckOrderTimeout(this.intervalId)
    }
  }
}
</script>

<style lang="scss" scoped>
.order-detail {
  user-select: none;

  .customer-service {
    position: fixed;
    top: 79px;
    right: 0;
    z-index: 10;
    width: 34px;
    height: 129px;
    border-radius: 10px 0 0 10px;
    background-image: url('../assets/img/customer-service.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    cursor: pointer;

    &:active::before {
      opacity: .1;
    }

    &::before {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      background-color: #000;
      border: inherit;
      border-color: #000;
      border-radius: inherit;
      transform: translate(-50%,-50%);
      opacity: 0;
      content: ' ';
    }
  }

  .user-address {
    margin-bottom: 18px;
  }

  .tips-text {
    padding : 10px 0 10px 46px;
    font-size: 22px;
    color: #c3c3c3;
    line-height: 1;
    background-color: transparent;

    &.success {
      padding : 10px 0 10px 0;
      font-size: 24px;
      color: #ccc;
      text-align: center;
    }
  }
}

@media (min-width: 750px) {
  .order-detail {
    margin: 0 auto;
    max-width: 750px;

    .customer-service {
      top: 79px;
      right: calc((100% - 750px) / 2);
      width: 34px;
      height: 129px;
      border-radius: 10px 0 0 10px;
    }

    .user-address {
      margin-bottom: 18px;
    }

    .tips-text {
      padding : 10px 0 10px 46px;
      font-size: 22px;

      &.success {
        padding : 10px 0 10px 0;
        font-size: 24px;
      }
    }
  }
}
</style>
