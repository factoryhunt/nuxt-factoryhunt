<template>
  <section class="features" id="FEATURES">
    <div class="container">
      <div class="row">
        <div class="col-md-10 col-md-offset-1">
          <div class="section-title">
            <h2>{{ $t('forSupplier.features.title') }}</h2>
            <p>{{ $t('forSupplier.features.desc') }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="feature-inner-wrapper">
      <div class="container">
        <!--Feature item 01-->
        <div class="feature-item row">
          <div class="col-md-4 col-md-push-8 scrollRightDelay">
            <div class="right-feature-item">
              <div class="right-feature-item-icon">
                <i class="fa fa-desktop"></i>
              </div>
              <!--Feature item title & description-->
              <h3>{{ $t('forSupplier.features.item1.title') }}</h3>
              <h3>{{ $t('forSupplier.features.item1.desc') }}</h3>
            </div>
          </div>
          <div class="col-md-8 col-md-pull-4 scrollLeftDelay">
            <img class="img-responsive" src="~assets/img/for_supplier/feature-item-01.png" alt="download screen">
          </div>
        </div>
        <!--Feature item 02-->
        <div class="feature-item row">
          <div class="col-md-4 scrollLeftDelay">
            <div class="left-feature-item">
              <div class="left-feature-item-icon">
                <i class="fa fa-cogs"></i>
              </div>
              <!--Feature item title & description-->
              <h3>{{ $t('forSupplier.features.item2.title') }}</h3>
              <h3>{{ $t('forSupplier.features.item2.desc') }}</h3>
            </div>
          </div>
          <div class="col-md-8 scrollRightDelay">
            <img class="img-responsive" src="~assets/img/for_supplier/feature-item-02.png" alt="download screen">
          </div>
        </div>
        <!--Feature item 03-->
        <div class="feature-item row">
          <div class="col-md-4 col-md-push-8 scrollRightDelay">
            <div class="right-feature-item">
              <div class="right-feature-item-icon">
                <i class="fa fa-pencil-square-o"></i>
              </div>
              <!--Feature item title & description-->
              <h3>{{ $t('forSupplier.features.item3.title') }}</h3>
              <h3>{{ $t('forSupplier.features.item3.desc') }}</h3>
            </div>
          </div>
          <div class="col-md-8 col-md-pull-4 scrollLeftDelay">
            <img class="img-responsive" src="~assets/img/for_supplier/feature-item-03.png" alt="download screen">
          </div>
        </div>
        <!--Feature item 04-->
        <div class="feature-item row">
          <div class="col-md-4 scrollLeftDelay">
            <div class="left-feature-item">
              <div class="left-feature-item-icon">
                <i class="fa fa-line-chart"></i>
              </div>
              <!--Feature item title & description-->
              <h3>{{ $t('forSupplier.features.item4.title') }}</h3>
              <h3>{{ $t('forSupplier.features.item4.desc') }}</h3>
            </div>
          </div>
          <div class="col-md-8 scrollRightDelay">
            <img class="img-responsive" src="~assets/img/for_supplier/feature-item-04.png" alt="download screen">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

  /* Small Devices */
  @media only screen and (max-width: 767px) {
    .feature-inner-wrapper > .container > .row {
      margin-top: 30px !important;
      margin-bottom: 50px !important;
    }
    .left-feature-item {
      margin-bottom: 30px !important;
    }
    .right-feature-item {
      margin-bottom: 30px !important;
    }
    .section-title {
      padding-bottom: 10px !important;
    }
  }
  /* Small Devices and Tablets */
  @media only screen and (max-width: 768px) {
    .feature-inner-wrapper > .container > .row {
      margin-top: 30px !important;
      margin-bottom: 50px !important;
    }
    .left-feature-item {
      margin-bottom: 30px !important;
    }
    .right-feature-item {
      margin-bottom: 30px !important;
    }
    .section-title {
      padding-bottom: 10px !important;
    }
  }
  /* Medium Devices and Desktop */
  @media only screen and (max-width: 992px) {
  }
  /* Large Devices and Wide Screen */
  @media only screen and (max-width: 1200px) {
  }

  /*=============== Features ===============*/
  #FEATURES{
    outline: none;
  }
  .feature-inner-wrapper {
    padding-top: 0px;
    padding-bottom: 0px;
  }
  .feature-item {
    margin-bottom: 70px;
  }
  .feature-item img{
    margin: 0 auto;
  }
  .left-feature-item {
    position: relative;
    padding-right: 0px;
    margin-bottom: 65px;
    text-align: left;
    margin-top: 35px;
  }
  .left-feature-item-icon {
    position: relative;
    right: 0;
    top: -8px;
    font-size: 40px;
    color: #F2583D;
    width: 45px;
    height: 45px;
    text-align: center;
  }
  .left-feature-item h3 {
    font-size: 25px;
    font-weight: 700;
    margin-bottom: 21px;
    color: #333;
  }
  .left-feature-item p {
    color: #333;
    font-size: 18px;
    font-weight: 300;
    line-height: 25px;
  }
  .feature-iphone img {
    width: 100%;
  }
  .right-feature-item {
    position: relative;
    padding-left: 0px;
    margin-bottom: 65px;
    text-align: left;
    margin-top: 35px;
  }
  .right-feature-item-icon {
    position: relative;
    left: 0;
    top: -8px;
    font-size: 40px;
    color: #F2583D;
    width: 45px;
    height: 45px;
    text-align: center;
  }
  .right-feature-item h3 {
    font-size: 25px;
    font-weight: 700;
    margin-bottom: 21px;
    color: #333;
  }
  .right-feature-item p {
    color: #333;
    font-size: 18px;
    font-weight: 300;
    line-height: 25px;
  }
  .feature-inner-wrapper > .container > .row {
    margin-top: 50px;
    margin-bottom: 50px;
  }
</style>
