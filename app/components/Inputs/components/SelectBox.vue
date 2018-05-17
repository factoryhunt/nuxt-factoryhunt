<template>
  <div 
    class="option-container"
    ref="optionContainer">
    <ul 
      class="option-wrapper"
      ref="optionWrapper">
      <li 
        class="option"
        @click="onOptionClick('')">
        <span
          class="placeholder no-drag"
          ref="item-0">{{placeholder}}</span></li>
      <li 
        v-for="(item, i) in array"
        :key="item"
        class="option"
        ref="option"
        @click="onOptionClick(item, i + 1)">
        <span 
          class="item no-drag"
          :ref="`item-${i + 1}`">{{item}}</span></li>
    </ul>
  </div>
</template>

<script>
const OPTION_WRAPPER = 'optionWrapper'
const OPTION = 'option'
const HIGHLIGHTED = 'highlighted'
export default {
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
  methods: {
    highlightItem() {
      if (!this.value) return

      this.array.forEach((_, index) => {
        const item = this.$refs[`item-${index + 1}`]

        if (this.value === item.innerHTML) item.classList.add('highlighted')
      })
    },
    unhighlightItems() {
      const $options = this.$refs[OPTION]

      this.array.forEach((_, index) => {
        const $item = this.$refs[`item-${index + 1}`][0]
        $item.classList.remove(HIGHLIGHTED)
      })
    },
    onOptionClick(value, index) {
      this.unhighlightItems()

      if (index) {
        const $item = this.$refs[`item-${index}`][0]
        $item.classList.add(HIGHLIGHTED)
      }

      this.$emit('onInput', value)
    }
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
