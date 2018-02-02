<template>
  <div id="container">
    <div class="body-container">

      <!-- Body Contents -->
      <div class="left-container">

        <!-- Header -->
        <div class="header-container each-container">
          <h1 class="title">{{product.product_name}}</h1>
          <div class="detail-container">
            <span class="origin" v-show="product.product_origin">{{product.product_origin}}</span>
            <span class="star"> • <i id="star" class="fa fa-star-o" aria-hidden="true" v-for="index in 5" :key="index"></i></span>
            <span class="review" v-html="$t('product.header.reviews', { count: 0})"></span>
          </div>
        </div>

        <!-- Product Image -->
        <div class="product-image-container">
          <img class="image" :src="product.product_image_url_1">
          <p class="quote">{{ $t('product.image.quote') }}</p>
          <button class="button-orange">{{ $t('product.image.button') }}</button>
        </div>

        <!-- Profile & Information -->
        <div class="information-container each-container">

          <!-- Vendor Logo -->
          <div class="vendor-logo-container">
            <a @click="routeAccountProfilePage">
              <img v-if="vendor.thumbnail_url" class="vendor-logo-image" :src="vendor.thumbnail_url"/>
              <img v-else class="vendor-logo-image" src="../../../assets/img/temp-logo-image_english_512.png"/>
            </a>
          </div>

          <!-- Category -->
          <div class="category-container" v-show="product.primary_product_category">
            <span>{{product.primary_product_category}}</span>
            <i id="angle" class="fa fa-angle-right"></i>
            <span>{{product.secondary_product_category}}</span>
          </div>

          <!-- Vendor -->
          <h4 id="vendor-name">by <a @click="routeAccountProfilePage">{{ vendor.account_name_english }}</a></h4>

          <!-- Product Details -->
          <div class="detail-container">
            <div class="list-container" v-show="product.minimum_order_quantity">
              <div class="left-contents">{{ $t('product.information.moq') }}</div>
              <div class="right-contents">{{addComma(product.minimum_order_quantity)}}</div>
            </div>
            <div class="list-container" v-show="product.price">
              <div class="left-contents">{{ $t('product.information.price') }}</div>
              <div class="right-contents">{{product.price}}</div>
            </div>
            <div class="list-container" v-show="product.material_type">
              <div class="left-contents">{{ $t('product.information.material') }}</div>
              <div class="right-contents">{{product.material_type}}</div>
            </div>
            <div class="list-container" v-show="product.item_dimensions">
              <div class="left-contents">{{ $t('product.information.dimension') }}</div>
              <div class="right-contents">{{product.item_dimensions}}</div>
            </div>
          </div>
        </div>

        <!-- Reviews -->
        <div class="review-container each-container">
          <h2  v-html="$t('product.reviews.title', { count: 0})"></h2>
          No review
        </div>

      </div>
    </div>

    <div class="body-container">
      <!-- Introduction -->
      <div class="introduction-container each-container">
        <h2>{{ $t('product.intro.title') }}</h2>
        <div class="introduction" v-html="product.product_description">
        </div>
      </div>

      <!-- Catalog -->
      <div v-show="product.product_pdf_url" class="catalog-container each-container" id="catalog-container">
        <h2>{{ $t('product.catalog.title') }}</h2>
        <img v-show="!toggle.isCatalogLoaded" src="../../../assets/img/product_loading_image_text.png">
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
        <h2 class="title" v-html="$t('product.related.title', { count: products.length})"></h2>
        <!-- Wrapper -->
        <div class="product-wrapper">
          <!-- Product -->
          <div class="product-container" v-for="(product, index) in this.products" :key="index">
            <!-- Image -->
            <div class="image-container">
              <img class="product-image" :src="product.product_image_url_1">
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
  import $ from 'jquery'
  import axios from '~/plugins/axios'
  import pdflib from 'pdfjs-dist'
  if (typeof window !== 'undefined') {
    const slick = require('slick-carousel')
  }
  export default {
    layout: 'minify',
    head () {
      return {
        title: `${this.product.product_name} - ${this.vendor.account_name_english} | Factory Hunt`,
        meta: [
          { hid: 'keywords', name: 'keywords', content: `${this.product.product_name}, ${this.vendor.account_name_english}, ${this.vendor.products_english}, factoryhunt, factory, hunt, factory hunt, quote, bulk, wholesale, supplier, factory hunt, online catalog, supplier directory, free website, international trade` },
          { hid: 'description', name: 'description', content: `${this.product.product_description} | Factory Hunt` },
          { hid: 'og-type', property: 'og:type', content: 'website' },
          { hid: 'og-title', property: 'og:title', content: this.product.product_name },
          { hid: 'og-description', property: 'og:description', content: `By ${this.vendor.account_name_english}` },
          { hid: 'og-image', property: 'og:image', content: this.product.product_image_url_1 },
          { hid: 'og-url', property: 'og:url', content: `factoryhunt.com/${this.domain}/${this.productDomain}` }
        ]
      }
    },
    async asyncData ({ params, error }) {
      try {
        const { data } = await axios.get(`/api/data/product/domain/${params.company}/${params.product}`)
        const { data:products } = await axios.get(`/api/data/product/account_id/${data.account.account_id}/approved`)
        return {
          vendor: data.account,
          product: data.product,
          products: products
        }
      } catch (err) {
        error({ statusCode: 404, message: 'Page not found' })
      }
    },
    data () {
      return {
        options: {} || { scale: 1 },
        toggle: {
          isAuthLoaded: false,
          isCatalogLoaded: false
        }
      }
    },
    methods: {
      onSendInquiry () {
        const pid = this.product.product_id
        const aid = this.vendor.account_id
        this.$router.push({
          path: '/contact/premium',
          query: {
            input: this.input,
            pid: pid,
            aid: aid
          }
        })
      },
      addComma (str) {
        str = String(str)
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
      },
      activateJquery () {
        $(document).ready(() => {
          this.imageResize()
          this.relatedProductImageResize()
          this.renderPDF()
          $(window).resize(() => {
            this.imageResize()
          })
        })
      },
      renderPDF () {
        const url = this.product.product_pdf_url
        pdflib.PDFJS.getDocument(url).then((pdf) => {
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
        location.href = `/${this.domain}`
      },
      routeProductProfilePage (index) {
        const productDomain = this.products[index].product_domain
        if (this.input) {
          location.href = `/${this.domain}/${productDomain}?input=${this.input}`
        } else {
          location.href = `/${this.domain}/${productDomain}`
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

          $('#right-arrow-container').css({
            'font-size': '3rem',
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
            'font-size': '3rem',
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
          const $image = $('.product-image-container img')
          $image.css('height', $image.width() + 'px')
        })
      },
      relatedProductImageResize () {
        $(document).ready(() => {
          const $image = $('.product-image')
          $image.css('height', $image.width() + 'px')
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

  @font-size: 18px;
  @font-weight: 300;

  #container {
    position: relative;

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
          margin-bottom: 0;
        }
        .detail-container {
          margin: 0;
          #star {
            color: @color-link;
          }
        }
      }

      // Product Image
      .product-image-container {
        text-align: center;
        margin-top: 21px;

        .image {
          width: 100%;
          box-shadow: @box-shadow;
        }
        .quote {
          margin: 12px 0;
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
        font-size: @font-size;

        .vendor-logo-container {
          float: right;
          font-weight: @font-weight;

          img {
            border-radius: 50%;
            width: 56px;
            height: 56px;
          }
        }

        .category-container {
          padding-right: 70px;
          margin-top: 20px;
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
          margin-top: 5px;
        }

        .detail-container {
          padding-top: 10px;
          .list-container {
            padding: 8px 0;
            .left-contents {
              font-size: 17px;
              font-weight: 500;
            }
            .right-contents {
              font-size: 18px;
              font-weight: 300;
            }
          }
        }
      }
    }

    // Intro
    .introduction-container {

      .introduction {
        font-size: @font-size;
        font-weight: @font-weight;
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

      .left-container {
        .information-container {
          .vendor-logo-container {

            #vendor-logo {
              width: 64px;
              height: 64px;
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

      .left-container {
        padding-right: 410px;
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
