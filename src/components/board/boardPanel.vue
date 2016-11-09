<template lang="html">
  <div class="container" ref="container">
    <div class="list" drag v-for="list in boardData.list">
      <boarder-header :list-id="list.list_id" :name="list.list_name"></boarder-header>
      <div class="list-card listcard" ref="listcard">
        <Card v-for="card in list.cards" :card-id="card.card_id" :list-id="list.list_id">
          {{card.text}}
        </Card>
      </div>
      <add-card :list-id="list.list_id"></add-card>
    </div>
    <add-list></add-list>
    <list-option></list-option>
    <card-overlay></card-overlay>
  </div>
</template>

<script>
import Dragable from './drag'
import boarderHeader from './boardheader'
import Card from './boardCard'
import addCard from './addcard'
import addList from './addlist'
import listOption from './listOption'
import cardOverlay from './cardOverlay'
var listcard = null
var container = null

export default {
  data () {
    return {}
  },
  computed: {
    boardData () {
      return this.$store.state.current_board
    }
  },
  mounted () {
    this.getBoardData(this.$route.params.board_id)
  },
  updated () {
    if (this.$store.state.current_board.list && this.$store.state.current_board.list.length > 0) {
      this.$nextTick(() => {
        if (listcard && container) {
          this.$nextTick(() => {
            listcard.update()
            container.update()
          })
        } else {
          listcard = new Dragable()
          listcard.on(this.$refs.listcard, ({ removed, insert }) => {
            this.$store.dispatch('UPDATE_CARD_POSITION', { board_id: this.$route.params.board_id, removed, insert })
          })
          container = new Dragable()
          container.on(this.$refs.container, ({ removed, insert }) => {
            this.$store.dispatch('UPDATE_LIST_POSITION', { board_id: this.$route.params.board_id, removed, insert })
          })
        }
      })
    }
  },
  methods: {
    getBoardData: function (id) {
      this.$store.dispatch('FETCH_BOARD_DATA', { id })
    }
  },
  components: {
    boarderHeader,
    Card,
    addCard,
    addList,
    listOption,
    cardOverlay
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
