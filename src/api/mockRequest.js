import axios from "axios"

//引入进度条模块以及相应样式
import nProgress from "nprogress"
import "nprogress/nprogress.css"

//利用create对象创建axios实例
const requests = axios.create({
  //基础路径
  baseURL: "/mock",
  //设置超时时间
  timeout: 5000
})

//请求拦截器
requests.interceptors.request.use((config) => {
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