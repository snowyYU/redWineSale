<template>
  <div>
    <van-popup v-model="isShowAddress" get-container="body" :style="{ height: '20%' }"/>
  </div>
</template>

<script>
export default {
  name: 'CreateAddress',
  props: {
    isShow: Boolean
  },
  data () {
    return {
      // isShowAddress: this.isShow
    }
  },
  computed: {
    isShowAddress: {
      get () {
        return this.isShow
      },
      set (v) {
        return this.isShow
      }
    }
  },
  mounted () {
    console.log(2222)
  }
}
</script>

<style lang="scss" scoped>

</style>
