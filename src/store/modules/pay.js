import * as types from '../mutation-types'
import $fetch from '../../api/request'

const state = {
  repaymentDetails: {},      //  月结基础信息
  payMethods: {},            //  支付方式
  payMoney: {},                //  付款
  billStatus: {}               // 查询支付状态
}

const getters = {
  //  月结基础信息
  getRepaymentDetails: state => state.repaymentDetails,

  //  支付方式
  getPayMethods: state => state.payMethods
}

const actions = {
  //  月结基础信息
  repaymentDetails ({ commit, state }, opt) {
    $fetch(opt).then((res) => {
      commit(types.REPAYMENT_DETAILS, res)
    })
  },
  //  获取支付方式
  payMethods ({ commit, state }, opt) {
    $fetch(opt).then((res) => {
      commit(types.PAY_METHODS, res)
    })
  },
  //  立即付款
  payMoney ({ commit, state }, opt) {
    $fetch(opt).then((res) => {
      commit(types.PAY_MONEY, res)
    })
  },
  //  查询付款状态
  billStatus ({ commit, state }, opt) {
    $fetch(opt)
  }
}

const mutations = {
  //  月结基础信息
  [types.REPAYMENT_DETAILS] (state, data) {
    state.repaymentDetails = data
  },
  //  月结基础信息
  [types.PAY_METHODS] (state, data) {
    state.payMethods = data
  },
  //  立即付款
  [types.PAY_MONEY] (state, data) {
    state.payMoney = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
