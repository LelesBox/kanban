<template lang="html">
  <div class="container">
    <textarea  class="textarea" ref="textarea"
              :style="{ height: textHeight + 'px'}"
              @keyup.enter="enter($event)" v-model="text">
    </textarea>
    <textarea name="name" class="textarea hide" ref="hideTextarea">{{text}}</textarea>
  </div>
</template>

<script>
export default {
  props: {
    minHeight: {
      type: Number,
      default: 70
    },
    initText: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      text: '',
      textHeight: 0
    }
  },
  watch: {
    text (newval, oldval) {
      this.$nextTick(() => {
        if (this.$refs.hideTextarea.scrollHeight > this.minHeight) {
          this.textHeight = this.$refs.hideTextarea.scrollHeight + 10
        } else {
          this.textHeight = this.minHeight
        }
      })
    },
    initText (newval, oldval) {
      this.text = newval
      this.$nextTick(() => {
        this.$refs.textarea.focus()
      })
    }
  },
  mounted () {
    this.textHeight = this.minHeight
  },
  methods: {
    enter (event) {
      if (this.text.trim() !== '') {
        this.$emit('enter', this.text)
      }
    }
  }
}
</script>

<style lang="scss" css-modules>
.container {
  width: 100%;
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
