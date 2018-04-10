<template>
  <Header>
    <div class="q-site">
      <div class="page1200">
        <div class="locate">
          <i class="iconfont icon-locationfill"></i>
          地区：深圳市
        </div>
        <ul class="nav-list clearfix">
          <li class="nav-item">
            您好，
            <a href="https://www.17cai.com/control/memberCenter" target="_blank">{{userName || '用户'}}</a>
            <a class="level" href="javascript:;" target="_blank">{{level || 'v0'}}</a>
            <a class="coin" href="javascript:;" target="_blank">{{coinAmount || '0'}}积分</a>
            <a class="t-red" href="https://www.17cai.com/control/logout" target="_self">退出</a>
          </li>
          <li class="nav-item">
            <a href="https://www.17cai.com/control/myOrderList" target="_blank">我的订单</a>
          </li>
          <li class="nav-item">
            <a href="https://www.17cai.com/control/favorites" target="_blank">我的收藏</a>
          </li>
          <li class="nav-item">
            <a href="javascript:;" target="_blank">关注齐采网</a>
          </li>
          <li class="nav-item">
            <a href="https://www.17cai.com/control/showInformation?articleTypeId=FOOTER_HELP_5&articleId=10010"
               target="_blank">服务商入驻</a>
          </li>
          <li class="nav-item">
            <a href="https://www.17cai.com/control/showInformation?articleTypeId=FOOTER_HELP_1&articleId=A10001"
               target="_blank">帮助中心</a>
          </li>
        </ul>
        <a href="http://p.qiao.baidu.com/cps/chat?siteId=9588794&userId=21548562" class="kf"></a>
      </div>
    </div>
    <div class="h-content">
      <div class="page1200">
        <div class="logo">
          <a href="https://www.17cai.com">
            <img src="../assets/images/newLogo.png" alt="">
          </a>
        </div>
        <ul class="menu-list clearfix">
          <li class="menu-item">
            <a class="b-yellow" href="https://www.17cai.com" target="_self">返回首页</a>
          </li>
          <li class="menu-item">
            <a href="https://www.17cai.com/control/memberCenter" target="_self">齐采会员首页</a>
          </li>
          <li class="menu-item">
            <a href="https://www.17cai.com/control/myOrderList" target="_self">我的订单</a>
          </li>
          <li class="menu-item">
            <a href="https://www.17cai.com/control/myLevelPrivilege" target="_self">我的等级</a>
          </li>
          <li class="menu-item">
            <a href="https://www.17cai.com/control/myPartyCoin" target="_self">我的积分</a>
          </li>
        </ul>
      </div>
    </div>
  </Header>
</template>
<script>
  export default {
    data: function () {
      return {
        level: window.user ? window.user.level : 'v0',
        coinAmount: window.user ? window.user.coinAmount : '0',
        userName: window.user ? window.user.userName : '齐采用户'
      }
    }
  }
</script>
<style lang="less">
  .q-site {
    position: relative;
    width: 100%;
    height: 32px;
    line-height: 32px;
    background-color: #eee;
    .nav-list {
      position: absolute;
      display: flex;
      top: 0;
      right: 94px;
      .nav-item {
        position: relative;
        padding: 0 10px;
        float: left;
        &:after {
          position: absolute;
          right: 0;
          content: "|";
        }
        &:last-child {
          &:after {
            position: absolute;
            right: 0;
            content: "";
          }
        }
        a {
          display: inline-block;
          height: 100%;
        }
        .level {
          display: inline-block;
          height: 12px;
          line-height: 12px;
          margin-left: 6px;
          padding: 0 8px;
          font-size: 10px;
          background: #2eabf3 none repeat scroll 0 0;
          border-radius: 5px;
          color: #666;
        }
        .coin {

        }
        .t-red {
          margin: 0 10px;
        }
      }
    }
    .kf {
      position: absolute;
      right: 0;
      top: 0;
      display: block;
      padding: 0 10px;
      width: 100px;
      height: 32px;
      background: url(../assets/images/kf_icon_new.png) no-repeat;
      &:hover {
        background-position-y: -29px;
      }
    }
  }

  .h-content {
    position: relative;
    height: 100px;
    background-color: white;
    border-bottom: #b41521 2px solid;
    .logo {
      position: absolute;
      top: 12px;
      left: 15px;
      height: 58px;
      width: 180px;
    }
    .menu-list {
      position: absolute;
      top: 60px;
      left: 200px;
      display: flex;
      .menu-item {
        font-size: 16px;
        line-height: 36px;
        margin-right: 36px;
        float: left;
        a {
          border-radius: 12px;
          display: inline-block;
          line-height: 20px;
          margin-left: 6px;
          padding: 2px 15px;
          color: #333333;
        }
      }
    }
  }
</style>
