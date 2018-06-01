<template>
  <div 
    class="button-container"
    @click="$emit('click')">
    <img :src="url">
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
.button-container {
  border-radius: 50%;
  padding: 10px;
  width: 36px;
  height: 36px;
  box-shadow: 0 2px 4px @color-light-gray;
  transition: box-shadow 0.3s;

  @media (min-width: 744px) {
    padding: 10px;
    width: 36px;
    height: 36px;
  }

  &:hover {
    cursor: pointer;
    box-shadow: 0 2px 8px @color-light-gray;
  }
}
</style>
