<template>
  <div class="wrapper">
    <div class="cards">
      <div class="card" v-for="index in 6" :key="index">
        <div class="animated-background img"></div>
        <div class="animated-background category"></div>
        <div class="animated-background company"></div>
        <div class="animated-background total-product"></div>
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
.cards {
  @gap: 18px;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: @gap;
  grid-row-gap: @gap;
}
.card {
  width: 100%;

  .box {
    background: @color-bg-gray;
    border-radius: @border-radius;
  }

  .img {
    width: 100%;
    height: 150px;
  }
  .category {
    margin-top: 6px;
    height: 9px;
    width: 70%;
  }
  .company {
    margin-top: 4px;
    height: 20px;
    width: 100%;
  }
  .total-product {
    margin-top: 4px;
    height: 10px;
    width: 50%;
  }
}

.animated-background {
  animation-duration: 1.5s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-name: placeHolderShimmer;
  border-radius: @border-radius;
  background: @color-bg-gray;
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  background-size: 800px 104px;
  position: relative;
}

@keyframes placeHolderShimmer {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}
</style>
