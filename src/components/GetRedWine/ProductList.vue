<template>
  <div class="product-list">
    <product-info />
  </div>
</template>

<script>
import ProductInfo from '@/components/GetRedWine/ProductInfo'

export default {
  name: 'ProductList',
  components: {
    ProductInfo
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.product-list {
  padding: 0 10px;
}
</style>
