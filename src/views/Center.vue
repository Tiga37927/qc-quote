<!--月结系统容器-->
<template>
  <div class="page1200 clearfix">
    <aside class="qc-menu">
      <figure>
        <img src="../assets/images/company.png" alt="">
        <figcaption>{{companyName || '深圳齐心集团'}}</figcaption>
      </figure>
      <dl class="qc-menu-list">
        <dt class="qc-menu-item">
          我的月结
          <i></i>
        </dt>
      </dl>
    </aside>
    <router-view class="q-content"></router-view>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        companyName: window.user ? window.user.companyName : '深圳齐心集团'
      }
    }
  }
</script>
<style lang="less">
  .qc-menu {
    position: absolute;
    left: 0;
    width: 266px;
    height: 100%;
    background-color: #e5e5e4;
    figure {
      width: inherit;
      height: 248px;
      padding-top: 46px;
      background-color: #ed7248;
      text-align: center;
      img {
        width: 120px;
        height: 120px;
        margin: 0 auto 16px;
        border-radius: 60px;
      }
      figcaption {
        font-size: 14px;
        font-weight: 600;
        color: white;
      }
    }
    .qc-menu-list {
      width: inherit;
      min-height: 434px;
      .qc-menu-item {
        position: relative;
        width: 100%;
        height: 54px;
        line-height: 54px;
        text-align: center;
        font-size: 18px;
        font-weight: 600;
        background-color: #f7d1c3;
        cursor: pointer;
        i {
          position: absolute;
          right: 58px;
          top: 21px;
          width: 11px;
          height: 14px;
          background-image: url("../assets/images/arrow.png");
        }
      }
    }
  }

  .q-content {
    margin-left: 266px !important;
  }
</style>
