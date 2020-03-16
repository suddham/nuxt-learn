import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home')
  },
  {
    path: '/pricing',
    name: 'Pricing',
    component: () => import('@/views/Pricing'),
  },
  {
    path: '/payment-info',
    name: 'PaymentInfo',
    component: () => import('@/views/PaymentInfo')
  },
]

export default new VueRouter({
  mode: 'history',
  routes,
  linkActiveClass: 'active-route'
})
