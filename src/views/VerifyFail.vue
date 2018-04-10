<!--审核未通过-->
<template>
  <div class="bg-verify">
    <span class="v-msg">很抱歉，您的月结申请没有通过。</span>
    <router-link class="btn btn-mid btn-red" to="apply">申请开通</router-link>
    <p class="reason">{{this.$route.query.option}}</p>
    <div class="link-group">
      <a class="" target="_self" href="https://www.17cai.com">返回齐采首页</a>
      <a class="" target="_self" href="https://www.17cai.com/control/myOrderList">返回个人中心</a>
    </div>
  </div>
</template>
