<template>
  <div class="pay_href_container page1200 font14">
    正在加载，请稍后...
    <div v-html="html"></div>
  </div>
</template>

<style lang="less">
.pay_href_container {
  text-align: center;
  min-height: 400px;
  line-height: 400px;
}
</style>

<script>
import configUrl from '../api/urls'
import axios from 'axios'
import qs from 'qs'

export default {
  data () {
    return {
      html: '',
      payUrl: configUrl.aliPay.dataUrl,   //  支付宝支付URL
      oneKeyPayUrl: configUrl.yeePay.dataUrl      //  一键支付
    }
  },

  created () {
    let query = this.$route.query
    let billIds = query.billIds.split('-')
    if (query.type === 'aliPay') {
      this.toPayMoney(billIds)
      return
    }

    //  一键支付
    this.OneKeyPay(billIds)
  },

  methods: {
    //  支付宝支付
    toPayMoney (billIds) {
      let data = {
        billIds: billIds
      }

      axios({
        method: 'post',
        url: this.payUrl,
        data: qs.stringify(data)
      })
      .then((res) => {
        console.log(res)
        this.html = res.data
        this.$nextTick(function () {
          document.forms[0].submit()
        })
      })
    },
    //  一键支付
    OneKeyPay (billIds) {
      let arr = []
      for (let i = 0; i < billIds.length; i++) {
        let input = '<input type="hidden" name="billIds" value="' + billIds[i] + '">'
        arr.push(input)
      }

      this.html = '<form action="' + this.oneKeyPayUrl + '" methods="get">' + arr.join('') + '</form>'
      this.$nextTick(function () {
        document.forms[0].submit()
      })
    }
  }
}
</script>
