import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import axios from 'axios'
import NProgress from 'nprogress/nprogress.js'
import 'nprogress/nprogress.css'

import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import vuemeta from './plugins/vuemeta';

Vue.config.productionTip = false
Vue.prototype.$axios = axios

router.beforeResolve((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

new Vue({
  router,
  store,
  vuetify,
  vuemeta,
  render: h => h(App)
}).$mount('#app')
