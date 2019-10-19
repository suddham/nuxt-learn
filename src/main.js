import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = require('@/routes')
const router = new VueRouter({
  mode: 'history',
  routes,
})


import App from './App.vue'
import '@/styles/tailwind.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
