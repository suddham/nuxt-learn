import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger';

import form  from './modules/form'

const debug = process.env.NODE_ENV !== 'production';


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    a: form
  },
  strict: true,
  plugins: debug? [ createLogger() ] : [],
})

if (module.hot) {
  // accept actions and mutations as hot modules
  module.hot.accept(['./modules/a'], () => {
    const newFormModule = require('./modules/a').default
    // swap in the new modules and mutations
    store.hotUpdate({
      modules: {
        a: newFormModule
      }
    })
  })
}
