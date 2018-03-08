<template>
  <div id="container">
    <top-alert-bar/>
    <nuxt/>
  </div>
</template>

<script>
  import TopAlertBar from '~/components/Alert/TopAlertBar'
  export default {
    head () {
      return {
        titleTemplate: '%s | Factory Hunt'
      }
    },
    components: {
      TopAlertBar
    }
  }
</script>
