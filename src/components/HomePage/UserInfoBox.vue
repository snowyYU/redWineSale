<template>
  <van-popup
    class="user-info-box"
    v-model="popUpShow"
    position="bottom"
    closeable
    close-on-popstate
    close-icon="close"
    :close-on-click-overlay="false"
    safe-area-inset-bottom
    @closed="handlePopUpClosed"
  >
    <div class="user-info-box-content">
      <div class="progress-wrap">
        <div class="remain-txt">免费领取名额仅剩：{{remain}}%</div>
        <van-progress stroke-width="10" :percentage="animatedNumber" />
      </div>
      <div class="user-info-form">
        <div class="form-title">填写收货信息，免费领取红酒</div>
        <van-field v-model="formData.name" label="收件人" placeholder="请输入收件人姓名" maxlength="12" />
        <van-field v-model="formData.phone" label="手机号" type="tel" placeholder="请输入手机号 (限领1瓶)" maxlength="11" />
        <van-field v-model="formData.area" label="地区" placeholder="请选择地区 (省-市-县)" readonly :class="{'color-black': formData.area}" @click="handleShowAddressBox" />
        <van-field v-model="formData.address" label="详细地址" type="textarea" placeholder="如道路、小区、单元、楼道号、室等" maxlength="200" />
      </div>
    </div>
    <div class="bottom-status-bar">
      <div class="product-info">
        <div class="original-price">
          <span class="label">总金额：</span>
          <span class="value">￥680</span>
        </div>
        <div class="current-price">
          <span class="sign">￥</span>
          <span class="value">0</span>
        </div>
      </div>
      <van-button class="submit-button" color="#5e5e5e" :loading="loading" loading-text="加载中..." @click="handleSubmitClick">申请免费领取</van-button>
    </div>

    <van-popup
      v-model="addressBoxShow"
      position="bottom"
      close-on-popstate
      safe-area-inset-bottom
    >
      <van-area :area-list="areaList" :columns-placeholder="['请选择', '请选择', '请选择']" @cancel="handleAddressCancel" @confirm="handleAddressConfirm" />
    </van-popup>
  </van-popup>
</template>

<script>
import Area from '@/utils/Area'
import _ from 'lodash'
import { TimelineLite } from 'gsap'

export default {
  name: 'UserInfoBox',
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // 加载状态
      loading: false,
      // 表单参数
      formData: {
        name: '',
        phone: '',
        area: '',
        address: ''
      },
      // 进度
      percentage: 0,
      // 地区选择框显示状态
      addressBoxShow: false,
      // 地区列表数据
      areaList: Area
    }
  },
  computed: {
    popUpShow: {
      get () {
        return this.isShow
      },
      set () {
        this.$emit('update:isShow', false)
      }
    },
    animatedNumber () {
      return Math.ceil(this.percentage)
    },
    remain () {
      return 100 - Math.ceil(this.percentage)
    }
  },
  watch: {
    isShow (val) {
      if (val) {
        const timeline = new TimelineLite()
        timeline.to(this.$data, 2, { percentage: 95 })
      }
    }
  },
  methods: {
    // 用户信息弹窗关闭后回调
    handlePopUpClosed () {
      this.percentage = 0
    },
    // 显示地址选择框
    handleShowAddressBox () {
      this.addressBoxShow = true
    },
    // 取消
    handleAddressCancel () {
      this.addressBoxShow = false
    },
    // 确认
    handleAddressConfirm (arr) {
      let searchResult = []
      if (arr[2] === undefined || arr[2].code === '') {
        this.$toast('请选择地区')
        return
      }
      arr.map(item => {
        searchResult.push(item.name)
      })
      this.formData.area = [...new Set(searchResult)].join('/')
      this.addressBoxShow = false
    },
    // 提交表单
    handleSubmitClick () {
      if (_.isEmpty(this.formData.name)) {
        // this.$toast('收件人姓名不能为空')
        this.$toast('请填写您的真实姓名')
        return
      } else if (!new RegExp('\\S').test(this.formData.name)) {
        // this.$toast('收件人姓名不能全为空格')
        this.$toast('请填写您的真实姓名')
        return
      } else if (this.formData.name.length < 2) {
        // this.$toast('收件人姓名不能少于2位')
        this.$toast('请填写您的真实姓名')
        return
      } else if (this.formData.name.length > 12) {
        // this.$toast('收件人姓名不能多于12位')
        this.$toast('请填写您的真实姓名')
        return
      } else if (_.isEmpty(this.formData.phone)) {
        // this.$toast('手机号码不能为空')
        this.$toast('请填写正确的手机号码')
        return
      } else if (new RegExp('\\D').test(this.formData.phone)) {
        // this.$toast('手机号码只能为数字')
        this.$toast('请填写正确的手机号码')
        return
      } else if (this.formData.phone.length !== 11) {
        // this.$toast('手机号必须为11位')
        this.$toast('请填写正确的手机号码')
        return
      } else if (_.isEmpty(this.formData.area)) {
        // this.$toast('地区不能为空')
        this.$toast('请填写您的收货地区')
        return
      } else if (_.isEmpty(this.formData.address)) {
        // this.$toast('详细地址不能为空')
        this.$toast('请填写准确的详细地址')
        return
      } else if (!new RegExp('\\S').test(this.formData.address)) {
        // this.$toast('详细地址不能全为空格')
        this.$toast('请填写准确的详细地址')
        return
      } else if (!new RegExp('\\D').test(this.formData.address)) {
        // this.$toast('详细地址不能全为数字')
        this.$toast('请填写准确的详细地址')
        return
      }
      this.formSubmit()
    },
    // 提交表单
    formSubmit () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.user-info-box {
  max-width: 600px;
  background-color: transparent;

  &::v-deep {
    .van-popup__close-icon {
      font-size: 24px;
    }
  }

  .user-info-box-content {
    &::before {
      content: ' ';
      display: block;
      width: 100%;
      height: 50px;
      background-color: transparent;
    }

    .progress-wrap {
      padding: 25px 16px 10px 16px;
      border-radius: 20px 20px 0 0;
      background-color: #fff;

      .remain-txt {
        margin-bottom: 5px;
        font-size: 12px;
        text-align: left;
        color: #5e5e5e;
      }

      .van-progress::v-deep {
        .van-progress__portion {
          background-color: #ee0a24;
          .van-progress__pivot {
            background-color: transparent;
          }
        }
      }
    }

    .user-info-form {
      padding: 10px 16px;
      background-color: #fff;

      .form-title {
        margin-bottom: 15px;
        font-size: 14px;
        font-weight: 500;
        text-align: center;
        color: #000;
      }
      .van-field::v-deep {
        border: 1px solid #ebedf0;
        margin-bottom: 10px;
        padding: 10px 0;
        border-radius: 8px;

        &::after {
          border: 1px solid #ebedf0;
          transform: scaleY(0)
        }

        &.color-black {
          .van-cell__value {
            color: #323233;
          }
        }

        .van-field__label,
        .van-cell__title {
          flex: none;
          width: 90px;
          box-sizing: border-box;
          padding: 0 10px;
          text-align: left;
        }

        .van-cell__value {
          text-align: left;
        }
      }
    }
  }

  .bottom-status-bar {
    border-top: 1px solid #ebedf0;
    background-color: #fff;

    .product-info {
      display: inline-flex;
      align-items: center;
      width: 60%;

      .original-price {
        flex-grow: 1;
        padding: 0 10px;
        text-align: left;

        .label {

        }
        .value {
          text-decoration: line-through;
        }
      }

      .current-price {
        flex-shrink: 0;
        padding: 0 15px;
        .sign {

          font-weight: 500;
        }
        .value {
          font-size: 30px;
          font-weight: 500;
        }
      }
    }

    .submit-button {
      width: 40%;
      border-radius: 0;
    }
  }
}

@media (min-width: 600px) {
  .user-info-box {
    left: calc((100% - 600px) / 2) !important;
  }
}
</style>
