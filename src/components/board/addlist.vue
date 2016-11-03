<template lang="html">
  <div class="newlist">
    <div class="text" v-show="!showInput" @click="openInput">
      Add a List..
    </div>
    <div class="add-input" v-show="showInput">
      <input class="input" placeholder="Add a List" ref="input" v-model="list_name" @keyup.enter="addList"></input>
      <div>
        <div class="add-btn" @click="addList">
          Add
        </div>
        <i class="fa fa-times close" @click="showInput = false"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list_name: '',
      board_id: '',
      showInput: false
    }
  },
  mounted () {
    this.board_id = this.$route.params.board_id
  },
  methods: {
    addList () {
      if (this.list_name !== '') {
        this.$store.dispatch('ADD_NEWLIST', { board_id: this.board_id, list_name: this.list_name })
        this.list_name = ''
      }
    },
    openInput () {
      this.showInput = true
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    }
  }
}
</script>

<style lang="scss" css-modules>
.newlist {
  width: 270px;
  display: inline-block;
  vertical-align: top;
  margin-left: 10px;
  font-size: 14px;
}
.text {
  border-radius: 4px;
  background-color: rgba(0, 0, 0, .1);
  padding: 10px 15px;
  cursor: pointer;
  user-select: none;
  -webkit-user-select:none;
  -moz-user-select: none;
  color: #D6DADC;
  transition: all .2s;
  &:hover {
    background-color: darken(rgba(0, 0, 0, .1), 10%);
    color: darken(#D6DADC, 10%);
  }
}
.add-input {
  border-radius: 4px;
  background-color: #e2e4e6;
  padding: 5px;
  transition: all .2s;
  .input {
    width: 100%;
    border-radius: 4px;
    border: 0px;
    padding: 10px;
    margin-bottom: 10px;
  }
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
    cursor: pointer;
    background-color: #5cb248;
    &:hover {
      background-color: darken(#5cb248, 10%);
    }
    &:active {
      background-color: darken(#5cb248, 15%);
    }
  }
  .close {
    color: #8d8d8d;
    font-size: 18px;
    cursor: pointer;
    &:hover {
      color: darken(#8d8d8d, 10%);
    }
    &:active {
      color: darken(#8d8d8d, 15%);
    }
  }
}
</style>
