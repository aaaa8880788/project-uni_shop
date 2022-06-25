import App from './App'
import store from './store'
// 导入字体图标
import './static/font-icon/iconfont.css'

import {showToast} from './utils/hook-toast.js'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
Vue.prototype.$store = store

App.mpType = 'app'
const app = new Vue({
	store,
    ...App
})

uni.$showToast = showToast

app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif