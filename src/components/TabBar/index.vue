<template>
  <div class="tab_bar_container">
    <ul class="clearfix">
      <li v-for="(item, index) in tabList" :class="{'active': tabIndex === index }" @click="checkBillType(index)">
        <span>
          {{ item }}
        </span>
      </li>
    </ul>
  </div>
</template>

<style lang="less">
  .tab_bar_container {
    margin: 18px 0 22px 0;
    position: relative;
    left: -10px;

    li {
      float: left;
      padding: 0 12px;
      line-height: 18px;
      border-right: 1px solid #292420;
      font-size: 14px;
      color: #292420;
      cursor: pointer;

      span {
        position: relative;

        &:before {
          content: "";
          display: block;
          height: 1px;
          width: 100%;
          background: #DE1815;
          position: absolute;
          left: 0;
          bottom: 0;
          transform: scale(0);
          -webkit-transform: scale(0);
        }
      }
    }
    li:last-child {
      border-right: none;
    }

    li.active {
      color: #DE1815;

      span:before {
        transform: scale(1);
        -webkit-transform: scale(1);
        transition: transform .2s;
        -webkit-transition: transform .2s;
      }
    }
  }
</style>

<script>
export default {
  props: {
    tabList: {
      type: Array,
      default: []
    },
    tabIndex: {
      type: Number,
      default: 0
    },
    //  修改选项卡索引
    changeTabIndex: {
      type: Function
    }
  },
  data () {
    return {
      //  tabIndex: 0
    }
  },

  methods: {
    //  选项卡切换
    checkBillType (index) {
      if (this.tabIndex === index) {
        return
      }
      this.changeTabIndex(index)
    }
  }
}
</script>