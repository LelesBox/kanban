import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

var $ajax = Vue.http

export function getBoardData (id) {
  return $ajax.get('http://127.0.0.1:8082/board.json')
}
