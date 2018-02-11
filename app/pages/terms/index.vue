<template>
  <div class="page-container">
    <h1>{{ $t('terms.title') }}</h1>
    <p v-html="$t('terms.description')"></p>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    head () {
      return {
        title: this.$t('terms.title'),
        link: [
          { hid: 'canonical', rel: 'canonical', href: `https://www.factoryhunt.com/terms` }
        ]
      }
    },
    created () {
      axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res => res.data.map(user => console.log(user.username)))
    }
  }
</script>

<style lang="less" scoped>
  @import "~assets/css/index";

  h3 {
    padding-top: 10px !important;
    padding-bottom: 10px !important;
  }
  h4 {
    padding-top: 15px !important;
    padding-bottom: 3px !important;
  }
  caption {
    font-style: italic !important;
  }

</style>
