<template lang="html">
  <div class="container">
    <a class="list-bottom" v-show="!show_textarea" @click="openCard">
      Add a card...
    </a>
    <div class="input" v-show="show_textarea">
      <textarea name="name" class="textarea" ref="textarea" :style="{ height: textHeight + 'px'}" @keyup.enter="addCard" v-model="text">
      </textarea>
      <textarea name="name" class="textarea hide" ref="hideTextarea">{{text}}</textarea>
      <div class="add">
        <a class="add-btn" @click="addCard">Add</a>
        <i class="icon fa fa-times" @click="closeCard"></i>
        <a class="right-icon">
          <i class="fa fa-ellipsis-h icon"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import eventHub, { OPEN_TEXTAREA } from './eventHub'

export default {
  props: {
    listId: {
      type: String
    }
  },
  data () {
    return {
      text: '',
      textHeight: 70,
      boardId: '',
      show_textarea: false
    }
  },
  mounted () {
    this.boardId = this.$route.params.board_id
    eventHub.$on(OPEN_TEXTAREA, id => {
      if (id !== this.listId) {
        this.show_textarea = false
      }
    })
  },
  watch: {
    text (newval, oldval) {
      this.$nextTick(() => {
        if (this.$refs.hideTextarea.scrollHeight > 70) {
          this.textHeight = this.$refs.hideTextarea.scrollHeight + 10
        } else {
          this.textHeight = 70
        }
      })
    }
  },
  methods: {
    openCard () {
      this.show_textarea = true
      eventHub.$emit(OPEN_TEXTAREA, this.listId)
      this.$nextTick(() => {
        this.$refs.textarea.focus()
      })
    },
    closeCard () {
      this.show_textarea = false
    },
    addCard () {
      if (this.text !== '') {
        this.$store.dispatch('ADD_CARD', { text: this.text, board_id: this.boardId, list_id: this.listId })
        this.text = ''
        this.$nextTick(() => {
          this.$refs.textarea.focus()
        })
      }
    }
  },
  destroyed () {
    eventHub.$off(OPEN_TEXTAREA)
  }
}
</script>

<style lang="scss" css-modules>
.list-bottom {
  display: block;
  height: 34px;
  padding: 10px;
  color: #8d8d8d;
  cursor: pointer;
  border-radius:0 0 4px 4px;
  &:hover {
    text-decoration: underline;
    color: darken(#8d8d8d, 10%);
    background-color: #c4c9cc;
  }
}
.input {
   padding: 0 10px 10px 10px;
}
.textarea {
  border-radius: 4px;
  width: 100%;
  border: 0px;
  padding: 10px;
  overflow: hidden;
  resize:none;
  &.hide {
    position: relative;
    left: -9999px;
    overflow: visible;
  }
}
.add {
  margin-top: 5px;
  height: 30px;
  .add-btn {
    display: inline-block;
    height:100%;
    width: 90px;
    border-radius: 4px;
    color: #fff;
    text-align: center;
    line-height: 30px;
    font-size: 16px;
    font-weight: bold;
    margin-right: 10px;
    background-color: #5cb248;
    &:hover {
      background-color: darken(#5cb248, 10%);
    }
    &:active {
      background-color: darken(#5cb248, 15%);
    }
  }
  .icon {
    color: #c4c9cc;
    &:hover {
      color: darken(#c4c9cc, 10%);
    }
    &:active {
      color: darken(#c4c9cc, 15%);
    }
  }
  .right-icon {
    float: right;
    width: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 4px;
    &:hover {
      background-color: darken(#e2e4e6, 10%);
    }
    &:hover .icon{
      color: darken(#c4c9cc, 10%);
    }
    &:active {
      background-color: darken(#e2e4e6, 15%);
    }
    &:active .icon{
      color: darken(#c4c9cc, 15%);
    }
  }
}
</style>
