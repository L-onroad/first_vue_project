import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from '@/router'
//引入Vuex
import store from '@/store'
//关闭vue提示
Vue.config.productionTip = false

//引入并注册全局组件TypeNav
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name, TypeNav)
import Carousel from '@/components/Carousel'
Vue.component(Carousel.name, Carousel)
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name, Pagination)

// 引入elementUI部分
import { Button, MessageBox } from 'element-ui'
Vue.component(Button.name, Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//引用mock数据
import '@/mock/mockServe'
//引用轮播图css样式
import 'swiper/css/swiper.css'
//引用所有请求接口
import * as API from './api'

// 使用图片懒加载插件
import VueLazyload from 'vue-lazyload'
import lazyload from '@/assets/lazyload.gif'
Vue.use(VueLazyload, {
  loading: lazyload
})
// 表单验证插件
import '@/plugins/validate'

new Vue({
  el: '#app',
  render: h => h(App),
  beforeCreate() {
    // 注册全局事件总线
    Vue.prototype.$bus = this,
    Vue.prototype.$API = API
  },
  //注册路由
  router,
  store
})
