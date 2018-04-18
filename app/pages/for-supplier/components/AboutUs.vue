<template>
  <section id="ABOUT">
    <div class="container">
      <div class="row">
        <div class="col-md-10 col-md-offset-1">
          <!--About us title & description-->
          <div class="section-title">
            <h2>{{ $t('forSupplier.aboutUs.title') }}</h2>
            <p>{{ $t('forSupplier.aboutUs.desc') }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="choose-us-wrapper">
      <div class="container">
        <div class="row">
          <div class="col-md-6 scrollLeftDelay">
            <!--About iphone-->
            <div class="about-us">
              <img class="img-responsive" src="https://s3-us-west-1.amazonaws.com/factoryhunt.com/img/about-us.png" alt="iphone">
            </div>
          </div>
          <div id="about-us-desc" class="col-md-6 scrollRightDelay">
            <!--Why choose us description-->
            <div class="choose-us-des">
              <!--why choose us item 1-->
              <div class="choose-us-item scrollUpDelay">
                <!--choose us item icon-->
                <div>
                  <!-- Create an icon wrapped by the fa-stack class -->
                  <i class="fa-stack">
                    <!-- The icon that will wrap the number -->
                    <span class="fa fa-circle fa-stack-2x"></span>
                    <!-- a strong element with the custom content, in this case a number -->
                    <strong class="fa-stack-1x" style="color: white;">1</strong>
                  </i>
                </div>
                <!--choose us item title & desc-->
                <h3>{{ $t('forSupplier.aboutUs.item1.title') }}</h3>
                <p>{{ $t('forSupplier.aboutUs.item1.desc') }}</p>
              </div>
              <!--why choose us item 2-->
              <div class="choose-us-item scrollUpDelay">
                <!--choose us item icon-->
                <div>
                  <!-- Create an icon wrapped by the fa-stack class -->
                  <i class="fa-stack">
                    <!-- The icon that will wrap the number -->
                    <span class="fa fa-circle fa-stack-2x"></span>
                    <!-- a strong element with the custom content, in this case a number -->
                    <strong class="fa-stack-1x" style="color: white;">2</strong>
                  </i>
                </div>
                <!--choose us item title & desc-->
                <h3>{{ $t('forSupplier.aboutUs.item2.title') }}</h3>
                <p>{{ $t('forSupplier.aboutUs.item2.desc') }}</p>
              </div>
              <!--why choose us item 3-->
              <div class="choose-us-item scrollUpDelay">
                <!--choose us item icon-->
                <div>
                  <!-- Create an icon wrapped by the fa-stack class -->
                  <i class="fa-stack">
                    <!-- The icon that will wrap the number -->
                    <span class="fa fa-circle fa-stack-2x"></span>
                    <!-- a strong element with the custom content, in this case a number -->
                    <strong class="fa-stack-1x" style="color: white;">3</strong>
                  </i>
                </div>
                <!--choose us item title & desc-->
                <h3>{{ $t('forSupplier.aboutUs.item3.title') }}</h3>
                <p>{{ $t('forSupplier.aboutUs.item3.desc') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
  }
</script>

<style scoped>

  /* Small Devices */
  @media only screen and (max-width: 767px) {
    #about-us-desc {
      margin-top: 50px !important;
    }
  }
  /* Small Devices and Tablets */
  @media only screen and (max-width: 768px) {
    #about-us-desc {
      margin-top: 50px !important;
    }
  }
  /* Medium Devices and Desktop */
  @media only screen and (max-width: 992px) {
  }
  /* Large Devices and Wide Screen */
  @media only screen and (max-width: 1200px) {
  }

  /*=============== About Us ===============*/
  #ABOUT {
    outline: none;
  }
  .choose-us-wrapper {
    padding-top: 30px;
  }
  .about-us img {
    padding-top: 8px;
  }
  #about-us-desc {
    margin-top: -20px;
  }
  .choose-us-item {
    position: relative;
    padding-bottom: 4px;
    padding-left: 80px;
  }
  .choose-us-item div {
    position: absolute;
    top: 0;
    left: 0;
  }
  .choose-us-item div i {
    font-size: 30px;
    font-style: normal;
    color: #F2583D;
    -webkit-transition: all 1s;
    -moz-transition: all 1s;
    -ms-transition: all 1s;
    -o-transition: all 1s;
    transition: all 1s;
  }
  .choose-us-item h3 {
    color: #F2583D;
    font-size: 22px;
    font-weight: 800;
  }
  .choose-us-item p {
    color: #484848;
    font-size: 18px;
    font-weight: 300;
    padding-bottom: 20px;
  }
</style>
