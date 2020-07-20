
import * as types from '@/store/mutationType'
const app = {
  state: {
    // 平台 ：默认  pc
    device: 'desktop'
  },
  mutations: {
    [types.COM_DEVICE]: (state, status) => {
      state.device = status
    }
  },
  actions: {
    SetDevice({ commit }, status) {
      commit(types.COM_DEVICE, status)
    }
  }
}
export default app
