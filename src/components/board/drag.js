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

export default function dragable (elms, id) {
  var index = 0
  if (id !== undefined) {
    index = id
  } else {
    index = idx++
  }
  if (elms.length === undefined) {
    elms.setAttribute('drag-id', index)
  } else {
    for (var i = 0, l = elms.length; i < l; i++) {
      elms[i].setAttribute('drag-id', index)
    }
  }
  updateViews[index] = applyDrag(elms)
  return {
    update: function () {
      dragable(elms, index)
    }
  }
}
dragable.onmove = function (cb) {
  onmove = cb
}

module.exports = dragable
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
    setTimeout(function () {
      source = s
      target = copyElmement(source)
      addClass(source, 'drag-mask')
      document.body.appendChild(target)
    })
  }
}

function onMove (e) {
  if (target !== null) {
    point.moveX = e.clientX
    point.moveY = e.clientY
    _updateView(target, source, point)
    onmove && onmove(target, point)
  }
}
function stopMove (e) {
  if (target) {
    document.body.contains(target) && document.body.removeChild(target)
    removeClass(source, 'drag-mask')
    target = null
  }
}

function applyDrag (container) {
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
        cot.appendChild(sourceElm)
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
          // 当跨容器拖动的时候你可能会纳闷elms顺序都变了，就会出现上下元素但是elms位置完全相反的情况
          // 但是仔细想想，如果对调了，一个元素从下往上拖，但是它的targetIdx < i。
          // 那么执行el.parentNode.insertBefore(sourceElm, el.nextSibling)的时候，el.nextSibling相当于sourceElm。所以insert步骤什么都没做
          // 接着调换targetIdx和i，这样他们的顺序就正常了，接在在下一次循环的时候就能正常触发 targetIdx > i的情况
          // 不得不说，js的循环真的很快，每次拖动都去遍历近100个元素都不见卡顿
          if (targetIdx < i) {
            el.parentNode.insertBefore(sourceElm, el.nextSibling)
            exchange(elms, targetIdx, i)
          } else if (targetIdx > i) {
            el.parentNode.insertBefore(sourceElm, el)
            exchange(elms, targetIdx, i)
          }
          return
        }
      } else if (getOVerlayElm(elm, el, 0.5)) {
        b = el.getBoundingClientRect()
        if (a.top > b.top) {
          el.parentNode.insertBefore(sourceElm, el.nextSibling)
        } else if (a.bottom < b.bottom) {
          el.parentNode.insertBefore(sourceElm, el)
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
  return -1
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
