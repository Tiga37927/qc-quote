<template>
  <div class="lous_title_container">
    <h3 class="font16">近七日待还</h3>
    <div class="amount_to_pay_money clearfix">
      <div class="left fl font40">
        <b>{{ baseInfo.unpaidMoneyOf7Days | initNumber }}</b>
      </div>
      <button class="fr font16" @click="toPay" v-if="baseInfo.unpaidMoneyOf7Days">
        立即还款
      </button>
    </div>
    <div class="lous_title_progress">
      <p :style="{width: getLousProWidth}"></p>
    </div>
    <div class="total_to_pay color_393a">
      <em class="font14">全部待还：</em>
      {{ baseInfo.unpaidMoneyOfTotal | initNumber }}
    </div>
  </div>
</template>

<style lang="less">
  .lous_title_container{

    h3 {
      color: #030000;
      margin-bottom: 26px;
    }

    .amount_to_pay_money {
      width: 376px;
      margin-bottom: 5px;
      min-height: 52px;

      .fr {
        width: 88px;
        height: 32px;
        background: #d7181a;
        border-radius: 5px;
        color: #fff;
        cursor: pointer;
        position: relative;
        top: 10px;
      }

      .fl {
        color: #ee7448;
      }
    }

    .lous_title_progress {
      width: 376px;
      height: 9px;
      background: #b5b5b5;

      p {
        height: 100%;
        background: #d71918;
      }
    }

    .total_to_pay{
      font-size: 18px;
      margin-top: 20px;
    }
  }
</style>

<script>
export default {
  props: {
    //  月结基础信息
    baseInfo: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    toPay () {
      this.$emit('to-pay')
    }
  },
  computed: {
    //  计算月结消费显示进度条宽度
    getLousProWidth () {
      return this.baseInfo.unpaidMoneyOfTotal * 100 / this.baseInfo.maxAmount * 100 / 100 + '%'
    }
  }
}
</script>