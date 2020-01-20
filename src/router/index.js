import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage.vue'
import GetRedWine from '../views/GetRedWine.vue'
import PayResultSuccess from '../views/PayResultSuccess.vue'
import PayResultFailure from '../views/PayResultFailure.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home-page',
    component: HomePage
  },
  {
    path: '/getRedWine',
    name: 'getRedWine',
    component: GetRedWine
  },
  {
    path: '/successPage',
    name: 'success-page',
    component: PayResultSuccess
  },
  {
    path: '/failurePage',
    name: 'failure-page',
    component: PayResultFailure
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
