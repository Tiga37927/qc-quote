<template>
  <div class="repayment_details_container clearfix pay_border_b">
    <div class="fl font16">
      <b>还款明细</b>
    </div>
    <div class="fl right">
      <div class="title font14">
        应还总额：
        <em class="font20">{{ details.totalMoney | initNumber }}</em>
      </div>
      <div class="bottom">
        <div :class="['box', item.desc === '本月' ? 'left' : 'right']" v-for="item in details.bills">
          <div class="font14">
            <p>
              {{ item.desc }}月账单金额
            </p>
            <p class="font20">
              {{ item.money | initNumber }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
  .pay_border_b {
    border-bottom: 1px solid #bababa;
  }
  
  .repayment_details_container {

    .fl {
      width: 126px;
      /* padding: 0 5px; */
      color: #030000;
      line-height: 25px;

      .title {
        color: #393a3a;

        em {
          color: #cf1d27;
          font-weight: bold;
        }
      }
    }

    .right {
      width: 928px;
    }

    .bottom {
      padding: 18px 0 30px 0;
      overflow: hidden;

      .box {
        width: 160px;
        height: 138px;
        position: relative;
        color: #393a3a;
        float: left;
        border-right: 1px solid #fff;
        border-bottom: 1px solid #fff;

        div {
          width: 100%;
          text-align: center;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translate(0, -50%);

          p:last-child{
            margin-top: 12px;
          }
        }
      }

      .right {
        background: #e9e9e6;
      }

      .left {
        background: #fcead1;
      }
    }
  }
</style>

<script>
export default {
  props: {
    details: {
      type: Object,
      default: {}
    }
  }
}
</script>