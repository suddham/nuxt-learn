import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Pricing from '@/views/Pricing'
import PaymentInfo from '@/views/PaymentInfo'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pricing',
    name: 'Pricing',
    component: Pricing
  },
  {
    path: '/payment-info',
    name: 'PaymentInfo',
    component: PaymentInfo
  },
]

export default new VueRouter({
  mode: 'history',
  routes,
  linkActiveClass: 'active-route'
})
