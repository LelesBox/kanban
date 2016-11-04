var localStorage = window.localStorage
var stateTree = localStorage.getItem('state')
if (stateTree) {
  stateTree = JSON.parse(stateTree)
} else {
  stateTree = [{
    board_id: '0',
    board_name: '标题名',
    list: [{
      list_id: '0',
      list_name: '列表名',
      cards: []
    }]
  }]
}

// 务必返回一个深拷贝，不然返回的board就会被当做引用去初始化vuex的store
// 保持stateTree包括所有子节点没有被Observe
exports.getBoardData = function getBoardData (id) {
  var board = stateTree.filter((item) => {
    return id === item.board_id
  })[0]
  return Promise.resolve(deepClone(board))
}

// 添加看板
exports.addBoard = function addBoard (name) {
  var newboard = {
    board_id: createId(),
    board_name: name
  }
  stateTree.push(newboard)
  saveBoardData()
  return Promise.resolve(deepClone(newboard))
}
// 删除看板
exports.removeBoard = function removeBoard (bid) {
  try {
    stateTree = stateTree.filter((item) => item.board_id !== bid)
    saveBoardData()
    return Promise.resolve()
  } catch (e) {
    return Promise.reject()
  }
}

// 添加list
exports.addList = function addList (id, name) {
  try {
    var list = {
      list_id: createId(),
      list_name: name,
      cards: []
    }
    var board = stateTree.filter((item) => {
      return item.board_id === id
    })[0]
    board.list.push(list)
    saveBoardData()
    return Promise.resolve(deepClone(list))
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
    saveBoardData()
    return Promise.resolve()
  } catch (e) {
    return Promise.reject()
  }
}

// 添加card
exports.addCard = function addCard (bid, lid, text) {
  try {
    var card = {
      card_id: createId(),
      text: text
    }
    var board = stateTree.filter((item) => item.board_id === bid)[0]
    var list = board.list.filter((item) => item.list_id === lid)[0]
    var cards = list.cards
    cards.push(card)
    saveBoardData()
    return Promise.resolve(deepClone(card))
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
    saveBoardData()
    return Promise.resolve()
  } catch (e) {
    return Promise.reject()
  }
}

function saveBoardData () {
  localStorage.setItem('state', JSON.stringify(stateTree))
}

// 更改listname
exports.updateListNmae = function updateListNmae (bid, lid, list_name) {
  try {
    var board = stateTree.filter((item) => item.board_id === bid)[0]
    var list = board.list.filter((item) => item.list_id === lid)[0]
    list.list_name = list_name
    saveBoardData()
    return Promise.resolve(list_name)
  } catch (e) {
    return Promise.reject()
  }
}

exports.initStore = stateTree

function deepCloneArray (arr) {
  return arr.map((item) => {
    if (toString.call(item) === '[object Array]') {
      return deepCloneArray(item)
    } else if (Object(item) === item) {
      return deepClone(item)
    } else {
      return item
    }
  })
}

function deepClone (obj) {
  var o = {}
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      var item = obj[key]
      if (toString.call(item) === '[object Array]') {
        o[key] = deepCloneArray(item)
      } else if (Object(item) === item) {
        o[key] = deepClone(item)
      } else {
        o[key] = item
      }
    }
  }
  return o
}

function createId () {
  return new Date().getTime() + ''
}

window.lc = function () { localStorage.clear() }
