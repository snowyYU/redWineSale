<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { getClientEvn } from '@/utils'

export default {
  name: 'app',
  methods: {
    ...mapActions(['updateClientEvn'])
  },
  created () {
    // 存储浏览器环境
    this.updateClientEvn(getClientEvn())
  }
}
</script>
