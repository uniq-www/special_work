import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'codeStandard',
      redirect: '/home/codeStandard',
      component: resolve => require(['@/views/codeStandard.vue'], resolve),
    },
    {
      path: '/home',
      name: 'home',
      component: resolve => require(['@/views/index.vue'], resolve),
      children: [
        {
          path: 'codeStandard',
          name: 'codeStandard',
          component: resolve => require(['@/views/codeStandard.vue'], resolve)
        },
        {
          path: 'formComponents',
          name: 'formComponents',
          component: resolve => require(['@/views/form/formComponents.vue'], resolve)
        },
        {
          path: 'formCode',
          name: 'formCode',
          component: resolve => require(['@/views/form/formCode.vue'], resolve)
        },
        {
          path: 'tableComponents',
          name: 'tableComponents',
          component: resolve => require(['@/views/table/tableComponents.vue'], resolve)
        },
        {
          path: 'tableCode',
          name: 'tableCode',
          component: resolve => require(['@/views/table/tableCode.vue'], resolve)
        },
        {
          path: 'btnComponents',
          name: 'btnComponents',
          component: resolve => require(['@/views/btn/btnComponents.vue'], resolve)
        },
        {
          path: 'toolsLibrary',
          name: 'toolsLibrary',
          component: resolve => require(['@/views/tools/toolsLibrary.vue'], resolve)
        }
      ]
    },
    {
      path: '/jsonCheck',
      name: 'jsonCheck',
      component: resolve => require(['@/views/jsoncheck/jsonCheck.vue'], resolve),
    },
  ]
})
