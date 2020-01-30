import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage.vue'
import Test from '../views/Test.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home-page',
    component: HomePage,
    meta: { title: '恭喜获得￥680红酒一瓶' }
  },
  {
    path: '/getRedWine',
    name: 'getRedWine',
    component: () => import(/* webpackChunkName: "GetRedWine" */ '../views/GetRedWine.vue'),
    meta: { title: '领取进口红酒' }
  },
  {
    path: '/successPage',
    name: 'success-page',
    component: () => import(/* webpackChunkName: "PayResultSuccess" */ '../views/PayResultSuccess.vue'),
    meta: { title: '订单详情' }
  },
  {
    path: '/failurePage',
    name: 'failure-page',
    component: () => import(/* webpackChunkName: "PayResultFailure" */ '../views/PayResultFailure.vue'),
    meta: { title: '订单详情' }
  },
  {
    path: '/orderDetail',
    name: 'orderDetail',
    component: () => import(/* webpackChunkName: "OrderDetail" */ '../views/OrderDetail.vue'),
    meta: { title: '订单详情' }
  },
  {
    path: '/test',
    name: 'test',
    component: Test,
    meta: { title: '恭喜获得￥680红酒一瓶' }
  },
  {
    path: '*',
    redirect: '/'
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   route level code-splitting
  //   this generates a separate chunk (about.[hash].js) for this route
  //   which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
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
  if (document.title !== to.meta.title) {
    document.title = to.meta.title || ''
  }
  next()
})

export default router
