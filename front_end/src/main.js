import Vue from 'vue'
import App from './App.vue'
import router from './router'

import '@/assets/css/global.less'

import * as echarts from 'echarts'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// import SocketService from './utils/socket_service'

Vue.use(ElementUI)

Vue.prototype.$echarts = echarts
Vue.prototype.$http = axios
// Vue.prototype.$socket = SocketService.Instance

Vue.config.productionTip = false

// SocketService.Instance.connect()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
