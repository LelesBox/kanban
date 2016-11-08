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
    UPDATE_CARD: ({ commit, state }, { list_id, card_id, text }) => {
      api.updateCard(state.current_board.board_id, list_id, card_id, text).then((card) => {
        // commit('UPDATE_CARD', { list_id, card_id, text })
      })
    },
    REMOVE_CARD: ({ commit, state }, { list_id, card_id }) => {
      api.removeCard(state.current_board.board_id, list_id, card_id).then((card) => {
        // commit('REMOVE_CARD', { list_id, card_id })
      })
    },
    ADD_NEWLIST: ({ commit }, { list_name, board_id }) => {
      api.addList(board_id, list_name).then((list) => {
        commit('ADD_NEWLIST', { list })
      })
    },
    UPDATE_LIST_NAME: ({ commit }, { board_id, list_id, list_name }) => {
      api.updateListNmae(board_id, list_id, list_name).then((list_name) => {
        commit('UPDATE_LIST_NAME', { board_id, list_id, list_name })
      })
    },
    REMOVE_LIST: ({ commit }, { board_id, list_id }) => {
      api.removeList(board_id, list_id).then(() => {
        commit('REMOVE_LIST', { list_id })
      })
    },
    UPDATE_CARD_POSITION: ({ commit }, { board_id, removed, insert }) => {
      console.log('CARD', removed, insert)
      api.updateCardPosition(board_id, removed, insert)
      commit('UPDATE_CARD_POSITION', { removed, insert })
    },
    UPDATE_LIST_POSITION: ({ commit }, { board_id, removed, insert }) => {
      console.log('LIST', removed, insert)
      api.updateListPosition(board_id, removed, insert).then((board) => {
        // console.log(board)
        commit('UPDATE_LIST_POSITION', { board })
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
    },
    UPDATE_LIST_NAME: (state, { list_id, list_name }) => {
      for (var i = 0, l = state.current_board.list.length; i < l; i++) {
        if (list_id === state.current_board.list[i].list_id) {
          state.current_board.list[i].list_name = list_name
          break
        }
      }
    },
    REMOVE_LIST: (state, { list_id }) => {
      state.current_board.list = state.current_board.list.filter((item) => item.list_id !== list_id)
    },
    UPDATE_CARD: (state, { list_id, card_id, text }) => {
      for (var i = 0, l = state.current_board.list.length; i < l; i++) {
        if (state.current_board.list[i].list_id === list_id) {
          for (var j = 0, k = state.current_board.list[i].cards.length; j < k; j++) {
            if (state.current_board.list[i].cards[j].card_id === card_id) {
              state.current_board.list[i].cards[j].text = text
              break
            }
          }
          break
        }
      }
    },
    REMOVE_CARD: (state, { list_id, card_id }) => {
      for (var i = 0, l = state.current_board.list.length; i < l; i++) {
        if (state.current_board.list[i].list_id === list_id) {
          for (var j = 0, k = state.current_board.list[i].cards.length; j < k; j++) {
            if (state.current_board.list[i].cards[j].card_id === card_id) {
              state.current_board.list[i].cards.splice(j, 1)
              break
            }
          }
          break
        }
      }
    },
    UPDATE_CARD_POSITION: (state, { removed, insert }) => {
      // var card = state.current_board.list[removed.list].cards.splice(removed.index, 1)
      // state.current_board.list[insert.list].cards.splice(insert.index, 0, card)
    },
    UPDATE_LIST_POSITION: (state, { board }) => {
      // console.log('board', board)
      // state.current_board = board
    }
  }
})
export default store
