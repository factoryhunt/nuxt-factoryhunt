<template>
  <div class="card-container">
    <div class="card-inner-container">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '~assets/css/index';
.card-container {
  padding: 20px;
  width: 100%;
  border: 1px solid @color-border-gray;
  border-radius: @border-radius;
  display: table;
  text-align: center;
  height: 280px;
}
.card-inner-container {
  display: table-cell;
  vertical-align: middle;
}
</style>
