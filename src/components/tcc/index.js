export default {
  install (Vue) {
    Vue.component('tcc-layout', resolve => require(['./Layout/tcc-layout'], resolve))
    Vue.component('code-layout', resolve => require(['./Layout/code-layout'], resolve))
    Vue.component('tcc-menu', resolve => require(['./Menu/tcc-menu'], resolve))
    Vue.component('tcc-form', resolve => require(['./Form/tcc-form'], resolve))
    Vue.component('tcc-timeBtn', resolve => require(['./Button/tcc-timeBtn'], resolve))
  }
}
