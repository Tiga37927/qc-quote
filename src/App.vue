<template>
  <div>
    <q-header></q-header>
    <router-view></router-view>
    <q-footer></q-footer>
  </div>
</template>

<script>
  import QHeader from './components/Header.vue'
  import QFooter from './components/Footer.vue'
  export default {
    components: {
      QHeader,
      QFooter
    }
  }
</script>

<style lang="less">
  @import "./assets/style/common.less";
</style>
