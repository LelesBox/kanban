<template lang="html">
  <div class="container card" drag>
    <slot></slot>
    <div class="edit" @click="edit">
      <i class="fa fa-pencil"></i>
    </div>
  </div>
</template>

<script>
import eventHub, { OPEN_CARD_EDIT_PANEL } from './eventHub'
export default {
  props: {
    cardId: {
      type: String
    },
    listId: {
      type: String
    }
  },
  data () {
    return {}
  },
  methods: {
    edit () {
      var position = this.$el.getBoundingClientRect()
      console.log(this.$slots.default[0].text)
      eventHub.$emit(OPEN_CARD_EDIT_PANEL, {
        left: position.left,
        top: position.top,
        list_id: this.listId,
        card_id: this.cardId,
        text: this.$slots.default[0].text.trim()
      })
    }
  },
  components: {}
}
</script>

<style lang="scss" css-modules>
.container {
  position: relative;
  padding: 10px;
  background-color: #fff;
  border-radius: 4px;
  font-size: 14px;
  word-break:break-all;
  white-space:normal;
  line-height: 16px;
}
.edit {
  position:absolute;
  top:0;
  right:0;
  margin:3px;
  padding:3px;
  border-radius:4px;
  color: #c4c9cc;
  opacity: .6;
  font-size: 12px;
  &:hover {
    color: darken(#c4c9cc, 10%);
    opacity: 1;
  }
  &:active {
    color: darken(#c4c9cc, 15%);
    opacity: 1;
  }
}
</style>
