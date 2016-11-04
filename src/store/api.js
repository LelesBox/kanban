import ls from './localstorage'
/**
 * getBoardData - description
 *
 * @param  {type} id description
 * @return {type}    Promise
 */
exports.getBoardData = function getBoardData (id) {
  return ls.getBoardData(id)
}
// 添加board
exports.addBoard = function addBoard (name) {
  return ls.addBoard(name)
}
// 删除board
exports.removeBoard = function removeBoard (bid) {
  return ls.removeBoard(bid)
}
// 添加list
exports.addList = function addList (id, name) {
  return ls.addList(id, name)
}
// 删除list
exports.removeList = function removeList (bid, lid) {
  return ls.removeList(bid, lid)
}
// 添加卡片
exports.addCard = function addCard (bid, lid, text) {
  return ls.addCard(bid, lid, text)
}
// 移除卡片
exports.removeCard = function removeCard (bid, lid, cid) {
  return ls.removeCard(bid, lid, cid)
}

// 更改listname
exports.updateListNmae = function updateListNmae (board_id, list_id, list_name) {
  return ls.updateListNmae(board_id, list_id, list_name)
}
exports.getInitState = function getInitState () {
  var boards = ls.initStore.map((item) => {
    return {
      board_id: item.board_id,
      board_name: item.board_name
    }
  })
  return {
    boards,
    current_board: []
  }
}
