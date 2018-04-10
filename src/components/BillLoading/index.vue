<template>
  <div class="bill_loading_container" v-show="show">
    <img src="../../assets/images/lazyload.gif" alt="loading">
  </div>
</template>

<style lang="less">
  .bill_loading_container {
    width: 706px;
    height: 316px;
    text-align: center;
    background: #fff;
    padding-top: 120px;
    position: absolute;
    top: 142px;
    left: 98px;
    z-index: 100;

    img {
      margin: 0 auto;
      width: 100px;
      height: 90px;
      vertical-align: middle;
    }
  }
</style>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
}
</script>