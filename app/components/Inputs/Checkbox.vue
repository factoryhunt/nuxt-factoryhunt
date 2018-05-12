<template>
  <div>
    <input 
      :id="id"
      type="checkbox"
      :value="value"
      @change="$emit('change', $event.target.value)">
    <label :for="id" v-html="label"></label>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    id: {
      type: String,
      required: true
    },
    checked: Boolean,
    value: String,
    label: String
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
input,
label {
  cursor: pointer;
}
</style>
