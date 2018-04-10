<template>
  <div class="lous_bill_tab" v-show="tabList.rows && show">
    <table>
      <tr>
        <th :class="'td' + (index + 1)" v-for="(item, index) in tabTitle">{{ item }}</th>
      </tr>

      <tr v-for="(item, index) in tabList.rows">
        <td class="td1">
          <div class="overfl-oneline">{{item.orderDesc}}</div>
        </td>
        <td>{{item.orderId}}</td>
        <td>{{item.orderDate}}</td>
        <td>{{item.orderMoney | initNumber}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    tabTitle: {
      type: Array,
      default: []
    },

    tabList: {
      type: Object,
      default: {}
    },

    show: {
      type: Boolean,
      default: false
    }
  }
}
</script>