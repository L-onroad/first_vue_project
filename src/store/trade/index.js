import {reqGetUserAddress, reqOrderInfo} from '@/api'
const state = {
  userAddress: [],
  orderInfo: {}
}
const mutations = {
  GETUSERADDRESS(state, userAddress) {
    state.userAddress = userAddress
  },
  GETORDERINFO(state, orderInfo) {
    state.orderInfo = orderInfo
  }
}
const actions = {
  // 获取用户地址信息
  async getUserAddress({commit}) {
    let result = await reqGetUserAddress()
    if(result.code === 200) {
      commit('GETUSERADDRESS', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  async getOrderInfo({commit}) {
    let result = await reqOrderInfo()
    if(result.code === 200) {
      commit('GETORDERINFO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}