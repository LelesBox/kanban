<template lang="html">
  <div class="container">
    <a class="list-bottom" v-show="!showTextarea" @click="openCard">
      Add a card...
    </a>
    <div class="input" v-show="showTextarea">
      <textarea name="name" class="textarea" ref="textarea" @input="oninput" :style="{ height: textHeight + 'px'}" v-model="text">
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
export default {
  props: {
    listId: {
      type: Number
    }
  },
  data () {
    return {
      text: '',
      textHeight: 70,
      showTextarea: false
    }
  },
  computed: {},
  mounted () {},
  methods: {
    openCard () {
      this.showTextarea = true
    },
    closeCard () {
      this.showTextarea = false
    },
    addCard () {
      //
    },
    oninput () {
      this.$nextTick(() => {
        if (this.$refs.hideTextarea.scrollHeight > 70) {
          this.textHeight = this.$refs.hideTextarea.scrollHeight + 10
        } else {
          this.textHeight = 70
        }
      })
    }
  },
  components: {}
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
