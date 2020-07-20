import * as types from '@/store/mutationType'
const user = {
  state: {
    // token
    token: null,
    // 用户信息
    info: {},
    // 默认中文
    language:null
  },
  mutations: {
    [types.ACCESS_TOKEN]: (state, status) => {
      state.token = status
    },
    [types.USER_INFO]: (state, status) => {
      state.info = status
    },
    [types.COM_LANGUAGE]: (state, status) => {
      state.language = status
    }
  },
  actions: {
    SetToken({ commit }, status) {
      commit(types.ACCESS_TOKEN, status)
    },
    SetUserInfo({ commit }, status) {
      commit(types.USER_INFO, status)
    },
    ChangeLanguage({ commit }, status) {
      commit(types.COM_LANGUAGE, status)
    }
  }
}
export default user
