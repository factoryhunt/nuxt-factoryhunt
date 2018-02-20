<template>
  <div class="page-container">
    <div class="body-contents">
      Sorry, page not found.
    </div>
  </div>
</template>

<script>
  export default {
    head () {
      return {
        title: 'Page not found',
        link: [
          { hid: 'canonical', rel: 'canonical', href: `https://www.factoryhunt.com/404` }
        ]
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '~assets/css/index';
</style>
