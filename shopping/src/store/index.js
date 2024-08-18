import Vue from 'vue'
import Vuex from 'vuex'
// 导入user.js
import user from '@/store/modules/user'
// 导入cart.js
import cart from './modules/cart'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
    token (state) {
      return state.user.userInfo.token
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    cart
  }
})
