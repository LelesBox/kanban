<template lang="html">
  <div class="container" ref="container">
    <div class="list" drag v-for="list in boardData">
      <div class="list-header" drag-el>{{list.header}}</div>
      <div class="list-card" ref="listcard">
        <Card v-for="card in list.items">
          {{card.text}}
        </Card>
      </div>
      <add-card></add-card>
    </div>
  </div>
</template>

<script>
import dragable from './drag'
import Card from './boardCard'
import addCard from './addcard'
var listcard = null
var container = null

export default {
  data () {
    return {}
  },
  computed: {
    boardData () {
      if (listcard && container) {
        this.$nextTick(() => {
          listcard.update()
          container.update()
        })
      }
      return this.$store.state.board
    }
  },
  mounted () {
    this.$nextTick(() => {
      listcard = dragable(this.$refs.listcard)
      container = dragable(this.$refs.container)
      this.getBoardData()
    })
  },
  methods: {
    getBoardData: function (id) {
      this.$store.dispatch('FETCH_BOARD_DATA')
    }
  },
  components: {
    Card,
    addCard
  }
}
</script>

<style lang="scss" css-modules>
.container {
  height: 100%;
  padding: 8px;
  white-space:nowrap;
  user-select: none;
  -webkit-user-select:none;
  -moz-user-select: none;
  * {
     user-select: none;
     -webkit-user-select:none;
     -moz-user-select: none;
  }
}
.list {
  width: 270px;
  border-radius: 4px;
  background-color: #e2e4e6;
  cursor: pointer;
  display: inline-block;
  vertical-align: top;
  margin-left: 10px;
  user-select: none;
  -webkit-user-select:none;
  -moz-user-select: none;
  font-size: 14px;
  .list-header {
    font-size: 18px;
    font-weight: bold;
    height: 34px;
    padding: 10px;
  }
  .list-card {
    padding: 10px;
  }
}
</style>
<style lang="scss">
.card {
  margin: 10px 0;
  border-bottom: 2px solid #D6DADC;
  &:hover {
    background-color: #EDEFF0;
  }
  &:first-child {
    margin-top: 0px;
  }
  &:last-child {
    margin-bottom: 0px;
  }
}
</style>
