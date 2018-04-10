<template>
  <div class="com_bill_container" v-if="!show">
    <ul v-if="listObj.rows">
      <li v-for="(item, index) in listObj.rows">
        <span class="icon">{{ item.month == nowMonth ? '本' : item.month }}月账单</span>
        <div class="main">
          <div class="content">
            <div class="total_info">
              <div class="top">
                <dl>
                  <dt class="font14">
                    账单总额：<em class="font20">{{ (item.totalBillMoney || 0) | initNumber }}</em>
                  </dt>
                  <dd>
                    记账周期：{{ item.billStartDate }}至{{ item.billEndDate }}
                  </dd>
                  <dd>
                    出账日期：{{ item.billGeneratedDate }}
                  </dd>
                </dl>
              </div>

              <div class="bottom">
                <p>
                  剩余待还：{{ (item.remainingMoneyToRePay || 0) | initNumber }}
                </p>
                <p>
                  最后还款日：{{ item.lastRepayDate }}
                </p>
                <img v-if="item.billStatus === 'BILL_ALREADY_PAID'" src="../../assets/images/paid-off.png" alt="已还清">
              </div>

              <a href="javascript:;" class="font14 view_detail" @click="viewComeBillDetail(item.billId, index)" v-if="!item.isShowDetail">查看消费明细</a>
              <a class="view_detail font14" href="javascript:;" v-else @click="hideDetial(item)">收起</a>
              <a href="javascript:;" class="font14 view_detail" @click="exportBill(item.billId)">导出账单</a>
            </div>

            <!-- 表格 -->
            <lous-bill-tab
            :tab-list="item.detailList"
            :tab-title="tabTitle"
            :show="item.isShowDetail"
            ></lous-bill-tab>
          </div>
        </div>
      </li>
    </ul>
    
    <!-- 没有数据时 -->
    <no-bill v-if="listObj.rows && !listObj.rows.length" :no-data="noData"></no-bill>
  </div>
</template>

<style lang="less">
  .com_bill_container {
    li {
      padding-left: 42px;
      position: relative;

      span {
        display: block;
        width: 85px;
        height: 22px;
        background: url(../../assets/images/bill-icon.png) no-repeat center center;
        line-height: 22px;
        text-align: center;
        font-size: 12px;
        color: #fff;
        position: absolute;
        top: 0;
        left: 0;
      }

      .main {
        padding: 0 0 20px 48px;
        border-left: 1px solid #eb7447;
        position: relative;

        &:before {
          display: block;
          content: "";
          width: 4px;
          height: 4px;
          background: #fef5e9;
          position: absolute;
          top: 22px;
          left: -2px;
        }

        &:after {
          display: block;
          content: "";
          width: 4px;
          height: 4px;
          background: #fef5e9;
          position: absolute;
          bottom: 0;
          left: -2px;
        }

        .content {
          width: 100%;
          min-height: 100px;
          background: #fff;

          .total_info {
            padding: 22px 25px 36px 25px;

            .top {
              margin-bottom: 20px;
              padding-left: 20px;
              dt {
                color: #323232;
              }

              dd {
                font-size: 12px;
                color: #a5a5a5;
                line-height: 25px;
              }
            }

            .bottom {
              margin-bottom: 12px;
              padding: 15px 20px;
              border: 1px solid #eb7447;
              position: relative;

              p:last-child {
                margin-top: 10px;
              }

              img {
                display: block;
                width: 132px;
                height: 74px;
                position: absolute;
                right: 106px;
                bottom: -23px;
              }
            }

            a.view_detail {
              color: #DF3735;
              text-decoration: underline;
            }
            a.view_detail:last-of-type{
              padding-left: 10px;
            }
          }
        }
      }
    }
  }
  .com_bill_container li:last-child{
    .main {
      border-left: none;
    }
  }
</style>

<script>
import LousBillTab from '../LousBillTab'
import TestJson from '../TestTab.json'
import NoBill from '../NoBill'
import configUrl from '../../api/urls'

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
      tabTitle: ['订单名称', '订单编号', '订单时间', '订单金额'],
      tabList: TestJson.detailsInfo,
      noData: '暂无账单',
      nowMonth: new Date().getMonth() + 1,     //  本月
      exportBillUrl: configUrl.exportBill.dataUrl
    }
  },

  components: {
    LousBillTab,
    NoBill
  },

  methods: {
    //  查询账单明细
    viewComeBillDetail (billId, index) {
      let msg = {
        billId: billId,
        index: index
      }
      this.$emit('view-come-bill-detail', msg)
    },

    //  隐藏显示详情
    hideDetial (item) {
      this.$set(item, 'isShowDetail', false)
    },

    //  导出账单
    exportBill (billId) {
      let url = this.exportBillUrl + '?billId=' + billId
      window.open(url)
    }
  }
}
</script>