<template>
  <div 
    class="tooltip-container" 
    @mouseover="isActive = true"
    @mouseout="isActive = false">
    <div class="label">
      {{this.label}}
    </div>
    <div class="tip-container" v-show="isActive">
      <div class="tip-wrapper">
        {{this.tip}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['label', 'tip', 'padding'],
  data: () => ({
    isActive: false
  }),
  methods: {
    style() {
      if (this.padding) {
      }
    }
  },
  mounted() {
    this.style()
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
  font-size: 14px;
  padding: 14px;
  text-transform: none;
}
</style>
