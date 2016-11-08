import Vue from 'vue'

Vue.directive('drag', {
  bind: function (el, binding, vnode) {
    var s = JSON.stringify
    el.innerHTML =
      'name: ' + s(binding.name) + '<br>' +
      'value: ' + s(binding.value) + '<br>' +
      'expression: ' + s(binding.expression) + '<br>' +
      'argument: ' + s(binding.arg) + '<br>' +
      'modifiers: ' + s(binding.modifiers) + '<br>' +
      'vnode keys: ' + Object.keys(vnode).join(', ')
  },
  unbind: function () {
    console.log('unbind')
  }
})

Vue.directive('drag-item', {
  bind: function (el, binding, vnode) {
    // el.addEventListner('')
    console.log(binding)
  },
  unbind: function () {
    console.log('unbind')
  }
})
