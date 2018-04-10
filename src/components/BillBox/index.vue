<template>
  <div class="bill_box_container clearfix color_393a">
    <div class="fl box">
      <div class="font14">
        下月账单
      </div>
      <div class="font20">
        <b>{{ baseInfo.unpaidMoneyOfNextMon | initNumber }}</b>
      </div>
      <p class="font14">
        还款日期{{ baseInfo.repayTime }}
      </p>
    </div>
    <div class="fr box">
      <div class="font14">
        可用额度
      </div>
      <div class="font20">
        <b>{{ baseInfo.availableBalance | initNumber }}</b>
      </div>
      <p class="font14">
        总额度{{ baseInfo.maxAmount | initNumber }}
      </p>
    </div>
  </div>
</template>

<style lang="less">
  .bill_box_container {
    width: 376px;
    height: 138px;
    margin-top: 30px;

    .fl {
      width: 205px;
      height: 100%;
      background: #fcead1;
    }

    .fr{
      width: 171px;
      height: 100%;
      background: #e9e9e6;
    }

    .box {
      padding: 40px 26px 34px 26px;
      overflow: hidden;
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
  }
}
</script>