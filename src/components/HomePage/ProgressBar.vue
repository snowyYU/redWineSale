<template>
  <div class="progress-bar">
    <div class="progress-bar__inner" :style="{ width: percentage + '%' }"></div>
    <span class="progress-bar__text">当前进度：{{percentage}}%</span>
  </div>
</template>

<script>
export default {
  name: 'progress-bar',
  props: {
    percentage: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.progress-bar {
  display: block;
  position: relative;
  border: 1px solid #f7d2df;
  height: 35px;
  border-radius: 35px;
  background-color: #f7d2df;
  overflow: hidden;
  user-select: none;

  .progress-bar__inner {
    width: 0%;
    height: 100%;
    border-radius: inherit;
    background-color: #d62435;
  }

  .progress-bar__text {
    display: block;
    position: absolute;
    top: 0;
    left: 50%;
    z-index: 100;
    transform: translateX(-50%);
    font-size: 19.95px;
    color: #fff;
    line-height: 33px;
  }
}

@media (min-width: 750px) {
  .progress-bar {
    height: 35px;
    border-radius: 35px;

    .progress-bar__text {
      font-size: 19.95px;
      line-height: 33px;
    }
  }
}
</style>
