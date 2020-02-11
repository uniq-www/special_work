import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import Tcc from './components/tcc'
import Highlight from './assets/js/highlight'
import JsonViewer from 'vue-json-viewer'

Vue.config.productionTip = false;

Vue.use(JsonViewer);
Vue.use(Antd);
Vue.use(Tcc);
Vue.use(Highlight);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
