<template>
  <div class="component-container">
    <div class="body-container">
      <div class="tab-container">
        <a id="item-dashboard" class="tab" href="/dashboard">Dashboard</a>
        <a id="item-company" class="tab" href="/dashboard/company">Company</a>
        <a id="item-product" class="tab" href="/dashboard/product">Product</a>
        <a id="item-account" class="tab" href="/dashboard/account">My Account</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    messages: {
      eng: {
        dashboard: 'Dashboard',
        company: 'Company',
        product: 'Product',
        account: 'My Account'
      },
      kor: {
        dashboard: '관리자 센터',
        company: '회사',
        product: '제품',
        account: '내 계정'
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "~assets/css/index";

  .body-container {
    margin-top: 0;
  }

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
