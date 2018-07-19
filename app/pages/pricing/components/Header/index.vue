<template>
  <div class="header">
    <h1 class="title">Supplier Membership</h1>
    <h2 class="sub-title">Connect your business and showcase your products to the worldwide community of buyers on Factory Hunt.</h2>
  </div>
</template>

<style lang="less" scoped>
@import '~assets/css/index';
* {
  margin: 0;
  padding: 0;
}
.header {
  padding: 30px 0;

  @media (min-width: 744px) {
    padding: 60px 0;
  }
}
.title {
  font-weight: 500;
  font-size: 20px;

  @media (min-width: 744px) {
    font-size: 28px;
  }
}
.sub-title {
  font-weight: 400;
  font-size: 16px;
  margin-top: 8px;

  @media (min-width: 744px) {
    font-size: 20px;
    max-width: 600px;
  }
}
</style>
