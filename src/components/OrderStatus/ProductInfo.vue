<template>
  <van-cell-group class="product-info" :border="false">
    <!-- 标题 -->
    <van-cell class="product-info__title" v-if="title" center :border="border">
      <template #title>
        <div v-html="title"></div>
      </template>
    </van-cell>

    <template v-for="item in productList">
      <van-cell :key="item.id" center :border="border">
        <template #title>
          <div v-html="item.label"></div>
        </template>

        <template>
          <div v-html="item.value" @click="handleItemClick(item)"></div>
        </template>
      </van-cell>
    </template>
  </van-cell-group>
</template>

<script>

export default {
  name: 'test',
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    },
    title: {
      type: String,
      default: ''
    },
    border: {
      type: Boolean,
      default: false
    },
    isPaid: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    productList () {
      if (!this.isPaid) {
        return this.list.filter(item => item.label !== '订单号')
      }
      return this.list
    }
  },
  methods: {
    handleItemClick (item) {
      if (item.label === '订单号') {
        this.$copyText(item.value).then(() => {
          this.$toast('已复制到剪贴板')
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.product-info::v-deep {
  margin: 0 18px;
  padding: 0 0 10px 0;
  border-radius: 15px;
  overflow: hidden;
  user-select: none;

  .product-info__title {
    height: 70px;

    .van-cell__title {

      div {
        font-size: 26px;
        font-weight: 500;
        color: #333;
      }
    }
  }

  .van-cell {
    padding: 0 28px;
    height: 60px;
    font-size: 0;
    line-height: normal;

    .van-cell__title {
      flex:  1 0 auto;

      div {
        font-size: 21.01px;
        color: #333;
      }
    }

    .van-cell__value {
      flex: none;

      div {
        font-size: 21.01px;
        color: #333;
      }
    }
  }
}

@media (min-width: 750px) {
  .product-info::v-deep {
    margin: 0 18px;
    padding: 0 0 10px 0;
    border-radius: 15px;

    .product-info__title {
      height: 70px;

      .van-cell__title {

        div {
          font-size: 26px;
        }
      }
    }

    .van-cell {
      padding: 0 28px;
      height: 60px;

      .van-cell__title {

        div {
          font-size: 21.01px;
        }
      }

      .van-cell__value {

        div {
          font-size: 21.01px;
        }
      }
    }
  }
}
</style>
