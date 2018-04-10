<template>
  <div class="bg_fff" v-if="show === 4 && listObj.rows">
    <div class="lous_bill_tab">
      <table>
        <tr>
          <th v-for="item in titleList">{{ item }}</th>
        </tr>

        <tr  v-for="item in listObj.rows">
          <td class="td1">
            <div class="overfl-oneline" :title="item.orderDesc">{{ item.orderDesc }}</div>
          </td>
          <td>{{ item.orderId }}</td>
          <td>{{ item.orderDate }}</td>
          <td>{{ item.orderMoney | initNumber }}</td>
          <td>{{ item.orderStatus }}</td>
          <td>{{ item.isNeedInovoice }}</td>
        </tr>
      </table>
    </div>

    <!-- 没有数据显示 -->
    <no-bill :no-data="noData" v-if="!listObj.rows.length"></no-bill>
  </div>
</template>

<style lang="less">
  .lous_bill_tab {
    table {
      th, td {
        width: 16.6666666%;
      }
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
      noData: '暂无消费明细',
      titleList: ['订单名称', '订单编号', '消费时间', '订单金额(元)', '订单状态', '是否开票']
    }
  },

  components: {
    NoBill
  }
}
</script>