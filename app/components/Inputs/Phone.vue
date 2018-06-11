<template>
  <div>
    <input 
      type="text"
      ref="input"
      :placeholder="placeholder"
      :pattern="pattern"
      :value="value"
      @input="onInput($event.target.value)">
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    pattern: {
      type: RegExp
    }
  },
  methods: {
    onInput(value) {
      this.$emit('update:value', value)
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
@import '~assets/css/less/wizard/index';
</style>
