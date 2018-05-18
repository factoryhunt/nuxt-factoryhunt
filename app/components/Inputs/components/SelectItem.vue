<template>
  <li 
    class="option"
    ref="option"
    @click="onItemClick">
    <span 
      ref="item"
      class="item no-drag">{{item}}</span></li>
</template>

<script>
const ITEM = 'item'
const OPTION = 'option'
const PLACEHOLDER = 'placeholder'
const HIGHLIGHTED = 'highlighted'
export default {
  props: ['value', 'item', 'index'],
  computed: {
    getItem() {
      return this.$refs[ITEM]
    },
    getOption() {
      return this.$refs[OPTION]
    }
  },
  methods: {
    init() {
      this.makePlaceholder()
      this.highlightItem()
    },
    highlightItem() {
      if (this.value === this.item) this.getItem.classList.add(HIGHLIGHTED)
    },
    makePlaceholder() {
      if (this.index === 0) this.getItem.classList.add(PLACEHOLDER)
    },
    onItemClick() {
      const value = this.index === 0 ? '' : this.item
      this.$emit('onItemClick', value)
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
@import '../style/index';
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
