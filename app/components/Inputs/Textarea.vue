<template>
  <div class="textarea-container">
    <remain-length
      :value="value"
      :maxlength="maxlength"
      :isHidden="!maxlengthDisplay"/>
    <textarea 
      ref="textarea"
      :rows="rows"
      :required="required"
      :placeholder="placeholder"
      :pattern="pattern"
      :title="title"
      :maxlength="maxlength"
      :value="value"
      @input="onInput($event.target.value)"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur')">
    </textarea>
  </div>
</template>

<script>
import RemainLength from './components/RemainLength'
export default {
  components: {
    RemainLength
  },
  props: {
    rows: {
      type: Number,
      default: 8
    },
    id: {
      type: null
    },
    dataKey: String,
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
      default: false
    },
    autoresize: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    init() {
      if (this.autoresize) this.activateAutoResize()
    },
    activateAutoResize() {
      const $textarea = this.$refs['textarea']
      $textarea.style.overflow = 'hidden'

      $textarea.addEventListener('keydown', event => {
        const target = event.target
        const { scrollHeight } = event.target
        console.log(scrollHeight)
        target.style.height = `${scrollHeight}px`
      })
    },
    getRemainLength(string, maxLength) {
      return getRemainInputLength(string, maxLength)
    },
    onInput(value) {
      // if (this.autoresize) this.resize()

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

.textarea-container {
  position: relative;
}

textarea {
  width: 100%;
  padding: 11px;
  font-size: inherit;
  transition: border-color linear 0.2s;

  &:focus {
    border-color: @color-link;
  }
}
</style>
