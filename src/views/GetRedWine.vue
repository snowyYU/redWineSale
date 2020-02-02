<template>
  <div class="get-red-wine safe-padding">
    <!-- 商品列表 -->
    <van-radio-group class="product-list" v-model="productType" checked-color="#d62435">
      <van-cell-group :border="false">
        <van-cell :class="{ 'active' : productType === '1' }" clickable :border="false" @click="productType='1'">
          <template #title>
            <div class="product-info">
              <div class="user-info" v-show="productType === '1'">收件人  张三（16619840266）</div>
              <div class="product-info__inner">
                <van-image :src="require('../assets/img/product-1.png')" />
                <div class="product-info__text">
                  <span class="default-text">恭喜您!成功领取680元红酒1瓶！</span>
                </div>
              </div>
              <div class="tips-text" v-show="productType === '1'">
                <span class="label">进口跨国的运输费用需要您理解与分担</span>
                <span class="value">运费￥49</span>
              </div>
            </div>
          </template>
          <van-radio slot="right-icon" name="1" />
        </van-cell>

        <van-cell :class="{ 'active' : productType === '2' }" clickable :border="false" @click="productType='2'">
          <template #title>
            <div class="product-info">
              <div class="user-info" v-show="productType === '2'">收件人  张三（16619840266）</div>
              <div class="product-info__inner">
                <van-image :src="require('../assets/img/product-2.png')" />
                <div class="product-info__text bg-gradient">
                  <span class="main-text">69元领2瓶，免邮费</span>
                  <span class="small-text">86%用户选择（官方补贴￥1291）</span>
                </div>
              </div>
              <div class="tips-text" v-show="productType === '2'">
                <!-- <span class="label">进口跨国的运输费用需要您理解与分担</span>
                <span class="value">运费￥49</span> -->
              </div>
            </div>
          </template>
          <van-radio slot="right-icon" name="2" />
        </van-cell>

        <van-cell :class="{ 'active' : productType === '3' }" clickable :border="false" @click="productType='3'">
          <template #title>
            <div class="product-info">
              <div class="user-info" v-show="productType === '3'">收件人  张三（16619840266）</div>
              <div class="product-info__inner">
                <van-image :src="require('../assets/img/product-3.png')" />
                <div class="product-info__text bg-gradient">
                  <span class="main-text">199元领1箱（6瓶），免邮费</span>
                  <span class="small-text">优惠金额最高（官方补贴￥3881）</span>
                </div>
              </div>
              <div class="tips-text" v-show="productType === '3'">
                <!-- <span class="label">进口跨国的运输费用需要您理解与分担</span>
                <span class="value">运费￥49</span> -->
              </div>
            </div>
          </template>
          <van-radio slot="right-icon" name="3" />
        </van-cell>
      </van-cell-group>
    </van-radio-group>

    <!-- 收货人地址 -->
    <user-address @change="handleChangeAddress" />

    <!-- 商品详情 -->
    <product-info :productType="productType" />

    <!-- 选择支付方式 -->
    <pay-type :payType.sync="payType" />

    <!-- 底部浮动按钮 -->
    <submit-bar :productType="productType" @submit="onSubmit" />

    <!-- 修改地址弹窗 -->
    <address-edit-box :show.sync="addressEditBoxShow" />

    <!-- 当前进度弹窗 -->
    <progress-box :show.sync="progressBoxShow" />
  </div>
</template>

<script>
// import ProductList from '@/components/GetRedWine/ProductList'
import UserAddress from '@/components/common/UserAddress'
import ProductInfo from '@/components/GetRedWine/ProductInfo'
import PayType from '@/components/GetRedWine/PayType'
import SubmitBar from '@/components/GetRedWine/SubmitBar'
import AddressEditBox from '@/components/common/AddressEditBox'
import ProgressBox from '@/components/common/ProgressBox'

export default {
  name: 'GetRedWine',
  components: {
    UserAddress,
    ProductInfo,
    PayType,
    SubmitBar,
    AddressEditBox,
    ProgressBox
  },
  data () {
    return {
      productType: '1',
      payType: '1',
      // 修改地址弹窗
      addressEditBoxShow: false,
      progressBoxShow: false
    }
  },
  methods: {
    // 修改地址按钮点击事件
    handleChangeAddress () {
      this.addressEditBoxShow = true
    },
    // 提交订单
    onSubmit () {

    }
  }
}
</script>

<style lang="scss" scoped>
$submit-bar-height: 103px;

@mixin safe-area-padding ($size) {
  padding-bottom: calc(#{ $size } + constant(safe-area-inset-bottom));
  padding-bottom: calc(#{ $size } + env(safe-area-inset-bottom));
}

.get-red-wine {
  background-color: #f8f8f8;

  &.safe-padding {
    @include safe-area-padding (#{ $submit-bar-height + 60px });
  }
}

.product-list::v-deep {
  margin: 0 30px 20px 8px;
  padding-top: 10px;

  .van-cell-group {
    background-color: #f8f8f8;

    .van-cell {
      padding: 0;
      background-color: #f8f8f8;
      padding-left: 10px;
      padding-top: 10px;
      padding-bottom: 10px;
      line-height: 1;

      &.active {
        .van-cell__title {
          border-radius: 10px;
          background-color: #fff;
          box-shadow: 0px 2px 12px 0px rgba(214, 36, 53, .15);
        }
      }

      .van-cell__title {
        position: relative;
        padding: 0 30px;

        .product-info {

          .user-info {
            font-size: 26.74px;
            color: #333;
            line-height: 57px;
          }

          .tips-text {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 57px;

            .label {
              font-size: 21.01px;
              color: #999;
            }

            .value {
              font-size: 21.01px;
              color: #ccc;
            }
          }

          .product-info__inner {
            position: relative;
            display: flex;
            align-items: center;
            height: 123px;
            background-color: #d62435;

            &::before {
              content: " ";
              position: absolute;
              top: 0;
              right: -1px;
              bottom: 0px;
              left: -1px;
              border-left: 2Px dashed #d62435;
              border-right: 2Px dashed #d62435;
            }

            .van-image {
              flex-shrink: 0;
              width: 123px;
            }

            .product-info__text {
              flex-grow: 1;
              display: flex;
              justify-content: center;
              flex-direction: column;
              height: 100%;

              &.bg-gradient {
                background-image: url('../assets/img/bg-gradient-red.png');
                background-repeat: no-repeat;
                background-position: center;
                background-size: 100% 100%;
              }

              .default-text {
                font-size: 30.56px;
                color: #fff;
              }

              .main-text {
                display: block;
                margin-left: 26px;
                margin-bottom: 10px;
                font-size: 26.74px;
                color: #fff;
              }

              .small-text {
                display: block;
                margin-left: 26px;
                font-size: 21.01px;
                color: #fff;
              }

            }
          }
        }
      }

      .van-radio {
        margin-left: 20px;
        .van-radio__icon {
          font-size: 40px;
          // height: auto;
          // line-height: 40px;
        }
      }
    }
  }
}
</style>
