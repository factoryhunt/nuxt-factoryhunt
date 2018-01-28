<template>
  <div id="container">

    <!-- Main Image -->
    <div class="main-image-container">
      <div class="main-image"></div>
    </div>

    <!-- body -->
    <div class="body-container">

      <!-- Left-side UI container -->
      <div class="left-container">

        <!-- Sticky Header -->
        <div class="sticky-outer-container">
          <div class="sticky-inner-container">
            <!-- Left Side -->
            <div class="sticky-container">
              <ul>
                <li><a href="#INTRO" class="sticky-item">Intro</a></li>
                <li class="dot">•</li>
                <li><a href="#ADDRESS" class="sticky-item">Address</a></li>
                <li class="dot">•</li>
                <li><a href="#PRODUCTS" class="sticky-item">Products</a></li>
              </ul>
            </div>
            <!-- Right Side -->
            <div class="sticky-company-container">
              <a href="#app" class="sticky-item">
                <img v-if="vendor.thumbnail_url" id="sticky-company-logo" :src="vendor.thumbnail_url"/>
                <img v-else id="sticky-company-logo" src="../../assets/img/temp-logo-image_english_512.png"/>
                <span id="sticky-company-name">{{vendor.account_name_english}}</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Company Header -->
        <div id="header-container" class="header-container each-container">
          <img v-if="vendor.thumbnail_url" class="logo" :src="vendor.thumbnail_url">
          <img v-else class="logo" src="../../assets/img/temp-logo-image_english_512.png">
          <p class="address">{{ vendor.mailing_city_english ? vendor.mailing_city_english + ', ' : '' }} {{ vendor.mailing_country_english ? vendor.mailing_country_english : '' }}</p>
          <h1 class="company-name">{{ vendor.account_name_english }}</h1>
          <div class="short-description-container">
            <p class="short-description">{{ vendor.company_short_description_english ? vendor.company_short_description_english : '' }}</p>
            <!--•-->
            <!--<div class="star-container" v-for="index in 5">-->
            <!--<i class="fa fa-star-o" aria-hidden="true"></i>-->
            <!--</div>-->
            <!--•-->
            <!--<h4 class="review-title"> <small>(0)개의 평가</small></h4>-->
          </div>
        </div>

        <!-- Company Description -->
        <div id="INTRO" class="description-container each-container">
          <h2>Company Description</h2>
          <textarea title="description" readonly v-model="vendor.company_description_english"></textarea>
        </div>

        <!-- Company Information -->
        <div class="information-container each-container">
          <h2>Information</h2>
          <div class="information-table-container">
            <div class="list-container" v-show="vendor.products_english">
              <div class="left-contents">Products</div>
              <div class="right-contents">{{ vendor.products_english }}</div>
            </div>
            <div class="list-container" v-show="vendor.website">
              <div class="left-contents">Website</div>
              <div class="right-contents"><a :href="checkWebsiteLinkHasHttp(vendor.website)" target="_blank">{{ vendor.website }}</a></div>
            </div>
            <div class="list-container" v-show="vendor.phone">
              <div class="left-contents">Phone</div>
              <div class="right-contents">{{ vendor.phone }}</div>
            </div>
            <div class="list-container" v-show="getLocation">
              <div class="left-contents">Location</div>
              <div class="right-contents">{{ getLocation }}</div>
            </div>
            <div class="list-container" v-show="vendor.established_date !== '0000-00-00'">
              <div class="left-contents">Established Year</div>
              <div class="right-contents">{{ getYear(vendor.established_date) }}</div>
            </div>
          </div>
        </div>

        <!-- Company History -->
        <div class="history-container each-container" v-show="vendor.history">
          <h2>History</h2>
          <textarea title="history" readonly v-model="vendor.history" />
        </div>

        <!-- Company Certification -->
        <!--<div class="certification-container each-container">-->
        <!--<h2>Certification</h2>-->
        <!--</div>-->

        <!-- Company Review -->
        <div class="review-container each-container">
          <h2>Reviews<span class="count-text">(0)</span></h2>
          <p>No review</p>
        </div>
        <div class="divider"></div>
      </div>

      <!-- Contact Form -->
      <div class="right-container">
        <form @submit.prevent="sendEmail(value.email, value.quiry)" class="form-container">
          <h2 class="title">Contact</h2>
          <div class="input-container">
            <input required v-model="value.email" type="email" placeholder="Email">
            <i class="fa fa-envelope-o" aria-hidden="true"></i>
          </div>

          <textarea required v-model="value.quiry" rows="10" placeholder="Enter your message."></textarea>

          <p class="quote">Request a quote to get pricing.</p>

          <div class="button-container">
            <button type="submit" class="button-orange">Send Inquiry</button>
          </div>
        </form>
      </div>

      <!-- Company Address -->
      <div id="ADDRESS" class="address-container">
        <h2>Address</h2>
        <div id="map"></div>
      </div>
    </div>

    <div class="product-body-container">
      <!-- Company Products -->
      <div id="PRODUCTS" class="products-container">
        <!-- Title -->
        <h2 class="title">Products<span class="count-text">({{products.length}})</span></h2>
        <!-- Wrapper -->
        <div class="product-wrapper">
          <!-- Product -->
          <div class="product-container" v-for="(product, index) in this.products" :key="index">
            <!-- Image -->
            <div class="image-container">
              <img class="product-image" @click="routeProductProfilePage(index)" :src="product.product_image_url_1">
            </div>
            <!-- Content -->
            <div class="content-container">
              <h2 class="primary-category">{{product.primary_product_category}}</h2>
              <h1 class="product-name">{{product.product_name}}</h1>
              <div class="star-container">
                <i class="fa fa-star-o" aria-hidden="true" v-for="index in 5" :key="index"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  import $ from 'jquery'
  import { mapGetters } from 'vuex'
  export default {
    layout: 'minify',
    head () {
      return {
        title: `${this.vendor.account_name_english} | Factory Hunt`,
        meta: [
          { hid: 'keywords', name: 'keywords', content: `${this.vendor.account_name_english}, ${this.vendor.products_english}, factoryhunt, factory, hunt, factory hunt, quote, bulk, wholesale, supplier, factory hunt, online catalog, supplier directory, free website, international trade` },
          { hid: 'description', name: 'description', content: `${this.vendor.company_description_english} | Factory Hunt` },
          { hid: 'og-type', property: 'og:type', content: 'website' },
          { hid: 'og-title', property: 'og:title', content: this.vendor.account_name_english },
          { hid: 'og-description', property: 'og:description', content: this.vendor.company_description_english },
          { hid: 'og-image', property: 'og:image', content: this.vendor.account_image_url_1 },
          { hid: 'og-url', property: 'og:url', content: `factoryhunt.com/${this.vendor.domain}` }
        ]
      }
    },
    async asyncData ({ params, error }) {
      try {
        let { data } = await axios.get(`/api/data/account/domain/${params.company}`)
        return {
          vendor: data.account,
          products: data.products
        }
      } catch (err) {
        error({ statusCode: 404, message: 'Post not found' })
      }
    },
    data () {
      return {
        value: {
          company: this.$route.params.company,
          input: this.$route.query.input ? this.$route.query.input : '',
          email: '',
          quiry: '',
          // for admin editing
          accountName: ''
        },
        placeholder: {
          email: 'contact@email.com',
          textarea: 'Enter your message'
        },
        msg: {
          quote: 'Request a quote to get pricing',
          kor: {
            edit: '수정하기'
          }
        }
      }
    },
    messages: {
      eng: {
        sticky: {
          intro: 'Intro',
          address: 'Address',
          products: 'Products'
        },
        description: {
          title: 'Company Description'
        },
        information: {
          title: 'Information',
          products: 'Products',
          website: 'Website',
          phone: 'Phone',
          location: 'Location',
          establishedYear: 'Established Year'
        },
        history: {
          title: 'History'
        },
        reviews: {
          title: 'Reviews <small>({count})</small>'
        },
        address: {
          title: 'Address'
        },
        products: {
          title: 'Products <small>({count})</small>'
        },
        contact: {
          title: 'Contact',
          emailPlaceholder: 'your@email.com',
          messagePlaceholder: 'Enter your message.',
          quote: 'Request a quote to get pricing.',
          button: 'Send Inquiry'
        }
      },
      kor: {
        sticky: {
          intro: '회사 소개',
          address: '주소',
          products: '제품'
        },
        description: {
          title: '회사 소개'
        },
        information: {
          title: '정보',
          products: '품목',
          website: '웹사이트',
          phone: '연락처',
          location: '위치',
          establishedYear: '설립연도'
        },
        history: {
          title: '연혁'
        },
        reviews: {
          title: '평가 <small>({count})</small>'
        },
        address: {
          title: '주소'
        },
        products: {
          title: '제품 <small>({count})</small>'
        },
        contact: {
          title: '문의',
          emailPlaceholder: '이메일',
          messagePlaceholder: '내용을 입력해주세요.',
          quote: '가격 협상을 위해 문의하세요.',
          button: '문의하기'
        }
      }
    },
    computed: {
      getLocation () {
        const street = this.vendor.mailing_street_address_english ? this.vendor.mailing_street_address_english + ', ' : ''
        const street2 = this.vendor.mailing_street_address_2_english ? this.vendor.mailing_street_address_2_english + ', ' : ''
        const city = this.vendor.mailing_city_english ? this.vendor.mailing_city_english + ', ' : ''
        const state = this.vendor.mailing_state_english ? this.vendor.mailing_state_english + ', ' : ''
        const country = this.vendor.mailing_country_english
        return street + street2 + city + state + country
      }
    },
    methods: {
      convertEnterToBrTag (subject) {
        return subject.replace(/\n/g, '<br />')
      },
      routeProductProfilePage (index) {
        const productDomain = this.products[index].product_domain
        if (this.value.input) {
          this.$router.push(`/${this.value.company}/${productDomain}?input=${this.value.input}`)
        } else {
          this.$router.push(`/${this.value.company}/${productDomain}`)
        }
      },
      checkWebsiteLinkHasHttp (url) {
        if (url) {
          if (url.indexOf('http') === -1) {
            url = ('http://' + url).toLowerCase()
            return url
          }
        }
      },
      getYear (date) {
        if (date === '0000-00-00') return ''
        let temp = new Date(date)
        const year = temp.getFullYear()
        return year
      },
      activateJquery () {
        $(document).ready(() => {
          this.renderMainImage()
          this.applyStickyCSS()
          this.applyCompanyFadeInOutInStickyNavigationBar()
          this.applySmoothScrolling()
          this.textareaResize()
          this.initMap()
          this.productImageResize()
        })
      },
      renderMainImage () {
        if (this.vendor.account_image_url_1) {
          $('.main-image').css('background-image', `url(${this.vendor.account_image_url_1}`)
        }
      },
      applyStickyCSS () {
        const $stickyOuter = $('.sticky-outer-container')
        const $sticky = $('.sticky-container')
        if ($stickyOuter.offset()) {
          var stickyTop = $stickyOuter.offset().top
          var stickOffset = 0
          $(window).scroll(() => { // scroll event
            var windowTop = $(window).scrollTop() // returns number
            if (stickyTop - windowTop <= stickOffset) {
              $stickyOuter.css({
                'position': 'fixed',
                'top': stickOffset,
                'border-bottom': '1px solid #dbdbdb'
              })
              $sticky.css({
                'border-bottom': 'none'
              })
            } else {
              $stickyOuter.css({
                'position': 'absolute',
                'border-bottom': 'none'
              })
              $sticky.css({
                'border-bottom': '1px solid #dbdbdb'
              })
            }
          })
        }
      },
      applyCompanyFadeInOutInStickyNavigationBar () {
        $(document).ready(() => {
          const fadeContainer = $('.sticky-company-container')
          var logo = $('.header-container .logo')
          var logoBottomOffset = logo.offset().top + logo.outerHeight() - 50
          $(window).scroll(function () { // scroll event
            var windowTop = $(window).scrollTop() // returns number
            if (windowTop > logoBottomOffset) {
              fadeContainer.css({'opacity': '1'}).fadeIn(200)
            } else {
              fadeContainer.fadeOut(200)
            }
          })
        })
      },
      applySmoothScrolling () {
        /* eslint-disable */
        $(document).ready(() => {
          // Select all links with hashes
          $('.sticky-item')
            .click(function(event) {
              if (
                location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname
              ) {
                // Figure out element to scroll to
                var target = $(this.hash)
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']')
                // Does a scroll target exist?
                if (target.length) {
                  // Only prevent default if animation is actually gonna happen
                  event.preventDefault()
                  $('html, body').animate({
                    scrollTop: target.offset().top - 60
                  }, 1000)
                }
              }
            })
        })
        /* eslint-enable */
      },
      textareaResize () {
        $(document).ready(() => {
          const $description = $('.description-container textarea')
          const $history = $('.history-container textarea')
          const descriptionHeight = $description[0].scrollHeight
          const historyHeight = $description[0].scrollHeight
          $description.css({
            'height': (descriptionHeight) + 'px',
            'overflow': 'hidden'
          })
          $history.css({
            'height': (historyHeight) + 'px',
            'overflow': 'hidden'
          })
        })
      },
      productImageResize () {
        $(document).ready(() => {
          const $image = $('.product-image')
          $image.css('height', $image.width() + 'px')
        })
      },
      initMap () {
        /* eslint-disable */
        const latlng = new google.maps.LatLng(39.305, -76.617)
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: latlng,
          zoomControl: true,
          zoomControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT
          },
          mapTypeControl: false,
          scaleControl: true,
          streetViewControl: true,
          rotateControl: true,
          fullscreenControl: false
        })
        var geocoder = new google.maps.Geocoder()
        this.geocodeAddress(geocoder, map)
      },
      geocodeAddress (geocoder, resultsMap) {
        /* eslint-disable no-unused-vars */
        const street = this.vendor.mailing_street_address_english
        const city = this.vendor.mailing_city_english
        const state = this.vendor.mailing_state_english
        const country = this.vendor.mailing_country_english
        const address = state ? street + ', ' + city + ', ' + state + ', ' + country : street + ', ' + city + ', ' + country
        console.log(address)
        geocoder.geocode({'address': address}, function (results, status) {
          if (status === 'OK') {
            console.log('map ok')
            resultsMap.setCenter(results[0].geometry.location)
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            })
          } else {
            geocoder.geocode({'address': 'united state'}, function (result, status) {
              resultsMap.setCenter(result[0].geometry.location)
            })
          }
        })
        /* eslint-enable no-unused-vars */
      }
    },
    mounted () {
      this.activateJquery()
    }
  }
</script>

<style lang="less" scoped>
  @import '~assets/css/index';

  @font-size: 17px;
  @font-weight: 300;

  #container {

    .main-image-container {
      .main-image {
        background-image: url(~assets/img/cover_image_english.png);
        background-repeat: no-repeat !important;
        background-size: cover !important;
        background-position: 50% 50% !important;
        height: 30vh !important;
      }
    }

    .body-container {

      .left-container {
        position: relative;

        // shared
        textarea {
          color: @color-font-black;
          outline: none;
          resize: none;
          border: none;
          padding: 0;
          font-weight: 200;
          font-size: @font-size;
          line-height: 1.5em;
        }
        p {
          margin-bottom: 0;
          font-weight: @font-weight;
          font-size: @font-size;
        }
        .each-container {
          border-bottom: @border-light-grey;
          padding-bottom: 1.6rem;
        }
        // end of shared

        .sticky-outer-container {
          display: none;
        }

        .header-container {
          padding-top: 18px;

          .logo {
            float: right;
            width: 52px;
            height: 52px;
            border-radius: 50%;
            border: 2px solid @color-light-grey;
          }
          .address {
            font-size: 16px;
            margin: 0;
            color: @color-font-gray;
            padding-right: 55px;
            word-break: break-all;
            font-weight: 400;
          }
          .company-name {
            margin: 0;
            padding-right: 55px;
            word-break: break-all;
          }
          .short-description-container {
            .short-description {
              font-weight: 300;
              word-break: break-all;
            }
          }
        }

        .description-container { }

        .information-container {
          position: relative;

          .list-container {
            position: relative;
            font-weight: @font-weight;
            font-size:@font-size;
            line-height: 1.9em;

            .left-contents {
              position: absolute;
              word-break: break-all;
              max-width: 140px;
            }
            .right-contents {
              text-align: left;
              padding-left: 140px;
              word-break: break-all;
            }
          }
        }

        .history-container { }

        .review-container { }
      }

      .right-container {
        .placeholder(100);
        padding-bottom: 1.6rem;

        .form-container {
          font-size: @font-size;

          .input-container {
            position: relative;
            border:1px solid @color-light-grey !important;
            border-radius: 4px;
            margin-bottom: 25px;

            i {
              position: absolute;
              right: 20px;
              top: 10px;
            }

            input {
              width: 100%;
              border-radius: 4px;
              padding: 10px 50px 10px 10px;
              border: none !important;
              box-shadow: none !important;
              outline: none !important;
              font-size: 16px;
            }
          }

          textarea {
            font-size: @font-size;
          }

          .quote {
            color: grey;
            font-size: 0.9rem;
            font-weight: 400;
            text-align: center;
          }

          button {
            width: 100%;
            height: 50px;
            font-weight: 500;
            font-size: 16px;
          }
        }
      }

      .address-container {
        outline: none;
        padding-bottom: 1.6rem;
        #map {
          width: 100%;
          min-height: 330px;
        }
      }
    }

    .product-body-container {
      max-width: 1040px;
      margin: 0 auto;
      padding: 0;

      .products-container {
        outline: none;
        padding-bottom: 1.6rem;
        .title {
          margin-top: 0;
          padding-left: 20px;
          padding-right: 20px;
        }
        .product-wrapper {

          .product-container {
            padding-bottom: 2rem;
            padding-left: 20px;
            padding-right: 20px;

            .image-container {
              img {
                cursor: pointer;
                width: 100%;
                box-shadow: 1px 1px 10px 1px #e4e4e4;
              }
            }
            .content-container {
              word-break: break-all;

              .primary-category {
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                margin: 4px 0 0 0;
                font-size: .9rem;
                font-weight: 500;
                color: @color-font-gray;
              }
              .product-name {
                margin: 0;
                font-size: 1.1rem;
                font-weight: 400;
              }
              .star-container {
                i {
                  font-size: 0.9rem;
                  color: @color-link;
                }
              }
            }
          }
        }
      }
    }
  }
  @media ( min-width: 744px ) {
    #container {
      .main-image-container {
        .main-image {
          height: 69vh !important;
        }
      }

      .body-container {

        .left-container {

          .header-container {
            padding-top: 24px;
          }
          .description-container {
          }

        }

        .right-container {
          max-width: 600px;
          margin: 0 auto 30px auto;
        }

        .address-container #map {
          min-height: 450px;
        }
      }

      .product-body-container {
        max-width: 1040px;
        margin: 0 auto;
        padding: 0 24px;

        .products-container {
          padding-bottom: 1.6rem;

          .title {
            padding-left: 6px;
            padding-right: 6px;
          }
          .product-wrapper {

            .product-container {
              display: inline-block;
              vertical-align: top;
              width: 50%;
              padding-left: 6px;
              padding-right: 6px;

              .image-container {
                img {
                }
              }
              .content-container {
                .primary-category {
                  margin: 4px 0 0 0;
                  font-size: .9rem;
                  font-weight: 500;
                  color: @color-font-gray;
                }
                .product-name {
                  margin: 0;
                }
                .star-container {
                  i {
                    font-size: 0.9rem;
                    color: @color-link;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  @media ( min-width: 1128px ) {
    #container {
      .main-image-container {
        .main-image {
        }
      }

      .body-container {

        .left-container {
          padding-right: 410px;

          .sticky-outer-container {
            display: inherit;
            position: absolute;
            background-color: @color-white;
            z-index: 3;
            height: 50px;
            line-height: 50px;
            width: 100%;
            left: 0;

            .sticky-inner-container {
              position: relative;
              width: 100%;
              max-width: 1040px;
              margin: 0 auto;

              .sticky-container {
                position: relative;
                border-bottom: 1px solid @color-light-grey;
                margin-right: 410px;

                ul {
                  font-size: 16px;
                  list-style: none;
                  margin: 0;
                  padding-left: 0;
                  li {
                    display: inline-block;
                  }
                  a {
                    font-weight: 500;
                  }
                }
                .dot {
                  margin: 0 5px;
                }
              }

              .sticky-company-container {
                position: absolute;
                top: -2px;
                right: 0;
                opacity: 0;

                a {
                  text-decoration: none;
                  color: @color-font-gray;

                  #sticky-company-logo {
                    display: inline-block;
                    vertical-align: middle;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    border: 2px solid @color-light-grey;
                  }
                  #sticky-company-name {
                    font-weight: 500;
                    margin-left: 5px;
                    font-size: 16px;
                  }
                }
              }
            }
          }

          .header-container {
            padding-top: 72px;
          }

          .description-container {
          }
        }

        .right-container {
          padding-top: 72px;
          position: absolute;
          width: 340px;
          top: 5px;
          right: 0;

          .title {
            margin-top: 0;
          }
        }

        .address-container {
          #map {
            min-height: 500px;
          }
        }
      }

      .product-body-container {
        max-width: 1060px;
        margin: 0 auto;
        padding: 0;

        .products-container {
          padding-bottom: 1.6rem;
          .title {
            padding-left: 10px;
            padding-right: 10px;
          }
          .product-wrapper {
            position: relative;

            .product-container {
              display: inline-block;
              width: 25%;
              padding-left: 10px;
              padding-right: 10px;

              .image-container {
                img {
                }
              }
              .content-container {
                .primary-category {
                  font-size: .9rem;
                  color: @color-font-gray;
                }
                .product-name {
                }
                .star-container {
                  i {
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
