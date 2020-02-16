<template>
  <van-radio-group class="pay-type" v-model="payTypeRadio" checked-color="#d62435">
    <van-cell-group :border="false">
      <template v-for="item in list">
        <van-cell v-if="item.show" :key="item.id" center :icon="item.icon" :title="item.label" clickable @click="handlePayTypePick(item.id)">
          <van-radio slot="right-icon" :name="item.id" />
        </van-cell>
      </template>
    </van-cell-group>
  </van-radio-group>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PayType',
  props: {
    payType: {
      type: String,
      default: '2'
    }
  },
  data () {
    return {
      list: [
        {
          id: '2',
          label: '支付宝支付',
          icon: require('../../assets/img/alipay.png'),
          show: true
        },
        {
          id: '1',
          label: '微信支付',
          icon: require('../../assets/img/weChat.png'),
          show: true
        }
      ]
    }
  },
  computed: {
    ...mapState(['clientEvn']),
    payTypeRadio: {
      get () {
        return this.payType
      },
      set (val) {
        if (this.payTypeRadio !== val) {
          this.$emit('update:payType', val)
        }
      }
    }
  },
  created () {
    switch (this.clientEvn) {
      case 0:
        // 浏览器
        break
      case 1:
        // 微信
        this.$set(this.list, 0, Object.assign({}, this.list[0], { show: false }))
        this.payTypeRadio = '1'
        break
      case 2:
        // 支付宝
        this.$set(this.list, 1, Object.assign({}, this.list[1], { show: false }))
        this.payTypeRadio = '2'
        break
      default:
        break
    }
  },
  methods: {
    // 切换支付类型
    handlePayTypePick (val) {
      this.payTypeRadio = val
    }
  }
}
</script>

<style lang="scss" scoped>
.pay-type::v-deep {

  .van-cell-group {
    margin: 0 18px;
    border-radius: 14px;
    user-select: none;
    overflow: hidden;

    .van-cell {
      padding: 0 30px 0 28px;
      height: 75px;
      font-size: 0;
      line-height: normal;

      &:not(:last-child)::after {
        right: 28px;
        left: 28px;
      }

      .van-cell__left-icon {
        margin-right: 20px;
        height: auto;
        font-size: 50px;
      }

      .van-cell__title {

        span {
          font-size: 26.74px;
          color: #333;
        }
      }

      .van-radio {

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
  .pay-type::v-deep {

    .van-cell-group {
      margin: 0 18px;
      border-radius: 14px;

      .van-cell {
        padding: 0 30px 0 28px;
        height: 75px;

        &:not(:last-child)::after {
          right: 28px;
          left: 28px;
        }

        .van-cell__left-icon {
          margin-right: 20px;
          font-size: 50px;
        }

        .van-cell__title {

          span {
            font-size: 26.74px;
          }
        }

        .van-radio {

          .van-radio__icon {
            font-size: 40px;

            .van-icon {
              border-width: 2px;
            }
          }
        }
      }
    }
  }
}
</style>
