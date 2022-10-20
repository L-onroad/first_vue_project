// 引入路由组件
// 引入一级路由
// import Home from '../pages/Home'
// import Login from '../pages/Login'
// import Register from '../pages/Register'
// import Search from '../pages/Search'
// import Detail from '../pages/Detail'
// import AddCartSuccess from '../pages/AddCartSuccess'
// import ShopCart from '../pages/ShopCart'
// import Trade from '../pages/Trade'
// import Pay from '../pages/Pay'
// import PaySuccess from '../pages/PaySuccess'
// import Center from '../pages/Center'
// // 引入二级路由
// import MyOrder from '../pages/Center/MyOrder'
// import GroudOrder from '../pages/Center/GroudOrder'


// 暴露路由
export default [
  // 默认路由home
  {
    path: '/',
    redirect: '/home'
  },
  // home路由
  {
    path: '/home',
    component: () => import('../pages/Home'),
    meta: {
      show: true
    }
  },
  // 登录路由
  {
    path: '/login',
    component: () => import('../pages/Login'),
    meta: {
      show: false
    }
  },
  // 注册路由
  {
    path: '/register',
    component: () => import('../pages/Register'),
    meta: {
      show: false
    }
  },
  // 搜索路由
  {
    path: '/search/:keyword?',
    name: 'search',
    // props: ($route) => {
    //   return {
    //     param: $route.params.param,
    //     categoryName: $route.query.categoryName,
    //     categoryId: $route.query.categoryId
    //   }
    // },
    component: () => import('../pages/Search'),
    meta: {
      show: true
    }
  },
  // 商品详情路由
  {
    path: '/detail/:goodId',
    component: () => import('../pages/Detail'),
    meta: {
      show: true
    }
  },
  // 成功加入购物车路由
  {
    path: '/addCartSuccess',
    name: 'addCartSuccess',
    component: () => import('../pages/AddCartSuccess'),
    meta: {
      show: true
    }
  },
  // 购物车路由
  {
    path: '/shopCart',
    component: () => import('../pages/ShopCart'),
    meta: {
      show: true
    }
  },
  // 交易信息路由
  {
    path: '/trade',
    component: () => import('../pages/Trade'),
    meta: {
      show: true
    },
    beforeEnter: (to, from, next) => {
      if(from.path == '/shopCart') {
        next()
      } else {
        next(false)
      }
    }
  },
  // 支付信息路由
  {
    path: '/pay',
    component: () => import('../pages/Pay'),
    meta: {
      show: true
    },
    beforeEnter: (to, from, next) => {
      if(from.path == '/trade') {
        next()
      } else {
        next(false)
      }
    }
  },
  // 支付成功路由
  {
    path: '/paySuccess',
    component: () => import('../pages/PaySuccess'),
    meta: {
      show: true
    },
    beforeEnter: (to, from, next) => {
      if(from.path == '/pay') {
        next()
      } else {
        next(false)
      }
    }
  },
  // 订单路由
  {
    path: '/center',
    component: () => import('../pages/Center'),
    meta: {
      show: true
    },
    children: [
      {
        path: 'myOrder',
        component: () => import('../pages/Center/MyOrder')
      },
      {
        path: 'groudOrder',
        component: () => import('../pages/Center/GroudOrder')
      },
        // 默认订单路由
      {
        path: '/center',
        redirect: '/center/myOrder'
      },
    ]
  },
]