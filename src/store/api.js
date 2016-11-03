// import Vue from 'vue'
// import VueResource from 'vue-resource'
import { board } from './mockdata'
// Vue.use(VueResource)
// var $ajax = Vue.http

export function getBoardData (id) {
  return Promise.resolve(board)
}
