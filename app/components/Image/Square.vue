<template>
  <div 
    class="outter-container"
    @click="$emit('click')">
    <div class="img-container">
      <img 
        :class="{pdf: isPdfType}"
        src="~assets/icons/pdf.svg"
        v-if="isPdfType">
      <img 
        :src="url"
        v-else>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    url: String
  },
  computed: {
    isPdfType() {
      return this.url.indexOf('pdf') > -1
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
.outter-container {
  position: relative;

  &::before {
    position: relative;
    content: '';
    display: block;
    padding-bottom: 100%;
  }
  .img-container {
    padding: 11px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: @border-radius;
    box-shadow: 0 2px 4px @color-light-gray;
    transition: box-shadow 0.3s;

    &:hover {
      cursor: pointer;
      box-shadow: 0 2px 7px @color-deep-gray;
    }
  }

  img {
    object-fit: contain;
    width: 100%;
    height: 100%;

    &.pdf {
      width: 50px;
    }
  }
}
</style>
