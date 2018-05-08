<template>
  <header>
    <div class="header-wrapper">
      <div class="title-container">
        <h1>Buying Leads</h1>
        <h2>Buy Leads contains Buying requests (RFQs) from Buyers located Globally.</h2>
      </div>
    </div>
  </header>
</template>

<style lang="less" scoped>
@import '~assets/css/index';
@import '~assets/css/less/buying_leads/index';

.header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.title-container {
  display: flex;
  flex-direction: column;
}
h1 {
  font-size: 30px;
}
h2 {
  margin-top: 8px;
  font-size: 18px;
  font-weight: normal;
  color: @color-font-gray;
}
</style>
