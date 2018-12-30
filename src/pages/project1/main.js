import Vue from 'vue'
import '@common/styles/common.css'
import App from './App'
import $service from '@common/actions/service'
import FastClick from 'fastclick'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'

Vue.use(ElementUI)

// 执行fastclick以及移动端rem适配方案
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', () => {
    FastClick.attach(document.body)
  }, false)
}

// 挂载axios请求
Vue.prototype.$service = $service

new Vue({
  render: h => h(App)
}).$mount('#app')
