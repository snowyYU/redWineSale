<template>
  <van-radio-group class="product-list" v-model="productTypeRadio" checked-color="#d62435">
    <van-cell-group :border="false">
      <van-cell :class="{ 'active' : productType === '1' }" clickable :border="false" @click="handleTypeChange('1')">
        <template #title>
          <div class="product-info">
            <div class="user-info" v-show="productType === '1'">收件人  {{username}}（{{phone}}）</div>
            <div class="product-info__inner">
              <van-image :src="require('../../assets/img/product-1.png')" />
              <div class="product-info__text">
                <span class="default-text">恭喜您!成功领取{{price_1}}元红酒1瓶！</span>
              </div>
            </div>
            <div class="tips-text" v-show="productType === '1'">
              <span class="label van-ellipsis">进口跨国的运输费用需要您理解与分担</span>
              <span class="value van-ellipsis">运费￥49</span>
            </div>
          </div>
        </template>
        <van-radio slot="right-icon" name="1" />
      </van-cell>

      <van-cell :class="{ 'active' : productType === '2' }" clickable :border="false" @click="handleTypeChange('2')">
        <template #title>
          <div class="product-info">
            <div class="user-info" v-show="productType === '2'">收件人  {{username}}（{{phone}}）</div>
            <div class="product-info__inner">
              <van-image :src="require('../../assets/img/product-2.png')" />
              <div class="product-info__text bg-gradient">
                <span class="main-text">69元领2瓶，免邮费</span>
                <span class="small-text">赠精美礼盒（官方补贴￥{{price_2}}）</span>
              </div>
            </div>
            <div class="tips-text" v-show="productType === '2'">
            </div>
          </div>
        </template>
        <van-radio slot="right-icon" name="2" />
      </van-cell>

      <van-cell :class="{ 'active' : productType === '3' }" clickable :border="false" @click="handleTypeChange('3')">
        <template #title>
          <div class="product-info">
            <div class="user-info" v-show="productType === '3'">收件人  {{username}}（{{phone}}）</div>
            <div class="product-info__inner">
              <van-image :src="require('../../assets/img/product-3.png')" />
              <div class="product-info__text bg-gradient">
                <span class="main-text">199元领6瓶，免邮费</span>
                <span class="small-text">赠精美礼盒（官方补贴￥{{price_6}}）</span>
              </div>
            </div>
            <div class="tips-text" v-show="productType === '3'">
            </div>
          </div>
        </template>
        <van-radio slot="right-icon" name="3" />
      </van-cell>
    </van-cell-group>
  </van-radio-group>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'product-list',
  props: {
    // 商品类型
    productType: {
      type: String,
      default: '1'
    }
  },
  computed: {
    ...mapState(['localData', 'userInfo']),
    productTypeRadio: {
      get () {
        return this.productType
      },
      set (val) {
        if (this.productType !== val) {
          this.$emit('update:productType', val)
        }
      }
    },
    username () {
      if (this.userInfo.name && this.userInfo.name.length > 5) {
        return this.userInfo.name.substr(0, 5) + '...'
      }
      return this.userInfo.name || ''
    },
    phone () {
      return this.userInfo.phone
    },
    price_1 () {
      return this.localData.productList[0].original
    },
    price_2 () {
      const { original, sum } = this.localData.productList[1]
      return original - sum
    },
    price_6 () {
      const { original, sum } = this.localData.productList[2]
      return original - sum
    }
  },
  methods: {
    handleTypeChange (val) {
      this.productTypeRadio = val
    }
  }
}
</script>

<style lang="scss" scoped>
.product-list::v-deep {

  .van-cell-group {
    margin: 0 30px 0 8px;
    padding-top: 10px;
    background-color: #f8f8f8;

    .van-cell {
      padding: 0;
      background-color: #f8f8f8;
      padding-left: 10px;
      padding-top: 10px;
      padding-bottom: 10px;
      font-size: 0;
      line-height: normal;

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

              &:not(.bg-gradient) {
                margin-left: -15px;
              }

              &.bg-gradient {
                background-image: url('../../assets/img/bg-gradient-red.png');
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

          .van-icon {
            border-width: 2px;
            border-color: rgb(214, 36, 53);
          }
        }
      }
    }
  }
}

@media (min-width: 750px) {
  .product-list::v-deep {

    .van-cell-group {
      margin: 0 30px 0 8px;
      padding-top: 10px;
      background-color: #f8f8f8;

      .van-cell {
        padding: 0;
        background-color: #f8f8f8;
        padding-left: 10px;
        padding-top: 10px;
        padding-bottom: 10px;
        font-size: 0;
        line-height: normal;

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

                &:not(.bg-gradient) {
                  margin-left: -15px;
                }

                &.bg-gradient {
                  background-image: url('../../assets/img/bg-gradient-red.png');
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

            .van-icon {
              border-width: 2px;
              border-color: rgb(214, 36, 53);
            }
          }
        }
      }
    }
  }
}
</style>
