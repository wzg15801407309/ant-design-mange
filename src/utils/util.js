import vue from 'vue'
import store from '@/store'
export default {
  // 根据时间判断是早上，上午，中午，下午，晚上
  timeFix(data) {
    const time = new Date()
    const hour = time.getHours()
    return hour < 9
      ? data.morning
      : hour <= 11
      ? data.amgood
      : hour <= 13
      ? data.noon
      : hour < 20
      ? data.pmGood
      : data.night
  },
  //判断是否是url地址
  isUrl(path) {
    const reg = /(http|https):\/\/([\w.]+\/?)\S*/
    return reg.test(path)
  },
  //logo 不是链接的处理
  logoShow(url) {
    if (url != '' && this.isUrl(url)) {
      return url
    }
    return 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
  },
  //类型转换
  typeWord(type) {
    let types = ''
    switch (type) {
      case 1:
        types = '论坛'
        break
      case 0:
        types = '预约'
        break
      case 2:
        types = '其他'
        break
      default:
        console.log('没有得数据类型')
        break
    }
    return types
  },
  //根据type 拼接出show跳转的链接
  getUrl(type, code) {
    let url = ''
    switch (type) {
      case 0: //预约
        url =
          process.env.VUE_APP_RESERVATION_SHOW_URL +
          code +
          '?token=' +
          store.getters.token
        break
      case 1: // 论坛
        url =
          process.env.VUE_APP_FORUM_SHOW_URL +
          code +
          '?token=' +
          store.getters.token
        break
      case 2: //其他
        if (url == null) {
          url = 'https://vue.ant.design'
        }
        break
      default:
        console.log('没有的数据类型')
        break
    }

    return url
  },
  // 后台配置链接
  getBackstageUrl(type, id) {
    let url = ''
    switch (type) {
      case 0: //预约
        url =
          process.env.VUE_APP_RESERVATION_BACKSTAGE_URL +
          id +
          '?token=' +
          store.getters.token
        break
      case 1: // 论坛
        url =
          process.env.VUE_APP_FORUM_BACKSTAGE_URL +
          `?id=${id}&token=` +
          store.getters.token 
        break
      case 2: //其他
        if (url == null) {
          url = ''
        }
        break
      case 3: // 预约数据统计平台
        url =
          process.env.VUE_APP_PANGSKY_RESERVATION_CONSOLE +
          `login?id=${id}&token=${store.getters.token}`
        break
      default:
        console.log('没有的数据类型')
        break
    }

    return url
  },
  //返回后台配置链接
  getLinkUrl(type) {
    let url = ''
    switch (type) {
      case 0: //预约
        url = process.env.VUE_APP_RESERVATION_SHOW_URL
        break
      case 1: // 论坛
        url = process.env.VUE_APP_FORUM_SHOW_URL
        break
      case 2: //其他
        if (url == null) {
          url = 'https://'
        }
        break
      default:
        console.log('没有的数据类型')
        break
    }
    return url
  },
  // 时间换算
  timeFilter(value) {
    var now = new Date(parseInt(value)),
      // y = now.getFullYear(),
      m = now.getMonth() + 1,
      d = now.getDate()
    // return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d)
    return (m < 10 ? '0' + m : m) + '月' + (d < 10 ? '0' + d : d) + '日'
  },
  timeFilter1(value) {
    var now = new Date(parseInt(value)),
      y = now.getFullYear(),
      m = now.getMonth() + 1,
      d = now.getDate()
    return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d)
  },
  //链接得参数
  getUrlParams(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    var r = window.location.search.substr(1).match(reg)
    if (r != null) return unescape(r[2])
    return null
  },
  // 判断是否是邮箱
  isEmail(email) {
    if (!email) {
      return false
    }
    const regex = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
    return regex.test(email)
  }
}
