<template lang="html">
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
require('normalize.css')
// require('assets/font-awesome-4.7.0/css/font-awesome.min.css')
</script>
<style lang="scss">
html, body {
  background-color: #0079bf;
  height: 100%;
  width: 100%;
  * {
    box-sizing: border-box;
  }
}
#app {
  height: 100%;
}
</style>
