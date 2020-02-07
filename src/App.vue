<template>
  <div id="app">
    <router-view />

    <!-- 当前进度弹窗 -->
    <progress-box :show.sync="isShow" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getUserInfo } from '@/utils'
import ProgressBox from '@/components/common/ProgressBox'

export default {
  components: {
    ProgressBox
  },
  computed: {
    ...mapState['progressBoxShow'],
    isShow: {
      get () {
        return this.progressBoxShow
      },
      set (val) {
        this.updateProgressBoxShow(val)
      }
    }
  },
  methods: {
    ...mapActions(['updateUserInfo', 'updateProgressBoxShow'])
  },
  created () {
    let userInfo = getUserInfo()
    if (userInfo) {
      this.updateUserInfo(userInfo)
    }
  }
}
</script>
