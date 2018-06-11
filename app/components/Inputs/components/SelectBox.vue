<template>
  <div 
    class="option-container"
    ref="optionContainer">
    <ul 
      class="option-wrapper"
      ref="optionWrapper">
      <!-- Placeholder -->
      <select-item
        :item="placeholder"
        :index="0"
        @onItemClick="onOptionClick"/>
        
      <!-- Items -->
      <select-item
        v-for="(item, index) in array"
        :value="value"
        :key="item"
        :item="item"
        :index="index + 1"
        @onItemClick="onOptionClick"/>
    </ul>
  </div>
</template>

<script>
import SelectItem from './SelectItem'
const OPTION_CONTAINER = 'optionContainer'
const OPTION_WRAPPER = 'optionWrapper'
const HIGHLIGHTED = 'highlighted'
export default {
  components: {
    SelectItem
  },
  props: {
    value: {
      type: null
    },
    array: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: 'Select'
    }
  },
  computed: {
    getOptions() {
      const $optionWrapper = this.$refs[OPTION_WRAPPER]
      const $options = $optionWrapper.children
      return $options
    }
  },
  methods: {
    init() {
      this.highlightItem()
      this.addClickEventListener()
    },
    highlightItem() {
      if (!this.value) return

      for (let i = 0; i < this.getOptions.length; i++) {
        const $option = this.getOptions[i]
        const $item = $option.children[0]

        if (this.value === $item.innerHTML) $item.classList.add('highlighted')
      }
    },
    unhighlightItems() {
      for (let i = 0; i < this.getOptions.length; i++) {
        const $option = this.getOptions[i]
        const $item = $option.children[0]
        $item.classList.remove(HIGHLIGHTED)
      }
    },
    onOptionClick(value) {
      this.unhighlightItems()
      this.$emit('onInput', value)
    },
    addClickEventListener() {
      const $optionContainer = this.$refs[OPTION_CONTAINER]
      const $optionWrapper = this.$refs[OPTION_WRAPPER]

      document.addEventListener('click', function(event) {
        const target = event.target
        // console.log(target)
        // console.log('oc', $optionContainer)
        // console.log('ow', $optionWrapper)
      })
    }
  },
  mounted() {
    this.init()
  },
  updated() {
    this.highlightItem()
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
@import '../style/index';

.option-container {
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
    &.placeholder {
      color: @color-input-placeholder;
    }
  }
}
</style>
