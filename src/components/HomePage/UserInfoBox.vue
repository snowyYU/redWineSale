<template>
  <van-popup
    class="user-info-box"
    v-model="popUpShow"
    closeable
    round
    close-on-popstate
    safe-area-inset-bottom
    position="bottom"
    close-icon="clear"
    :close-on-click-overlay="false"
    @closed="handlePopUpClosed"
  >
    <div class="user-info-form">
      <div class="user-info-form__title">填写收货信息，免费领取红酒</div>
      <div class="user-info-form__progress">
        <div class="tips">
          <span class="tips__label">免费领取名额仅剩：</span>
          <span class="tips__value">{{remain}}%</span>
        </div>
        <div class="progress">
          <span class="progress__text">当前进度：{{animatedNumber}}%</span>
          <div class="progress__inner" :style="{ width: animatedNumber + '%' }"></div>
        </div>
      </div>
      <div class="user-info-form__inner">
        <van-field v-model="formData.name" label="收件人" placeholder="请输入收件人姓名" maxlength="12" />
        <van-field v-model="formData.phone" type="tel" label="手机号" placeholder="请输入手机号 (限领一瓶)" maxlength="11" />
        <van-field v-model="formData.area" label="地区" placeholder="请选择地区 (省-市-县)" readonly clickable @click="handleShowAddressBox" />
        <van-field class="textarea" v-model="formData.address" type="textarea" label="详细地址" placeholder="如道路、小区、单元、楼道号、室等" maxlength="200" />
      </div>
    </div>
    <div class="submit-bar">
      <div class="submit-bar__original">
        <span class="label">总金额：</span>
        <span class="value line-through">￥680</span>
      </div>
      <div class="submit-bar__text">
        <span class="label">￥</span>
        <span class="value">0</span>
      </div>
      <van-button class="submit-bar__button" text="申请免费领取" color="#d62435" @click="handleSubmitClick" />
    </div>

    <van-popup
      class="address-box"
      v-model="addressBoxShow"
      position="bottom"
      close-on-popstate
      :get-container="getContainer"
    >
      <van-area :area-list="areaData" :columns-placeholder="['请选择', '请选择', '请选择']" @cancel="handleAddressCancel" @confirm="handleAddressConfirm" />
    </van-popup>
  </van-popup>
</template>

<script>
import areaData from '@/utils/Area'
import _ from 'lodash'
import { TimelineLite } from 'gsap'

export default {
  name: 'test',
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
      // 地区数据
      areaData: areaData
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
      return 100 - this.animatedNumber
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
    // 获取挂载节点
    getContainer () {
      return document.querySelector('.home-page')
    },
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
    // handleSubmitClick () {
    //   if (_.isEmpty(this.formData.name)) {
    //     // this.$toast('收件人姓名不能为空')
    //     this.$toast('请填写您的真实姓名')
    //     return
    //   } else if (!new RegExp('\\S').test(this.formData.name)) {
    //     // this.$toast('收件人姓名不能全为空格')
    //     this.$toast('请填写您的真实姓名')
    //     return
    //   } else if (this.formData.name.length < 2) {
    //     // this.$toast('收件人姓名不能少于2位')
    //     this.$toast('请填写您的真实姓名')
    //     return
    //   } else if (this.formData.name.length > 12) {
    //     // this.$toast('收件人姓名不能多于12位')
    //     this.$toast('请填写您的真实姓名')
    //     return
    //   } else if (_.isEmpty(this.formData.phone)) {
    //     // this.$toast('手机号码不能为空')
    //     this.$toast('请填写正确的手机号码')
    //     return
    //   } else if (new RegExp('\\D').test(this.formData.phone)) {
    //     // this.$toast('手机号码只能为数字')
    //     this.$toast('请填写正确的手机号码')
    //     return
    //   } else if (this.formData.phone.length !== 11) {
    //     // this.$toast('手机号必须为11位')
    //     this.$toast('请填写正确的手机号码')
    //     return
    //   } else if (_.isEmpty(this.formData.area)) {
    //     // this.$toast('地区不能为空')
    //     this.$toast('请填写您的收货地区')
    //     return
    //   } else if (_.isEmpty(this.formData.address)) {
    //     // this.$toast('详细地址不能为空')
    //     this.$toast('请填写准确的详细地址')
    //     return
    //   } else if (!new RegExp('\\S').test(this.formData.address)) {
    //     // this.$toast('详细地址不能全为空格')
    //     this.$toast('请填写准确的详细地址')
    //     return
    //   } else if (!new RegExp('\\D').test(this.formData.address)) {
    //     // this.$toast('详细地址不能全为数字')
    //     this.$toast('请填写准确的详细地址')
    //     return
    //   }
    //   this.formSubmit()
    // },
    handleSubmitClick () {
      this.$router.push({ name: 'getRedWine' })
    },
    // 提交表单
    formSubmit () {
      // this.loading = true
      // setTimeout(() => {
      //   this.loading = false
      // }, 1000)
      this.$router.push({ name: 'getRedWine' })
    }
  }
}
</script>

<style lang="scss" scoped>
.user-info-box::v-deep {

  .van-popup__close-icon {
    font-size: 30px;
    color: #ccc;
  }

  .van-popup__close-icon--top-right {
    top: 30px;
    right: 30px;
  }
}

.user-info-form {

  .user-info-form__title {
    padding: 28px 0 30px;
    text-align: center;
    font-size: 34px;
    font-family: "PingFang";
    color: #333;
    line-height: 1;
  }

  .user-info-form__progress {
    margin-bottom: 40px;
    text-align: center;

    .tips {
      margin-bottom: 8px;
      line-height: 1;

      .tips__label {
        font-size: 19.95px;
        color: #333;
      }

      .tips__value {
        font-size: 30.83px;
        color: #d62435;
      }
    }

    .progress {
      position: relative;
      margin: 0 auto;
      width: 451px;
      height: 35px;
      border-radius: 35px;
      background-color: #f7d2df;
      overflow: hidden;

      .progress__text {
        display: block;
        position: relative;
        z-index: 2;
        height: 100%;
        font-size: 19.95px;
        font-family: "PingFang";
        color: #fff;
        line-height: 35px;
      }

      .progress__inner {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        width: 0%;
        height: 100%;
        border-radius: 35px;
        background-color: #d62435;
      }
    }
  }

  .user-info-form__inner {
    padding: 0 36px;

    .van-cell:not(:last-child)::after {
      border-bottom: 0;
    }

    .van-cell--clickable:active {
      background-color: rgba(0, 0, 0, .1);
    }

    .van-field::v-deep {
      height: 75px;
      margin-bottom: 35px;
      padding: 0 25px;
      border-radius: 9px;
      background-color: #f2f2f2;

      &.textarea {
        height: auto;
      }

      .van-field__label {
        width: 130px;
        font-size: 26px;
        font-family: "PingFang";
        color: #333;
        line-height: 75px;
      }

      .van-cell__value {
        font-size: 26px;
        font-family: "PingFang";
        line-height: 75px;
      }
    }
  }
}

.submit-bar {
  display: flex;
  align-items: center;
  padding-left: 36px;
  box-shadow: 0px -3px 3px 0px rgba(214, 36, 53, 0.05);

  .submit-bar__original {
    flex-shrink: 0;
    font-size: 30.83px;
    font-family: "PingFang";
    color: #333;

    .label {

    }

    .value {

    }
  }

  .submit-bar__text {
    padding-right: 22px;
    flex-grow: 1;
    text-align: right;

    .label,
    .value {
      font-size: 53.33px;
      font-family: "PingFang";
      color: #d62435;
    }
  }

  .submit-bar__button {
    flex-shrink: 0;
    width: 363px;
    height: 103px;
    border: 0;
    border-radius: 0;
    font-size: 34px;
    font-family: "PingFang";
    color: #fff;
    line-height: 1.2;
  }
}

.address-box {
  .van-area::v-deep {
    .van-picker__toolbar {
      height: 88px;
      line-height: 88px;

      .van-picker__cancel,
      .van-picker__confirm {
        padding: 0 32px;
        font-size: 28px;
      }
    }
    .van-picker-column {
      font-size: 28px;
    }
  }
}
</style>
