<template>
  <section id="ABOUT">
    <div class="container">
      <div class="row">
        <div class="col-md-10 col-md-offset-1">
          <!--About us title & description-->
          <div class="section-title">
            <h2 v-lang.title></h2>
            <p v-lang.desc></p>
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
              <img class="img-responsive" src="~assets/img/for_supplier/about-us.png" alt="iphone">
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
                <h3 v-lang.item1.title></h3>
                <p v-lang.item1.desc></p>
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
                <h3 v-lang.item2.title></h3>
                <p v-lang.item2.desc></p>
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
                <h3 v-lang.item3.title></h3>
                <p v-lang.item3.desc></p>
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
    data () {
      return {
      }
    },
    messages: {
      eng: {
        title: 'How Factory Hunt Works',
        desc: 'Factory Hunt is a supplier search engine and helps connect suppliers to buyers.',
        item1: {
          title: 'Create Your Company Profile',
          desc: 'Create a company profile in just a few clicks.'
        },
        item2: {
          title: 'Update Product Information',
          desc: 'Simply upload your PDF catalog to create a web product catalog.'
        },
        item3: {
          title: 'Connecting with buyers',
          desc: 'Your product information will be automatically collected by search engine bots and appear in search results.'
        }
      },
      kor: {
        title: 'Factory Hunt는 어떤 서비스인가요?',
        desc: 'Factory Hunt는 제조업체 전문 검색엔진입니다. 제품 정보를 해외 바이어에게 쉽게 노출시킬 수 있습니다.',
        item1: {
          title: '무료 영어 홈페이지 제작',
          desc: '클릭 몇 번으로 영어 웹페이지를 무료로 개설하세요.'
        },
        item2: {
          title: '제품 정보 업데이트',
          desc: 'PDF 영문 카탈로그를 가지고 계신가요? 단 한번의 클릭으로 온라인 제품 카탈로그를 쉽게 만들 수 있습니다!'
        },
        item3: {
          title: '해외 바이어와 연결',
          desc: '영어 정보를 업데이트하면 Factory Hunt 검색 엔진이 자동으로 정보를 수집하여 해외 바이어에게 노출시킵니다.'
        }
      }
    }
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
