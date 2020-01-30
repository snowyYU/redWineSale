<template>
  <van-cell-group class="user-info-form" :border="false">
    <van-field center v-model="formData.name" label="收件人" placeholder="请输入收件人姓名" maxlength="12" />
    <van-field center v-model="formData.phone" type="tel" label="手机号" placeholder="请输入手机号 (限领一瓶)" maxlength="11" />
    <van-field center v-model="formData.area" label="地区" placeholder="请选择地区 (省-市-县)" readonly clickable @click="handleShowAddressBox" />
    <van-field class="textarea" v-model="formData.address" type="textarea" label="详细地址" placeholder="如道路、小区、单元、楼道号、室等" maxlength="200" />
  </van-cell-group>
</template>

<script>
export default {
  name: 'userInfoForm',
  data () {
    return {
      formData: {
        name: '',
        phone: '',
        area: '',
        address: ''
      }
    }
  },
  methods: {
    handleShowAddressBox () {

    }
  }
}
</script>

<style lang="scss" scoped>
</style>
