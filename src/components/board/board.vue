<template lang="html">
  <div class="container">
    <div class="header">
      this is header
    </div>
    <div class="board-header">
      <span class="title left">
        Vue Plan
      </span>
      <span class="left">
        😂
      </span>
      <span>
        😱 Private
      </span>
      <a class="menu">
        Show Menu
      </a>
    </div>
    <div class="panel">
      <board-panel></board-panel>
    </div>
  </div>
</template>

<script>
import boardPanel from './boardPanel'
export default {
  data () {
    return {}
  },
  computed: {},
  mounted () {},
  methods: {},
  components: {
    boardPanel
  }
}
</script>

<style lang="scss" css-modules>
.container {
  height: 100%;
  font-size: 14px;
}
.header {
  height: 40px;
  line-height: 40px;
  color: #fff;
  background-color: rgba(0, 0, 0, .3);
}
.board-header {
  height: 46px;
  padding: 8px 4px 8px 18px;
  line-height: 30px;
  color: #fff;
  .left {
    margin-right: 6px;
  }
  .title {
    font-size: 18px;
  }
  .menu {
    height: 30px;
    line-height: 30px;
    text-decoration: underline;
    font-size: 9pt;
    float: right;
    padding-right: 22px;
    position: relative;
    top:50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
}
.panel {
  position:absolute;
  top:0;
  padding-top:86px;
  height:100%;
  width:100%;
}
</style>
