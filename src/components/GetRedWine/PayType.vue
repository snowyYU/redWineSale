<template>
  <van-radio-group class="pay-type" v-model="radio" checked-color="#d62435">
    <van-cell-group :border="false">
      <template v-for="item in list">
        <van-cell :key="item.id" v-if="item.show" center :icon="item.icon" :title="item.label" clickable>
          <van-radio slot="right-icon" :name="item.id" />
        </van-cell>
      </template>
    </van-cell-group>
  </van-radio-group>
</template>

<script>
import { getClientEvn } from '@/utils'

export default {
  name: 'PayType',
  props: {
    payType: {
      type: String,
      default: '1'
    }
  },
  data () {
    return {
      list: [
        {
          id: '1',
          label: '支付宝支付',
          icon: require('../../assets/img/alipay.png'),
          show: true
        },
        {
          id: '2',
          label: '微信支付',
          icon: require('../../assets/img/weChat.png'),
          show: true
        }
      ]
    }
  },
  created () {
    switch (getClientEvn()) {
      case 0:
        break
      case 1:
        // 支付宝
        this.$set(this.list, 1, Object.assign({}, this.list[1], { show: false }))
        this.$emit('update:payType', '1')
        break
      case 2:
        // 微信
        this.$set(this.list, 0, Object.assign({}, this.list[0], { show: false }))
        this.$emit('update:payType', '2')
        break
      default:
        break
    }
  },
  computed: {
    radio: {
      get () {
        return this.payType
      },
      set (val) {
        this.$emit('update:payType', val)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pay-type::v-deep {
  margin: 0 18px;

  .van-cell-group {
    border-radius: 14px;
    overflow: hidden;

    .van-cell {
      padding: 0 28px;
      height: 76px;

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
        }
      }
    }
  }
}
</style>
