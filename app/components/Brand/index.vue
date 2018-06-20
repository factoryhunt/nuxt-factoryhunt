<template>
  <div id="brand-container">
    <img 
      id="brand-container__logo"
      src="~assets/img/logo_orange_small.png" 
      alt="brand-logo"/>
    <p id="brand-container__title">Factory Hunt</p>
    <p id="brand-container__slogan">A Global B2B Matching Service</p>
  </div>
</template>

<style lang="less" scoped>
@import '~assets/css/less/wizard/index';
#brand-container {
  text-align: center;
}
#brand-container__logo {
  width: 100%;
  padding: 0 104px;
  border-radius: 50%;
}
#brand-container__title {
  padding: 0 @left-bar-inner-padding;
  font-size: 18px;
  font-weight: 500;
  margin-top: 6px;
  margin-bottom: 0;
}
#brand-container__slogan {
  font-size: 13px;
  font-weight: 400;
  color: #736d6d;
  margin-top: 4px;
}
</style>
