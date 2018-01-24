<template>
  <div>
    <navigation-bar></navigation-bar>
    <nuxt/>
    <copyright-bar></copyright-bar>
  </div>
</template>

<script>
  import NavigationBar from '~/components/NavigationBar.vue'
  import CopyrightBar from '~/components/CopyrightBar.vue'
  export default {
    components: {
      NavigationBar,
      CopyrightBar
    }
  }
</script>
