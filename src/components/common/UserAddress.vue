<template>
  <van-cell-group class="user-address" :border="false">
    <van-cell center :icon="require('../../assets/img/location.png')" :border="false">
      <template #title>
        <span class="main-text">{{username}}（{{userInfo.phone}}）</span>
      </template>

      <template #label>
        <span class="small-text van-multi-ellipsis--l3">{{userInfo.area}} {{userInfo.address}}</span>
      </template>

      <a class="edit-button" v-if="!isPaid" @click="handleChangeAddress">
        <span class="default-text">修改</span>
        <i class="arrow-right"></i>
      </a>
    </van-cell>

    <!-- 修改地址弹窗 -->
    <address-edit-box :show.sync="addressEditBoxShow" :getContainer="getContainer" />
  </van-cell-group>
</template>

<script>
import { mapState } from 'vuex'
import AddressEditBox from '@/components/common/AddressEditBox'

export default {
  name: 'UserAddress',
  components: {
    AddressEditBox
  },
  props: {
    // 支付状态
    isPaid: {
      type: Boolean,
      default: false
    },
    getContainer: {
      type: String,
      default: 'body'
    }
  },
  data () {
    return {
      // 修改地址弹窗
      addressEditBoxShow: false
    }
  },
  computed: {
    ...mapState(['userInfo']),
    // 用户名限制长度
    username () {
      if (this.userInfo.name && this.userInfo.name.length > 5) {
        return this.userInfo.name.substr(0, 5) + '...'
      }
      return this.userInfo.name || ''
    }
  },
  methods: {
    // 修改地址
    handleChangeAddress () {
      this.addressEditBoxShow = true
    }
  }
}
</script>

<style lang="scss" scoped>
.user-address::v-deep {
  margin: 0 18px;
  border-radius: 10px;
  overflow: hidden;
  user-select: none;

  .van-cell {
    padding: 29px;
    font-size: 0;
    line-height: normal;

    .van-cell__left-icon {
      margin-right: 28px;
      min-width: auto;
      height: auto;
      font-size: 0;
      line-height: normal;

      .van-icon__image {
        width: 32px;
        height: 38px;
      }
    }

    .van-cell__title {
      flex: auto;

      .main-text {
        display: block;
        font-size: 21.01px;
        color: #333;
        line-height: 1;
      }

      .van-cell__label {
        margin-top: 12px;

        .small-text {
          font-size: 21.01px;
          color: #666;
          line-height: 1.545;
        }
      }
    }

    .van-cell__value {
      flex: none;
      margin-left: 85px;

      .edit-button {
        display: block;
        font-size: 0;

        .default-text {
          display: inline-block;
          margin-right: 17px;
          font-size: 21.01px;
          color: #2672ff;
          line-height: 1;
          vertical-align: middle;
        }

        .arrow-right {
          display: inline-block;
          width: 13px;
          height: 21px;
          background-image: url('../../assets/img/arrow-right.png');
          background-repeat: no-repeat;
          background-position: center;
          background-size: 100% 100%;
          vertical-align: middle;
        }
      }
    }
  }
}

@media (min-width: 750px) {
  .user-address::v-deep {
    margin: 0 18px;
    border-radius: 10px;

    .van-cell {
      padding: 29px;

      .van-cell__left-icon {
        margin-right: 28px;

        .van-icon__image {
          width: 32px;
          height: 38px;
        }
      }

      .van-cell__title {

        .main-text {
          font-size: 21.01px;
        }

        .van-cell__label {
          margin-top: 12px;

          .small-text {
            font-size: 21.01px;
          }
        }
      }

      .van-cell__value {
        margin-left: 85px;

        .edit-button {

          .default-text {
            margin-right: 17px;
            font-size: 21.01px;
          }

          .arrow-right {
            width: 13px;
            height: 21px;
          }
        }
      }
    }
  }
}
</style>
