import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app.js'
import user from './modules/user'

import getters from './getters'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user
  },
  plugins: [
    createPersistedState({
      storage: window.localStorage
    })
  ],
  getters
})
