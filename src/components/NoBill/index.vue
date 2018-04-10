<template>
  <div class="no_bill_container">
      <img src="../../assets/images/ui-noRecord.png" alt="没有数据" />
      <p>{{ noData }}</p>
  </div>
</template>

<style lang="less">
  .no_bill_container {
    background: #fff;
    padding: 50px 0;

    img {
      width: 123px;
      height: 123px;
      display: block;
      margin: 0 auto;
    }
    p {
      margin-top: 15px;
      text-align: center;
    }
  }
</style>

<script>
export default {
  props: {
    noData: {
      type: String,
      default: '暂无数据'
    }
  }
}
</script>