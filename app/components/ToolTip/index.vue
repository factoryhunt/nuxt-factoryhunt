<template>
  <div 
    class="tooltip-container" 
    @mouseover="isActive = true"
    @mouseout="isActive = false">
    <div 
      ref="label" 
      class="label">
      {{this.label}}
    </div>
    <div 
      class="tip-container" 
      v-show="isActive">
      <div class="tip-wrapper">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['label', 'padding', 'maxWidth'],
  data: () => ({
    isActive: false
  }),
  methods: {
    init() {
      const { maxWidth } = this
      const $label = this.$refs.label

      if (maxWidth) {
        $label.style.maxWidth = `${maxWidth}px`
      }
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';

.tooltip-container {
  padding: 4px 8px;
  position: relative;

  &:hover {
    cursor: help;
  }
}
.label {
  text-transform: uppercase;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.tip-container {
  .gray-border;
  z-index: 2;
  position: absolute;
  bottom: calc(100% + 30px);
  left: 4px;
  max-width: 330px;
  width: max-content !important;
  background-color: @color-white;
  box-shadow: 0px 2px 4px @color-lightest-grey;
}
.tip-wrapper {
  font-size: 13px;
  padding: 14px;
  text-transform: none;

  @media (min-width: 744px) {
    font-size: 14px;
  }
}
</style>
