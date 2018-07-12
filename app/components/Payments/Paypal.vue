<template>
  <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
    <input 
      type="hidden" 
      name="cmd" 
      value="_s-xclick">
    <input 
      type="hidden" 
      name="encrypted" 
      value="-----BEGIN PKCS7-----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-----END PKCS7-----
    ">
    <input 
      id="payment-paypal-button" 
      type="submit" 
      value="Get Started" 
      name="submit" 
      alt="PayPal - The safer, easier way to pay online!">
  </form>
</template>

<style lang="less" scoped>
@import '~assets/css/index';

* {
  margin: 0;
  padding: 0;
}

#payment-paypal-button {
  width: 100%;
  font-size: 18px;
  display: block;
  padding: 11px 20px;
  text-decoration: none !important;
  text-align: center;
  font-weight: 500;
  background-color: @color-orange;
  border: 1px solid @color-orange;
  border-radius: @border-radius;
  color: @color-white;

  &:hover {
    cursor: pointer;
  }
}
</style>
