//该模块对API进行统一管理
import requests from './request'
import mockRequests from './mockRequest'

//三级联动接口
//    /api/product/getBaseCategoryList  get  无参数
//使用axios发请求并返回Promise对象
  // 获取导航栏信息请求
export const reqCategoryList = () => requests({url: '/product/getBaseCategoryList', method: 'get'})
  // 获取搜索列表信息请求
export const reqSearchList = (params) => requests({url: '/list', method: 'post', data: params})
  // 获取商品信息请求
export const reqGoodsInfo = (goodId) => requests({url: `/item/${goodId}`, method: 'get'})
  // 发送购物车商品购买信息
export const reqAddorUpdateGoods = (goodId, goodsNum) => requests({url: `/cart/addToCart/${goodId}/${goodsNum}`, method: 'post'})
  // 获取购物车列表信息
export const reqCartList = () => requests({url: '/cart/cartList', method: 'get'})
  // 发送删除购物车商品请求
export const reqDeleteCartById = (goodId) => requests({url: `/cart/deleteCart/${goodId}`, method: 'delete'})
  // 发送商品选中信息
export const reqCheckCartById = (goodId, isChecked) => requests({url: `/cart/checkCart/${goodId}/${isChecked}`, method: 'get'})
  // 获取注册验证码信息
export const reqGetCode = (phone) => requests({url: `/user/passport/sendCode/${phone}`, method: 'get'})
  // 发送注册请求
export const reqRegister = (data) => requests({url: '/user/passport/register', data, method: 'post'})
  // 发送登录请求
export const reqLogin = (data) => requests({url: '/user/passport/login', data, method: 'post'})
  // 获取登录用户信息
export const reqGetUserInfo = () => requests({url: '/user/passport/auth/getUserInfo', method: 'get'})
  // 发送退出请求
export const reqLogout = () => requests({url: '/user/passport/logout', method: 'get'})
  // 获取用户地址信息
export const reqGetUserAddress = () => requests({url: '/user/userAddress/auth/findUserAddressList', method: 'get'})
  // 获取购买商品信息
export const reqOrderInfo = () => requests({url: '/order/auth/trade', method: 'get'})
  // 发送提交订单信息
export const reqSubmitOrder = (tradeNo, data) => requests({url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post'})
  // 获取订单支付信息
export const reqPayInfo = (orderId) => requests({url: `/payment/weixin/createNative/${orderId}`, method: 'get'})
  // 获取用户支付情况
export const reqPayStatus = (orderId) => requests({url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get'})
  // 获取我的订单信息
export const reqGetOrderList = (page, limit) => requests({url: `/order/auth/${page}/${limit}`, method: 'get'})

//向mock发请求返回虚拟数据
export const reqBannerList = () => mockRequests({url: '/banner', method: 'get'})
export const reqFloorList = () => mockRequests({url: '/floor', method: 'get'})