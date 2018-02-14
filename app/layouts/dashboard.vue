<template>
  <div>
    <navigation-bar></navigation-bar>
    <sub-navigation-bar></sub-navigation-bar>
    <top-alert-bar></top-alert-bar>
    <div class="body-container">
      <div class="dashboard-container">
        <nuxt/>
      </div>
    </div>
    <copyright-bar></copyright-bar>
  </div>
</template>

<script>
  import NavigationBar from '~/components/NavigationBar.vue'
  import SubNavigationBar from '~/components/DashboardNavigationBar.vue'
  import TopAlertBar from '~/components/Alert/TopAlertBar.vue'
  import CopyrightBar from '~/components/CopyrightBar.vue'
  export default {
    components: {
      NavigationBar,
      SubNavigationBar,
      TopAlertBar,
      CopyrightBar
    },
    middleware: 'authenticated'
  }
</script>

<style lang="less" scoped>
  .body-container {
    margin-top: 20px;
  }

  .dashboard-container {
    min-height: 100vh;
  }
</style>
