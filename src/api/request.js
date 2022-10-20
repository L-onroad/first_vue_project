import axios from "axios"

//引入进度条模块以及相应样式
import nProgress from "nprogress"
import "nprogress/nprogress.css"
//引入仓库，获取其中的数据
import store from "@/store"

//利用create对象创建axios实例
const requests = axios.create({
  //基础路径
  baseURL: "/api",
  //设置超时时间
  timeout: 5000
})

//请求拦截器
requests.interceptors.request.use((config) => {
  // 给请求头添加字段
  if(store.state.detail.uuid_token) {
    config.headers.userTempId = store.state.detail.uuid_token
  }
  // 给请求头添加token字段
  if(store.state.users.token) {
    config.headers.token = store.state.users.token
  }

  //进度条开始时
  nProgress.start()
  //config配置对象里的属性包含了重要的header请求头
  return config
})

//响应拦截器
requests.interceptors.response.use((res) => {
  nProgress.done()
  //成功的回调
  return res.data
},(error) => {
  //响应失败的回调
  return Promise.reject(new Error('fail'))
})

export default requests