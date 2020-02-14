<template>
  <van-cell-group class="user-info-form" :border="false">
    <van-field :border="false" center v-model="formData.name" label="收件人" placeholder="请输入收件人姓名" maxlength="12" />
    <van-field :border="false" center v-model="formData.phone" type="tel" label="手机号" placeholder="请输入手机号 (限领一瓶)" maxlength="11" />
    <van-field :border="false" center v-model="formData.area" label="地区" placeholder="请选择地区 (省-市-县)" readonly clickable @click="handleShowAreaPickBox" />
    <van-field :border="false" class="textarea" v-model="formData.address" type="textarea" label="详细地址" placeholder="如道路、小区、单元、楼道号、室等" maxlength="200" />

    <!-- 地区选择框 -->
    <area-pick-box :show.sync="areaPickBoxShow" :getContainer="getContainer" @confirm="handleAreaConfirm" />
  </van-cell-group>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import AreaPickBox from '@/components/common/AreaPickBox'

export default {
  name: 'userInfoForm',
  components: {
    AreaPickBox
  },
  props: {
    // 地区选择框挂载节点
    getContainer: {
      type: String,
      default: 'body'
    }
  },
  data () {
    return {
      // 地区选择框显示状态
      areaPickBoxShow: false,
      // 用户信息表单
      formData: {
        name: '',
        phone: '',
        area: '',
        address: ''
      }
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    // 显示地区选择框
    handleShowAreaPickBox () {
      this.areaPickBoxShow = true
    },
    // 确认地区选择
    handleAreaConfirm (pickArea) {
      this.formData['area'] = pickArea
    },
    // 表单过滤
    formCheck () {
      if (_.isEmpty(this.formData.name.trim())) {
        // this.$toast('收件人姓名不能为空')
        this.$toast('请填写您的真实姓名')
        return false
      } else if (this.formData.name.trim().length < 2) {
        // this.$toast('收件人姓名不能少于2位')
        this.$toast('请填写您的真实姓名')
        return false
      } else if (_.isEmpty(this.formData.phone.trim())) {
        // this.$toast('手机号码不能为空')
        this.$toast('请填写正确的手机号码')
        return false
      } else if (new RegExp('\\D').test(this.formData.phone)) {
        // this.$toast('手机号码只能为数字')
        this.$toast('请填写正确的手机号码')
        return false
      } else if (this.formData.phone.trim().length !== 11) {
        // this.$toast('手机号必须为11位')
        this.$toast('请填写正确的手机号码')
        return false
      } else if (_.isEmpty(this.formData.area.trim())) {
        // this.$toast('地区不能为空')
        this.$toast('请选择您的收货地区')
        return false
      } else if (_.isEmpty(this.formData.address.trim())) {
        // this.$toast('详细地址不能为空')
        this.$toast('请填写准确的详细地址')
        return false
      } else if (!new RegExp('\\D').test(this.formData.address)) {
        // this.$toast('详细地址不能全为数字')
        this.$toast('请填写准确的详细地址')
        return false
      }
      console.log('verify success')
      return true
    },
    // 表单初始化
    initForm () {
      this.formData = this.userInfo
    },
    // 提交表单
    onSubmit () {
      return new Promise((resolve, reject) => {
        if (this.formCheck()) {
          resolve(this.formData)
        } else {
          reject(new Error('表单填写错误'))
        }
      })
    },
    // 清空表单
    clearForm () {
      this.formData = {
        name: '',
        phone: '',
        area: '',
        address: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
