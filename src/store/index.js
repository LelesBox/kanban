import Vue from 'vue'
import Vuex from 'vuex'
import api from './api'
Vue.use(Vuex)

/* ****
var state = {
  boards: [{
    board_id: '1',
    board_name: 'asd'
  },{
    board_id: '2',
    board_name: 'asddd'
  }],
  current_board: {
    board_id: '1',
    list: []
  }
}
*/
const store = new Vuex.Store({
  state: api.getInitState(),
  actions: {
    FETCH_BOARD_DATA: ({ commit }, { id }) => {
      api.getBoardData(id).then((board) => {
        commit('SET_BOARD_DATA', { board })
      })
    },
    ADD_CARD: ({ commit }, { text, board_id, list_id }) => {
      api.addCard(board_id, list_id, text).then((card) => {
        commit('ADD_CARD_DATA', { list_id, card })
      })
    },
    ADD_NEWLIST: ({ commit }, { list_name, board_id }) => {
      api.addList(board_id, list_name).then((list) => {
        commit('ADD_NEWLIST', { list })
      })
    }
  },
  mutations: {
    SET_BOARD_DATA: (state, { board }) => {
      state.current_board = board
    },
    ADD_CARD_DATA: (state, { list_id, card }) => {
      for (var i = 0, l = state.current_board.list.length; i < l; i++) {
        if (list_id === state.current_board.list[i].list_id) {
          state.current_board.list[i].cards.push(card)
          break
        }
      }
    },
    ADD_NEWLIST: (state, { list }) => {
      state.current_board.list.push(list)
    }
  }
})
export default store
