<template>
  <div class="container">
    <textarea 
      :rows="rows"
      :required="required"
      :placeholder="placeholder"
      :title="title"
      :value="value"
      @input="onInput($event.target.value)"
      @change="onChange($event.target.value)">
    </textarea>
  </div>
</template>

<script>
export default {
  props: {
    rows: {
      type: Number,
      default: 8
    },
    required: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    value: null,
    dataKey: String,
    maxlength: {
      type: [Number, String]
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
