import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import utils from '@/utils/util'
import Viser from 'viser-vue'

// UI  组件按需加入
import '@/plugins/antd'
import '@/plugins/element'
// UI  组件按需加入
import '@/plugins/material'
// 全局守卫
import '@/utils/globalGuard'
// 需要加载的js
import '@/utils/loadingjs'
// 全局样式
import '@/style/global.less'

import VueI18n from 'vue-i18n'
import zh from '@/utils/language/zh.json'
import ko from '@/utils/language/ko.json'
import en from '@/utils/language/en.json'
Vue.use(VueI18n) // 通过插件的形式挂载

Vue.use(Viser)

const lang = store.getters.language
let str = 'ko'

if (lang == 'zh' || lang == 'ko' || lang == 'en') {
  str = lang
} else {
  let Mlang = (navigator.language || navigator.browserLanguage).toLowerCase()
  if (Mlang == 'zh-cn') {
    str = Mlang = 'zh'
  } else if (Mlang == 'en') {
    str = Mlang = 'en'
  } else {
    str = 'ko'
  }
  store.dispatch('ChangeLanguage', Mlang)
}

let llang = 'en_US'
switch (str) {
  case 'ko':
    llang = 'ko_KR'
    break
  case 'zh':
    llang = 'zh_CN'
    break
  default:
    break
}

;(function(d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0]
  if (d.getElementById(id)) {
    return
  }
  js = d.createElement(s)
  js.id = id
  js.src = 'https://connect.facebook.net/' + llang + '/sdk.js'
  fjs.parentNode.insertBefore(js, fjs)

  //google
  var gjs,
    fjs = d.getElementsByTagName(s)[0]
  if (d.getElementById('google-jssdk')) {
    return
  }
  gjs = d.createElement(s)
  gjs.id = 'google-jssdk'
  gjs.src = 'https://apis.google.com/js/api:client.js'
  fjs.parentNode.insertBefore(gjs, fjs)
  //naveridlogin
  var njs,
    fjs = d.getElementsByTagName(s)[0]
  if (d.getElementById('naver-jssdk')) {
    return
  }
  njs = d.createElement(s)
  njs.id = 'naver-jssdk'
  njs.src = 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js'
  fjs.parentNode.insertBefore(njs, fjs)
})(document, 'script', 'facebook-jssdk')

const i18n = new VueI18n({
  locale: str, // 语言标识
  // this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    zh: zh, // 中文语言包
    ko: ko, // 韩文语言包
    en: en // 英文语言包
  }
})

Vue.config.productionTip = false

// 将工具函数绑定到vue树上
Vue.prototype.$utils = utils
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
