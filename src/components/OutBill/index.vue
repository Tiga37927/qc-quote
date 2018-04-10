<template>
  <div class="out_bill_container" v-if="show === 1">
    <div class="top bg_fff">
      <h3 class="font14">
        {{ outBillObj.month }}月累计待还：
        <em class="font20">{{ outBillObj.accumulatedMoneyToRepay | initNumber }}</em>
      </h3>
      <p>
        记账周期：{{ outBillObj.billStartDate }} 至 {{ outBillObj.billEndDate }}
      </p>
      <p>
        出账日期：{{ outBillObj.billGeneratedDate }}
      </p>
    </div>
 
    <div class="show_tab lous_bill_tab hide">
      <table class="bg_fff">
        <tr>
          <th v-for="$index in 4">{{ '未出账单' + $index }}</th>
        </tr>

        <tr v-for="$index in 4">
          <td class="td1">
            <div class="overfl-oneline">{{'商品名称'}}</div>
          </td>
          <td>{{31232312321}}</td>
          <td>{{'2017-05-08'}}</td>
          <td>{{645}}</td>
        </tr>
      </table>
    </div>

    <!-- 没有数据显示 -->
    <no-bill class="hide" :no-data="noData"></no-bill>
  </div>
</template>

<style lang="less">
  .out_bill_container {
    

    .lous_bill_tab {
      padding: 0 2px;
    }
    .top {
      padding: 20px;
      border: 1px solid  #d8dce5;
      line-height: 25px;

      h3 {
        color: #323232;
      }
      p {
        color: #a5a5a5;
      }
    }
  }
</style>

<script>
import NoBill from '../NoBill'

export default {
  props: {
    outBillObj: {
      type: Object,
      default: () => ({})
    },
    show: {
      type: Number
    }
  },

  data () {
    return {
      noData: '本月暂无账单'
    }
  },
  components: {
    NoBill
  }
}
</script>