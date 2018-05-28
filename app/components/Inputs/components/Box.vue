<template>
  <div 
    class="box__container">
    <ul class="box__wrapper">
      <slot></slot>
    </ul>
  </div>
</template>

<style lang="less" scoped>
@import '~assets/css/index';
@import '../style/index';

.box__container {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  z-index: 2;
  border-top: 0;
  background-color: @color-white;
  border: 1px solid @color-light-grey;
}
.box__wrapper {
  box-shadow: 2px 2px 4px @color-light-grey;
  border-radius: @border-radius;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  max-height: 290px;
  overflow: scroll;
}
</style>
