<template>
  <div id="container">
    <top-alert-bar/>
    <div id="wizard-container">
      <div id="left-bar">
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
          <li>7</li>
          <li>8</li>
        </ul>
      </div>
      <div id="right-container">
        <nuxt/>
      </div>
    </div>
    <div id="bottom-bar">
      bottom
    </div>
  </div>
</template>

<script>
import TopAlertBar from '~/components/Alert/TopAlertBar'
export default {
  head() {
    return {
      titleTemplate: '%s | Factory Hunt'
    }
  },
  components: {
    TopAlertBar
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
@import '~assets/css/less/wizard/index';
</style>
