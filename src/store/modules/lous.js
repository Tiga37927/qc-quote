import * as types from '../mutation-types'
import $fetch from '../../api/request'
import Vue from 'vue'

const state = {
  lousBaseInfo: {},      //  月结基础信息
  outBill: {},             //  未出账单
  comeBill: {},            //  已出账单
  repaymentStream: {},       //  还款流水
  consumptionDetails: {},    //  消费明细
  refundRecord: {}          //  退款记录
}

const getters = {
  //  月结基础信息
  getLousBaseInfo: state => state.lousBaseInfo,

  //  未出账单
  getOutBill: state => state.outBill,

  //  已出账单
  getComeBill: state => state.comeBill,

  //  还款流水
  getRepaymentStream: state => state.repaymentStream,

  //  消费明细
  getConsumptionDetails: state => state.consumptionDetails,

  //  退款记录
  getRefundRecord: state => state.refundRecord
}

const actions = {
  //  月结基础信息
  lousBaseInfo ({ commit, state }, opt) {
    $fetch(opt).then((res) => {
      commit(types.LOUS_BASE_INFO, res)
    })
  },

  //  月结未出账单
  outBill ({ commit, state }, opt) {
    $fetch(opt).then((res) => {
      commit(types.OUT_BILL, res)
    })
  },

  //  月结已出账单
  comeBill ({ commit, state }, opt) {
    $fetch(opt).then((res) => {
      commit(types.COME_BILL, res)
    })
  },

  //  月结已出账单 明细
  comeBillDetail ({ commit, state }, opt) {
    $fetch(opt).then((res) => {
      let data = {
        result: res,
        index: opt.index
      }
      commit(types.COME_BILL_DETAIL, data)
    })
  },

  //  月结还款流水
  repaymentStream ({ commit, state }, opt) {
    $fetch(opt).then((res) => {
      commit(types.REPAYMENT_STREAM, res)
    })
  },

  //  消费明细
  consumptionDetails ({ commit, state }, opt) {
    $fetch(opt).then((res) => {
      commit(types.CONSUMPTION_DETAILS, res)
    })
  },

  //  退款记录
  refundRecord ({ commit, state }, opt) {
    $fetch(opt).then((res) => {
      commit(types.REFUND_RECORD, res)
    })
  }
}

const mutations = {
  //  月结基础信息
  [types.LOUS_BASE_INFO] (state, data) {
    state.lousBaseInfo = data
  },

  //  月结未出账单
  [types.OUT_BILL] (state, data) {
    state.outBill = data
  },

  //  月结已出账单
  [types.COME_BILL] (state, data) {
    let list = data.rows

    list.forEach(function (item) {
      item['detailList'] = {}
      item['isShowDetail'] = false
    })

    state.comeBill = data
  },

  //  月结已出账单 明细
  [types.COME_BILL_DETAIL] (state, data) {
    let index = data.index
    let obj = data.result

    //  复制详情表格
    state.comeBill['rows'][index]['detailList'] = obj

    //  设置是否显示详情参数
    state.comeBill['rows'][index]['isShowDetail'] = true

    //  更新视图
    var newObj = state.comeBill['rows'][index]
    Vue.set(state.comeBill['rows'], index, newObj)
  },

  //  还款流水
  [types.REPAYMENT_STREAM] (state, data) {
    state.repaymentStream = data
  },

  //  消费明细
  [types.CONSUMPTION_DETAILS] (state, data) {
    state.consumptionDetails = data
  },

  //  退款记录
  [types.REFUND_RECORD] (state, data) {
    state.refundRecord = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
