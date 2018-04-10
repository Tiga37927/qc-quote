/**
 * Created by yx on 2017/9/5.
 */
let proPrefix = 'https://vip.17cai.com/security'
let devPrefix = 'http://192.168.16.148:8080/qc-user/security'
let prefix = process.env.NODE_ENV === 'production' ? proPrefix : devPrefix

export default {
  // 文件异步上传
  upload: {
    dataUrl: prefix + '/iou/creditAccount/upload'
  },
  // 查询月结状态
  getIouStatus: {
    dataUrl: prefix + '/iou/creditAccount/getIouStatus'
  },
  // 提交月结申请
  apply: {
    dataUrl: prefix + '/iou/creditAccount/apply'
  },
  // 获取申请授权信息
  authApply: {
    dataUrl: prefix + '/iou/creditAccount/authApply'
  },
  // 查询用户个人信息
  personInfo: {
    dataUrl: prefix + '/iou/creditAccount/personInfo'
  },
  //  月结基础信息
  lousBaseInfo: {
    dataUrl: prefix + '/iou/creditAccount/baseIouInfo'
  },
  //  月结 未出账单
  unsettled: {
    dataUrl: prefix + '/iou/creditAccount/bill/unsettled'
  },
  //  月结 已出账单
  comeBill: {
    dataUrl: prefix + '/iou/creditAccount/bill/present'
  },
  //  月结 已出账单明细
  comeBillDetail: {
    dataUrl: prefix + '/order/bill/info'
  },
  //  月结 还款流水
  repaymentStream: {
    dataUrl: prefix + '/iou/creditAccount/bill/repayment/record'
  },
  //  月结 消费明细
  consumptionDetails: {
    dataUrl: prefix + '/order/bill/all/info'
  },
  //  月结 退款记录
  refundRecord: {
    dataUrl: prefix + '/order/refund/record'
  },
  //  月结还款明细
  repaymentDetails: {
    dataUrl: prefix + '/iou/creditAccount/bill/repayment/info'
  },
  //  获取支付方式
  getAllPay: {
    dataUrl: prefix + '/pay/get_all_pay'
  },
  //  支付宝支付
  aliPay: {
    dataUrl: prefix + '/pay/ali_pay'
  },
  //  微信支付
  wxPay: {
    dataUrl: prefix + '/pay/wx_pay'
  },
  //  一键支付
  yeePay: {
    dataUrl: prefix + '/pay/yee_pay'
  },
  //  商城余额支付
  mallPay: {
    dataUrl: prefix + '/pay/mall_bal_pay'
  },
  //  查询还款状态
  checkBillStatus: {
    dataUrl: prefix + '/pay/isBillsRepaySuccess'
  },
  //  导出账单
  exportBill: {
    dataUrl: prefix + '/iou/creditAccount/bill/detail/export'
  }
}
