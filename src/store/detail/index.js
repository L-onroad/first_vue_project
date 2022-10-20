import {reqGoodsInfo, reqAddorUpdateGoods} from '@/api'
import {getUUID} from '@/utils/uuid_token'
const state = {
  goodsInfo: {},
  // 游客临时身份
  uuid_token: getUUID()
}
const mutations = {
  GETGOODSINFO(state, goodsInfo) {
    state.goodsInfo = goodsInfo
  }
}
const actions = {
  // 商品信息派发函数
  async getGoodsInfo({commit}, goodId) {
    let result = await reqGoodsInfo(goodId)
    if (result.code === 200) {
      commit('GETGOODSINFO', result.data)
    }
  },
  // 购物车派发函数
  async addOrUpdateGoods({commit}, {goodId, goodsNum}) {
    let result = await reqAddorUpdateGoods(goodId, goodsNum)
    if(result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  }
}
const getters = {
  categoryView(state) {
    return state.goodsInfo.categoryView || {}
  },
  skuInfo(state) {
    return state.goodsInfo.skuInfo || {}
  },
  spuSaleAttrList(state) {
    return state.goodsInfo.spuSaleAttrList
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}