<template>
  <div class="page-container">

    <!-- About Us Image -->
    <div class="image-container">
      <div class="about-us-image"></div>
    </div>

    <!-- Body -->
    <div class="body-container">
      <div class="about-container">
        <h1 class="title-text">Title</h1>
        <div class="divider"></div>
        <div class="description-section">
          Description
        </div>
      </div>
      <footer-bar></footer-bar>
    </div>

  </div>
</template>

<script>
  import FooterBar from '~/components/FooterBar.vue'
  export default {
    layout: 'minify',
    components: {
      FooterBar
    },
    head () {
      return {
        title: 'About Us'
      }
    },
    data () {
      return {
        msg: 'About Us',
        id: this.$route.params.id,
        query: this.$route.query.id,
        title: 'Factoryhunt',
        products: []
      }
    },
    messages: {
      eng: {
        title: 'About Factory Hunt',
        description: `
          <p style="font-size: 22px;font-weight:300">Factory Hunt is a supplier search engine & B2B platform where businesses can be connected each other.</p>
          <p style="font-size: 22px;font-weight:300">Any manufacturer/supplier can create a website and online product catalog for free. Once a website/catalog is created, the information will be displayed in search results. Factory Hunt is the easiest way to showcase products to potential business partners.</p>
          <p style="font-size: 22px;font-weight:300">Our mission is to make a free website for every suppliers in the world and make it easy to connect businesses. As a platform, we will continue to develop services to help businesses and discover new opportunities.</p>
          <p style="font-size: 22px;font-weight:300">Best regards,</p>
          <p style="font-size: 22px;font-weight:300">Factory Hunt Team</p>`
      },
      kor: {
        title: '팩토리 헌트 소개',
        description: `
          <p style="font-size: 22px;font-weight:300">팩토리 헌트는 제조업체 전문 검색엔진으로 제조업체와 해외 바이어를 연결하는 비지니스 플랫폼입니다.</p>
          <p style="font-size: 22px;font-weight:300">모든 제조업체는 팩토리 헌트를 통해 무료로 홈페이지와 온라인 카탈로그의 제작이 가능합니다. 기업 정보를 업데이트하고 제품 카탈로그가 완성되면 검색엔진 최적화를 통해 제품 정보가 바이어에게 노출됩니다. 팩토리 헌트는 바이어에게 제품을 알리고 판로개척을 위한 가장 쉬운 방법입니다.</P>
          <p style="font-size: 22px;font-weight:300">우리의 목표는 세계의 모든 제조업체의 정보를 디지털화하고 바이어와의 비즈니스를 쉽게 연결할 수 있도록 하는 것입니다. 플랫폼으로써 우리는 비즈니스를 지원할 것이고 사용자가 새로운 기회를 발견할 수 있도록 서비스를 개발할 것입니다.</p>
          <p style="font-size: 22px;font-weight:300">감사합니다.</p>
          <p style="font-size: 22px;font-weight:300">팩토리 헌트팀</p>`
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '~assets/css/index';
  .image-container  {

    .about-us-image {
      background-image: url(~assets/img/about-us-image.jpg);
      background-repeat: no-repeat !important;
      background-size: cover !important;
      background-position: 50% 20% !important;
      height: 30vh;
    }
  }
  .about-container {
    margin-top: 40px !important;

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

