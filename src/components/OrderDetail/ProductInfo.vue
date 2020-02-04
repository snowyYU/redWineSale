<template>
  <van-cell-group class="product-info" :border="false">
    <!-- 标题 -->
    <van-cell class="product-info__title" v-if="title" center :border="border">
      <template #title>
        <div v-html="title"></div>
      </template>
    </van-cell>

    <template v-for="item in list">
      <van-cell :key="item.id" center :border="border">
        <template #title>
          <div v-html="item.label"></div>
        </template>

        <template>
          <div v-html="item.value"></div>
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
      flex: none;

      div {
        font-size: 21.01px;
        color: #333;
      }
    }

    .van-cell__value {
      flex: 1 0 auto;

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
