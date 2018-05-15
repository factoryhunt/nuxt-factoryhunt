<template>
  <div class="input-container">
    <input 
      :id="id"
      type="text"
      :placeholder="placeholder"
      :pattern="pattern"
      :value="value"
      :title="title"
      @input="onInput($event.target.value)"
      @change="onChange($event.target.value)">
  </div>
</template>

<script>
export default {
  props: ['id', 'dataKey', 'value', 'placeholder', 'pattern', 'title'],
  methods: {
    onInput(value) {
      const result = {
        dataKey: this.dataKey,
        value: value
      }
      this.$emit('input', result)
    },
    onChange(value) {
      this.$emit('change', value)
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
input {
  width: 100%;
  padding: 11px;
  font-size: inherit;
  transition: border-color linear 0.2s;

  &:focus {
    border-color: @color-link;
  }
}
</style>
