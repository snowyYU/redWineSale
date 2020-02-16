import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage.vue'
// import { getUserInfo } from '@/utils'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home-page',
    component: HomePage,
    meta: { title: '恭喜获得￥680红酒一瓶' }
  },
  {
    path: '/getRedWine',
    name: 'get-red-wine',
    component: () => import(/* webpackChunkName: "GetRedWine" */ '../views/GetRedWine.vue'),
    meta: { title: '领取进口红酒' }
  },
  {
    path: '/orderDetail',
    name: 'order-detail',
    component: () => import(/* webpackChunkName: "OrderDetail" */ '../views/OrderDetail.vue'),
    meta: { title: '订单详情' }
  },
  {
    path: '*',
    redirect: '/home'
  }
]

const router = new VueRouter({
  routes
})

// 全局前置路由
router.beforeEach((to, from, next) => {
  console.log('to:', to)
  console.log('from:', from)

  // if (to.matched.some(record => record.meta.requiresAuth)) {
  //   // this route requires auth, check if logged in
  //   // if not, redirect to login page.
  //   if (!auth.loggedIn()) {
  //     next({
  //       path: '/login',
  //       query: { redirect: to.fullPath }
  //     })
  //   } else {
  //     next()
  //   }
  // } else {
  //   next() // 确保一定要调用 next()
  // }

  // 修改网站标题
  if (document.title !== to.meta.title) {
    document.title = to.meta.title || ''
  }

  // 判断是否填写个人信息
  // if (to.name !== 'home-page') {
  //   if (getUserInfo()) {
  //     next()
  //   } else {
  //     next({ name: 'home-page' })
  //   }
  // } else {
  //   next()
  // }
  next()
})

export default router
