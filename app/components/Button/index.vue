<template>
  <button 
    :id="id"
    :role="role"
    :class="getClass"
    :disabled="disabled || isLoading"
    @click="onButtonPress">
    <dot-spinner
      v-show="isLoading"
      color="#fff"/>
    <slot v-if="!isLoading"></slot>
  </button>
</template>

<script>
import DotSpinner from '~/components/Spinner/Dots'
export default {
  components: {
    DotSpinner
  },
  props: ['id', 'type', 'role', 'isLoading', 'disabled'],
  computed: {
    getClass() {
      return this.type
    }
  },
  methods: {
    onButtonPress() {
      this.$emit('onButton')
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
button {
  font-size: inherit;
  font-family: inherit;
  padding: 14px 28px;
  font-weight: 500;
  color: @color-white;
  background-color: @color-orange;
  border-radius: @border-radius;
  outline: 0;
  border: 0;
  transition: background-color linear 0.2s;

  &:hover {
    background-color: @color-dark-orange;
  }

  &[disabled] {
    opacity: 0.3;
  }

  &.black {
    color: #000;
    background-color: @color-white;
    border: 1px solid @color-light-gray;
  }
  &.black:hover {
    background-color: @color-lightest-grey;
  }

  &.white {
    color: @color-orange;
    background-color: @color-white;
    border: 1px solid @color-light-orange;
  }

  &.link {
    color: @color-link;
    background-color: @color-white;
    border: 1px solid @color-link;
  }
}
</style>
