<template>
  <div class="container">
    <div 
      class="select-wrapper"
      ref="selectWrapper">
      <!-- Input -->
      <div 
        class="input-container"
        ref="inputContainer">
        <span 
          :class="['no-drag', [getPlaceholderClass]]"
          ref="inputText">{{getCurrentValue}}</span>
      </div>
      <!-- Option List -->
      <div class="option">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
// models
const INPUT_CONTAINER = 'inputContainer'
const INPUT_TEXT = 'inputText'
const SELECT_WRAPPER = 'selectWrapper'
const HIGHLIGHTED = 'highlighted'
export default {
  props: {
    value: null,
    array: Array,
    placeholder: {
      type: String,
      default: 'Select'
    }
  },
  computed: {
    getCurrentValue() {
      return this.value ? this.value : this.placeholder
    },
    getPlaceholderClass() {
      return this.value ? '' : 'placeholder'
    }
  },
  methods: {
    addClickEventListener() {
      const $selectWrapper = this.$refs[SELECT_WRAPPER]
      const $inputContainer = this.$refs[INPUT_CONTAINER]
      const $inputText = this.$refs[INPUT_TEXT]

      document.addEventListener('click', function(event) {
        const target = event.target

        if ($inputContainer === target || $inputText === target) {
          if ($selectWrapper.classList.contains('focus'))
            $selectWrapper.classList.remove('focus')
          else $selectWrapper.classList.add('focus')
        } else {
          $selectWrapper.classList.remove('focus')
        }
      })
    }
  },
  mounted() {
    this.addClickEventListener()
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
@import './style/index';

.select-wrapper {
  &.focus {
    .input-container {
      border-color: @color-link;
    }
    .option {
      display: block !important;
    }
  }
}

.option {
  display: none;
}

.input-container {
  border: 1px solid @color-light-grey;
  border-radius: @border-radius;
  display: block;
  width: 100%;
  background-color: @color-white;
  padding: 11px;
  transition: border-color linear 0.2s;

  span {
    padding-right: 16px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    background-image: url(~assets/icons/arrow-angle-down.png);
    background-size: 14px;
    background-position: 100% 50%;
    background-repeat: no-repeat;
  }
  .placeholder {
    color: @color-input-placeholder;
  }
}
</style>
