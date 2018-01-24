<template>
  <div class="component-container">
    <nuxt-link to="/"><p class="title text-center">Factory Hunt</p></nuxt-link>
  </div>
</template>

<style lang="less" scoped>
  @import '~assets/css/index';
  .component-container {
    a {
      text-decoration: none;

      .title {
        text-align: center;
        margin: 30px 0;
        font-weight: 500;
        font-size: 50px;
        color: @color-orange;
        cursor: pointer;
      }
    }
  }
</style>
