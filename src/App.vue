<template>
  <div id="app">
    <router-view />
    <global-overlay />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { getClientEvn } from '@/utils'
import GlobalOverlay from '@/components/common/GlobalOverlay'

export default {
  name: 'app',
  components: {
    GlobalOverlay
  },
  methods: {
    ...mapActions(['updateClientEvn'])
  },
  created () {
    // 存储浏览器环境
    this.updateClientEvn(getClientEvn())
    // _ai_analysis()
  }
}
</script>
