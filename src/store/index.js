import Vue from "vue"
import Vuex from "vuex"

//使用插件
Vue.use(Vuex)

//引入各模块仓库
import home from "@/store/home"
import search from "@/store/search"
import detail from "@/store/detail"
import shopcart from "@/store/shopcart"
import users from "@/store/users"
import trade from "@/store/trade"

export default new Vuex.Store({
  //注册各模块仓库
  modules: {
    home,
    search,
    detail,
    shopcart,
    users,
    trade
  }
})