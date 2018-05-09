<template>
  <div>
    <input 
      id="checkbox"
      type="checkbox"
      :value="value"
      @input="$emit('input', $event.target.value)">
    <label for="checkbox" v-html="label"></label>
  </div>
</template>

<script>
export default {
  props: ['value', 'label']
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
</style>
