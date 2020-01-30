<template>
  <van-cell-group class="user-address" :border="false">
    <van-cell :icon="require('../../assets/img/location.png')" :border="false">
      <template #title>
        <span class="main-text">张三（16619840266）</span>
      </template>

      <template #label>
        <span class="small-text">内蒙古自治区-鄂尔多斯市-鄂托克前旗-迎宾南 路南通街中国内蒙古海油小区15号楼1单元3层3 201室</span>
      </template>

      <van-button @click="handleChangeAddress">
        <span class="default-text">修改</span>
        <van-icon name="arrow" />
      </van-button>
    </van-cell>
  </van-cell-group>
</template>

<script>
export default {
  name: 'UserAddress',
  methods: {
    // 修改地址
    handleChangeAddress () {
      this.$emit('change')
    }
  }
}
</script>

<style lang="scss" scoped>
.user-address::v-deep {
  margin: 0 18px 30px;
  border-radius: 10px;
  overflow: hidden;

  .van-cell {
    align-items: center;
    padding: 28px;

    .van-cell__left-icon {
      margin-right: 28px;
      height: auto;
      font-size: 40px;
    }

    .van-cell__title {
      flex: unset;
      flex-grow: 1;

      .main-text {
        display: block;
        margin-bottom: 12px;
        font-size: 21.01px;
        color: #333;
        line-height: 1.2;
      }

      .van-cell__label {

        .small-text {
          font-size: 21.01px;
          color: #666;
          line-height: 1.545;
        }
      }
    }

    .van-cell__value {
      margin-left: 64px;
      flex: unset;
      flex-grow: 0;
      flex-shrink: 0;

      .van-button {
        border: 0;

        .default-text {
          margin-right: 10px;
          font-size: 21.01px;
          color: #2672ff;
          vertical-align: middle;
        }

        .van-icon {
          font-size: 20px;
          color: #2672ff;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
