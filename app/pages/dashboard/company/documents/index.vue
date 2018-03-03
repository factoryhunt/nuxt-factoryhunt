<template>
  <section>
    <form @submit.prevent="onEditButton" class="form-container">

      <div class="header-container">
        <h1 class="title">Documents</h1>
      </div>

      <div class="brochure-container each-section">
        <h2 class="title">Company Brochure</h2>
      </div>

      <div class="bisiness-registration-container each-section">
        <h2 class="title">Business Registration</h2>
      </div>

      <div class="certification-container each-section">
        <h2 class="title">Certifications</h2>
      </div>

    </form>
  </section>
</template>

<script>
  export default {
    head () {
      return {
        title: 'Upload Documents',
        link: [
          { hid: 'canonical', rel: 'canonical', href: `https://www.factoryhunt.com/dashboard/company/documents` }
        ]
      }
    },
    methods: {
      onEditButton () {
        console.log('Edited!')
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "~assets/css/index";
  @import "~assets/css/less/dashboard/index.less";
</style>
