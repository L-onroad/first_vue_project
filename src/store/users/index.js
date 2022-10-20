import { reqGetCode, reqRegister, reqLogin, reqGetUserInfo, reqLogout } from '@/api'
import { setToken, getToken, removeToken } from '@/utils/token'
const state = {
  code: '',
  token: getToken(),
  userInfo: {}
}
const mutations = {
  GETCODE(state, code) {
    state.code = code
  },
  TOLOGIN(state, token) {
    state.token = token
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  TOLOGOUT(state) {
    state.userInfo = ''
    state.token = ''
    removeToken()
  }
}
const actions = {
  // 获取验证码
  async getCode({ commit }, phone) {
    let result = await reqGetCode(phone)
    if (result.code === 200) {
      commit('GETCODE', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  // 发送注册请求
  async toRegister({ commit }, user) {
    let result = await reqRegister(user)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  // 发送登录请求
  async toLogin({ commit }, data) {
    let result = await reqLogin(data)
    if (result.code === 200) {
      commit('TOLOGIN', result.data.token)
      setToken(result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  // 获取登录用户的信息
  async getUserInfo({ commit }) {
    let result = await reqGetUserInfo()
    if (result.code === 200) {
      commit('GETUSERINFO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  // 发送退出登录请求
  async toLogout({commit}) {
    let result = await reqLogout()
    if(result.code === 200) {
      commit('TOLOGOUT')
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