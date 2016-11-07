<template lang="html">
  <div class="options" :style="{ left: left + 'px', top: top + 'px' }" v-show="showOption">
    <ul class="option-ul">
      <li class="item" @click="optionClick('remove list')">
        <span>REMOVE LIST</span>
      </li>
      <!-- <li class="item" @click="optionClick('add list')">
        <span>ADD LIST</span>
        </li>
      <li class="item" @click="optionClick('add card')">
        <span>ADD CARD</span>
      </li> -->
    </ul>
  </div>
</template>

<script>
import eventHub, { OPEN_HEADER_OPTION, CLOSE_HEADER_OPTION } from './eventHub'

export default {
  data () {
    return {
      left: 0,
      top: 0,
      listId: '',
      showOption: false
    }
  },
  mounted () {
    eventHub.$on(OPEN_HEADER_OPTION, ({ left, bottom, list_id }) => {
      this.left = left
      this.top = bottom
      this.listId = list_id
      this.showOption = true
    })
    eventHub.$on(CLOSE_HEADER_OPTION, () => {
      this.showOption = false
    })
  },
  methods: {
    optionClick (type) {
      switch (type) {
        case 'remove list':
          return this.$store.dispatch('REMOVE_LIST', { board_id: this.$route.params.board_id, list_id: this.listId })
        case 'add list':
          return
        case 'add card':
          return
      }
    }
  },
  destroyed () {
    eventHub.$off(OPEN_HEADER_OPTION)
    eventHub.$off(CLOSE_HEADER_OPTION)
  }
}
</script>

<style lang="scss" css-modules>
.options {
  position: fixed;
  // height: 120px;
  width: 200px;
  background-color: #fff;
  box-shadow: 0 0 10px 1px darken(#fff, 20%);
}
.option-ul {
  margin: 0;
  padding: 0;
  list-style: none;
  height: 100%;
  .item {
    height: 40px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    position: relative;
    cursor: pointer;
    &:hover {
      color: lighten(#000, 10%);
      background-color: darken(#fff, 10%);
    }
    &:active {
      color: lighten(#000, 20%);
      background-color: darken(#fff, 15%);
    }
    span {
      display: block;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
