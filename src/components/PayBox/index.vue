<template>
  <div class="pay_box_container" v-show="show">
    <div class="box">
      <div class="title clearfix">
        <span class="fl font14">{{ payTitle }}支付</span>
        <span class="fr" @click="cancelBox"></span>
      </div>
      <div class="content">
        <h2>
          请您在新打开的页面上完成付款！
        </h2>
        <p>
          付款完成前请不要关闭此窗口
        </p>
        <p>
          完成付款后请根据您的情况点击下面的按钮
        </p>
      </div>

      <div class="footer">
        <a href="javascript:;" class="pay_success" @click="paySuccess">付款成功</a>
        <a href="javascript:;" @click="cancelBox">付款失败</a>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.pay_box_container {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .3);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

  .box {
    width: 356px;
    height: 198px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -99px;
    margin-left: -178px;

    .title {
      line-height: 42px;
      background: #F8F8F8;
      padding: 0 20px;

      .fr {
        width: 42px;
        height: 42px;
        position: relative;
        left: 20px;
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
        cursor: pointer;

        &:before {
          display: block;
          content: "";
          width: 16px;
          height: 1px;
          background: #333;
          position: absolute;
          top: 50%;
          left: 50%;
          -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
        }
        &:after {
          display: block;
          content: "";
          width: 1px;
          height: 16px;
          background: #333;
          position: absolute;
          top: 50%;
          left: 50%;
          -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
        }

        &:hover {
          &:before, &:after {
            background: #666;
          } 
        }
      }
    }

    .content {
      padding: 20px;

      p:first-of-type {
        margin: 5px 0;
      }
    }

    .footer {
      width: 100%;
      padding: 0 20px;
      text-align: right;
      position: absolute;
      bottom: 16px;
      left: 0;

      a {
        height: 28px;
        line-height: 28px;
        margin: 0 6px;
        padding: 0 15px;
        border: 1px solid #dedede;
        background-color: #f1f1f1;
        color: #333;
        border-radius: 2px;
        font-weight: 400;
        cursor: pointer;
        text-decoration: none;
        display: inline-block;
      }

      a.pay_success {
        border-color: #4898d5;
        background-color: #2e8ded;
        color: #fff;
      }
    }
  }
}
</style>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    payTitle: {
      type: String,
      default: ''
    },
    //  关闭弹层
    hidePayBox: {
      type: Function
    }
  },
  methods: {
    cancelBox () {
      this.hidePayBox()
    },
    paySuccess () {
      this.$emit('pay-success')
    }
  }
}
</script>