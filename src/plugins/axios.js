'use strict'
import axios from 'axios'
import store from '@/store'

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'
axios.defaults.withCredentials = false

let config = {
  timeout: 30 * 1000 // Timeout
}

const _axios = axios.create(config)

// 请求拦截
_axios.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 相应拦截
_axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    // Do something with response error
    console.log(error)
    // let msg = ''

    // if (!error.response) {
    //   notification.error({
    //     message: 'Forbidden',
    //     description: 'error'
    //   })
    //   return Promise.reject(error)
    // }

    // switch (error.response['status']) {
    // case 500:
    // case 501:
    //   msg = '后台错误'
    //   break
    // case 502:
    // case 503:
    //   msg = '后台重启'
    //   break
    //   case 404:
    //     msg = '接口不存在'
    //     break
    //   case 401:
    //     msg = '你没有该权限'

    //     break
    //   case 400:
    //     msg = error.response.data.msg
    //     break
    //   default:
    //     msg = '未知错误'
    // }
    // notification.error({
    //   message: 'Forbidden',
    //   description: msg
    // })
    return Promise.reject(error)
  }
)
export default _axios
