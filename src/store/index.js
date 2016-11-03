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
      api.addCard(board_id, list_id, text).then(() => {
        console.log(text, board_id, list_id)
      })
    },
    ADD_NEWLIST: ({ commit }, { list_name, board_id }) => {
      api.addList(board_id, list_name).then(() => {
        //
      })
    }
  },
  mutations: {
    SET_BOARD_DATA: (state, { board }) => {
      state.current_board = board
    },
    ADD_CARD_DATA: (state, { id, data }) => {
      state.board
    }
  }
})
export default store
