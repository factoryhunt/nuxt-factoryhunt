<template>
  <div class="textarea-container">
    <span 
      class="counting"
      v-if="maxlength">{{getRemainLength(value, maxlength)}}</span>
    <textarea 
      :rows="rows"
      :placeholder="placeholder"
      :title="title"
      :value="value"
      @input="onInput($event.target.value)">
    </textarea>
  </div>
</template>

<script>
import { getRemainInputLength } from '~/utils/text'
export default {
  props: {
    rows: {
      type: Number,
      default: 8
    },
    placeholder: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    value: null,
    dataKey: String,
    maxlength: {
      type: [Number, String]
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
