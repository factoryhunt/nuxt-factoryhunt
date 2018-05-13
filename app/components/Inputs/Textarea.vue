<template>
  <div>
    <textarea 
      :rows="rows"
      :placeholder="placeholder"
      :title="title"
      :value="value"
      @input="onInput($event.target.value)">
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
    placeholder: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    value: null,
    dataKey: String
  },
  methods: {
    onInput(value) {
      const result = {
        dataKey: this.dataKey,
        value: value
      }
      this.$emit('input', result)
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
textarea {
  width: 100%;
  padding: 11px;
  font-size: inherit;
  transition: border-color linear 0.2s;

  &:focus {
    border-color: @color-link;
  }
}
</style>
