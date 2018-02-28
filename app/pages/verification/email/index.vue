<template>
  <section class="body-contents">
    <!--<p class="title">{{ $t('verification.title') }}</p>-->
    <p class="title">{{ $t('verification.email.title') }}</p>
    <i class="fa fa-check mark" aria-hidden="true"></i>
    <p class="sub-title">{{ $t('verification.email.subTitle') }}</p>
    <button
      class="button-orange"
      @click="onGoHomeButton">
      {{ $t('verification.email.goHome') }}
    </button>
  </section>
</template>

<script>
  export default {
    head () {
      return {
        title: this.$t('terms.title'),
        link: [
          { hid: 'canonical', rel: 'canonical', href: `https://www.factoryhunt.com/verification/email` }
        ]
      }
    },
    methods: {
      onGoHomeButton () {
        this.$router.replace('/')
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "~assets/css/index.less";
  .body-contents {
    text-align: center;
    margin: 100px 0;
  }
  .title {
    font-size: 60px;
    font-weight: @font-weight-bold;
    margin: 10px 0;
  }
  .mark {
    color: @color-green;
    font-size: 60px;
  }
  .sub-title {
    font-size: @font-size-large;
    font-weight: @font-weight-thin;
    margin-top: 50px;
  }
  button {
    font-size: @font-size-medium;
  }
  @media ( min-width: 744px ) {
    .title {
      font-size: 100px;
      font-weight: @font-weight-bold;
      margin: 10px 0;
    }
  }
  @media ( min-width: 1128px ) {

  }
</style>
