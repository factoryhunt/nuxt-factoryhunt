<template>
  <div id="container">

    <!-- PDF Modal -->
    <div id="modal-background" class="modal-background">

      <!-- Close Button -->
      <a id="close-button" @click="onPDFCloseButton">✕</a>

      <div class="modal-table" v-show="toggle.coverPhotos">
        <div class="modal-cell">
          <div class="modal-contents" tabindex="-1">
            <div>

              <div class="modal">
                <div class="top-section">
                  <div></div>
                </div>

                <!-- Cover Photos -->
                <div class="center-section">
                  <div class="cover-photo-container">

                    <!-- Angle Panel -->
                    <div class="left-panel panel" @click="onPanelLeftAngle" v-show="vendor.cover_image_url_2"></div>
                    <div class="right-panel panel" @click="onPanelRightAngle" v-show="vendor.cover_image_url_2"></div>

                    <!-- Cover Images -->
                    <div class="cover-photo-wrapper">
                      <div class="cover-photo-body-container">
                        <!--<img id="before-cover-photo" class="cover-photo" :src="value.beforeCoverPhoto" alt="before-cover-image" v-if="toggle.coverImageChanging">-->
                        <loader class="spinkit-default cover-loader" v-show="!toggle.isCoverImageLoaded"/>
                        <img id="cover-photo" class="cover-photo" :src="value.currentCoverPhoto" alt="cover-image" v-show="toggle.isCoverImageLoaded">
                      </div>
                    </div>

                  </div>
                </div>

                <!-- bottom -->
                <div class="bottom-section">
                  <div></div>
                </div>

                <!-- cover image caching -->
                <div class="cache-image-container" v-if="vendor.cover_image_url_2">
                  <ul class="cache-image-wrapper">
                    <li><img :src="vendor.cover_image_url_2"></li>
                    <li><img :src="vendor.cover_image_url_3"></li>
                    <li><img :src="vendor.cover_image_url_4"></li>
                    <li><img :src="vendor.cover_image_url_5"></li>
                    <li><img :src="vendor.cover_image_url_6"></li>
                    <li><img :src="vendor.cover_image_url_7"></li>
                    <li><img :src="vendor.cover_image_url_8"></li>
                  </ul>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>

      <!-- body -->
      <div class="body-container" tabindex="-1" v-show="toggle.brochure">
        <!-- Brochure -->
        <div id="brochure-container" class="brochure-container">
          <img v-show="!toggle.isBrochureLoaded" class="pdf-canvas" src="~assets/img/product_loading_image_text.png">
        </div>
      </div>

    </div>

    <!-- Main Image -->
    <div class="main-image-container">
      <div v-if="!vendor.cover_image_url_1" class="no-main-image"></div>
      <div v-else class="main-image" @click="onViewPhotosButton">
        <!-- <div class="edit-photos-button" @click="onEditPhotosButton">{{ $t('company.editImages') }}</div> -->
        <div class="view-photos-button" @click="onViewPhotosButton">{{ $t('company.viewImages') }}</div>
      </div>
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
                <li><a href="#OVERVIEW" class="sticky-item">{{ $t('company.sticky.overview') }}</a><span class="dot">•</span></li>
                <li v-show="vendor.account_pdf_url"><a href="#DOCUMENTS" class="sticky-item">{{ $t('company.sticky.documents') }}</a><span class="dot">•</span></li>
                <li v-show="tradeCapacityExist"><a href="#TRADE-CAPACITY" class="sticky-item">{{ $t('company.sticky.tradeCapacity') }}</a><span class="dot">•</span></li>
                <li><a href="#LOCATION" class="sticky-item">{{ $t('company.sticky.location') }}</a><span class="dot" v-show="products.length > 0">•</span></li>
                <li v-show="products.length > 0"><a href="#PRODUCTS" class="sticky-item">{{ $t('company.sticky.products') }}</a></li>
              </ul>
            </div>
            <!-- Right Side -->
            <div class="sticky-company-container">
              <a href="#CONTAINER" class="sticky-item">
                <img v-if="vendor.logo_url" id="sticky-company-logo" :src="vendor.logo_url"/>
                <img v-else id="sticky-company-logo" src="../../assets/img/temp-logo-image_english_512.png"/>
                <span id="sticky-company-name">{{vendor.account_name}}</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Company Header -->
        <div id="header-container" class="header-container each-container">
          <p id="OVERVIEW" class="address">{{getLocation}}</p>
          <img v-if="vendor.logo_url" class="logo" :src="vendor.logo_url">
          <img v-else class="logo" src="../../assets/img/temp-logo-image_english_512.png">
          <h1 class="company-name">{{ vendor.account_name }}</h1>
          <div class="short-description-container">
            <p class="short-description">{{ vendor.company_short_description ? vendor.company_short_description : '' }}</p>
            <!--•-->
            <!--<div class="star-container" v-for="index in 5">-->
            <!--<i class="fa fa-star-o" aria-hidden="true"></i>-->
            <!--</div>-->
            <!--•-->
            <!--<h4 class="review-title"> <small>(0)개의 평가</small></h4>-->
          </div>
          <div class="video-container" v-show="getVideoURL">
            <iframe
              id="intro-video"
              :src="getVideoURL"
              frameborder="0"
              allowfullscreen></iframe>
          </div>
        </div>

        <!-- Company Information -->
        <div class="information-container each-container">
          <h2 class="section-title">{{ $t('company.information.title') }}</h2>
          <div class="information-table-container">
            <div class="list-container" v-show="vendor.products">
              <div class="left-contents">{{ $t('company.information.products') }}</div>
              <div class="right-contents">{{ vendor.products }}</div>
            </div>
            <div class="list-container" v-show="vendor.website">
              <div class="left-contents">{{ $t('company.information.website') }}</div>
              <div class="right-contents"><a :href="getWebsiteURL(vendor.website)" target="_blank">{{ vendor.website }}</a></div>
            </div>
            <div class="list-container" v-show="vendor.phone">
              <div class="left-contents">{{ $t('company.information.phone') }}</div>
              <div class="right-contents">{{ vendor.phone }}</div>
            </div>
            <div class="list-container" v-show="getAddress">
              <div class="left-contents">{{ $t('company.information.address') }}</div>
              <div class="right-contents">{{ getAddress }}</div>
            </div>
            <div class="list-container" v-show="vendor.account_type">
              <div class="left-contents">{{ $t('company.information.businessType') }}</div>
              <div class="right-contents">
                {{ vendor.account_type }}
                <span v-show="vendor.business_type"><i class="fa fa-angle-right"></i> {{vendor.business_type}}</span>
              </div>
            </div>
            <div class="list-container" v-show="vendor.established_year">
              <div class="left-contents">{{ $t('company.information.establishedYear') }}</div>
              <div class="right-contents">{{ vendor.established_year }}</div>
            </div>
            <div class="list-container" v-show="vendor.number_of_employees">
              <div class="left-contents">{{ $t('company.information.numberOfEmployees') }}</div>
              <div class="right-contents">{{ vendor.number_of_employees }}</div>
            </div>
          </div>
        </div>

        <!-- Company Description -->
        <div class="description-container each-container" v-show="vendor.company_description">
          <h2 class="section-title">{{ $t('company.description.title') }}</h2>
          <textarea title="description" readonly v-model="vendor.company_description"></textarea>
          <p @click="descriptionExpand" class="view-details-button" v-html="$t('company.readMore')"></p>
        </div>

        <!-- Company History -->
        <div class="history-container each-container" v-show="vendor.history">
          <h2 class="section-title">{{ $t('company.history.title') }}</h2>
          <textarea title="history" readonly v-model="vendor.history"></textarea>
          <p @click="historyExpand" class="view-details-button" v-html="$t('company.readMore')"></p>
        </div>

        <!-- Document -->
        <div id="DOCUMENTS" class="document-container each-container" v-show="vendor.account_pdf_url">
          <h2 class="section-title">{{ $t('company.document.title') }}</h2>
          <span class="document-item" @click="onCatalog">
            <i id="pdf-icon" class="fa fa-file-pdf-o"></i>
            <p class="title" v-html="$t('company.document.companyBrochure')"></p>
          </span>
        </div>

        <!-- Trade Capacity -->
        <div id="TRADE-CAPACITY" class="trade-capacity-container each-container" v-show="tradeCapacityExist">
          <h2 class="section-title">{{ $t('company.tradeCapacity.title') }}</h2>
          <div class="information-table-container">
            <div class="list-container" v-show="vendor.total_annual_revenue">
              <div class="left-contents">{{ $t('company.tradeCapacity.totalAnnualRevenue') }}</div>
              <div class="right-contents">{{ vendor.total_annual_revenue }}</div>
            </div>
            <div class="list-container" v-show="vendor.average_lead_time">
              <div class="left-contents">{{ $t('company.tradeCapacity.averageLeadTime') }}</div>
              <div class="right-contents">{{ vendor.average_lead_time }} Day(s)</div>
            </div>
            <div class="list-container" v-show="vendor.accepted_delivery_terms">
              <div class="left-contents">{{ $t('company.tradeCapacity.acceptedDeliveryTerms') }}</div>
              <div class="right-contents">{{ vendor.accepted_delivery_terms }}</div>
            </div>
            <div class="list-container" v-show="vendor.accepted_payment_currency">
              <div class="left-contents">{{ $t('company.tradeCapacity.acceptedPaymentCurrency') }}</div>
              <div class="right-contents">{{ vendor.accepted_payment_currency }}</div>
            </div>
            <div class="list-container" v-show="vendor.accepted_payment_type">
              <div class="left-contents">{{ $t('company.tradeCapacity.acceptedPaymentType') }}</div>
              <div class="right-contents">{{ vendor.accepted_payment_type }}</div>
            </div>
            <div class="list-container" v-show="vendor.language_spoken">
              <div class="left-contents">{{ $t('company.tradeCapacity.languageSpoken') }}</div>
              <div class="right-contents">{{ vendor.language_spoken }}</div>
            </div>
          </div>
        </div>

        <!-- Company Certification -->
        <!--<div class="certification-container each-container">-->
        <!--<h2>Certification</h2>-->
        <!--</div>-->

        <!-- Company Review -->
        <!--<div class="review-container each-container">-->
        <!--<h2 class="section-title" v-html="$t('company.reviews.title', { count: 0 })"></h2>-->
        <!--<p>No review</p>-->
        <!--</div>-->
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
            <loader v-show="toggle.isEmailSending" class="spinkit-input"/>
            <button v-show="!toggle.isEmailSending" type="submit" class="button-orange">{{ $t('company.contact.button') }}</button>
          </div>
        </form>
      </div>

      <!-- Company Address -->
      <div id="LOCATION" class="address-container">
        <h2 class="section-title">{{ $t('company.information.location') }}</h2>
        <div id="map"></div>
      </div>
    </div>

    <div class="product-body-container" v-show="products.length > 0">
      <!-- Company Products -->
      <div id="PRODUCTS" class="products-container">
        <!-- Title -->
        <h2 class="section-title" v-html="$t('company.products.title', { count: products.length})"></h2>
        <!-- Wrapper -->
        <div class="product-wrapper">
          <!-- Product -->
          <div class="product-container"
               v-for="(product, index) in this.products"
               :key="index"
               @click="routeProductProfilePage(index)">
            <!-- Image -->
            <div class="image-container">
              <div class="image-wrapper">
                <img class="product-image" :src="product.product_image_url_1">
              </div>
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
  import pdflib from 'pdfjs-dist'
  import Loader from '~/components/Loader'
  import { validateURL } from '~/utils/text'
  import { sendEmail } from '~/utils/email'
  export default {
    scrollToTop: true,
    layout: 'minify',
    head () {
      return {
        title: `${this.vendor.account_name}`,
        meta: [
          { hid: 'keywords', name: 'keywords', content: `${this.vendor.account_name}, ${this.vendor.products}, factoryhunt, factory, hunt, factory hunt, quote, bulk, wholesale, supplier, factory hunt, online catalog, supplier directory, free website, international trade` },
          { hid: 'description', name: 'description', content: `${this.vendor.company_description}, ${this.vendor.products} | Factory Hunt` },
          { hid: 'og-title', property: 'og:title', content: this.vendor.account_name },
          { hid: 'og-description', property: 'og:description', content: this.vendor.company_description },
          { hid: 'og-image', property: 'og:image', content: this.vendor.cover_image_url_1 },
          { hid: 'og-url', property: 'og:url', content: `factoryhunt.com/${this.vendor.domain}` },
          { hid: 'twitter-card', property: 'twitter:card', content: 'summary' },
          { hid: 'twitter-title', property: 'twitter:title', content: `${this.vendor.account_name} | Factory Hunt` },
          { hid: 'twitter-description', property: 'twitter:description', content: `${this.vendor.company_description} | Factory Hunt` },
          { hid: 'twitter-image', property: 'twitter:image', content: 'https://s3-us-west-1.amazonaws.com/factoryhunt.com/logo2.png' },
          { hid: 'twitter-domain', property: 'twitter:domain', content: `https://www.factoryhunt.com/${this.vendor.domain}` }
        ],
        link: [
          { hid: 'canonical', rel: 'canonical', href: `https://www.factoryhunt.com/${this.vendor.domain}` }
        ]
      }
    },
    components: {
      Loader
    },
    async asyncData ({ params, query, error, redirect }) {
      try {
        let { data } = await axios.get(`/api/data/account/domain/${params.company}`)
        if (!data.account) {
          redirect('/404')
        }
        return {
          queryInput: query.input || '',
          vendor: data.account,
          products: data.products
        }
      } catch (err) {
        error({ statusCode: 404, message: 'Page not found' })
      }
    },
    data () {
      return {
        value: {
          company: this.$route.params.company,
          input: this.$route.query.q ? this.$route.query.q : '',
          email: '',
          inquiry: '',
          // for admin editing
          accountName: '',
          beforeCoverPhoto: '',
          currentCoverPhoto: '',
          currentCoverPhotoCount: 0,
          coverPhotoLength: 0
        },
        placeholder: {
          email: 'contact@email.com',
          textarea: 'Enter your _conversation_id'
        },
        msg: {
          quote: 'Request a quote to get pricing',
          kor: {
            edit: '수정하기'
          }
        },
        toggle: {
          coverPhotos: false,
          coverImageChanging: false,
          isCoverImageLoaded: false,
          brochure: false,
          isBrochureLoaded: false,
          isModalOn: false,
          isEmailSending: false
        }
      }
    },
    computed: {
      getLocation () {
        const city = this.vendor.mailing_city ? this.vendor.mailing_city + ', ' : ''
        const state = this.vendor.mailing_state ? this.vendor.mailing_state + ', ' : ''
        const country = this.vendor.mailing_country
        return city + state + country
      },
      getAddress () {
        const street = this.vendor.mailing_street_address ? this.vendor.mailing_street_address + ', ' : ''
        const street2 = this.vendor.mailing_street_address_2 ? this.vendor.mailing_street_address_2 + ', ' : ''
        const city = this.vendor.mailing_city ? this.vendor.mailing_city + ', ' : ''
        const state = this.vendor.mailing_state ? this.vendor.mailing_state + ', ' : ''
        const country = this.vendor.mailing_country
        return street + street2 + city + state + country
      },
      tradeCapacityExist () {
        if (this.vendor.total_annual_revenue) return true
        if (this.vendor.average_lead_time) return true
        if (this.vendor.accepted_delivery_terms) return true
        if (this.vendor.accepted_payment_currency) return true
        if (this.vendor.accepted_payment_type) return true
        if (this.vendor.language_spoken) return true
        return false
      },
      getVideoURL () {
        // API list: https://developers.google.com/youtube/player_parameters
        if (!this.vendor.account_video_url) return
        const videoUrl = this.vendor.account_video_url
        let videoId = ''
        let url = ''

        // Youtube
        if (videoUrl.indexOf('youtube.com/watch?v=') > -1) {
          videoId = this.vendor.account_video_url.split('v=')[1]
          const ampersandPosition = videoId.indexOf('&')

          // If video query exists
          if(ampersandPosition !== -1) videoId = videoId.substring(0, ampersandPosition)

          url = `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1&controls=2&showinfo=0&autohide=1&modestbranding=1`

          // Youtube
        } else if (videoUrl.indexOf('youtu.be/') > -1) {
          videoId = this.vendor.account_video_url.split('.be/')[1]
          url = `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1&controls=2&showinfo=0&autohide=1&modestbranding=1`

          // Vimeo
        } else if (videoUrl.indexOf('vimeo.com') > -1) {
          videoId = this.vendor.account_video_url.split('.com/')[1]
          url = `https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0`
        } else {
          url = ''
        }
        return url
      }
    },
    methods: {
      showModalBackground () {
        this.toggle.isModalOn = true
        $('.modal-background').show()
        $('html').css('overflow', 'hidden')
        $('body').css('overflow', 'hidden')
      },
      hideModalBackground () {
        this.toggle.isModalOn = false
        $('.modal-background').hide()
        $('html').css('overflow', 'inherit')
        $('body').css('overflow', 'inherit')
      },
      onEditPhotosButton () {
        this.onPDFCloseButton()
        location.href = "/dashboard/company/image"
      },
      onViewPhotosButton () {
        this.showModalBackground()
        this.value.currentCoverPhotoCount = 0
        this.value.coverPhotoLength = this.getCoverPhotoLength()
        this.toggle.coverPhotos = true
        this.toggle.isCoverImageLoaded = false
        this.renderCoverPhotoImage()
      },
      getCoverPhotoLength () {
        let length = 0
        const {
          cover_image_url_1,
          cover_image_url_2,
          cover_image_url_3,
          cover_image_url_4,
          cover_image_url_5,
          cover_image_url_6,
          cover_image_url_7,
          cover_image_url_8
        } = this.vendor
        if (cover_image_url_1) length++
        if (cover_image_url_2) length++
        if (cover_image_url_3) length++
        if (cover_image_url_4) length++
        if (cover_image_url_5) length++
        if (cover_image_url_6) length++
        if (cover_image_url_7) length++
        if (cover_image_url_8) length++
        return length
      },
      onPanelRightAngle () {
        if (this.value.currentCoverPhotoCount < this.value.coverPhotoLength - 1) {
          this.value.currentCoverPhotoCount = this.value.currentCoverPhotoCount + 1
        } else {
          this.value.currentCoverPhotoCount = 0
        }

        this.renderCoverPhotoImage('right')
      },
      onPanelLeftAngle () {
        if (this.value.currentCoverPhotoCount > 0) {
          this.value.currentCoverPhotoCount = this.value.currentCoverPhotoCount - 1
        } else {
          this.value.currentCoverPhotoCount = this.value.coverPhotoLength - 1
        }

        this.renderCoverPhotoImage('left')
      },
      renderCoverPhotoImage (direction) {
        // this.value.beforeCoverPhoto = this.value.currentCoverPhoto
        // this.toggle.coverImageChanging = true
        this.toggle.isCoverImageLoaded = false

        const vue = this
        const allCoverPhoto = $('.cover-photo')
        // const coverPhoto = $('#cover-photo')
        // const beforePhoto = $('#before-cover-photo')

        // switch (direction) {
        //   case 'right':
        //     coverPhoto.css({opacity: 0, right: '15px'})
        //     break
        //   case 'left':
        //     coverPhoto.css({opacity: 0, left: '15px'})
        //     break
        //   default:
        //     break
        // }
        // beforePhoto.css({opacity: 1, left: 0, right: 0})

        const url = `cover_image_url_${this.value.currentCoverPhotoCount + 1}`
        let image = new Image()

        image.src = this.vendor[url]
        image.onload = function() {
          if (this.width > this.height) {
            allCoverPhoto.css({
              width: '100%',
              height: 'unset'
            })
          } else if (this.width < this.height) {
            allCoverPhoto.css({
              width: 'unset',
              height: '100%'
            })
          } else {
            allCoverPhoto.css({
              width: 'unset',
              height: '100%'
            })
          }

          vue.value.currentCoverPhoto = vue.vendor[url]
          vue.toggle.isCoverImageLoaded = true
          // coverPhoto.animate({opacity: 1, left: 0, right: 0}, 350)
          // beforePhoto.animate({opacity: 0, left: -15, right: 0}, 350)
        }
      },
      renderPDF () {
        if ($('.brochure-container #catalog').length) return

        const url = this.vendor.account_pdf_url
        pdflib.getDocument(url).then((pdf) => {
          for (let i = 1; i <= pdf.numPages; i += 1) {
            const canvas = document.createElement('canvas')
            canvas.id = 'catalog'
            canvas.className = 'pdf-canvas'
            document.getElementById('brochure-container').appendChild(canvas)
            pdf.getPage(i).then((page) => {
              this.renderPage(page, canvas)
            })
          }
        })
      },
      renderPage (page, canvas) {
        const viewport = page.getViewport(1.5)
        const canvasContext = canvas.getContext('2d')
        const renderContext = {
          canvasContext,
          viewport
        }
        canvas.height = viewport.height
        canvas.width = viewport.width
        canvas.style.width = '100%'
        canvas.style.marginBottom = '-2px'
        page.render(renderContext)
        this.toggle.isBrochureLoaded = true
      },
      onCatalog () {
        this.showModalBackground()
        this.toggle.brochure = true
        this.renderPDF()
      },
      onPDFCloseButton () {
        this.hideModalBackground()
        this.toggle.coverPhotos = false
        this.toggle.brochure = false
      },
      escKeyEvent () {
        $(document).keyup((e) => {
          if (e.keyCode === 27) this.onPDFCloseButton()
        })
      },
      onTouchModal () {
        const vue = this
        document.getElementById('modal-background').onclick = function (event) {
          if (!$(event.target).hasClass('pdf-canvas')) {
            vue.onPDFCloseButton()
          }
        }
      },
      routeProductProfilePage (index) {
        const productDomain = this.products[index].product_domain
        if (this.queryInput) {
          location.href = `/${this.value.company}/${productDomain}?q=${this.queryInput}`
          // this.$router.push({
          //   path: `/${this.value.company}/${productDomain}`,
          //   query: {
          //     input: this.queryInput
          //   }
          // })
        } else {
          location.href = `/${this.value.company}/${productDomain}`
          // this.$router.push({
          //   path: `/${this.value.company}/${productDomain}`,
          // })
        }
      },
      async sendInquiry () {
        this.toggle.isEmailSending = true

        const data = {
          email: this.value.email,
          company: this.vendor.account_name,
          products: this.vendor.products,
          domain: this.vendor.domain,
          inquiry: this.value.inquiry,
          subject: 'Inquiry for verified supplier'
        }

        try {
          await sendEmail(data)
          this.toggle.isEmailSending = false
          alert(this.$t('alert.email.success'))
          location.reload()
        } catch (err) {
          this.toggle.isEmailSending = false
          alert(this.$t('alert.email.fail'))
          location.reload()
        }
      },
      getWebsiteURL (url) {
        return validateURL(url)
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
          this.mainImageResize()
          this.applyStickyCSS()
          this.applyCompanyFadeInOutInStickyNavigationBar()
          this.applySmoothScrolling()
          this.textareaResize()
          this.initMap()
          this.escKeyEvent()
        })
      },
      renderMainImage () {
        if (this.vendor.cover_image_url_1) {
          $('.main-image').css({
            'background-image': `url(${this.vendor.cover_image_url_1})`,
            'cursor': 'pointer'
          })
          this.value.currentCoverPhoto = this.vendor.cover_image_url_1
        }
      },
      mainImageResize () {
        const $image = $('.main-image')
        const $noMainImage = $('.no-main-image')
        const width = $(window).width()
        const height = (487 * width) / 1280
        $image.css('height', `${height}px`)
        $noMainImage.css('height', `${height}px`)
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
        const $description = $('.description-container textarea')
        const $history = $('.history-container textarea')
        const $descriptionHeight = $description[0].scrollHeight
        const $historyHeight = $history[0].scrollHeight
        const $descriptionButton = $('.description-container .view-details-button')
        const $historyButton = $('.history-container .view-details-button')
        if ($descriptionHeight >= 190) {
          $descriptionButton.show()
          $description.css('height', '190px')
        } else if ($descriptionHeight <= 50) {
//          $description.css('height', '40px') // because of css bug?
        } else {
          $description.css('height', `${$descriptionHeight}px`)
        }
        if ($historyHeight >= 189) {
          $historyButton.show()
          $history.css('height', '190px')
        } else {
          $history.css('height', `${$historyHeight}px`)
        }
      },
      descriptionExpand () {
        const $description = $('.description-container textarea')
        const $viewDetailsButton = $('.description-container .view-details-button')
        $viewDetailsButton.hide()
        $description.animate({
          'height': ($description[0].scrollHeight) + 'px'
        }, 200)
      },
      historyExpand () {
        const $history = $('.history-container textarea')
        const $viewDetailsButton = $('.history-container .view-details-button')
        $viewDetailsButton.hide()
        $history.animate({
          'height': ($history[0].scrollHeight) + 'px'
        }, 200)
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
        const street = this.vendor.mailing_street_address
        const city = this.vendor.mailing_city
        const state = this.vendor.mailing_state
        const country = this.vendor.mailing_country
        const address = state ? street + ', ' + city + ', ' + state + ', ' + country : street + ', ' + city + ', ' + country
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

  .modal-background {
    background-color: rgba(0,0,0,.85);

    .modal-table {
      display: table;
      table-layout: fixed;
      height: 100%;
      width: 100%;
    }
    .modal-cell {
      display: table-cell;
      height: 100%;
      width: 100%;
      vertical-align: middle;
      padding: 0;
    }

    #close-button {
      display: flex;
      align-items: center;
      justify-content: center;
      position: fixed;
      right: 27px;
      top: 17px;
      width: 50px;
      height: 50px;
      font-size: 38px;
      text-decoration: none;
      color: @color-white;
      background: rgba(0, 0, 0, .3);
      border-radius: 50%;
      font-weight: @font-weight-ultra-thin;
      z-index: 10;
    }
    .modal-contents {
      outline: none;
      position: relative;
      max-width: 100% !important;
      /*height: 100% !important;*/
      overflow: hidden;
      margin-left: auto;
      margin-right: auto;

      .modal {
        display: table !important;
        width: 100% !important;
        height: 100% !important;
      }

      .top-section, .bottom-section {
        display: table-row !important;
        & > div {
          padding: 2% 0;
        }
      }

      .cache-image-container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        .cache-image-wrapper {
          width: 100px;
          position: relative;
          list-style: none;

          li {
            width: 100px;
          }
          img {
            width: 100%;
            opacity: 0;
          }
        }
      }

      .center-section {
        display: table-row !important;
        height: 100%;

        .cover-photo-container {
          position: relative;
        }
        .cover-photo-wrapper {
          width: 100%;
          max-width: 105vh;
          margin: 0 auto;
        }
        .cover-photo-body-container {
          position: relative;
          width: 100%;
          padding-bottom: 67%;
          height: 0;
        }
        .cover-loader {
          padding: 0;
          position: absolute;
          top: 45%;
          left: 0;
          right: 0;
        }
        .cover-photo {
          background-color: @color-white;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          margin: auto;
        }

        .left-panel {
          background-image: url(~assets/icons/arrow-angle-left-white.png);
          background-repeat: no-repeat;
          background-size: contain;
          background-position-y: 50%;
          width: 75px;
          cursor: pointer !important;
          outline: none !important;
          position: absolute !important;
          top: 0 !important;
          height: 100% !important;
          z-index: 3 !important;
          left: 0 !important;
        }
        .right-panel {
          background-image: url(~assets/icons/arrow-angle-right-white.png);
          background-repeat: no-repeat;
          background-size: contain;
          background-position-y: 50%;
          width: 75px;
          cursor: pointer !important;
          outline: none !important;
          position: absolute !important;
          top: 0 !important;
          height: 100% !important;
          z-index: 3 !important;
          right: 0 !important;
        }

      }

      .body-container {
      }
    }

    .body-container {
      position: relative;
      height: 100%;
      max-width: none;
      margin-top: 80px;
      padding: 0;
      outline: 0;
      overflow-y: auto !important;

      #brochure-container {
        margin: 0;

        img {
          width: 100%;
        }
      }
    }

  }

  .document-item {
    display: inline-block;
    min-width: 111px;
    border: 1px solid @color-light-gray;
    border-radius: @border-radius;
    padding: 17px;
    cursor: pointer;
    margin-bottom: 10px;
    margin-right: 8px;

    &:hover {
      border: 1px solid @color-font-gray;
      text-decoration: none;
    }

    .title {
      text-align: center;
      margin-top: 34px !important;
      font-size: 14px;
    }
    #pdf-icon {
      font-size: 26px;
    }
  }

  #container {

    .each-container {
      border-bottom: @border-light-grey;
      padding-bottom: 30px;
    }

    .section-title {
      margin-top: 30px;
      font-size: @font-size-large;
    }

    .main-image-container {
      .no-main-image {
        background-image: url(~assets/img/cover_image_english.png);
        background-repeat: no-repeat !important;
        background-size: cover !important;
        background-position: 50% 50% !important;
      }
      .main-image {
        position: relative;
        background-image: url(~assets/img/product_loading_image_text.png);
        background-repeat: no-repeat !important;
        background-size: cover !important;
        background-position: 50% 50% !important;

        .edit-photos-button {
          opacity: 1;
          background-color: @color-white;
          box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.14);
          transition: opacity 150ms ease-in-out;
          border-radius: @border-radius;
          position: absolute;
          font-size: @font-size-extra-small;
          right: 110px;
          bottom: 14px;
          padding: 6px 14px;
          cursor: pointer;
        }

        .view-photos-button {
          opacity: 1;
          background-color: @color-white;
          box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.14);
          transition: opacity 150ms ease-in-out;
          border-radius: @border-radius;
          position: absolute;
          font-size: @font-size-extra-small;
          right: 14px;
          bottom: 14px;
          padding: 6px 14px;
          cursor: pointer;
        }
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
        // end of shared

        .sticky-outer-container {
          display: none;
        }

        .header-container {
          padding-top: 18px;

          .logo {
            float: right;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: 2px solid @color-light-grey;
          }
          .address {
            font-size: @font-size-small;
            margin-top: 0;
            margin-bottom: 5px;
            color: @color-font-gray;
            font-weight: @font-weight-bold;
          }
          .company-name {
            margin: 0;
            line-height: 0.95;
            font-weight: 500;
            padding-right: 55px;
          }
          .short-description-container {
            margin-top: 30px;
            .short-description {
            }
          }

          .video-container {
            margin-top: 20px;
            position:relative;
            padding-bottom:56.25%;
            height:0;
            overflow:hidden;

            #intro-video {
              position:absolute;
              top:0;
              left:0;
              width:100%;
              height:100%;
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

        .list-container {
          position: relative;
          line-height:1.25;
          padding-bottom: 28px;

          &:last-child {
            padding-bottom: 0;
          }

          .left-contents {
            position: relative;
            font-size: @font-size-small;
            font-weight: @font-weight-bold;
          }
          .right-contents {
            font-weight: @font-weight-thin;
            padding-left: 0;
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
        padding-bottom: 30px;

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

        .section-title {
          padding-left: 20px;
          padding-right: 20px;
        }
        .product-wrapper {

          .product-container {
            vertical-align: top;
            margin-bottom: 2rem;
            padding-left: 20px;
            padding-right: 20px;
            cursor: pointer;

            .image-container {
              position: relative;
              box-shadow: @box-shadow;

              &::after {
                content: "";
                display: block;
                padding-bottom: 100%;
                position: relative;
              }
              .image-wrapper {
                position: absolute;
                display: flex;
                width: 100%;
                height: 100%;
              }
              img {
                width: auto !important;
                height: auto !important;
                max-width: 100% !important;
                max-height: 100% !important;
                margin: auto !important;
               }
            }
            .content-container {

              .primary-category {
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                margin: 8px 0 0 0;
                font-size: @font-size-extra-small;
                font-weight: @font-weight-bold;
                color: @color-font-gray;
              }
              .product-name {
                margin: 0;
                font-size: @font-size-medium;
                font-weight: @font-weight-medium;
              }
              .star-container {
                i {
                  font-size: @font-size-small;
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
        .no-main-image {

        }
        .main-image {

          &:hover {
            .edit-photos-button,
            .view-photos-button {
              opacity: 1;
            }
          }
          .edit-photos-button {
            opacity: 0;
            background-color: @color-white;
            box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.14);
            transition: opacity 150ms ease-in-out;
            border-radius: @border-radius;
            position: absolute;
            font-size: @font-size-small;
            right: 150px;
            bottom: 30px;
            padding: 12px 20px;
            cursor: pointer;
          }
          .view-photos-button {
            opacity: 0;
            background-color: @color-white;
            box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.14);
            transition: opacity 150ms ease-in-out;
            border-radius: @border-radius;
            position: absolute;
            font-size: @font-size-small;
            right: 30px;
            bottom: 30px;
            padding: 12px 20px;
          }
        }
      }

      .body-container {

        .left-container {

          .header-container {
            padding-top: 24px;
          }

          .list-container {
            display: table;
            width: 100%;
            position: relative;
            padding-bottom: 12px;

            .left-contents {
              width: 160px;
              font-size: @font-size-medium;
              font-weight: @font-weight-medium;
            }
            .right-contents {
              display: table-cell;
              width: 100%;
              text-align: left;
              vertical-align: top;
              padding-left: 4px;
              font-size: @font-size-medium;
              font-weight: @font-weight-thin;
            }
          }

          .trade-capacity-container {
            .left-contents {
              width: 250px;
            }
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

          .section-title {
            padding-left: 6px;
            padding-right: 6px;
          }
          .product-wrapper {

            .product-container {
              display: inline-block;
              width: 50%;
              padding-left: 6px;
              padding-right: 6px;

              .image-container {
                img {
                }
              }
              .content-container {
                .primary-category {
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
  @media ( min-width: 1128px ) {
    #container {
      .modal-background {

        #close-button {
          background: none;
        }

        .cover-photo-wrapper {
          width: 100%;
          max-width: 69vw;
          margin: 0 auto;
        }

        .body-container {
          max-width: 1040px;
          margin: 0 auto;
        }
        #brochure-container {
          margin: 30px 0;
        }
      }

      .main-image-container {
        .main-image {
        }
      }

      .body-container {

        .left-container {
          padding-right: 410px;
          min-height: 540px;

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
            padding-top: 77px;

          }

          .description-container {
          }
        }

        .right-container {
          padding-top: 77px;
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
          .section-title {
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
