<template>
  <div id="container">
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
                <li><a href="#INTRO" class="sticky-item">{{ $t('company.sticky.intro') }}</a></li>
                <li class="dot">•</li>
                <li><a href="#ADDRESS" class="sticky-item">{{ $t('company.sticky.address') }}</a></li>
              </ul>
            </div>
            <!-- Right Side -->
            <div class="sticky-company-container">
              <a href="#container" class="sticky-item">
                <!--<img id="sticky-company-logo" src="~assets/img/temp-logo-image_english_512.png"/>-->
                <span id="sticky-company-name">{{ lead.company_english || lead.company }}</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Company Header -->
        <div id="header-container" class="header-container each-container">
          <p class="address">{{ lead.mailing_city_english ? lead.mailing_city_english + ', ' : '' }} {{ lead.mailing_country_english ? lead.mailing_country_english : '' }}</p>
          <h1 class="company-name">{{ lead.company_english || lead.company }}</h1>
        </div>

        <!-- Company Information -->
        <div id="INTRO" class="information-container each-container">
          <h2 class="section-title">{{ $t('company.information.title') }}</h2>
          <div class="information-table-container">
            <div class="list-container" v-show="lead.products">
              <div class="left-contents">{{ $t('company.information.products') }}</div>
              <div class="right-contents">{{ lead.products_english || lead.products }}</div>
            </div>
            <div class="list-container" v-show="lead.website">
              <div class="left-contents">{{ $t('company.information.website') }}</div>
              <div class="right-contents"><a :href="checkWebsiteLinkHasHttp(lead.website)" target="_blank">{{ lead.website }}</a></div>
            </div>
            <div class="list-container" v-show="lead.number_of_employees">
              <div class="left-contents">{{ $t('company.information.totalEmployees') }}</div>
              <div class="right-contents">{{getNumberOfEmployees}}</div>
            </div>
            <div class="list-container" v-show="lead.phone">
              <div class="left-contents">{{ $t('company.information.phone') }}</div>
              <div class="right-contents">{{ lead.phone }}</div>
            </div>
            <div class="list-container" v-show="getLocation">
              <div class="left-contents">{{ $t('company.information.location') }}</div>
              <div class="right-contents">{{ getLocation }}</div>
            </div>
            <div class="list-container" v-show="lead.established_date !== '0000-00-00'">
              <div class="left-contents">{{ $t('company.information.establishedYear') }}</div>
              <div class="right-contents">{{ getYear(lead.established_date) }}</div>
            </div>
          </div>
        </div>

      </div>

      <!-- Contact Form -->
      <div class="right-container">
        <form @submit.prevent="sendInquiry" class="form-container">
          <h2 class="title">{{ $t('company.contact.title') }}</h2>
          <div class="input-container">
            <input required v-model="value.email" type="email" :placeholder="$t('company.contact.emailPlaceholder')">
            <i class="fa fa-envelope-o" aria-hidden="true"></i>
          </div>

          <textarea required v-model="value.inquiry" rows="10" :placeholder="$t('company.contact.messagePlaceholder')"></textarea>

          <p class="quote">{{ $t('company.contact.quote') }}</p>

          <div class="button-container">
            <button type="submit" class="button-orange">{{ $t('company.contact.button') }}</button>
          </div>
        </form>
      </div>

      <!-- Company Address -->
      <div id="ADDRESS" class="address-container">
        <h2 class="section-title">{{ $t('company.address.title') }}</h2>
        <div id="map"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  import { sendEmail } from '~/utils/email'
  export default {
    layout: 'minify',
    head () {
      return {
        title: `${this.lead.company_english || this.lead.company}`,
        meta: [
          { hid: 'keywords', name: 'keywords', content: `${this.lead.company}, ${this.lead.products_english}, factoryhunt, factory, hunt, factory hunt, quote, bulk, wholesale, supplier, factory hunt, online catalog, supplier directory, free website, international trade` },
          { hid: 'description', name: 'description', content: `${this.lead.company} | Factory Hunt` },
          { hid: 'og-title', property: 'og:title', content: this.lead.company_english || this.lead.company },
          { hid: 'og-description', property: 'og:description', content: this.$t('supplier.ogDescription') },
          { hid: 'og-url', property: 'og:url', content: `factoryhunt.com/${this.lead.domain}` }
        ]
      }
    },
    async asyncData ({query}) {
      let {data} = await axios.get(`/api/data/lead/${query.id}`)
      return {
        queryInput: query.input,
        lead: data
      }
    },
    data () {
      return {
        value: {
          company: this.$route.params.company,
          input: this.queryInput || '',
          email: '',
          inquiry: ''
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
    computed: {
      getLocation () {
        const city = this.lead.mailing_city_english ? this.lead.mailing_city_english + ', ' : ''
        const state = this.lead.mailing_state_english ? this.lead.mailing_state_english + ', ' : ''
        const country = this.lead.mailing_country_english
        return city + state + country
      },
      getNumberOfEmployees () {
        let number = this.lead.number_of_employees
        if (number <= 0) {
          number = 0
        } else if (number >= 1 && number < 5) {
          number = 'Fewer than 5 people'
        } else if (number >= 5 && number < 11) {
          number = '5 - 10 people'
        } else if (number >= 11 && number < 51) {
          number = '11 - 50 people'
        } else if (number >= 51 && number < 101) {
          number = '51 - 100 people'
        } else if (number >= 101 && number < 201) {
          number = '101 - 200 people'
        } else if (number >= 201 && number < 301) {
          number = '201 - 300 people'
        } else if (number >= 301 && number < 501) {
          number = '301 - 500 people'
        } else if (number >= 501 && number < 1001) {
          number = '501 - 1000 people'
        } else {
          number = 'Above 1000 people'
        }
        return number
      }
    },
    methods: {
      async sendInquiry () {
        const data = {
          email: this.value.email,
          company: this.lead.company,
          inquiry: this.value.inquiry,
          subject: 'Inquiry for lead supplier'
        }
        try {
          await sendEmail(data)
          alert(this.$t('alert.email.success'))
          location.reload()
        } catch (err) {
          alert(this.$t('alert.email.fail'))
          location.reload()
        }
      },
      getYear (date) {
        if (date === '0000-00-00') return ''
        let temp = new Date(date)
        const year = temp.getFullYear()
        return year
      },
      checkWebsiteLinkHasHttp (url) {
        if (url) {
          if (url.indexOf('http') === -1) {
            url = ('http://' + url).toLowerCase()
            return url
          }
        }
      },
      activateJquery () {
        $(document).ready(() => {
          this.applyStickyCSS()
          this.applySmoothScrolling()
          this.applyCompanyFadeInOutInStickyNavigationBar()
          this.initMap()
        })
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
        const fadeContainer = $('.sticky-company-container')
        var logo = $('.header-container .company-name')
        var logoBottomOffset = logo.offset().top + logo.outerHeight() - 50
        $(window).scroll(function () { // scroll event
          var windowTop = $(window).scrollTop() // returns number
          if (windowTop > logoBottomOffset) {
            fadeContainer.css({'opacity': '1'}).fadeIn(200)
          } else {
            fadeContainer.fadeOut(200)
          }
        })
      },
      applySmoothScrolling () {
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
        geocoder.geocode({'address': this.getLocation}, function (results, status) {
          if (status === 'OK') {
            console.log('map ok')
            resultsMap.setCenter(results[0].geometry.location)
            var circle = new google.maps.Circle({
              strokeColor: '#f2583d',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#f2583d',
              fillOpacity: 0.35,
              map: resultsMap,
              center: results[0].geometry.location,
              radius: 2000
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

  #container {

    .section-title {
      font-size: @font-size-large;
    }

    .body-container {
      margin-bottom: 40px;

      .left-container {
        position: relative;

        // shared
        textarea {
          color: @color-font-black;
          outline: none;
          resize: none;
          border: none;
          padding: 0;
          font-weight: @font-weight-thin;
          font-size: @font-size-medium;
          line-height: 1.5em;
          overflow: hidden;
        }
        p {
          margin-bottom: 0;
          font-weight: @font-weight-thin;
          font-size: @font-size-medium;
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
            font-size: @font-size-small;
            margin: 0;
            color: @color-font-gray;
            padding-right: 55px;
            word-break: break-all;
            font-weight: @font-weight-bold;
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

        .description-container {
          .view-details-button {
            display: none;
            color: @color-link;
            font-size: 17px;
            margin-top: 10px;
            &:hover {
              cursor: pointer;
              text-decoration: underline;
            }
          }
        }

        .information-container {
          position: relative;

          .list-container {
            position: relative;
            font-weight: @font-weight-thin;
            font-size:@font-size-medium;
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

        .history-container {
          .view-details-button {
            display: none;
            color: @color-link;
            font-size: 17px;
            margin-top: 10px;
            &:hover {
              cursor: pointer;
              text-decoration: underline;
            }
          }
        }

        .review-container { }
      }

      .right-container {
        padding-bottom: 1.6rem;

        .form-container {
          font-size: @font-size-medium;

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
            font-size: @font-size-medium;
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
          min-height: 500px;

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
