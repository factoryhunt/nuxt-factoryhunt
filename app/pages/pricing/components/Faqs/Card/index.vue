<template>
  <div class="card-wrapper">
    <h3>{{title}}</h3>
    <p>{{description}}</p>
    <img v-if="img" :src="img">
  </div>
</template>

<script>
export default {
  props: ['title', 'description', 'img']
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
* {
  padding: 0;
  margin: 0;
}
h3 {
  font-weight: 400;
  font-size: 19px;
  color: @color-black;

  @media (min-width: 1128px) {
    font-size: 22px;
  }
}
p {
  margin-top: 8px;
  color: @color-font-gray;
  font-size: 15px;

  @media (min-width: 1128px) {
    font-size: 18px;
  }
}
img {
  margin-top: 12px;
  width: 100%;
  box-shadow: 0 2px 10px @color-light-gray;
  border-radius: @border-radius;
}
</style>
