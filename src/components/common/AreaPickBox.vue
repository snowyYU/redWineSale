<template>
<div>
  <van-popup
    class="area-pick-box"
    v-model="isShow"
    position="bottom"
    close-on-popstate
    safe-area-inset-bottom
    :get-container="getContainer"
  >
    <van-area :area-list="areaData" :columns-placeholder="['请选择', '请选择', '请选择']" @cancel="handleAreaCancel" @confirm="handleAreaConfirm" />
  </van-popup>
</div>
</template>

<script>
import areaData from '@/utils/area'

export default {
  name: 'area-pick-box',
  props: {
    show: {
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
      // 地区数据
      areaData: areaData
    }
  },
  computed: {
    isShow: {
      get () {
        return this.show
      },
      set () {
        this.$emit('update:show', false)
      }
    }
  },
  methods: {
    // 取消地区选择
    handleAreaCancel () {
      this.$emit('update:show', false)
    },
    // 确认地区选择
    handleAreaConfirm (arr) {
      let pickArea = []
      if (arr[2] === undefined || arr[2].code === '') {
        this.$toast('请选择地区')
        return
      }
      arr.map(item => {
        pickArea.push(item.name)
      })
      this.$emit('confirm', [...new Set(pickArea)].join('/'))
      this.$emit('update:show', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.area-pick-box::v-deep {
  overflow: hidden;
  user-select: none;

  .van-area {

    .van-picker__toolbar {
      height: 88px;
      line-height: 88px;

      .van-picker__cancel,
      .van-picker__confirm {
        padding: 0 32px;
        font-size: 28px;
      }
    }

    .van-picker__columns {

      .van-picker-column {
        font-size: 28px;
      }
    }
  }
}

@media (min-width: 750px) {
  .area-pick-box::v-deep {
    max-width: 750px;
    left: calc((100% - 750px) / 2);

    .van-area {

      .van-picker__toolbar {
        height: 44px;
        line-height: 44px;

        .van-picker__cancel,
        .van-picker__confirm {
          padding: 0 16px;
          font-size: 14px;
        }
      }

      .van-picker__columns {

        .van-picker-column {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
