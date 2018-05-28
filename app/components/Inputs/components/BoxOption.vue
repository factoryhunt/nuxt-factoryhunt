<template>
  <li 
    class="option-container"
    @click="onOption">
    <span class="no-drag option">{{option}}</span></li>
</template>

<script>
export default {
  props: {
    option: {
      type: null,
      default: ''
    },
    highlight: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onOption() {
      this.$emit('change', this.option)
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
@import '../style/index';
.option-container {
  padding: 8px 10px;
  background-color: @color-white;
  font-size: 15px;

  &:hover {
    cursor: pointer;
    background-color: @color-lightest-grey;
  }

  .option {
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
