<template>
  <div id="buying-leads-container">
    <h2>Buying Leads</h2>
    <div class="card-container">
      <div class="card-wrapper">

        <div class="card-wrapper__header">
          <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium aliquid perferendis.</h3>
        </div>

        <a href="/buying-leads">Get Started with Your Instead</a> 
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '~assets/css/index';
#buying-leads-container {
  background-color: @color-white;
  width: 100%;
  margin-bottom: 50px;

  .card-container {
    border-radius: @border-radius;
    overflow: hidden;
    // border: 1px solid @color-lightest-grey;
    width: 100%;
    height: 260px;
    background-image: url(https://s3-us-west-1.amazonaws.com/factoryhunt.com/img/buying-leads-0.jpg);
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: cover;
    color: @color-white;
    padding: 30px;

    @media (min-width: 744px) {
      padding: 44px;
      height: 300px;
    }
  }
  .card-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .card-wrapper__header {
    text-align: center;

    @media (min-width: 744px) {
      text-align: left;
      max-width: 520px;
    }
  }
  h3 {
    margin: 0 !important;
    padding: 0 !important;
    font-weight: normal;
    font-size: 24px;
  }
  a {
    position: absolute;
    background-color: @color-white;
    padding: 14px 28px;
    left: 0;
    bottom: 0;
    outline: 0;
    border: 0;
    border-radius: @border-radius;
    font-size: 16px;
    font-weight: bold;
    width: 100%;
    color: @color-link;
    text-decoration: none;
    transition: background-color linear 0.3s;

    @media (min-width: 744px) {
      width: unset;
    }

    &:hover {
      background-color: @color-light-grey;
    }
  }
}
</style>
