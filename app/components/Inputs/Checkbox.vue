<template>
  <div>
    <input 
      :id="id"
      type="checkbox"
      :value="value"
      @change="onChange($event.target.checked)">
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
    dataKey: String,
    checked: Boolean,
    value: String,
    label: String
  },
  methods: {
    onChange(value) {
      const result = {
        dataKey: this.dataKey,
        value: value
      }
      this.$emit('change', result)
    }
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
