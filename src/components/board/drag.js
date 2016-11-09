import { on, addClass, removeClass } from './domApi'
// 生成drag-mask样式
var style = document.createElement('style')
style.innerHTML = `.drag-mask::after {
  content: "";
  position: absolute;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  background-color: #c0c6ca;
  user-select: none;
  -webkit-user-select:none;
  -moz-user-select: none;
  z-index: 9999;
  border-radius: 4px;
}
[drag] {
  position: relative;
  cursor: pointer;
  user-select: none;
  -webkit-user-select:none;
  -moz-user-select: none;
  box-sizing: border-box;
}`
// 插入dom中。
document.getElementsByTagName('head')[0].appendChild(style)
// 给每个容器打标签
var idx = 0
// 存放各个容器下的updateView方法
var updateViews = {}
// 当前使用的view更新方法。
var _updateView = null
// 拖动的元素，拖动的时候其实它是source创建出来的副本
var target = null
// 选中的拖动元素
var source = null
// 在元素块拖动的时候会触发，可用于检测是否触碰到浏览器边缘可以自定义滚动
var onmove = null

// var updateDom = UpdateSchema()
// var defaultUpdateDomMethod = UpdateSchema()
// 移动的记录节点
var point = {
  startX: 0,
  startY: 0,
  moveX: 0,
  moveY: 0
}
// 监听全局鼠标按下事件
// 如果该元素包含drag属性，则启用drag方法
on(document, 'mousedown', startMove)
on(document, 'mousemove', onMove)
on(document, 'mouseup', stopMove)
on(document, 'mouseleave', stopMove)

function Dragable () {
  this.updateDOMMethod = UpdateSchema()
  this.index = idx++
  this.elms = null
  this.cb = null
}
Dragable.prototype.setUpdateSchema = function (updateMethod) {
  this.updateDOMMethod = updateMethod || this.updateDOMMethod
}
Dragable.prototype.on = function (elms, cb, id) {
  this.elms = elms
  this.cb = cb
  if (elms.length === undefined) {
    elms.setAttribute('drag-id', this.index)
  } else {
    for (var i = 0, l = elms.length; i < l; i++) {
      elms[i].setAttribute('drag-id', this.index)
    }
  }
  updateViews[this.index] = applyDrag(elms, this.index, cb, this.updateDOMMethod)
}
Dragable.prototype.update = function () {
  if (this.elms.length === undefined) {
    this.elms.setAttribute('drag-id', this.index)
  } else {
    for (var i = 0, l = this.elms.length; i < l; i++) {
      this.elms[i].setAttribute('drag-id', this.index)
    }
  }
  updateViews[this.index] = applyDrag(this.elms, this.index, this.cb, this.updateDOMMethod)
}

module.exports = Dragable
// 开始移动
// 有时候触发的e.target并不是我们想要的元素，可能我们想要的元素都被子元素给铺满了，这时候无论怎么点
// e.target永远不会是我们想要的元素，这时候，我们可以知道元素里面的某一个元素去监听
function startMove (e) {
  if (e.button === 0 && e.target.getAttribute('drag') !== null || e.button === 0 && e.target.getAttribute('drag-el') !== null) {
    var dragId, s
    if (e.target.getAttribute('drag') !== null) {
      dragId = e.target.parentNode.getAttribute('drag-id')
      if (dragId === undefined) return
      s = e.target
    } else if (e.target.getAttribute('drag-el') !== null) {
      dragId = e.target.parentNode.parentNode.getAttribute('drag-id')
      if (dragId === undefined) return
      s = e.target.parentNode
    }
    point.startX = e.clientX
    point.startY = e.clientY
    _updateView = updateViews[dragId] || function () {}
    source = s
  }
}

function onMove (e) {
  // 先移动3像素后才去覆盖source，不然就会把source隐藏起来无法触发绑定在source上的事件
  var Xoffset = Math.abs(e.clientX - point.startX)
  var Yoffset = Math.abs(e.clientY - point.startY)
  if (target === null && source !== null && (Xoffset > 3 || Yoffset > 3)) {
    point.startX = e.clientX
    point.startY = e.clientY
    setTimeout(function () {
      target = copyElmement(source)
      addClass(source, 'drag-mask')
      document.body.appendChild(target)
    })
  }
  if (target !== null) {
    point.moveX = e.clientX
    point.moveY = e.clientY
    _updateView(target, source, point)
    onmove && onmove(target, point)
  }
}
function stopMove (e) {
  if (target || source) {
    document.body.contains(target) && document.body.removeChild(target)
    removeClass(source, 'drag-mask')
    target = null
    source = null
  }
}

function applyDrag (container, dragIndex, cb, updateDom) {
  var containers = []
  var elms = []
  if (container.length !== undefined) {
    for (var i = 0, l = container.length; i < l; i++) {
      var children = container[i].children
      containers.push(container[i])
      for (var j = 0, jlength = children.length; j < jlength; j++) {
        if (children[j].getAttribute('drag') !== null) {
          elms.push(children[j])
        }
      }
    }
  } else {
    containers.push(container)
    children = container.children
    for (var k = 0, klength = children.length; k < klength; k++) {
      if (children[k].getAttribute('drag') !== null) {
        elms.push(children[k])
      }
    }
  }
  var length = elms.length
  var clength = containers.length
  return function (elm, sourceElm, point) {
    elm.style.transform = `translate3d(${point.moveX - point.startX}px, ${point.moveY - point.startY}px, 0) rotate(5deg)`
    var a = elm.getBoundingClientRect()
    var el
    var i = length
    var j = clength
    var b
    var targetIdx = findIndex(elms, sourceElm)
    // 判断它们的容器，是否与容器重合且容器为空，如果为空则添加到空容器中
    while (j--) {
      var cot = containers[j]
      if (cot === sourceElm.parentNode) continue
      if (cot.children.length === 0 && getOVerlayElm(elm, cot.parentNode, 0.7)) {
        var sourceListIdx = findIndex(document.querySelectorAll('[drag-id="' + dragIndex + '"]'), sourceElm.parentNode)
        var sourceElmIdx = findIndex(sourceElm.parentNode.children, sourceElm)
        var targetElmIdx = 0
        var targetListIdx = findIndex(document.querySelectorAll('[drag-id="' + dragIndex + '"]'), cot)
        var removed = { list: sourceListIdx, index: sourceElmIdx }
        var insert = { list: targetListIdx, index: targetElmIdx }
        elms.push(elms.splice(targetIdx, 1)[0])
        if (updateDom.NewConatiner(sourceElm, cot, { removed, insert })) {
          cb({removed, insert})
        }
        return
      }
    }
    while (i--) {
      el = elms[i]
      if (el === sourceElm) {
        continue
      }
        // 覆盖面积达到百分之七十的元素
        // 1.如果该元素于sourceElm属于一个父容器
        // 2. 如果el与sourceElm不属于同一个父容器
      if (el.parentNode === sourceElm.parentNode) {
        if (getOVerlayElm(elm, el, 0.7)) {
          if (targetIdx < i) {
            sourceElmIdx = findIndex(sourceElm.parentNode.children, sourceElm)
            sourceListIdx = findIndex(document.querySelectorAll('[drag-id="' + dragIndex + '"]'), sourceElm.parentNode)
            targetElmIdx = findIndex(sourceElm.parentNode.children, el)
            removed = { list: sourceListIdx, index: sourceElmIdx }
            insert = { list: sourceListIdx, index: targetElmIdx }
            exchange(elms, targetIdx, i)
            if (updateDom.Down(sourceElm, el, { removed, insert })) {
              cb({removed, insert})
            }
          } else if (targetIdx > i) {
            sourceElmIdx = findIndex(sourceElm.parentNode.children, sourceElm)
            sourceListIdx = findIndex(document.querySelectorAll('[drag-id="' + dragIndex + '"]'), sourceElm.parentNode)
            targetElmIdx = findIndex(sourceElm.parentNode.children, el)
            removed = { list: sourceListIdx, index: sourceElmIdx }
            insert = { list: sourceListIdx, index: targetElmIdx }
            exchange(elms, targetIdx, i)
            if (updateDom.Up(sourceElm, el, { removed, insert })) {
              cb({removed, insert})
            }
          }
          return
        }
      } else if (getOVerlayElm(elm, el, 0.5)) {
        b = el.getBoundingClientRect()
        if (a.top > b.top) {
          sourceElmIdx = findIndex(sourceElm.parentNode.children, sourceElm)
          sourceListIdx = findIndex(document.querySelectorAll('[drag-id="' + dragIndex + '"]'), sourceElm.parentNode)
          targetElmIdx = findIndex(el.parentNode.children, el.nextSibling) || el.parentNode.children.length
          targetListIdx = findIndex(document.querySelectorAll('[drag-id="' + dragIndex + '"]'), el.parentNode)
          removed = { list: sourceListIdx, index: sourceElmIdx }
          insert = { list: targetListIdx, index: targetElmIdx }
          elms.splice(i + 1, 0, sourceElm)
          targetIdx > i ? elms.splice(targetIdx + 1, 1) : elms.splice(targetIdx, 1)
          if (updateDom.CrossDown(sourceElm, el, { removed, insert })) {
            cb({removed, insert})
          }
        } else if (a.bottom < b.bottom) {
          sourceElmIdx = findIndex(sourceElm.parentNode.children, sourceElm)
          sourceListIdx = findIndex(document.querySelectorAll('[drag-id="' + dragIndex + '"]'), sourceElm.parentNode)
          targetElmIdx = findIndex(el.parentNode.children, el)
          targetListIdx = findIndex(document.querySelectorAll('[drag-id="' + dragIndex + '"]'), el.parentNode)
          removed = { list: sourceListIdx, index: sourceElmIdx }
          insert = { list: targetListIdx, index: targetElmIdx }
          elms.splice(i, 0, sourceElm)
          targetIdx > i ? elms.splice(targetIdx + 1, 1) : elms.splice(targetIdx, 1)
          if (updateDom.CrossUp(sourceElm, el, { removed, insert })) {
            cb({removed, insert})
          }
        }
        return
      }
    }
  }
}
function copyElmement (elm) {
  var el = elm.cloneNode(true)
  el.style.position = 'fixed'
  var position = elm.getBoundingClientRect()
  el.style.margin = '0px'
  el.style.top = position.top + 'px'
  el.style.left = position.left + 'px'
  el.style.zIndex = 9999
  el.style.width = elm.clientWidth + 'px'
  return el
}

function exchange (arr, idx, idx2) {
  var temp = arr[idx]
  arr[idx] = arr[idx2]
  arr[idx2] = temp
}

function findIndex (arr, target) {
  var i = arr.length
  while (i--) {
    if (arr[i] === target) {
      return i
    }
  }
}

// 成功则返回target 能不能用VDOM保存起来这些数据
function getOVerlayElm (source, target, threshold) {
  var p1 = source.getBoundingClientRect()
  var p2 = target.getBoundingClientRect()
  var overlayWidth = (Math.min(p1.bottom, p2.bottom) - Math.max(p1.top, p2.top))
  var overlayHeight = (Math.min(p1.right, p2.right) - Math.max(p1.left, p2.left))
  if (overlayWidth > 0 && overlayHeight > 0) {
    var overlay = overlayWidth * overlayHeight
    var minarea = Math.min(p1.width * p1.height, p2.width * p2.height)
    if (overlay / minarea > threshold) {
      // 表示target元素被souce覆盖了！
      return target
    }
  }
  return null
}

function UpdateSchema () {
  return {
    NewConatiner: function (sourceElm, container) {
      container.appendChild(sourceElm)
      return true
    },
    Up: function (sourceElm, el) {
      el.parentNode.insertBefore(sourceElm, el)
      return true
    },
    Down: function (sourceElm, el) {
      el.parentNode.insertBefore(sourceElm, el.nextSibling)
      return true
    },
    CrossUp: function (sourceElm, el) {
      el.parentNode.insertBefore(sourceElm, el)
      return true
    },
    CrossDown: function (sourceElm, el) {
      el.parentNode.insertBefore(sourceElm, el.nextSibling)
      return true
    }
  }
}
