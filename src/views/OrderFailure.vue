<template>
  <div class="order-detail">
    <!-- 支付状态 -->
    <payment-status :isPaid="isPaid" />

    <!-- 联系客服按钮 -->
    <div class="customer-service" @click="handleCustomerService"></div>

    <!-- 收货人地址 -->
    <user-address :isPaid="isPaid" />

    <!-- 商品信息 -->
    <product-info :list="list" title="商品信息" />

    <!-- 底部提示信息 -->
    <div :class="['tips-text', { 'success': isPaid }]">{{tipsText}}</div>

    <!-- 客服弹窗 -->
    <customer-service-box :show.sync="customerServiceBoxShow" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getAddressInfo } from '@/api'
import { getToken, areaStringify } from '@/utils'
import UserAddress from '@/components/common/UserAddress'
import ProductInfo from '@/components/OrderStatus/ProductInfo'
import PaymentStatus from '@/components/OrderStatus/PaymentStatus'
import CustomerServiceBox from '@/components/OrderStatus/CustomerServiceBox'

export default {
  name: 'order-detail',
  components: {
    UserAddress,
    ProductInfo,
    PaymentStatus,
    CustomerServiceBox
  },
  data () {
    return {
      // 商品信息列表
      list: [
        {
          id: 1,
          label: '和平缔约128干红葡萄酒',
          value: '¥ 0  (原价：¥<del>680</del>)'
        },
        {
          id: 2,
          label: '邮费',
          value: '¥ 49  (24小时内发货)'
        },
        {
          id: 3,
          label: '支付方式',
          value: '微信支付'
        },
        {
          id: 4,
          label: '下单时间',
          value: '2020-01-16 15:35:23'
        },
        {
          id: 5,
          label: '订单状态',
          value: '待支付'
        }
      ],
      // 支付状态
      isPaid: false,
      // 联系客服弹窗
      customerServiceBoxShow: false
    }
  },
  computed: {
    ...mapState(['localData', 'userInfo']),
    // 提示文字
    tipsText () {
      return this.isPaid ? '我们已为您申请加急配送，请耐心等待~' : '红酒付款后预计24小时内发货，请耐心等待'
    }
  },
  mounted () {
    this.getAddressInfo()
  },
  methods: {
    ...mapActions(['updateUserInfo', 'updateGlobalOverlayData']),
    // 联系客户按钮点击事件
    handleCustomerService () {
      this.customerServiceBoxShow = true
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
