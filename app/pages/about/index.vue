<template>
  <div class="page-container">

    <!-- About Us Image -->
    <div class="image-container">
      <div class="about-us-image"></div>
    </div>

    <!-- Body -->
    <div class="body-container">
      <div class="about-container">
        <h1 class="title-text">{{ $t('about.title') }}</h1>
        <div class="divider"></div>
        <div class="description-section" v-html="$t('about.description')"></div>
      </div>
      <footer-bar></footer-bar>
    </div>

  </div>
</template>

<script>
  import FooterBar from '~/components/FooterBar'
  export default {
    layout: 'minify',
    components: {
      FooterBar
    },
    head () {
      return {
        title: this.$t('about.title'),
        meta: [
          { hid: 'description', name: 'description', content: this.$t('Factory Hunt is the easiest way to showcase products to potential business partners. It is a hub for manufacturer & wholesale supplier listings.') }
        ],
        link: [
          { hid: 'canonical', rel: 'canonical', href: `https://www.factoryhunt.com/about` }
        ]
      }
    },
    data () {
      return {
        msg: 'About Us',
        id: this.$route.params.id,
        query: this.$route.query.id,
        title: 'Factory Hunt',
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '~assets/css/index';

  .image-container  {

    .about-us-image {
      background-image: url(https://s3-us-west-1.amazonaws.com/factoryhunt.com/img/header-bg.jpg);
      background-repeat: no-repeat !important;
      background-size: cover !important;
      background-position: 50% 20% !important;
      height: 30vh;
    }
  }
  .about-container {

    .title-text {
      font-size:32px !important;
      font-weight:400 !important;
    }
    .description-section {
      min-height: 400px !important;
      p {
        font-size:22px !important;
        font-weight:300 !important;
      }
    }
  }
  @media ( min-width: 744px ) {
    .image-container  {

      .about-us-image {
        height: 50vh;
      }
    }
  }
  @media ( min-width: 1128px ) {
    .image-container  {

      .about-us-image {
        height: 70vh;
      }
    }
  }
</style>

