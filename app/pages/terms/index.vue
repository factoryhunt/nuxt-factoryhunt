<template>
  <div class="page-container">
    <h1>{{ $t('terms.title') }}</h1>
    <p v-html="$t('terms.description')"></p>
  </div>
</template>

<script>
  export default {
    head () {
      return {
        title: this.$t('terms.title'),
        meta: [
          { hid: 'description', name: 'description', content: 'The purpose of this Terms of Use Agreement is to prescribe the matters related to the use condition and the procedure of the services provided by the "Factory Hunt" site (www.factoryhunt.com), a platform operated by Factory Hunt.' }
        ],
        link: [
          { hid: 'canonical', rel: 'canonical', href: `https://www.factoryhunt.com/terms` }
        ]
      }
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
