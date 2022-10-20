import {reqSearchList} from '@/api'
const state = {
  searchList: {}
}
const mutations = {
  GETSEARCHINFO(state, searchList) {
    state.searchList = searchList
  }
}
const actions = {
  async getSearchInfo({commit}, params = {}) {
    let result = await reqSearchList(params)
    if(result.code === 200) {
      commit('GETSEARCHINFO', result.data)
    }
  }
}
const getters = {
  attrsList(state) {
    return state.searchList.attrsList
  },
  goodsList(state) {
    return state.searchList.goodsList
  },
  trademarkList(state) {
    return state.searchList.trademarkList
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}