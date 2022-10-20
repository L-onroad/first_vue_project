import { reqCartList, reqDeleteCartById, reqCheckCartById } from "@/api"

const state = {
  cartList: []
}
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList
  }
}
const actions = {
  // 获取购物车列表数据
  async getCartList({commit}) {
    let result = await reqCartList()
    if(result.code === 200) {
      commit('GETCARTLIST', result.data)
    }
  },
  // 删除指定商品数据
  async deleteCartById({commit}, goodId) {
    let result = await reqDeleteCartById(goodId)
    if(result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  // 修改购物车商品选中的状态
  async checkCartById({commit}, {goodId, isChecked}) {
    let result = await reqCheckCartById(goodId, isChecked)
    if(result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  // 删除所有已勾选的商品
  deleteAllCheckedCart({dispatch, getters}) {
    let PromiseAll = []
    getters.cartList.cartInfoList.forEach(item => {
      let promise = item.isChecked == 1 ? dispatch('deleteCartById', item.skuId) : ''
      PromiseAll.push(promise)
    })
    return Promise.all(PromiseAll)
  },
  // 改变全选选中状态
  changeAllCheckCart({dispatch, getters}, isChecked) {
    let PromiseAll = []
      getters.cartList.cartInfoList.forEach(item => {
        let promise = dispatch('checkCartById', {goodId: item.skuId, isChecked})
        PromiseAll.push(promise)
      })
    return Promise.all(PromiseAll)
  }
}
const getters = {
  cartList() {
    return state.cartList[0] || {}
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}