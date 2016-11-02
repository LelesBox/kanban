var trim = function (string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}

var hasClass = function (el, cls) {
  if (!el || !cls) return false
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.')
  if (el.classList) {
    return el.classList.contains(cls)
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
  }
}

var addClass = function (el, cls) {
  if (!el) return
  var curClass = el.className
  var classes = (cls || '').split(' ')

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[ i ]
    if (!clsName) continue

    if (el.classList) {
      el.classList.add(clsName)
    } else {
      if (!hasClass(el, clsName)) {
        curClass += ' ' + clsName
      }
    }
  }
  if (!el.classList) {
    el.className = curClass
  }
}

var removeClass = function (el, cls) {
  if (!el || !cls) return
  var classes = cls.split(' ')
  var curClass = ' ' + el.className + ' '

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[ i ]
    if (!clsName) continue

    if (el.classList) {
      el.classList.remove(clsName)
    } else {
      if (hasClass(el, clsName)) {
        curClass = curClass.replace(' ' + clsName + ' ', ' ')
      }
    }
  }
  if (!el.classList) {
    el.className = trim(curClass)
  }
}

var addVendor = function (property, value) {
  return property + ':' + value
}

var bindEvent = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        if (element.length !== undefined) {
          for (var i = 0, l = element.length; i < l; i++) {
            element[i].addEventListener(event, handler, false)
          }
        } else {
          element.addEventListener(event, handler, false)
        }
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        if (element.length !== undefined) {
          for (var i = 0, l = element.length; i < l; i++) {
            element[i].attachEvent('on' + event, handler)
          }
        } else {
          element.attachEvent('on' + event, handler)
        }
      }
    }
  }
})()

module.exports = {
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  addVendor,
  on: bindEvent
}
