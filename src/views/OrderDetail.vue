<template>
  <div class="order-detail">

    <!-- 商品信息 -->
    <product-info :list="list" title="商品信息" />

    <!-- 底部提示信息 -->
    <div :class="['tips-text', { 'success': isSuccess }]">{{tipsText}}</div>

    <!-- 联系客服按钮 -->
    <div class="customer-service" @click="handleCustomerService"></div>

    <!-- 客服弹窗 -->
    <customer-service-box :show.sync="customerServiceBoxShow" />
  </div>
</template>

<script>
import ProductInfo from '@/components/common/ProductInfo'
import CustomerServiceBox from '@/components/OrderDetail/CustomerServiceBox'

export default {
  name: 'OrderDetail',
  components: {
    ProductInfo,
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
      // 支付成功
      isSuccess: false,
      // 联系客服弹窗
      customerServiceBoxShow: false
    }
  },
  computed: {
    // 提示文字
    tipsText () {
      return this.isSuccess ? '我们已为您申请加急配送，请耐心等待~' : '红酒付款后预计24小时内发货，请耐心等待'
    }
  },
  methods: {
    // 联系客户按钮点击事件
    handleCustomerService () {
      this.customerServiceBoxShow = true
    }
  }
}
</script>

<style lang="scss" scoped>
.order-detail {

  .tips-text {
    padding : 10px 0 10px 46px;
    font-size: 22px;
    color: #c3c3c3;
    line-height: 1;
    background-color: transparent;
    cursor: default;
    user-select: none;

    &.success {
      padding : 10px 0 10px 0;
      font-size: 24px;
      color: #ccc;
      text-align: center;
    }
  }

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
}
</style>
