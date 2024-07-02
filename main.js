//导入网络请求的包


import store from '@/store/store.js'
// #ifndef VUE3
import Vue from 'vue'
import App from './App'





Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  app.use(store);  // 加载全局数据模块
  return {
    app
  }
}
// #endif
import {$http} from '@escook/request-miniprogram'


uni.$http = $http
$http.baseUrl = "https://api-hmugo-web.itheima.net"  // 定义基础的路由
$http.beforeRequest = function(options){
  console.log(options.url.indexOf('/my/'))
  if(options.url.indexOf('/my/') !== -1){
    console.log("进来了")
    options.header = {
      Authorization: store.state.m_user.token
    }
    console.log(options)
  }
  
  uni.showLoading({
    title:"数据加载中"
  })
  
}

$http.afterRequest = function(options){
  uni.hideLoading()
}

uni.$showMsg = function(title='数据请求失败！', duration=1500){
  uni.showToast({
    title,
    duration,
    icon: 'none'
  })
}
