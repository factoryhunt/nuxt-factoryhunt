<template>
  <div class="component-container">
    <div class="body-container">
      <div class="tab-container">
        <nuxt-link id="item-dashboard" class="tab" to="/dashboard">{{ $t('navigationBar.dashboard') }}</nuxt-link>
        <nuxt-link id="item-company" class="tab" to="/dashboard/company">{{ $t('navigationBar.company') }}</nuxt-link>
        <nuxt-link id="item-product" class="tab" to="/dashboard/product">{{ $t('navigationBar.product') }}</nuxt-link>
        <nuxt-link id="item-account" class="tab" to="/dashboard/account">{{ $t('navigationBar.account') }}</nuxt-link>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  @import "~assets/css/index";

  // Global
  .component-container {
    background-color: @color-font-base;
    width: 100%;
    height: 40px;
  }

  .tab-container {

    .tab {
      color: @color-menu-gray;
      line-height: 40px;
      margin-right: 20px;
      font-size: 15px;
      font-weight: 400;
      text-decoration: none;

      &:hover {
        color: @color-white;
        cursor: pointer;
      }
    }
    .tab[aria-selected="true"] {
      color: @color-white;
    }
  }
</style>
