<template>
  <transition name="fade">
    <div class="error-container">
      {{message}}
    </div>
  </transition>
</template>

<script>
export default {
  props: ['message']
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
.error-container {
  padding: 11px;
  border-left: 4px solid @color-orange;
  background-color: @color-bg-gray;
  border-top-right-radius: @border-radius;
  border-bottom-right-radius: @border-radius;
}
</style>
