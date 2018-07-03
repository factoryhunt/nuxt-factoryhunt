<template>
  <div class="container">
    <text-input
      ref="textInput"
      v-model="keyword"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :maxlengthDisplay="maxlengthDisplay"
      :pattern="pattern"/>
    <box 
      v-show="!isHidden && keyword">
      <box-option 
        v-show="isSearching"
        option="Searching.."/>
      <box-option
        v-for="data in results"
        :key="data.id"
        :option="data.identity"
        @click="$emit('input', data.identity)"/>
      <box-option 
        v-show="!results.length && !isSearching"
        option="No result."/>
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
    keyword: '',
    isHidden: false,
    isSearching: false,
    results: []
  }),
  methods: {
    init() {
      this.addEventListener()
      this.DelayKeyupEvent()
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
      const input = this.keyword.toLowerCase()
      const reducer = function(accumulator, value) {
        const { name, identity } = value
        const regex = new RegExp(input, 'gi')

        // const word = identity.match(regex)
        // if (word) console.log(word)
        // value.identity = identity.replace(regex, `<strong>${input}</strong>`)

        if (regex.test(identity)) accumulator.push(value)

        return accumulator
      }

      const results = this.array.reduce(reducer, [])

      return results
    },
    onInput(data) {
      this.isHidden = false
      this.$emit('input', data)
    },
    onOption(value) {
      this.isHidden = true
      const result = {
        dataKey: this.dataKey,
        value: value
      }
      this.$emit('change', result)
    },
    DelayKeyupEvent() {
      const $input = this.$refs.textInput.$refs.input

      var delay = (() => {
        var timer = 0
        return function(callback, ms) {
          clearTimeout(timer)
          timer = setTimeout(callback, ms)
        }
      })()

      $input.addEventListener('keydown', () => {
        this.isSearching = true
        this.results = []

        delay(() => {
          this.isSearching = false
          this.results = this.getRelatedKeywords()
        }, 800)
      })
    }
  },
  watch: {
    keyword(value) {
      value ? (this.isHidden = false) : (this.isHidden = true)
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
