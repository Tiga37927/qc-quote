<template>
  <!-- 微信支付弹窗 -->
  <div class="wx_pay_src" v-show="show">
     <div class="wx_pay_src_mask"></div>
      <div class="wx_pay_src_content">
          <div class="wx_pay_src_content_container">
              <h2>请打开微信扫码支付</h2>
              <div class="photo">
                  <img :src="imgUrl"  alt="微信支付">
              </div>
              <span @click="cancel"></span>
          </div>
      </div>
  </div>
</template>

<style lang="less">
  /* --- 微信支付  --- */
  .wx_pay_src{
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
  }
  .wx_pay_src_mask{
      width: 100%;
      height: 100%;
      background: black;
      opacity: 0.5;
      position: absolute;
      top: 0;
      left: 0;
  }
  .wx_pay_src_content{
      width: 310px;
      height: 350px;
      background: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -155px;
      margin-top: -175px;
  }
  .wx_pay_src_content_container{
      position: relative;
      height: 350px;
      width: 100%;
      padding-top: 42px;
  }
  .wx_pay_src_content_container h2{
      color: #333;
      font-size: 14px;
      text-align: center;
      margin-bottom: 20px;
  }
  .wx_pay_src .photo{
      width: 200px;
      height: 200px;
      margin: 0 auto;
  }
  .wx_pay_src .photo img {
    width: 100%;
    height: 100%;
  }

  .wx_pay_src span{
      position: absolute;
      top: -10px;
      right: -10px;
      background: red;
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: #fff;
      background: black;
      font-size: 14px;
      border-radius: 100%;
      cursor: pointer;
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);

      &:before {
        display: block;
        content: "";
        width: 15px;
        height: 2px;
        background: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
      }

      &:after {
        display: block;
        content: "";
        width: 2px;
        height: 15px;
        background: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
      }
  }
  .wx_pay_src span:hover{
      background: red;
  }
</style>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    //  二维码图片
    imgUrl: {
      type: String,
      default: ''
    },
    //  关闭弹层
    hideBox: {
      type: Function
    }
  },
  methods: {
    cancel () {
      this.hideBox()
    }
  }
}
</script>