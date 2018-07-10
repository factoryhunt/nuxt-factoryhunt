<template>
  <div class="wrapper">
    <div class="layer"></div>
      <div class="main">
      <div>
        <h2 class="title desktop">Premium Supplier Membership</h2>
        <h2 class="title mobile">Premium<br>Supplier Membership</h2>
        <p class="description">Connect your business and have better access to the worldwide community of buyers with premium membership.</p>
        <p class="description"></p>
      </div>
      <div>
        <a class="button" href="/pricing">See Details</a>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '~assets/css/index';

* {
  margin: 0;
  padding: 0;
}

.wrapper {
  position: relative;
  border-radius: @border-radius;
  overflow: hidden;
  // border: 1px solid @color-lightest-grey;
  width: 100%;
  height: 280px;
  background-image: url(https://images.unsplash.com/photo-1518891083397-292595fa838c?ixlib=rb-0.3.5&s=77c61695aaf56cf62bb6805eb1f78d7d&auto=format&fit=crop&w=1950&q=80);
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover;
  color: @color-white;
  padding: 30px;
  z-index: 0;

  @media (min-width: 744px) {
    color: @color-white;
    padding: 36px;
    height: 300px;
  }
}
.layer {
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  @media (min-width: 744px) {
    display: none;
  }
}

.main {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  z-index: 2 !important;

  .button {
    display: inline-block;
    padding: 11px 30px;
    font-weight: 500;
    text-align: center;
    color: @color-white;
    background-color: @color-premium-red;
    border-radius: @border-radius;
    text-decoration: none;
    width: 100%;

    @media (min-width: 744px) {
      width: unset;
    }
  }
}
.description {
  margin-top: 8px;
  font-size: 16px;

  @media (min-width: 744px) {
    max-width: 600px;
    font-size: 20px;
  }
}
</style>
