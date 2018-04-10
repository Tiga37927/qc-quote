<template>
  <div class="repayment_stream_container bg_fff" v-if="show === 2 && listObj.rows">
    <div class="lous_bill_tab" v-if="listObj.rows.length">
      <table>
        <tr>
          <th v-for="item in titleList">{{ item }}</th>
        </tr>

        <tr v-for="item in listObj.rows">
          <td>{{ item.repaymentMoney | initNumber}}</td>
          <td>{{ item.repaymentDate }}</td>
          <td>{{ item.paymentMethod }}</td>
          <td>{{ item.repaymentId }}</td>
          <td class="td1">{{ item.status }}</td>
        </tr>
      </table>
    </div>

    <!-- 没有数据显示 -->
    <no-bill :no-data="noData" v-if="!listObj.rows.length"></no-bill>
  </div>
</template>

<style lang="less">
.repayment_stream_container {
  .lous_bill_tab table td, .lous_bill_tab table th {
    width: 20%;
  }
}
</style>

<script>
import NoBill from '../NoBill'

export default {
  props: {
    show: {
      type: Number
    },
    listObj: {
      type: Object,
      default: {}
    }
  },

  data () {
    return {
      noData: '暂无还款记录',
      titleList: ['还款金额(元)', '还款时间', '支付方式', '还款单号', '还款状态']
    }
  },

  components: {
    NoBill
  }
}
</script>