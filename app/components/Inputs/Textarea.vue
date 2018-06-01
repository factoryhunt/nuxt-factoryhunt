<template>
  <div class="textarea-container">
    <remain-length
      :value="value"
      :maxlength="maxlength"
      :isHidden="!maxlengthDisplay"/>
    <textarea 
      :rows="rows"
      :required="required"
      :placeholder="placeholder"
      :pattern="pattern"
      :title="title"
      :maxlength="maxlength"
      :value="value"
      @input="event => $emit('input', event.target.value)">
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
    }
  },
  methods: {
    onInput(value) {
      const result = {
        dataKey: this.dataKey,
        value: value
      }
      this.$emit('input', result)
    },
    getRemainLength(string, maxLength) {
      return getRemainInputLength(string, maxLength)
    }
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
