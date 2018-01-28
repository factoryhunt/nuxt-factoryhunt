<template>
  <div>
    <navigation-bar></navigation-bar>
    <sub-navigation-bar></sub-navigation-bar>
    <div class="body-container">
      <nuxt/>
    </div>
    <footer-bar></footer-bar>
    <copyright-bar></copyright-bar>
  </div>
</template>

<script>
  import NavigationBar from '~/components/NavigationBar.vue'
  import SubNavigationBar from '~/components/DashboardNavigationBar.vue'
  import FooterBar from '~/components/FooterBar.vue'
  import CopyrightBar from '~/components/CopyrightBar.vue'
  export default {
    components: {
      NavigationBar,
      SubNavigationBar,
      FooterBar,
      CopyrightBar
    },
    middleware: 'authenticated'
  }
</script>

<style lang="less" scoped>
</style>
