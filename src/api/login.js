import Http from '@/utils/http'
import store from '@/store'
// 平台？
let plantform = 'pangsky'
// 从全局配置中拿取
const userAPI = process.env.VUE_APP_USER_URL

//账号密码登录
export const login = parameter =>
  Http.post(userAPI + 'authority/login', {
    plantform: plantform,
    payload: parameter
  })

//平台登录 username和password
export const platformLogin = ({ plantform, id, email, head,username,password }) =>
  Http.post(userAPI + 'authority/login', {
    plantform,
    payload: { plantformId: id, email, head,username,password }
  })

//退出登录
export const Loginout = () => {
  console.log('退出登录')
}

// 注册
export const register = parameter =>
  Http.post(userAPI + 'authority/registe', {
    plantform: plantform,
    payload: parameter
  })

// 平台注册
export const plantformRegidter = ({ type, id, values, head }) =>
  Http.post(userAPI + 'authority/registe', {
    plantform: type,
    payload: { plantformId: id, ...values, head }
  })

// 获取token中的用户信息
export const getUserInfo = () => Http.get(userAPI + 'authority/info')

//通过id获取用户信息
export const getUserInfoByid = id =>
  Http.get(userAPI + `authority/info/pangsky/${id}`)

//判断用户名是否存在
export const checkUsernameIsHave = username =>
  Http.get(userAPI + `authority/username/${username}`)

//修改用户信息
export const changeUsername = (data, id) =>
  Http.post(userAPI + 'authority/info', {
    id: id,
    payload: data
  })

//发送邮箱验证码
export const postEmailCode = ({ email }) =>
  Http.post(userAPI + 'authority/emailCode', {
    email,
    lang: store.getters.language
  })

//验证验证码
export const checkEmailCode = data =>
  Http.post(userAPI + 'authority/checkEmailCode', data)

//修改密码
export const postchangePsd = data =>
  Http.post(userAPI + 'authority/changePsd', data)

// 第三方组成
export const postPlantform = data =>
  Http.post(userAPI + 'authority/plantform', data)
