<template>
  <div class="card__container">
    <div class="card__inner-container">
      <!-- Header -->
      <div class="card__header">
        <!-- Title -->
        <h2>{{title}}</h2>
        <!-- Close Button -->
        <icon-button
          class="close"
          :url="require('~/assets/icons/cancel.svg')"
          @click="$emit('close')"/>
      </div>
      <!-- Content -->
      <main>
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script>
import IconButton from '~/components/Button/Icon'
export default {
  components: {
    IconButton
  },
  props: ['title']
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';

* {
  margin: 0;
  padding: 0;
}
.card__container {
  position: relative;
  background-color: @color-white;
  border-radius: @border-radius;
}
.card__inner-container {
  padding: 20px;
  width: 480px;
  max-width: 100%;
}
.card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
main {
  margin-top: 30px;
}
</style>
