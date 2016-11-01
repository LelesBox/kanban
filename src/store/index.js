import Vue from 'vue'
import Vuex from 'vuex'
import { getBoardData } from './api'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    board: [{
      header: '未命名'
    }]
  },
  actions: {
    FETCH_BOARD_DATA: ({ commit }) => {
      getBoardData(1).then((response) => {
        commit('SET_BOARD_DATA', { board: response.body })
      })
    }
  },
  mutations: {
    SET_BOARD_DATA: (state, { board }) => {
      state.board = board
    }
  }
})
export default store
