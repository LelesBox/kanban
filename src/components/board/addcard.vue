<template lang="html">
  <div class="container">
    <!-- <a class="list-bottom">
      Add a card...
    </a> -->
    <div class="input">
      <textarea name="name" class="textarea" ref="textarea" @input="oninput" :style="{ height: textHeight + 'px'}" v-model="text">
      </textarea>
      <textarea name="name" class="textarea hide" ref="hideTextarea">{{text}}</textarea>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      text: '',
      textareaInitHeight: 0,
      textHeight: 70
    }
  },
  computed: {},
  mounted () {},
  methods: {
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
.container {
  padding: 8px;
}
.list-bottom {
  display: block;
  height: 34px;
  padding: 10px;
  color: #8d8d8d;
  cursor: pointer;
  border-radius:0 0 4px 4px;
  &:hover {
    text-decoration: underline;
    color: #000;
    background-color: #c4c9cc;
  }
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
</style>
