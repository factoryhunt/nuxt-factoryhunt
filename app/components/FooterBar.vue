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
          <h4 class="title">{{ $t('footerBar.factoryhunt') }}</h4>
          <ul>
            <li><a href="/about">{{ $t('footerBar.aboutUs') }}</a></li>
            <li><a href="/contact">{{ $t('footerBar.contactUs') }}</a></li>
          </ul>
        </section>

        <!-- Services -->
        <section class="service-container">
          <h4 class="title">{{ $t('footerBar.services') }}</h4>
          <ul>
            <li><a href="/for-supplier">{{ $t('footerBar.forSupplier') }}</a></li>
            <li><a href="/buying-leads">{{ $t('footerBar.buyingLeads') }}</a></li>
            <li><a href="/pricing">{{ $t('footerBar.pricing') }}</a></li>
          </ul>
        </section>

        <!-- Follow Us -->
        <section class="follow-us-container">
          <h4 class="title">{{ $t('footerBar.followUs') }}</h4>
          <ul itemscope itemtype="http://schema.org/Organization">
            <link itemprop="url" href="https://www.factoryhunt.com">
            <li><a itemprop="sameAs" href="//www.facebook.com/factoryhunt" target="_blank"><i class="fa fa-facebook-square"></i> Facebook</a></li>
            <li><a itemprop="sameAs" href="//www.youtube.com/channel/UCC3c1TvZIsssj5aSTM9qj6A" target="_blank"><i class="fa fa-youtube-play"></i> Youtube</a></li>
          </ul>
        </section>

      </div>
    </footer>
  </div>
</template>

<style lang="less" scoped>
@import '~assets/css/index';

ul {
  margin: 18px 0 0 0;
  padding: 0;
}
li {
  font-size: @font-size-small;
  font-weight: @font-weight-medium;
  line-height: 1.35;
  list-style: none;
  a {
    color: @color-font-gray !important;
  }
}
.title {
  font-size: @font-size-small;
  font-weight: @font-weight-bold;
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

@media (min-width: 744px) {
}
@media (min-width: 1128px) {
  #container {
    display: inherit;
  }
}
</style>
