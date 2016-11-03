<template lang="html">
  <div class="container card" drag>
    <slot></slot>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {},
  mounted () {},
  methods: {},
  components: {}
}
</script>

<style lang="scss" css-modules>
.container {
  padding: 10px;
  background-color: #fff;
  border-radius: 4px;
  font-size: 14px;
  word-break:break-all;
  white-space:normal;
  line-height: 16px;
}
</style>
