<template>
  <div class="input-container">
    <input 
      type="text"
      :placeholder="placeholder"
      :pattern="pattern"
      :value="value"
      :title="title"
      @input="$emit('input', $event.target.value)">
  </div>
</template>

<script>
export default {
  props: ['value', 'placeholder', 'pattern', 'title']
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
