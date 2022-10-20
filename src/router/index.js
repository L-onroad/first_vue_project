//引入模块
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
//使用插件
Vue.use(VueRouter)

//二次封装push函数，使控制台不报错
let originPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => { }, () => { })
  }
}

const router = new VueRouter({
  routes,
  // 路由跳转时页面滚回在顶部
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 }
  }
})

// 使用路由守卫
router.beforeEach(async (to, from, next) => {

  // 从vuex中获取token信息
  let token = store.state.users.token
  // 从vuex中获取用户信息中的名字
  let userName = store.state.users.userInfo.name

  if (token) {
    // 如果存在了token，拦截跳转到登录的页面，跳转回主页
    if (to.path == '/login' || to.path == '/register') {
      next('/home')
    } else {
      // 判断vuex中是否存在用户名
      if (userName) {
        next()
      } else {
        try {
          // 如果vuex中获取不到用户名，则重新派发一次请求，得以将用户信息存储在vuex中
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          // 请求失败原因是token过期了，此时派发退出登录的回调，页面跳转到登录页面
          await store.dispatch('toLogout')
          next('/login')
        }
      }
    }
  } else {
    let toPath = to.path
    if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
      next('/login?redirect=' + toPath)
    } else {
      next()
    }
  }
})


export default router