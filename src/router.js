import Vue from 'vue'
import Router from 'vue-router'
import VueMeta from 'vue-meta'

Vue.use(VueMeta)
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "about" */ './views/Home.vue')
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: () => import(/* webpackChunkName: "Portfolio" */ './views/Portfolio.vue')
    },
    {
      path: '/stock',
      name: 'stock',
      component: () => import(/* webpackChunkName: "Stock" */ './views/Stock.vue')
    },
  ]
})


