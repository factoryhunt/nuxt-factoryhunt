<template>
  <div class="input-container">
    <input 
      :id="id"
      ref="input"
      type="text"
      :placeholder="placeholder"
      :pattern="pattern"
      :value="value"
      :title="title"
      :maxlength="maxlength"
      @input="onInput($event.target.value)"
      @change="onChange($event.target.value)">
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: null
    },
    value: {
      type: null,
      default: ''
    },
    placeholder: {
      type: String
    },
    pattern: {
      type: null
    },
    title: {
      type: String
    },
    maxlength: {
      type: [String, Number]
    }
  },
  methods: {
    onInput(value) {
      this.$emit('onInput', value)
    },
    onChange(value) {
      this.$emit('onChange', value)
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
@import './style/index';
</style>
