<template>
  <section class="testimonial">
    <div class="testimonial-overlay">
      <div class="container">
        <div class="row">
          <div class="col-md-12 scrollDownDelay">
            <div id="carousel-testimonial" class="carousel slide" data-ride="carousel">
              <!--indicators-->
              <!--<ol class="carousel-indicators">-->
                <!--<li data-target="carousel-testimonial" data-slide-to="0" class="item1 active"></li>-->
                <!--<li data-target="carousel-testimonial" data-slide-to="1" class="item2"></li>-->
                <!--<li data-target="carousel-testimonial" data-slide-to="2" class="item3"></li>-->
              <!--</ol>-->
              <!-- Wrapper for slides -->
              <div class="carousel-inner">
                <!--item 01-->
                <div class="item active text-center">
                  <div class="carousel-review">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                  </div>
                  <div class="testimonial-caption">
                    <h2 v-lang.item1.review></h2>
                    <h4 v-lang.item1.company></h4>
                  </div>
                </div>
                <!--item 02-->
                <div class="item text-center">
                  <div class="carousel-review">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                  </div>
                  <div class="testimonial-caption">
                    <h2 v-lang.item2.review></h2>
                    <h4 v-lang.item2.company></h4>
                  </div>
                </div>
                <!--item 03-->
                <div class="item text-center">
                  <div class="carousel-review">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                  </div>
                  <div class="testimonial-caption">
                    <h2 v-lang.item3.review></h2>
                    <h4 v-lang.item3.company></h4>
                  </div>
                </div>
                <!--item 04-->
                <div class="item text-center">
                  <div class="carousel-review">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                  </div>
                  <div class="testimonial-caption">
                    <h2 v-lang.item4.review></h2>
                    <h4 v-lang.item4.company></h4>
                  </div>
                </div>
                <!--item 05-->
                <div class="item text-center">
                  <div class="carousel-review">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                  </div>
                  <div class="testimonial-caption">
                    <h2 v-lang.item5.review></h2>
                    <h4 v-lang.item5.company></h4>
                  </div>
                </div>
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
        item1: {
          review: 'I finally have a nice-looking homepage and can\'t belive it\'s free!',
          company: 'by <span style="color: #F2583D; font-weight: 500;">a packaging material manufacturer</span> in Yeosu, South Korea'
        },
        item2: {
          review: 'It was extremely easy to upload my PDF catalog and have it online!',
          company: 'by <span style="color: #F2583D; font-weight: 500;">a cosmetic manufacturer</span> in Gyeongsangnam-do, South Korea'
        },
        item3: {
          review: 'It is REALLY easy to use and keep my information updated.',
          company: 'by <span style="color: #F2583D; font-weight: 500;">an LED manufacturer</span> in Jeollabuk-do, South Korea'
        },
        item4: {
          review: 'I used to share PDF catalog with potential buyers and now just share a link of my online catalog.',
          company: 'by <span style="color: #F2583D; font-weight: 500;">a auto parts manufacturer</span> in Daejeon, South Korea'
        },
        item5: {
          review: 'Thank you! I now have a better-looking homepage than the paid one.',
          company: 'by <span style="color: #F2583D; font-weight: 500;">a toy manufacturer</span> in Busan, South Korea'
        }
      },
      kor: {
        item1: {
          review: '정말 깔끔한 웹페이지를 가지게 되었는데, 무료라니 놀랍네요!',
          company: '경기도 소재 <span style="color: #F2583D; font-weight: 500;">포장재 제조업체</span> 후기'
        },
        item2: {
          review: '카탈로그 PDF 파일을 한번에 업로드 할 수 있어서, 너무 편해요~~',
          company: '경상남도 소재 <span style="color: #F2583D; font-weight: 500;">화장품 제조업체</span> 후기'
        },
        item3: {
          review: '무엇 보다도 회사 정보와 제품 정보를 유지보수하기 쉬워서 너무 좋네요!',
          company: '전라북도 소재 <span style="color: #F2583D; font-weight: 500;">LED 제조업체</span> 후기'
        },
        item4: {
          review: '해외 바이어와 PDF 파일 공유 대신, 온라인 카탈로그 링크를 공유하니 굉장히 편합니다.',
          company: '대전 소재 <span style="color: #F2583D; font-weight: 500;">자동차 부품 제조업체</span> 후기'
        },
        item5: {
          review: '비싼 비용을 지불하고 제작한 웹사이트 보다 더 멋진 홈페이지가 생겼어요.',
          company: '부산 소재 <span style="color: #F2583D; font-weight: 500;">장난감 제조업체</span> 후기'
        }
      }
    },
    computed: {

    },
    updated () {
    },
    mounted () {
    },
    created () {
      $(document).ready(function () {
        // Activate Carousel
        $('#carousel-testimonial').carousel()
        // Enable Carousel Indicators
        $('.item1').click(function () {
          $('#carousel-testimonial').carousel(0)
        })
        $('.item2').click(function () {
          $('#carousel-testimonial').carousel(1)
        })
        $('.item3').click(function () {
          $('#carousel-testimonial').carousel(2)
        })
        // Enable Carousel Controls
//        $('.left').click(function(){
//          $('#carousel-testimonial').carousel("prev")
//        })
//        $('.right').click(function(){
//          $('#carousel-testimonial').carousel("next")
//        })
      })
    }
  }
</script>

<style scoped>
  /*=============== Testimonials ===============*/
  /*.testimonial {*/
    /*background-image: url("../../../assets/for_supplier/testimonial-bg.jpg");*/
    /*background-attachment: fixed;*/
    /*background-repeat: no-repeat;*/
    /*-moz-background-size: cover;*/
    /*-o-background-size: cover;*/
    /*-webkit-background-size: cover;*/
    /*background-size: cover;*/
    /*background-position: 50% 50%;*/
  /*}*/
  /*.testimonial {*/
    /*background-color: #484848;*/
  /*}*/
  .testimonial-overlay {
    background-color: rgba(41, 41, 41, 1);
    margin-top: 80px;
    padding-top: 80px;
    padding-bottom: 80px;
  }
  /*.carousel-indicators {*/
    /*bottom: -10px;*/
  /*}*/
  .carousel-inner .item img {
    width: 150px;
    border: 2px solid #F2583D;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    padding: 3px;
  }
  .carousel-review > i{
    color: white;
    font-size: 20px;
    padding-left: 5px;
    padding-right: 5px;
  }
  .testimonial-caption h2 {
    color: white;
    font-weight: 500;
    font-size: 30px;
    margin-top: 10px;
    padding-top: 20px;
    padding-bottom: 0px;
  }
  .testimonial-caption h4 {
    color: #D8D8D8;
  }
  .testimonial-caption h4 span {
    color: #F2583D;
    font-weight: 500;
  }
  .testimonial-caption p {
    color: #F2583D;
    font-weight: 300;
  }
</style>
