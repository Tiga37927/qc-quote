import Vue from 'vue'
import Router from 'vue-router'
import view from '@/views'
// import axios from 'axios'
import urls from '../api/urls'
import http from '../api/http'
import ShowTips from '../components/ShowTips'

const {NotFoundComponent, Center} = view

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'Center',
      component: Center,
      redirect: {name: 'ious'},
      // 嵌套路由
      children: [
        {
          path: 'apply',
          component: resolve => require(['@/views/Apply.vue'], resolve),
          beforeEnter: (to, from, next) => {
            let opt = {
              method: 'get',
              url: urls.authApply.dataUrl,
              isLoading: true,
              success: function (res) {
                let result = res.data.auth
                // 是否需要完善公司信息
                switch (result) {
                  case 'HAS_APPLY':
                    next({
                      path: '/ious'
                    })
                    break
                  case 'NOT_COMPLETED':
                    next({
                      path: '/forbidAply'
                    })
                    break
                  case 'COMPLETED':
                    next()
                }
              },
              fail: function (error) {
                ShowTips(error.msg)
              }
            }
            http(opt)
          }
        },
        {
          path: 'forbidAply',
          component: resolve => require(['@/views/ForbidAply.vue'], resolve)
        },
        {
          path: 'notAply',
          component: resolve => require(['@/views/NotAply.vue'], resolve)
        },
        {
          path: 'verify',
          component: resolve => require(['@/views/Verify.vue'], resolve)
        },
        {
          path: 'verifyfail',
          component: resolve => require(['@/views/VerifyFail.vue'], resolve)
        },
        {
          path: 'ious',
          name: 'ious',
          component: resolve => require(['@/views/Lous.vue'], resolve),
          beforeEnter: (to, from, next) => {
            let opt = {
              method: 'get',
              url: urls.getIouStatus.dataUrl,
              isNeedLoading: true,
              success: function (res) {
                let result = res.data.status
                switch (result) {
                  case 'CREDIT_ACCOUNT_APPLY_REQUESTED':
                    next({
                      path: '/verify'
                    })
                    break
                  case 'CREDIT_ACCOUNT_APPLY_REFUSED':
                    next({
                      path: '/verifyfail',
                      query: {
                        option: res.data.auditOpinion
                      }
                    })
                    break
                  case 'CREDIT_ACCOUNT_NOT_APPLY':
                    next({
                      path: '/notAply'
                    })
                    break
                  case 'CREDIT_ACCOUNT_APPLY_APPROVED':
                    next()
                }
              },
              fail: function (error) {
                ShowTips(error.msg)
              }
            }

            http(opt)
          }
        },
        // 申请页成功面
        {
          path: 'aplySuccess',
          name: 'aplySuccess',
          component: resolve => require(['@/views/AplySuccess.vue'], resolve)
        }
      ]
    },
    {
      path: '*',
      component: NotFoundComponent
    },
    //  支付页面
    {
      path: '/pay',
      name: 'pay',
      component: resolve => require(['@/views/Pay.vue'], resolve)
    },
    //  支付页成功面
    {
      path: '/paySuccess',
      name: 'paySuccess',
      component: resolve => require(['@/views/PaySuccess.vue'], resolve)
    },
    //  支付跳转页面
    {
      path: '/payHref',
      name: 'payHref',
      component: resolve => require(['@/views/payHref.vue'], resolve)
    }
  ]
})
