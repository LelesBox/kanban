var localStorage = window.localStorage
var stateTree = localStorage.getItem('state')
if (stateTree) {
  stateTree = JSON.parse(stateTree)
} else {
  stateTree = [{
    board_id: '0',
    board_name: '未命名',
    list: [{
      list_id: '0',
      list_name: '未命名',
      cards: []
    }]
  }]
}

exports.getBoardData = function getBoardData (id) {
  var board = stateTree.filter((item) => {
    return id === item.board_id
  })[0]
  return Promise.resolve(board)
}

// 添加卡片
exports.addBoard = function addBoard (name) {
  var newboard = {
    board_id: createId(),
    board_name: name
  }
  stateTree.push(newboard)
  return Promise.resolve(newboard)
}
// 删除看板
exports.removeBoard = function removeBoard (bid) {
  try {
    stateTree = stateTree.filter((item) => item.board_id !== bid)
    return Promise.resolve()
  } catch (e) {
    return Promise.reject()
  }
}

// 添加list
exports.addList = function addList (id, name) {
  try {
    var board = stateTree.filter((item) => {
      return item.board_id === id
    })[0]
    board.list.push({
      list_id: createId(),
      list_name: name,
      cards: []
    })
    return Promise.resolve()
  } catch (e) {
    return Promise.reject(e)
  }
}
// 删除list
exports.removeList = function removeList (bid, lid) {
  try {
    var board = stateTree.filter((item) => item.board_id === bid)[0]
    var list = board.list.filter((item) => item.list_id !== lid)
    board.list = list
    return Promise.resolve()
  } catch (e) {
    return Promise.reject()
  }
}

// 添加card
exports.addCard = function addCard (bid, lid, text) {
  try {
    // var cards = stateTree.filter((item) => item.board_id === bid)[0].list.filter((item) => item.list_id === lid)[0].cards
    var board = stateTree.filter((item) => item.board_id === bid)[0]
    var list = board.list.filter((item) => item.list_id === lid)[0]
    var cards = list.cards
    cards.push({
      card_id: createId(),
      text: text
    })
    return Promise.resolve()
  } catch (e) {
    return Promise.reject(e)
  }
}
// 删除卡片
exports.removeCard = function removeCard (bid, lid, cid) {
  try {
    var board = stateTree.filter((item) => item.board_id === bid)[0]
    var list = board.list.filter((item) => item.list_id === lid)[0]
    var cards = list.cards.filter((item) => item.card_id !== cid)
    list.cards = cards
    return Promise.resolve()
  } catch (e) {
    return Promise.reject()
  }
}

exports.saveBoardData = function saveBoardData (state) {
  localStorage.setItem('state', JSON.stringify(state))
}

exports.initStore = stateTree

function createId () {
  return new Date().getTime()
}
