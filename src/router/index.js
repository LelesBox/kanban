import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import home from '../home'
import board from '../components/board'

export default new VueRouter({
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: home
    },
    {
      path: '/:board_id',
      name: 'board',
      component: board
    }
  ]
})
