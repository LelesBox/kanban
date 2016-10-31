// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('normalize.css')
import Vue from 'vue'
import app from './app'
import VueRouter from 'vue-router'
import routes from './router/'
Vue.use(VueRouter)

let router = new VueRouter({
  mode: 'history',
  routes
})
/* eslint-disable no-new */
new Vue({
  router,
  ...app
}).$mount('#app')
