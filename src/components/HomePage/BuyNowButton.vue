<template>
  <button class="buy-now-button">
    <img class="buy-now-button__image" :src="require('../../assets/img/bg-buy-now-button.png')" />
  </button>
</template>

<script>
export default {
  name: 'BuyNowButton'
}
</script>

<style lang="scss" scoped>
.buy-now-button {
  position: relative;
  display: inline-block;
  margin: 0;
  padding: 0;
  border: 0;
  outline: none;
  background-color: transparent;
  font-size: 0;
  line-height: 0;
  text-align: center;
  cursor: pointer;
  transition: opacity .2s;
  -webkit-appearance: none;
  -webkit-text-size-adjust: 100%;
  box-shadow: 0px 0px 7px 0px rgba(146, 7, 7, 0.75);

  .buy-now-button__image {
    display: block;
    width: 100%;
    height: 100%;
  }

  &::before {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background-color: #000;
    border: inherit;
    border-color: #000;
    border-radius: inherit;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    opacity: 0;
    content: ' ';
  }

  &:active::before {
    opacity: .1;
  }
}
</style>
