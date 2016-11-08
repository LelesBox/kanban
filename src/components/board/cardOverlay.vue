<template lang="html">
  <div class="container" @click="closePanel($event)" v-show="visible">
    <div class="edit-container" :style="{ left: left + 'px', top: top + 'px' }">
      <div class="left">
        <increse-textarea @enter="enter" :init-text="text" ref="textarea"></increse-textarea>
        <div class="button" @click="save">
          Save
        </div>
      </div>
      <div class="right">
        <div class="item" @click="remove">
          <i class="fa fa-remove"></i> remove
        </div>
        <br>
        <div class="item">
          <i class="fa fa-copy"></i> copy
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import increseTextarea from './increseTextarea'
import eventHub, { OPEN_CARD_EDIT_PANEL } from './eventHub'
export default {
  data () {
    return {
      left: 0,
      top: 0,
      list_id: null,
      card_id: null,
      text: '',
      visible: false
    }
  },
  mounted () {
    eventHub.$on(OPEN_CARD_EDIT_PANEL, ({ left, top, text, list_id, card_id }) => {
      this.visible = true
      this.text = text
      this.left = left
      this.top = top
      this.list_id = list_id
      this.card_id = card_id
    })
  },
  methods: {
    closePanel (e) {
      if (e.target === this.$el) {
        this.visible = false
      }
    },
    enter (text) {
      if (text.trim() !== this.text.trim()) {
        this.$store.dispatch('UPDATE_CARD', { text: text, list_id: this.list_id, card_id: this.card_id })
      }
      this.visible = false
    },
    remove () {
      this.$store.dispatch('REMOVE_CARD', { list_id: this.list_id, card_id: this.card_id })
      this.visible = false
    },
    save () {
      //
      this.$refs.textarea.enter()
    }
  },
  components: {
    increseTextarea
  }
}
</script>

<style lang="scss" css-modules>
  .container {
    position: fixed;
    z-index: 9999;
    height: 100%;
    width: 100%;
    top:0;
    left:0;
    background-color: rgba(0, 0, 0, .4);
  }
  .button {
    border-radius: 4px;
    margin-top:10px;
    text-align: center;
    width: 90px;
    padding: 10px;
    color: #fff;
    background-color: #5cb248;
    cursor: pointer;
    &:hover {
      background-color: darken(#5cb248, 10%);
    }
    &:active {
      background-color: darken(#5cb248, 15%);
    }
  }
  // height: 0px;设为0，不给父容器高度，这样鼠标点击空白处处时总是点击该组件的父容器。为了closePanel方便
  .edit-container {
    position: absolute;
    height: 0px;
    .left {
      float: left;
      width: 250px;
      height: 0px;
    }
    .right {
      float: left;
      margin-left: 260px;
      list-style: none;
      cursor: pointer;
      .item {
        display: inline-block;
        border-radius: 4px;
        background-color: rgba(0, 0, 0, .5);
        padding: 10px 15px;
        margin-bottom: 10px;
        color: #fff;
        transition: all .3s;
        &:hover {
          color: darken(#fff, 10%);
          background-color: darken(rgba(0, 0, 0, .5), 20%);
          transform: translateX(10px);
        }
      }
    }
  }
</style>
