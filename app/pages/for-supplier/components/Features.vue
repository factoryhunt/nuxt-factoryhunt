<template>
  <section class="features" id="FEATURES">
    <div class="container">
      <div class="row">
        <div class="col-md-10 col-md-offset-1">
          <div class="section-title">
            <h2 v-lang.title></h2>
            <p v-lang.desc></p>
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
              <h3 v-lang.item1.title></h3>
              <p v-lang.item1.desc></p>
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
              <h3 v-lang.item2.title></h3>
              <p v-lang.item2.desc></p>
            </div>
          </div>
          <div class="col-md-8 scrollRightDelay">
            <img class="img-responsive" :src="getFeatureItemImage2" alt="download screen">
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
              <h3 v-lang.item3.title></h3>
              <p v-lang.item3.desc></p>
            </div>
          </div>
          <div class="col-md-8 col-md-pull-4 scrollLeftDelay">
            <img class="img-responsive" :src="getFeatureItemImage3" alt="download screen">
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
              <h3 v-lang.item4.title></h3>
              <p v-lang.item4.desc></p>
            </div>
          </div>
          <div class="col-md-8 scrollRightDelay">
            <img class="img-responsive" src="~/assets/img/for_supplier/feature-item-04.png" alt="download screen">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    messages: {
      eng: {
        title: 'Why Factory Hunt?',
        desc: 'Factory Hunt is a technology company that makes simple, powerful services for suppliers and buyers.',
        item1: {
          title: 'User-friendly Design',
          desc: 'Factory Hunt is optimized for desktop and all mobile devices. It also offers an intuitive and distinctive design.'
        },
        item2: {
          title: 'Customized URL',
          desc: 'Introduce your products to buyers quickly and easily by sharing customized URL.',
          image: '/static/img/for_supplier/feature-item-02-eng.png'
        },
        item3: {
          title: 'Easy to Use',
          desc: 'It\'s simple and easy to update company profile and product information.',
          image: '/static/img/for_supplier/feature-item-03-eng.png'
        },
        item4: {
          title: 'Search Engine Exposure',
          desc: 'When you update your product information, it will be automatically collected by search engine bots and appear in search results.'
        }
      },
      kor: {
        title: '팩토리헌트를 사용하면 무엇이 좋나요?',
        desc: '팩토리헌트는 최고의 개발진이 최신 소프트웨어 기술을 사용하여, 최적화된 사용자 경험을 제공합니다.',
        item1: {
          title: '사용자 친화적인 디자인',
          desc: '팩토리헌트는 데스크탑과 모든 모바일 기기에 최적화 되어있습니다. 또한 직관적이고 차별화된 디자인을 제공합니다.'
        },
        item2: {
          title: '고유한 웹페이지 도메인',
          desc: '맞춤 URL 링크 공유를 통해, 쉽고 빠르게 바이어에게 웹페이지를 소개하세요.',
          image: '/static/img/for_supplier/feature-item-02.png'
        },
        item3: {
          title: '쉬운 정보 업데이트',
          desc: '문자 메세지를 보내는 것 만큼이나 쉽게 기업 정보 및 제품 정보를 업데이트 할 수 있습니다.',
          image: '/static/img/for_supplier/feature-item-03.png'
        },
        item4: {
          title: '검색 엔진 노출',
          desc: '영어 정보를 업데이트하면 전 세계 바이어를 위한 제조업체 전문 검색엔진 factoryhunt.com에 제품 정보가 자동으로 업데이트 됩니다.'
        }
      }
    },
    computed: {
      getFeatureItemImage2 () {
        return this.translate('item2.image')
      },
      getFeatureItemImage3 () {
        return this.translate('item3.image')
      }
    }
  }
</script>

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
