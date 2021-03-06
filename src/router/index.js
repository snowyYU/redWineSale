import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage.vue'
import { getToken } from '@/utils'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home-page',
    component: HomePage,
    meta: { title: '恭喜获得￥1388进口红酒1瓶' }
  },
  {
    path: '/getRedWine',
    name: 'get-red-wine',
    component: () => import(/* webpackChunkName: "GetRedWine" */ '../views/GetRedWine.vue'),
    meta: { title: '领取进口红酒', requiresAuth: true }
  },
  {
    path: '/orderLoading',
    name: 'order-loading',
    component: () => import(/* webpackChunkName: "orderLoading" */ '../views/OrderLoading.vue'),
    meta: { title: '订单详情', requiresAuth: true }
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// 全局前置路由
router.beforeEach((to, from, next) => {
  // 修改网站标题
  if (document.title !== to.meta.title) {
    document.title = to.meta.title || ''
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!getToken()) {
      Vue.prototype.$toast('请先填写个人信息')
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router
