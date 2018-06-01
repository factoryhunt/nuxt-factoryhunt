<template>
  <div class="card__container">
    <div class="card__inner-container">
      <!-- Alert -->
      <transition name="fade">
        <div 
        class="card__alert"
        v-show="errorMessage">
          {{errorMessage}}
        </div>
      </transition>
      <!-- Header -->
      <div class="card__header">
        <!-- Title -->
        <h2 class="title">{{title}}</h2>
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
  props: ['title', 'errorMessage']
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
  max-width: 100%;

  @media (min-width: 744px) {
  }
}
.card__inner-container {
  padding: 20px;
  width: 480px;
  max-width: 100%;
}
.card__alert {
  color: @color-black;
  font-size: 16px;
  padding-top: 10px;
  padding-left: 20px;
  padding-bottom: 10px;
  margin-bottom: 12px;
  background-color: @color-lightest-grey;
  border-left: 5px solid @color-orange;
  border-top-right-radius: @border-radius;
  border-bottom-right-radius: @border-radius;
}
.card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
main {
  margin-top: 20px;

  @media (min-width: 744px) {
    margin-top: 30px;
  }
}
.title {
  font-size: 22px;
  @media (min-width: 744px) {
    font-size: 28px;
  }
}
</style>
