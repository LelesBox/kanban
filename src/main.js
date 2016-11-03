// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import app from './app'
import router from './router/'
import store from './store/'

/* eslint-disable no-new */
new Vue({
  router,
  store,
  ...app
}).$mount('#app')
