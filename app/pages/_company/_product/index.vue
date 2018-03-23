<template>
  <div id="container" v-show="toggle.isLoaded">
    <div class="body-container">

      <!-- Body Contents -->
      <div class="left-container">

        <!-- Header -->
        <div class="header-container each-container">

          <!-- Category -->
          <div class="category-container" v-show="product.primary_product_category">
            <span>{{product.primary_product_category}}</span>
            <i id="angle" class="fa fa-angle-right"></i>
            <span>{{product.secondary_product_category}}</span>
          </div>

          <!-- Vendor Logo -->
          <div class="vendor-logo-container">
            <a @click="routeAccountProfilePage">
              <img v-if="vendor.logo_url" class="vendor-logo-image" :src="vendor.logo_url"/>
              <img v-else class="vendor-logo-image" src="../../../assets/img/temp-logo-image_english_512.png"/>
            </a>
          </div>

          <!-- Title -->
          <h1 class="title">{{product.product_name}}</h1>

          <!-- Vendor -->
          <h4 id="vendor-name">by <a @click="routeAccountProfilePage">{{ vendor.account_name }}</a></h4>
          <!--<div class="detail-container">-->
            <!--<span class="origin" v-show="product.product_origin">{{product.product_origin}}</span>-->
            <!--<span class="star"> • <i id="star" class="fa fa-star-o" aria-hidden="true" v-for="index in 5" :key="index"></i></span>-->
            <!--<span class="review" v-html="$t('product.header.reviews', { count: 0})"></span>-->
          <!--</div>-->
        </div>

        <!-- Product Image -->
        <div class="product-container">
          <div class="product-image-container">
            <div class="item">
              <img class="image" :src="product.product_image_url_1">
            </div>
            <div :class="product.product_image_url_2 ? 'item' : 'disable' " v-if="product.product_image_url_2">
              <img :src="product.product_image_url_2" alt="...">
            </div>
            <div :class="product.product_image_url_3 ? 'item' : 'disable' " v-if="product.product_image_url_3">
              <img :src="product.product_image_url_3" alt="...">
            </div>
            <div :class="product.product_image_url_4 ? 'item' : 'disable' " v-if="product.product_image_url_4">
              <img :src="product.product_image_url_4" alt="...">
            </div>
            <div :class="product.product_image_url_5 ? 'item' : 'disable' " v-if="product.product_image_url_5">
              <img :src="product.product_image_url_5" alt="...">
            </div>
            <div :class="product.product_image_url_6 ? 'item' : 'disable' " v-if="product.product_image_url_6">
              <img :src="product.product_image_url_6" alt="...">
            </div>
          </div>
          <p class="quote">{{ $t('product.image.quote') }}</p>
          <button @click="onSendInquiry" class="button-orange">{{ $t('product.image.button') }}</button>
        </div>

        <!-- Profile & Information -->
        <div class="information-container each-container" v-show="productDetailExists">

          <!-- Product Details -->
          <h2 class="section-title">{{ $t('product.details.title') }}</h2>
          <div class="detail-container">
            <div class="list-container" v-show="product.product_origin">
              <div class="left-contents">{{ $t('product.details.origin') }}</div>
              <div class="right-contents">{{product.product_origin}}</div>
            </div>
            <div class="list-container" v-show="product.minimum_order_quantity">
              <div class="left-contents">{{ $t('product.details.moq') }}</div>
              <div class="right-contents">{{getMOQ}}</div>
            </div>
            <div class="list-container" v-show="product.price">
              <div class="left-contents">{{ $t('product.details.price') }}</div>
              <div class="right-contents">{{product.price}}</div>
            </div>
            <div class="list-container" v-show="product.material_type">
              <div class="left-contents">{{ $t('product.details.material') }}</div>
              <div class="right-contents">{{product.material_type}}</div>
            </div>
            <div class="list-container" v-show="product.item_dimensions">
              <div class="left-contents">{{ $t('product.details.dimension') }}</div>
              <div class="right-contents">{{product.item_dimensions}}</div>
            </div>
          </div>
        </div>

        <!-- Reviews -->
        <div class="review-container each-container">
          <h2 class="section-title" v-html="$t('product.reviews.title', { count: 0})"></h2>
          No review
        </div>

      </div>
    </div>

    <div class="body-container">
      <!-- Introduction -->
      <div class="introduction-container each-container" v-show="product.product_description">
        <h2 class="section-title">{{ $t('product.intro.title') }}</h2>
        <div class="introduction" v-html="product.product_description">
        </div>
      </div>

      <!-- Catalog -->
      <div class="catalog-container each-container" id="catalog-container" v-show="product.product_pdf_url">
        <h2>{{ $t('product.catalog.title') }}</h2>
        <img v-show="!toggle.isCatalogLoaded" src="~assets/img/product_loading_image_text.png">
        <!--<h3><a href="/static/web/viewer.html?file=http://localhost:8080/static/test.pdf" target="_blank">Catalog</a></h3>-->
        <!--<iframe id="catalog" src="/static/web/viewer.html?file=/static/test.pdf" allowfullscreen webkitallowfullscreen scrolling="no"  name="pdf" width="724" height="300" style="border: none;">-->
        <!--This browser does not support PDFs. Please download the PDF to view it: <a target="pdf" :href="product.product_image_url_2">Download PDF</a>-->
        <!--</iframe>-->
      </div>
    </div>

    <!-- Related products -->
    <div class="product-body-container">
      <!-- Company Products -->
      <div class="products-container">
        <!-- Title -->
        <h2 class="title" v-html="$t('product.related.title', { count: getRelatedProductCount})"></h2>
        <!-- Wrapper -->
        <div class="product-wrapper">
          <!-- Product -->
          <div class="product-container" v-for="(relatedProduct, index) in this.products" :key="index" v-if="relatedProduct.product_id !== product.product_id" @click="routeProductProfilePage(index)">
            <!-- Image -->
            <div class="image-container">
              <img class="product-image" :src="relatedProduct.product_image_url_1">
            </div>
            <!-- Content -->
            <div class="content-container">
              <h2 class="primary-category">{{relatedProduct.primary_product_category}}</h2>
              <h1 class="product-name">{{relatedProduct.product_name}}</h1>
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
  import '~/plugins/slick'
  const { addComma } = require('~/utils/text')
  export default {
    scrollToTop: true,
    layout: 'minify',
    head () {
      return {
        title: `${this.product.product_name} - ${this.vendor.account_name}`,
        meta: [
          { hid: 'keywords', name: 'keywords', content: `${this.product.product_name}, ${this.vendor.account_name}, ${this.vendor.products}, factoryhunt, factory, hunt, factory hunt, quote, bulk, wholesale, supplier, factory hunt, online catalog, supplier directory, free website, international trade` },
          { hid: 'description', name: 'description', content: `${this.product.product_description} | Factory Hunt` },
          { hid: 'og-type', property: 'og:type', content: 'website' },
          { hid: 'og-title', property: 'og:title', content: this.product.product_name },
          { hid: 'og-description', property: 'og:description', content: `By ${this.vendor.account_name}` },
          { hid: 'og-image', property: 'og:image', content: this.product.product_image_url_1 },
          { hid: 'og-url', property: 'og:url', content: `factoryhunt.com/${this.domain}/${this.product.product_domain}` },
          { hid: 'twitter-card', property: 'twitter:card', content: 'summary' },
          { hid: 'twitter-title', property: 'twitter:title', content: `${this.product.product_name} - ${this.vendor.account_name} | Factory Hunt` },
          { hid: 'twitter-description', property: 'twitter:description', content: `${this.product.product_description} | Factory Hunt` },
          { hid: 'twitter-image', property: 'twitter:image', content: 'https://s3-us-west-1.amazonaws.com/factoryhunt.com/logo2.png' },
          { hid: 'twitter-domain', property: 'twitter:domain', content: `https://www.factoryhunt.com/${this.product.product_domain}/${this.vendor.domain}` }
        ],
        link: [
          { hid: 'canonical', rel: 'canonical', href: `https://www.factoryhunt.com/${this.vendor.domain}/${this.product.product_domain}` }
        ]
      }
    },
    async asyncData ({ query, params, error }) {
      try {
        const { data } = await axios.get(`/api/data/product/domain/${params.company}/${params.product}`)
        const { data:products } = await axios.get(`/api/data/product/account_id/${data.account.account_id}/approved`)
        return {
          queryInput: query.input || '',
          vendor: data.account,
          product: data.product,
          products: products
        }
      } catch (err) {
        error({ statusCode: 404, message: 'Sorry, page not existed.' })
      }
    },
    data () {
      return {
        options: {} || { scale: 1 },
        toggle: {
          isLoaded: false,
          isAuthLoaded: false,
          isCatalogLoaded: false
        }
      }
    },
    computed: {
      getRelatedProductCount () {
        let count = this.products.length - 1
        return count > 0 ? count : 0
      },
      productDetailExists () {
        if (this.product.product_origin) return true
        if (this.product.minimum_order_quantity) return true
        if (this.product.price) return true
        if (this.product.material_type) return true
        if (this.product.item_dimensions) return true
        return false
      },
      getMOQ () {
        return addComma(this.product.minimum_order_quantity)
      }
    },
    methods: {
      onSendInquiry () {
        const pid = this.product.product_id
        const aid = this.vendor.account_id
        this.$router.push({
          path: '/inquiry',
          query: {
            input: this.queryInput,
            pid: pid,
            aid: aid
          }
        })
      },
      activateJquery () {
        $(document).ready(() => {
          this.relatedProductImageResize()
          this.activateSlick()
          this.imageResize()
          this.renderPDF()
          $(window).resize(() => {
            this.imageResize()
          })
          this.toggle.isLoaded = true
        })
      },
      renderPDF () {
        if (!this.product.product_pdf_url) return
        const url = this.product.product_pdf_url
        pdflib.getDocument(url).then((pdf) => {
          for (let i = 1; i <= pdf.numPages; i += 1) {
            const canvas = document.createElement('canvas')
            canvas.id = 'catalog'
            document.getElementById('catalog-container').appendChild(canvas)
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
        this.toggle.isCatalogLoaded = true
      },
      routeAccountProfilePage () {
        const input = this.$route.query.input
        const vendor = this.$route.params.company
        if (input) {
          location.href = `/${vendor}/?input=${input}`
        } else {
          location.href = `/${vendor}/`
        }
      },
      routeProductProfilePage (index) {
        const input = this.$route.query.input
        const vendor = this.$route.params.company
        const productDomain = this.products[index].product_domain
        if (input) {
          location.href = `/${vendor}/${productDomain}?input=${input}`
        } else {
          location.href = `/${vendor}/${productDomain}`
        }
      },
      activateSlick () {
        $(document).ready(() => {
          $('.product-image-container').slick({
            infinite: true,
            arrows: true,
            dots: true,
            draggable: true,
            nextArrow: '<div id="right-arrow-container"><i id="right-arrow" class="fa fa-angle-right"></i></div>',
            prevArrow: '<div id="left-arrow-container"><i id="left-arrow" class="fa fa-angle-left"></i></div>'
          })
          $('.item').css('outline', 'none')
          $('.slick-dots').css('bottom', '4px')
          $('.slick-dots li').css('margin', '0')
          if (!this.product.product_image_url_2) {
            $('.slick-dots li').css('display', 'none')
          }

          $('#right-arrow-container').css({
            'font-size': '2rem',
            'position': 'absolute',
            'right': '0',
            'top': '0',
            'opacity': '0',
            'width': '15%',
            'height': '100%',
            'z-index': '1',
            'background': 'linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.2))',
            'cursor': 'pointer'
          })
          $('#right-arrow').css({
            'position': 'absolute',
            'right': '30%',
            'top': '50%'
          })
          $('#left-arrow-container').css({
            'font-size': '2rem',
            'position': 'absolute',
            'left': '0',
            'top': '0',
            'opacity': '0',
            'width': '15%',
            'height': '100%',
            'z-index': '1',
            'background': 'linear-gradient(to left, rgba(0,0,0,0), rgba(0,0,0,0.2))',
            'cursor': 'pointer'
          })
          $('#left-arrow').css({
            'position': 'absolute',
            'left': '30%',
            'top': '50%'
          })

          $('.product-image-container').hover(function () {
            $('#right-arrow-container, #left-arrow-container').css({
              'opacity': '0.7'
            })
          }, function () {
            $('#right-arrow-container, #left-arrow-container').css('opacity', '0')
          })
        })
      },
      imageResize () {
        $(document).ready(() => {
          const $item = $('.product-image-container .item')
          $item.css({
            height: `${$item.width()}px`
          })
        })
      },
      relatedProductImageResize () {
        $(document).ready(() => {
          const $image = $('.product-image')
          const $imageContainer = $('.image-container')
          const width = `${$image.width()}px`
          $imageContainer.css({
            width: width,
            height: width
          })
        })
      }
    },
    mounted () {
      this.activateJquery()
    }
  }
</script>

<style lang="less" scoped>
  @import '~assets/css/index';

  .section-title {
    font-size: @font-size-large;
  }

  .category-container {
    margin-bottom: 20px;
    color: @color-font-gray;
    span {
      font-weight: 400;
    }
    #angle {
      padding: 0 7px;
    }
  }

  #vendor-name {
    font-weight: 400;
    padding-right: 70px;
    margin: 0;
  }

  .vendor-logo-container {
    float: right;
    font-weight: @font-weight-thin;

    img {
      border: 2px solid @color-light-gray;
      border-radius: 50%;
      width: 56px;
      height: 56px;
    }
  }

  #container {
    position: relative;
    padding-top: 20px;

    // Global
    a {
      cursor: pointer;
    }
    .each-container {
      border-bottom: @border-light-grey;
      padding-bottom: 1.6rem;
    }
    // End of Global


    .left-container {
      position: relative;

      // Header
      .header-container {

        .title {
          margin-top: 0;
          margin-bottom: 5px;
          font-weight: 500;
          line-height: 1.2;
          font-size: 27px;
          padding-right: 70px;
        }
      }

      // Product Image
      .product-container {
        position: relative;
        margin-top: 21px;

        .product-image-container {
          box-shadow: @box-shadow;

          .item {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            img {
              width: auto !important;
              height: auto !important;
              margin: auto !important;
              max-height: 100% !important;
              max-width: 100% !important;
            }
          }
        }

        .quote {
          font-size: 14px;
          text-align: center;
          margin: 16px 0;
          color: @color-font-gray;
        }
        button {
          width: 100%;
          font-weight:700;
          font-size: 16px;
        }
      }

      // Profile & Information
      .information-container {
        font-size: @font-size-medium;

        .list-container {
          position: relative;
          font-size:@font-size-medium;
          line-height:1.25;
          padding-bottom: 16px;

          &:last-child {
            padding-bottom: 0;
          }

          .left-contents {
            position: relative;
            font-weight: @font-weight-medium;
          }
          .right-contents {
            font-weight: @font-weight-thin;
            padding-left: 0;
          }
        }
      }
    }

    // Intro
    .introduction-container {

      .introduction {
        font-size: @font-size-medium;
        font-weight: @font-weight-thin;
      }
    }

    .catalog-container {
      img {
        width: 100%;
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
          padding-left: 20px;
          padding-right: 20px;
        }
        .product-wrapper {

          .product-container {
            cursor: pointer;
            padding-bottom: 2rem;
            padding-left: 20px;
            padding-right: 20px;

            .image-container {
              box-shadow: 1px 1px 10px 1px #e4e4e4;
              display: flex;
              justify-content: center;
              align-items: center;

              img {
                max-width: 100%;
                max-height: 100%;
              }
            }
            .content-container {

              .primary-category {
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                margin: 4px 0 0 0;
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

    .vendor-logo-container {

      #vendor-logo {
        width: 64px;
        height: 64px;
      }
    }

    #container {

      .left-container {

        .header-container {
          .title {
          }
        }

        .product-container {
          .item {
            width: 340px;
            height: 340px;
            display: flex;
            justify-content: center;
            align-items: center;

            img {
              max-height: 340px;
              max-width: 340px;
            }
          }
        }

        .information-container {

          .list-container {
            position: relative;
            font-size:@font-size-medium;
            line-height: 1.9em;
            padding-bottom: 0;

            .left-contents {
              position: absolute;
              max-width: 140px;
              font-weight: @font-weight-medium;
            }
            .right-contents {
              text-align: left;
              padding-left: 150px;
              font-weight: @font-weight-thin;
            }
          }
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
                }
                .product-name {
                  margin: 0;
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

      .left-container {
        padding-right: 410px;
        min-height: 440px;

        .product-container {
          position: absolute;
          margin-top: 0;
          width: 340px;
          top: 0;
          right: 0;
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
