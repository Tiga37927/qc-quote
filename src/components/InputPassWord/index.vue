<template>
  <div class="input_password font14" v-show="show">
    <div>
      请输入您的支付密码
    </div>
    <div>
      <input type="password" v-model="password" :disabled="!payInfo.hasPass">
      <a href="javascript:;" @click="forgotPassword">忘记密码</a>
      <a href="javascript:;" v-if="!payInfo.hasPass" @click="createPayPassword">未设置支付密码</a>
    </div>
  </div>
</template>

<style lang="less">
  .input_password {
    padding: 30px 5px 20px 5px;

    a {
      margin-left: 15px;
      position: relative;
      top: 6px;
      color: #0275d8;
      text-decoration: underline;
    }

    input {
      width: 200px;
      height: 30px;
      border: 1px solid #ccc;
      letter-spacing: 4px;
      padding: 0 10px;
      margin-right: 10px;
    }

    input:focus {
      border: 1px solid #0275d8;
    }

    div:first-child {
      margin-bottom: 20px;
    }
  }
</style>
<script>
export default {
  props: {
    //  是否显示支付密码框
    show: {
      type: Boolean,
      default: false
    },
    //  余额支付信息
    payInfo: {
      type: Object,
      default: {}
    },
    //  重置密码
    forgotPasswordHref: {
      type: Function
    },
    //  设置支付密码
    createPayPasswordHref: {
      type: Function
    }
  },
  data () {
    return {
      password: ''      //  支付密码
    }
  },
  methods: {
    //  忘记密码
    forgotPassword () {
      this.forgotPasswordHref()
    },
    //  设置支付密码
    createPayPassword () {
      this.createPayPasswordHref()
    }
  }
}
</script>