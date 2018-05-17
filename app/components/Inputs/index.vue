<template>
  <div class="input-container">
    <!-- Length Remain Count -->
    <span 
      class="counting"
      v-if="maxlength && maxlengthDisplay">{{getRemainLength(value)}}</span>

    <!-- Text Input -->
    <text-input
      v-if="inputType === 'text'"
      :required="required"
      :placeholder="placeholder"
      :pattern="pattern"
      :value="value"
      :title="title"
      :maxlength="maxlength"
      @onInput="onInput"
      @onChange="onChange"/>

    
    <!-- Textarea -->
    <textarea-input
      v-if="inputType === 'textarea'"
      :required="required"
      :placeholder="placeholder"
      :value="value"
      :title="title"
      :maxlength="maxlength"
      @onInput="onInput"
      @onChange="onChange"/>

    <!-- Select Input -->
    <select-input
      v-if="inputType === 'select'"
      :value="value"
      :placeholder="placeholder">
      <select-box
        :array="array"
        :value="value"
        :placeholder="placeholder"
        @onInput="onInput"/>
    </select-input>

    <!-- Multi Select Input -->

    <!-- Search Input -->
    <div v-if="inputType === 'search'">
    </div>

    <!-- Custom -->
    <slot name="custom"></slot>
  </div>
</template>

<script>
import TextInput from './te'
import TextareaInput from './TA'
import SelectInput from './Sel'
import SelectBox from './components/SelectBox'
import { getRemainInputLength } from '~/utils/text'
export default {
  components: {
    TextInput,
    TextareaInput,
    SelectInput,
    SelectBox
  },
  data: () => ({
    remainLength: 0
  }),
  props: {
    inputType: {
      type: String,
      default: 'text'
    },
    id: {
      type: null
    },
    dataKey: {
      type: null
    },
    required: {
      type: null
    },
    value: {
      type: null,
      default: ''
    },
    array: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String
    },
    pattern: {
      type: null
    },
    title: {
      type: String
    },
    maxlength: {
      type: [String, Number]
    },
    maxlengthDisplay: {
      type: Boolean,
      default: true
    },
    maxlengthPosition: {
      type: String,
      default: 'top'
    }
  },
  methods: {
    init() {
      if (this.maxlengthPosition === 'bottom') {
        console.log('position bottom')
      }
    },
    getRemainLength(string) {
      return getRemainInputLength(string, this.maxlength)
    },
    onInput(value) {
      const result = {
        dataKey: this.dataKey,
        value: value
      }
      this.$emit('input', result)
    },
    onChange(value) {
      this.$emit('change', value)
    },
    onSelected(value, index) {
      this.unhighlightItems()

      const $item = this.$refs[`item${index}`][0]
      $item.classList.add(HIGHLIGHTED)

      this.currentValue = value
      this.isVisible = false

      this.$emit('input', value)
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
