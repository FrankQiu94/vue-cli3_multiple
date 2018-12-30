import Vue from 'vue'
import '@common/styles/common.css'
import App from './App'
import router from './router'
import $service from '@common/actions/service'
import FastClick from 'fastclick'

// 执行fastclick以及移动端rem适配方案
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', () => {
    FastClick.attach(document.body)
  }, false)
}

Vue.prototype.$service = $service

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
