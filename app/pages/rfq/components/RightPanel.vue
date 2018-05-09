<template>
  <div id="right-panel">
    Right Panel
    <p>{{value}}</p>
  </div>
</template>

<script>
export default {
  props: ['value']
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
@import '~assets/css/less/rfq/index';

#right-panel {
  display: none;
  margin-left: 40px;

  @media (min-width: 744px) {
    display: block;
    width: 200px;
  }
  @media (min-width: 1128px) {
    width: 370px;
  }
}
</style>
