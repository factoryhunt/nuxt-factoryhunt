<template>
  <div id="feed">
    <navigation-bar></navigation-bar>
    <div class="body-container">
      <nuxt/>
    </div>
  </div>
</template>

<script>
import NavigationBar from '~/components/NavigationBar.vue'
export default {
  components: {
    NavigationBar
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
@import '~assets/css/less/buying_leads/index';
#feed {
  background-color: @color-bg-gray;
}
</style>
