<template>
  <div class="progress" :style="{width: width + 'px', height: height + 'px'}">
    <div class="stroke" :style="{width: lineWidth + 'px', height: 'inherit', backgroundColor: '#ee3434'}"></div>
    <span class="percent">{{percentage}}%</span>
  </div>
</template>
<script>
  export default {
    props: {
      percentage: {
        type: Number,
        default: 0,
        required: true,
        validator: val => val >= 0 && val <= 100
      },
      width: {
        type: Number,
        default: 126
      },
      height: {
        type: Number,
        default: 6
      },
      lineWidth: {
        type: Number,
        default: 126
      }
    }
  }
</script>
<style lang="less">
  .progress {
    position: relative;
    .percent {
      position: absolute;
      right: -10px;
    }
  }
</style>
