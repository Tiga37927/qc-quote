// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import showLoading from './mixins/Loading'
import tips from './mixins/Tips'
import initNumber from './filter/initNumber'
require('es6-promise').polyfill()

Vue.filter('initNumber', initNumber)

Vue.config.productionTip = false
// 全局混入
Vue.mixin({
  created: function () {
  },
  methods: {
    showLoading,
    tips
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
