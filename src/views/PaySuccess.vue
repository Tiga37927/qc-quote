<template>
  <div class="pay_success_container">
    <div class="content clearfix">
      <div class="left fl"></div>
      <div class="right fl">
        <h2 class="font14">
          月结还款成功
        </h2>
        <ul>
          <li class="font20" v-for="(item, index) in backList" @click="back(index)">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="less">
  .pay_success_container {
    width: 1200px;
    height: 588px;
    position: relative;
    margin: 0 auto;


    .content {
      position: absolute;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);

      .left {
        width: 250px;
        height: 282px;
        background: url(../assets/images/lous-pos.png) no-repeat;
        background-position: 0 -582px;
        margin-right: 30px;
      }

      .right {
        padding-top: 121px;
        h2 {
          color: #393a3a;
          font-weight: bold;
        }

        li {
          color: #d21719;
          text-decoration: underline;
          cursor: pointer;
        }

        li:first-child {
          margin: 25px 0 22px 0;
        }
      }
    }
  }
</style>

<script>
export default {
  data () {
    return {
      backList: ['返回齐采首页', '返回个人中心']
    }
  },

  methods: {
    back (index) {
      if (!index) {
        console.log(index)
        window.location.href = 'http://www.17cai.com'
      } else {
        window.location.href = 'http://www.17cai.com/control/memberCenter'
      }
    }
  }
}
</script>