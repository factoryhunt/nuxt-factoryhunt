<template>
  <div class="input-container">
    <remain-length
      :value="value"
      :maxlength="maxlength"
      :isHidden="!maxlengthDisplay"/>
    <input 
      :id="id"
      :type="type"
      ref="input"
      :required="required"
      :placeholder="placeholder"
      :pattern="pattern"
      :value="value"
      :title="title"
      :maxlength="maxlength"
      @click="$emit('click')"
      @input="event => $emit('input', event.target.value)"
      @change="onChange($event.target.value)">
    <img 
      class="icon"
      v-show="image" 
      :src="image">
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
    type: {
      type: String,
      default: 'text'
    },
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
    },
    image: String
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
.input-container {
  position: relative;
}
input {
  padding-right: 38px;
}
.icon {
  position: absolute;
  top: 11px;
  right: 11px;
  width: 20px;
  height: 20px;
}
</style>
