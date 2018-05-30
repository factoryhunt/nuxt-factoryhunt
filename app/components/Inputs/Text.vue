<template>
  <div class="input-container">
    <remain-length
      :value="value"
      :maxlength="maxlength"
      :isHidden="!maxlengthDisplay"/>
    <input 
      :id="id"
      type="text"
      ref="input"
      :required="required"
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
import RemainLength from './components/RemainLength'
export default {
  components: {
    RemainLength
  },
  props: {
    id: {
      type: null
    },
    dataKey: String,
    value: {
      type: null,
      default: ''
    },
    placeholder: {
      type: String
    },
    required: {
      type: Boolean,
      default: false
    },
    pattern: null,
    title: {
      type: String
    },
    maxlength: {
      type: [String, Number]
    },
    maxlengthDisplay: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getData(value) {
      const result = {
        dataKey: this.dataKey,
        value: value
      }

      return result
    },
    onInput(value) {
      this.$emit('input', this.getData(value))
    },
    onChange(value) {
      this.$emit('change', this.getData(value))
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
@import './style/index';
</style>
