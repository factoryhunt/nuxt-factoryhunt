<template>
  <div>
    <input 
      :id="id"
      type="checkbox"
      :checked="checked"
      @input="inputHanlder">
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
      type: String
    },
    value: String,
    label: String
  },
  data: () => ({
    checked: this.value
  }),
  methods: {
    inputHanlder(event) {
      this.checked = !this.checked
      this.$emit('change', this.checked)
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
