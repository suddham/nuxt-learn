import Vue from 'vue'
import router from './router'

import App from './App.vue'
import '@/styles/tailwind.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
