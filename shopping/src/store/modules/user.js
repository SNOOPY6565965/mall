import { getInfo, setInfo } from '@/utils/storage.js'

export default {
  namespaced: true,
  // 提供数据
  state () {
    return {
      // 个人权证相关
      userInfo: getInfo()
    }
  },
  // 提供修改数据的方法
  mutations: {
    // 所有mutations的第一个参数 都是 state
    setUserInfo (state, obj) {
      state.userInfo = obj
      setInfo(obj)
    }
  },
  // 提供异步操作
  actions: {},
  // 基于state派生出来的属性
  getters: {}
}
