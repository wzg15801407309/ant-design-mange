const getters = {
  // 平台
  device: state => state.app.device,
  // token
  token: state => state.user.token,
  // 用户信息
  userInfo: state => state.user.info,
  // 用户信息
  language: state => state.user.language
}
export default getters
