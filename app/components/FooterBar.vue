<template>
  <div id="container">
    <footer class="body-container">
      <div class="footer-container">

        <!-- Language Selection -->
        <section class="logo-container">
          <img id="logo-and-title" src="~assets/img/logo_and_title.png">
        </section>

        <!-- About -->
        <section class="about-container">
          <h4 class="title">Factory Hunt</h4>
          <ul>
            <li><nuxt-link to="/about">About Us</nuxt-link></li>
            <li><nuxt-link to="/contact">Contact Us</nuxt-link></li>
          </ul>
        </section>

        <!-- Services -->
        <section class="service-container">
          <h4 class="title">Services</h4>
          <ul>
            <li><nuxt-link to="/for-supplier">For supplier</nuxt-link></li>
          </ul>
        </section>

        <!-- Follow Us -->
        <section class="follow-us-container">
          <h4 class="title">Follow Us</h4>
          <ul>
            <li><a href="//www.facebook.com/factoryhunt" target="_blank"><i class="fa fa-facebook-square"></i> Facebook</a></li>
            <li><a href="//www.youtube.com/channel/factoryhunt" target="_blank"><i class="fa fa-youtube-play"></i> Youtube</a></li>
          </ul>
        </section>

      </div>
    </footer>
  </div>
</template>

<script>
  export default {
    messages: {
      eng: {
        factoryhunt: 'Factory Hunt',
        aboutUs: 'About Us',
        contactUs: 'Contact Us',
        languages: 'Languages',
        followUs: 'Follow Us'
      },
      kor: {
        factoryhunt: '팩토리 헌트',
        aboutUs: '소개',
        contactUs: '문의하기',
        languages: '언어',
        followUs: '팔로잉'
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '~assets/css/index';

  ul {
    margin: 18px 0 0 0;
    padding: 0;
  }
  li {
    font-size: 15px;
    line-height: 1.35;
    list-style: none;
    a {
      color: @color-font-gray !important;
    }
  }
  .title {
    font-weight: 500;
    color: @color-font-black;
    margin: 0;
    padding: 0;
  }

  #container {
    display: none;
  }

  .body-container {
    border-top: 1px solid @color-light-grey;
    padding: 50px 0;

    .footer-container {
      display: table;
      width: 100%;

      .logo-container {
        display: table-cell;
        width: 25%;

        #logo-and-title {
          width: 100%;
        }
      }

      .about-container {
        display: table-cell;
        vertical-align: top;
        width: 25%;
        padding-left: 8%;
      }

      .service-container {
        display: table-cell;
        vertical-align: top;
        width: 25%;
        padding-left: 8%;
      }

      .follow-us-container {
        display: table-cell;
        vertical-align: top;
        width: 25%;
        padding-left: 8%;
      }
    }
  }

  @media ( min-width: 744px ) {

  }
  @media ( min-width: 1128px ) {
    #container {
      display: inherit;
    }
  }
</style>
