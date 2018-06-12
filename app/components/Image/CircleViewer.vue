<template>
  <div 
    class="circle-image-container"
    @click="$emit('click')">
    <img :src="url">
  </div>
</template>

<script>
export default {
  props: ['url']
}
</script>


<style lang="less" scoped>
@import '~assets/css/index';

.circle-image-container {
  width: 80px;
  height: 80px;
  border: 1px solid @color-border-gray;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
