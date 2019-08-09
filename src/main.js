import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './api'
import './element-ui'
import './assets/css/iconfont.css'
// import '../src/assets/css/element-variable.scss'
import VeLine from 'v-charts/lib/line.common'
Vue.component(VeLine.name, VeLine)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
