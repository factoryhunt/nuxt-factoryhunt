<template>
  <div>
    <navigation-bar></navigation-bar>
    <div class="body-container">
      <nuxt/>
    </div>
    <footer-bar></footer-bar>
    <copyright-bar></copyright-bar>
  </div>
</template>

<script>
  import NavigationBar from '~/components/NavigationBar.vue'
  import FooterBar from '~/components/FooterBar.vue'
  import CopyrightBar from '~/components/CopyrightBar.vue'
  export default {
    components: {
      NavigationBar,
      FooterBar,
      CopyrightBar
    }
  }
</script>

<style lang="less" scoped>
</style>
