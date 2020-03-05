import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'assets/js/htmlFontSize.js'
import 'assets/css/index.scss'
import 'assets/js/filters.js'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
