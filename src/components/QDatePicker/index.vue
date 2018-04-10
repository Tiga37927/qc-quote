<template>
  <div class="date-picker">
    <div class="input" v-text="value" @click="panelState = !panelState">
    </div>
    <div class="date-panel" v-show="panelState">
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        panelState: false // 初始值，默认panel关闭
      }
    },
    props: {
      value: String
    }
  }
</script>
