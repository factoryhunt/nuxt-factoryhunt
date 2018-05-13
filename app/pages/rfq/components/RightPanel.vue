<template>
  <div id="right-panel">
    <div class="panel-wrapper">
      <h3>Completeness of Information</h3>
      <p>{{value}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['value'],
  methods: {
    activateFixed() {}
  },
  mounted() {
    this.activateFixed()
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
@import '~assets/css/less/rfq/index';

#right-panel {
  position: relative;
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
.panel-wrapper {
  // position: fixed;
}
</style>
