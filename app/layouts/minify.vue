<template>
  <div>
    <navigation-bar></navigation-bar>
    <top-alert-bar/>
    <nuxt/>
    <copyright-bar></copyright-bar>
  </div>
</template>

<script>
import NavigationBar from '~/components/NavigationBar.vue'
import TopAlertBar from '~/components/Alert/TopAlertBar.vue'
import CopyrightBar from '~/components/CopyrightBar.vue'
export default {
  components: {
    NavigationBar,
    TopAlertBar,
    CopyrightBar
  },
  head() {
    return {
      titleTemplate: '%s | Factory Hunt'
    }
  }
}
</script>
