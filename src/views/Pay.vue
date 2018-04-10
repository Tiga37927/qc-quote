<template>
  <div class="pay_container">
    <!-- 还款明细 -->
    <repayment-details :details="getRepaymentDetails"></repayment-details>

    <!-- 支付方式 -->
    <pay-methods :pay-methods-list="getPayMethods" :select-pay-methods="selectPayMethods"></pay-methods>

    <!-- 齐采支付 -->
    <div class="pay_methods_container repayment_details_container pay_border_b clearfix"
    v-if="getPayMethods.mallBalPay && getPayMethods.mallBalPay.hasAccount"
    >
      <div class="fl font16 left">
        <b>齐采支付</b>
      </div>
      <div class="fl right">
        <!-- 余额支付够还款 -->
        <div class="moc-checkbox content" v-if="getPayMethods.mallBalPay.amountAvailable >= getRepaymentDetails.totalMoney">
          <label>
            <input type="radio" name="payMethods" v-model="payMethodsType" :value="getPayMethods.mallBalPay.paymentName"/>
            <i></i>
            <div class="font16">
              余额支付
            </div>
          </label>
          <span>
            可用余额：{{ getPayMethods.mallBalPay.amountAvailable | initNumber }}
            <!-- <a href="javascript:;" class="font16">立即充值</a> -->
          </span>
        </div>

        <!-- 余额支付不够还款 -->
        <div class="moc-checkbox content disabled" v-else>
          <span>
            可用余额：{{ getPayMethods.mallBalPay.amountAvailable | initNumber }}（不足还款）&nbsp;&nbsp;
            <a href="javascript:;" class="font16">立即充值</a>
          </span>
        </div>
      </div>
    </div>
    
    <!-- 余额支付密码 -->
    <input-pass-word
    ref="password"
    v-if="getPayMethods.mallBalPay"
    :show="showPassWord"
    :pay-info="getPayMethods.mallBalPay"
    :forgot-password-href="forgotPasswordHref"
    :create-pay-password-href="createPayPassword"
    ></input-pass-word>

    <!-- 立即付款 -->
    <div class="to_pay_btn">
      <button class="disabled" v-if="payTypeNo === '' || isMallPay">{{ isMallPay ? '正在支付...' : '立即付款' }}</button>
      <button @click="toPayMoney" v-else>立即付款</button>
    </div>

    <!-- 微信支付弹层 -->
    <w-x-pay-box
    :show="isShowWXPayBox"
    :img-url="wxPayImg"
    :hide-box="hideWXPayBox"
    ></w-x-pay-box>

    <!-- 其他支付弹层 -->
    <pay-box
    :show="isShowPayBox"
    :pay-title="payTitle"
    :hide-pay-box="hidePayBox"
    @pay-success="payBoxSuccess"
    ></pay-box>
  </div>
</template>

<style lang="less">
  .pay_container {
    padding: 58px 0 110px 0;
    width: 1055px;
    margin: 0 auto;

    .pay_methods_container {
      .right {
        height: 65px;
        position: relative;

        .moc-checkbox.content {
          position: absolute;
          top: 11px;
          left: 0;

          div {
            display: inline-block;
            padding: 5px 25px;
            border: 1px solid #e9e9e6;
            margin-left: 15px;
            position: relative;
            top: 3px;
            color: #666;
          }

          span {
            color: #666;
            position: relative;
            top: 8px;
            margin-left: 15px;
            
            a {
              color: #ee7448;
              text-decoration: underline;
            }
          }
        }

        .moc-checkbox.content.disabled {
          span {
            color: #ccc;
          }
        }
      }
    }

    .to_pay_btn {
      padding: 34px 0 0 0;
      text-align: right;

      button {
        width: 146px;
        height: 48px;
        color: #fff;
        background: #d74548;
        border-radius: 5px;
        cursor: pointer;
        font-size: 18px;
      }

      .disabled {
        background: #ccc;
      }
    }
  }
</style>

<script>
import {
  RepaymentDetails,
  PayMethods,
  InputPassWord,
  WXPayBox,
  PayBox,
  showTips
} from '../components'
import configUrl from '../api/urls'
import { mapActions, mapGetters } from 'vuex'
//  import axios from 'axios'
//  import qs from 'qs'

export default {
  data () {
    return {
      isShowWXPayBox: false,    // 是否显示微信支付
      isShowPayBox: false,       //  是否显示支付弹层
      repaymentDetailsUrl: configUrl.repaymentDetails.dataUrl,       //  还款明细URL
      getAllPayUrl: configUrl.getAllPay.dataUrl,
      payMethodsType: '',                  //  选择支付方式
      showPassWord: false,                  //   显示支付密码
      payTypeNo: '',                         //  选择支付方式数字记录
      payUrl: '',                             // 支付方式对应URL
      payTitle: '',                            //  支付名称
      wxPayImg: '',                             // 微信支付二维码图片
      isMallPay: false,                          //  是否商城余额正在支付
      forgotPasswordUrl: 'http://www.17cai.com/control/creditForgetPassword',  //  忘记密码URL
      createPayPasswordUrl: 'http://www.17cai.com/control/createPayPassword',   // 设置支付密码
      billStatusUrl: configUrl.checkBillStatus.dataUrl,                          //  查询还款状态URL
      billIds: [],               //  账单ids
      checkTimer: null          //  轮询查询付款状态
    }
  },

  components: {
    RepaymentDetails,
    PayMethods,
    InputPassWord,
    WXPayBox,
    PayBox,
    showTips
  },

  created () {
    //  查询还款明细
    this.checkRepaymentDetails()

    //  查询支付方式
    this.checkPayMethods()
  },

  methods: {
    ...mapActions(['repaymentDetails', 'payMethods', 'payMoney', 'billStatus']),

    //  查询还款明细
    checkRepaymentDetails () {
      let self = this
      let opt = {
        isLoading: false,
        type: 'post',
        url: this.repaymentDetailsUrl,
        data: {},
        errMsg: '获取还款明细失败',
        success: function (res) {
          //  console.log(res)
          res.bills.forEach(function (item) {
            self.billIds.push(item.billId)
          })
        },
        fail: function (err) {
          console.log(err)
        }
      }

      this.repaymentDetails(opt)
    },
    //  查询支付方式
    checkPayMethods () {
      let opt = {
        isLoading: false,
        type: 'post',
        url: this.getAllPayUrl,
        data: {},
        errMsg: '获取支付方式失败',
        success: function (res) {
          console.log(res)
        },
        fail: function (err) {
          console.log(err)
        }
      }

      this.payMethods(opt)
    },
    //  选择支付方式
    selectPayMethods (type) {
      this.payMethodsType = type
    },
    //  立即付款
    toPayMoney () {
      let billIds = this.billIds
      let pathname = location.pathname
      //  console.log(billIds)
      let data = {
        billIds: billIds
      }
      let self = this
      switch (this.payTypeNo) {
        //  支付宝支付
        case 0:
          //  console.log(billIds.join(''))
          this.isShowPayBox = true
          this.payTitle = '支付宝'
          window.open().location = pathname + '#/payHref?billIds=' + billIds.join('-') + '&type=aliPay'
          return

        //  微信支付
        case 1:
          this.isShowWXPayBox = true
          if (!this.wxPayImg) {
            this.wxPayImg = this.payUrl + '?' + Math.random() + '&billIds=' + billIds
          }
          //  轮询查询还款结果
          if (this.checkTimer) {
            return
          }
          this.checkTimer = setInterval(() => {
            //  查询还款状态
            this.checkBillStatus('')
          }, 3000)
          return

        // 余额支付
        case 3:
          //  未设置支付密码
          if (!this.getPayMethods.mallBalPay.hasPass) {
            showTips('请先设置设置支付密码')
            return
          }

          //  支付密码为空
          let password = this.$refs.password.password
          if (!password) {
            showTips('支付密码不能为空')
            return
          }
          data.password = password
          this.isMallPay = true
          break

        //  一键支付
        default:
          this.isShowPayBox = true
          this.payTitle = '一键'
          window.open().location = pathname + '#/payHref?billIds=' + billIds.join('-') + '&type=oneKeyPay'
          return
      }

      let opt = {
        isLoading: false,
        type: 'post',
        url: this.payUrl,
        data: data,
        //  errMsg: '支付失败',
        success: function (res) {
          console.log(res)
          self.isMallPay = false
          self.$router.push({
            name: 'paySuccess'
          })
        },
        fail: function (err) {
          showTips(err)
          self.isMallPay = false
        }
      }

      this.payMoney(opt)
    },
    //  退出支付弹层
    hidePayBox () {
      this.isShowPayBox = false
    },
    //  支付弹层支付成功
    payBoxSuccess () {
      this.hidePayBox()

      //  查询还款状态
      let errMsg = '还款失败'
      this.checkBillStatus(errMsg)
    },
    //  查询还款状态
    checkBillStatus (errMsg) {
      let self = this
      let opt = {
        isLoading: false,
        type: 'get',
        url: this.billStatusUrl,
        errMsg: errMsg,
        data: {
          billIds: this.billIds
        },
        //  errMsg: '支付失败',
        success: function (res) {
          //  console.log(res)
          if (res.isRepaySuccess) {
            //  付款成功清除轮询
            if (self.checkTimer) {
              clearInterval(self.checkTimer)
            }

            let route = self.$route.name
            if (route === 'pay') {
              self.$router.push({
                name: 'paySuccess'
              })
            }
          } else {
            if (self.checkTimer) {
              return
            }
            showTips('支付失败')
          }
        },
        fail: function (err) {
          console.log(err)
        }
      }

      this.billStatus(opt)
    },
    //  关闭微信支付弹层
    hideWXPayBox () {
      this.isShowWXPayBox = false
    },
    //  忘记密码
    forgotPasswordHref () {
      window.open().location = this.forgotPasswordUrl
    },
    //  设置支付密码
    createPayPassword () {
      window.open().location = this.createPayPasswordUrl
    }
  },

  computed: {
    ...mapGetters(['getRepaymentDetails', 'getPayMethods'])
  },

  watch: {
    //  选择支付方式
    payMethodsType (val) {
      console.log(val)
      switch (val) {
        //  支付宝支付
        case 'ALI_PAY':
          this.showPassWord = false
          this.payTypeNo = 0
          this.payUrl = configUrl.aliPay.dataUrl
          break

        //  微信支付
        case 'WX_PAY':
          this.showPassWord = false
          this.payTypeNo = 1
          this.payUrl = configUrl.wxPay.dataUrl
          break

        //  一键支付
        case 'YEE_PAY':
          this.showPassWord = false
          this.payTypeNo = 2
          this.payUrl = configUrl.yeePay.dataUrl
          break

        //  余额支付
        default:
          this.showPassWord = true
          this.payTypeNo = 3
          this.payUrl = configUrl.mallPay.dataUrl
          break
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    //  console.log(333)
    //  离开支付页面 清除轮询
    if (this.checkTimer) {
      clearInterval(this.checkTimer)
    }
    next()
  }
}
</script>