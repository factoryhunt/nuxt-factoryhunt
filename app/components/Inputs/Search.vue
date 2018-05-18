<template>
  <div class="container">
    <text-input
      ref="textInput"
      :value="value"
      :dataKey="dataKey"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :maxlengthDisplay="maxlengthDisplay"
      :pattern="pattern"
      @input="onInput"/>
    <box 
      v-show="!isHidden && value">
      <box-option
        v-for="data in results"
        :key="data.id"
        :option="data.name"
        @input="onOption"/>
    </box>
  </div>
</template>

<script>
import RemainLength from './components/RemainLength'
import TextInput from './Text'
import Box from './components/Box'
import BoxOption from './components/BoxOption'
export default {
  components: {
    RemainLength,
    TextInput,
    Box,
    BoxOption
  },
  props: {
    value: null,
    array: [Array, Object],
    dataKey: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    pattern: null,
    maxlength: [String, Number],
    maxlengthDisplay: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    isHidden: false,
    results: []
  }),
  methods: {
    init() {
      this.addEventListener()
    },
    addEventListener() {
      const $textInput = this.$refs['textInput'].$el.children[0]

      document.addEventListener('click', event => {
        const target = event.target
        const result = target === $textInput

        if (!result) this.isHidden = true
      })
    },
    getRelatedKeywords() {
      const input = this.value.toLowerCase()

      const results = this.array
        .filter(item => {
          const id = item.id
          const name = item.name.toLowerCase()

          return name.indexOf(input) > -1
        })
        .sort()

      return results
    },
    onInput(data) {
      this.isHidden = false
      this.results = this.getRelatedKeywords()
      this.$emit('input', data)
    },
    onOption(value) {
      this.isHidden = true
      const result = {
        dataKey: this.dataKey,
        value: value
      }
      this.$emit('input', result)
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
@import './style/index';
</style>
