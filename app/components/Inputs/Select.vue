<template>
  <div class="select-container">
    <div 
      class="select-wrapper"
      ref="selectWrapper">
      <!-- Input -->
      <div 
        class="input-container"
        ref="inputContainer">
        <span 
          class="no-drag"
          ref="inputText">{{getCurrentValue}}</span>
      </div>
      <!-- Select -->
      <div 
        class="option-container"
        ref="optionContainer">
        <ul 
          class="option-wrapper"
          ref="optionWrapper">
          <li 
            v-for="(value,i) in array"
            :key="i"
            class="option"
            @click="onOptionClick(value)">
            <span  
              class="no-drag"
              :ref="`item${i}`">{{value}}</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// components
import Box from './components/Box'
import BoxOption from './components/BoxOption'
// models
const INPUT_CONTAINER = 'inputContainer'
const INPUT_TEXT = 'inputText'
const SELECT_WRAPPER = 'selectWrapper'
const HIGHLIGHTED = 'highlighted'
export default {
  components: {
    Box,
    BoxOption
  },
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
      return this.value ? this.value : 'Select'
    }
  },
  watch: {
    value(value) {
      this.unhighlightItems()
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
          if ($selectWrapper.classList.contains('focus')) $selectWrapper.classList.remove('focus')
          else $selectWrapper.classList.add('focus')
        } else {
          $selectWrapper.classList.remove('focus')
        }
      })
    },
    highlightItem() {
      if (!this.value) return

      this.array.forEach((_, index) => {
        const item = this.$refs[`item${index}`][0]

        if (this.value === item.innerHTML) item.classList.add('highlighted')
      })
    },
    unhighlightItems() {
      const $optionWrapper = this.$refs.optionWrapper
      const $options = $optionWrapper.children
      for (let i = 0; i < $options.length; i++) {
        const $item = $options[i].children[0]
        $item.classList.remove(HIGHLIGHTED)
      }
    },
    onOptionClick(value) {
      this.$emit('input', value)
      this.$emit('change', value)
    }
  },
  mounted() {
    this.addClickEventListener()
  },
  updated() {
    this.highlightItem()
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';

.select-container {
  position: relative;
}
.select-wrapper {
  &.focus {
    .input-container {
      border-color: @color-link;
    }
    .option-container {
      display: block !important;
    }
  }
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
}

.option-container {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  z-index: 2;
}
.option-wrapper {
  box-shadow: 2px 2px 4px @color-light-grey;
  border-right: 1px solid @color-light-gray;
  border-radius: @border-radius;
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 100%;
  max-height: 290px;
  overflow: scroll;
}

.option {
  padding: 8px 10px;
  background-color: @color-white;
  font-size: 15px;

  &:hover {
    cursor: pointer;
    background-color: @color-lightest-grey;
  }

  span {
    display: block;

    &.highlighted {
      color: @color-orange;
      background-image: url(~assets/icons/checked_orange.svg);
      background-repeat: no-repeat;
      background-size: 12px;
      background-position: 100% 50%;
    }
  }
}
</style>
