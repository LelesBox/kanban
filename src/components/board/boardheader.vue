<template lang="html">
  <div class="container">
    <div class="header" drag-el @click="click">
      <span v-show="!showInput">{{name}}</span>
      <div class="input-container" v-show="showInput">
        <input type="text" class="input" v-model="text" @blur="blur" @keyup.enter="blur" ref="input">
      </div>
    </div>
    <div class="icon-container">
      <i class="fa fa-ellipsis-h icon header-option" @click="openOption" ref="ellipsis"></i>
    </div>
  </div>
</template>

<script>
import eventHub, { OPEN_HEADER_OPTION } from './eventHub'
export default {
  props: {
    name: {
      type: String
    },
    listId: {
      type: String
    }
  },
  data () {
    return {
      showInput: false,
      text: ''
    }
  },
  mounted () {
    this.text = this.name
  },
  methods: {
    blur () {
      if (this.text !== '') {
        this.$store.dispatch('UPDATE_LIST_NAME', { board_id: this.$route.params.board_id, list_id: this.listId, list_name: this.text })
        this.showInput = false
      } else {
        this.$nextTick(() => {
          this.$refs.input.focus()
        })
      }
    },
    click () {
      this.showInput = true
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },
    openOption () {
      var p = this.$refs.ellipsis.getBoundingClientRect()
      eventHub.$emit(OPEN_HEADER_OPTION, { left: p.left, bottom: p.bottom, list_id: this.listId })
    }
  },
  components: {}
}
</script>

<style lang="scss" css-modules>
.container {
  width: 100%;
  position: relative;
}
.header {
  display: inline-block;
  font-size: 18px;
  font-weight: bold;
  min-height: 34px;
  width: 230px;
  padding: 10px;
  white-space: normal;
  word-break:break-all;
  vertical-align:middle;
  position: relative;
}
.input-container {
  position: absolute;
  width: 100%;
  height: 40px;
  padding: 5px;
  top:0;
  left:0;
}
.input {
  display: block;
  width: 100%;
  height: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 0px;
  white-space: nowrap;
}
.icon-container {
  position: absolute;
  padding: 5px;
  height: 40px;
  line-height: 30px;
  display: inline-block;
}
.icon {
  position: relative;
  left: 10px;
  color: #c4c9cc;
  &:hover {
    color: darken(#c4c9cc, 10%);
  }
  &:active {
    color: darken(#c4c9cc, 15%);
  }
}
</style>
