<template>
  <div id="container">
    <!-- Left side -->
    <div class="left-container">

      <!-- Header -->
      <div class="header-container">
        <h1 class="title">{{ product.product_name }}</h1>
        <div class="sub-title-container">
          <h4 class="sub-title" v-show="product.product_origin">{{ product.product_origin }} •</h4>
          <h4 class="sub-title"><i class="fa fa-star-o" aria-hidden="true" v-for="index in 5" :key="index"></i> •</h4>
          <h4 class="review-title">Reviews(0)</h4>
        </div>
      </div>
      <div class="divider"></div>

      <!-- Product Images -->
      <div class="right-container">

        <div class="product-image-container">
          <div class="item">
            <img :src="product.product_image_url_1">
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

        <h4 class="quote-text">Send inquiry to get pricing.
        </h4>
        <button @click="onSendInquiry" class="button-orange inquiry-button">Send Inquiry</button>

        <!--<div class="product-image-containers">-->

        <!--<div id="product-carousel" class="carousel slide" data-ride="carousel">-->
        <!--&lt;!&ndash; Indicators &ndash;&gt;-->
        <!--<ol class="carousel-indicators">-->
        <!--<li id="1st" data-target="#product-carousel" data-slide-to="0" class="active">-->

        <!--</li>-->
        <!--<li id="2nd" v-show="product.product_image_url_2" data-target="#product-carousel" data-slide-to="1">-->

        <!--</li>-->
        <!--<li id="3rd" v-show="product.product_image_url_3" data-target="#product-carousel" data-slide-to="2">-->

        <!--</li>-->
        <!--<li id="4th" v-show="product.product_image_url_4" data-slide-to="3">-->
        <!--</li>-->
        <!--<li id="5th" v-show="product.product_image_url_5" data-slide-to="4">-->
        <!--</li>-->
        <!--<li id="6th" v-show="product.product_image_url_6" data-slide-to="5">-->
        <!--</li>-->
        <!--</ol>-->

        <!--&lt;!&ndash; Wrapper for slides &ndash;&gt;-->
        <!--<div class="carousel-inner" role="listbox">-->
        <!--<div class="item active">-->
        <!--<img :src="product.product_image_url_1">-->
        <!--</div>-->
        <!--<div :class="product.product_image_url_2 ? 'item' : 'disable' " v-if="product.product_image_url_2">-->
        <!--<img :src="product.product_image_url_2" alt="...">-->
        <!--</div>-->
        <!--<div :class="product.product_image_url_3 ? 'item' : 'disable' " v-if="product.product_image_url_3">-->
        <!--<img :src="product.product_image_url_3" alt="...">-->
        <!--</div>-->
        <!--<div :class="product.product_image_url_4 ? 'item' : 'disable' " v-if="product.product_image_url_4">-->
        <!--<img :src="product.product_image_url_4" alt="...">-->
        <!--</div>-->
        <!--<div :class="product.product_image_url_5 ? 'item' : 'disable' " v-if="product.product_image_url_5">-->
        <!--<img :src="product.product_image_url_5" alt="...">-->
        <!--</div>-->
        <!--<div :class="product.product_image_url_6 ? 'item' : 'disable' " v-if="product.product_image_url_6">-->
        <!--<img :src="product.product_image_url_6" alt="...">-->
        <!--</div>-->
        <!--</div>-->

        <!--&lt;!&ndash; Controls &ndash;&gt;-->
        <!--<a class="left carousel-control" href="#product-carousel" role="button" data-slide="prev">-->
        <!--<icon class="arrow-image" name="arrow-left"></icon>-->
        <!--<span class="sr-only">Previous</span>-->
        <!--</a>-->
        <!--<a class="right carousel-control" href="#product-carousel" role="button" data-slide="next">-->
        <!--<icon class="arrow-image" name="arrow-right"></icon>-->
        <!--<span class="sr-only">Next</span>-->
        <!--</a>-->
        <!--</div>-->
        <!--</div>-->

        <div class="divider"></div>
      </div>

      <!-- Information -->
      <div class="information-container">
        <a @click="routeAccountProfilePage">
          <img v-if="vendor.thumbnail_url" class="vendor-logo-image" :src="vendor.thumbnail_url"/>
          <img v-else class="vendor-logo-image" src="../../../assets/img/temp-logo-image_english_512.png"/>
        </a>
        <div class="category-contents" v-show="product.primary_product_category">
          <span>{{product.primary_product_category}}</span>
          <span> > </span>
          <span>{{product.secondary_product_category}}</span>
        </div>
        <p id="vendor-text">by <a @click="routeAccountProfilePage">{{vendor.account_name_english}}</a></p>
        <!--<div class="list-container">-->
        <!--<div class="left-contents">최소 주문량: {{product.minimum_order_quantity}}</div>-->
        <!--<div class="right-contents">제품 가격: 미정</div>-->
        <!--</div>-->
        <!--<div class="list-container">-->
        <!--<div class="left-contents">소재 및 재질: {{ product.material_type }}</div>-->
        <!--<div class="right-contents">규격: {{ product.item_dimensions }}</div>-->
        <!--</div>-->

        <div class="list-container" v-show="product.minimum_order_quantity">
          <div class="left-contents">MOQ</div>
          <div class="right-contents">{{addComma(product.minimum_order_quantity)}}</div>
        </div>
        <div class="list-container" v-show="product.price">
          <div class="left-contents">Price</div>
          <div class="right-contents">{{product.price}}</div>
        </div>
        <div class="list-container" v-show="product.material_type">
          <div class="left-contents">Material</div>
          <div class="right-contents">{{product.material_type}}</div>
        </div>
        <div class="list-container" v-show="product.item_dimensions">
          <div class="left-contents">Dimension</div>
          <div class="right-contents">{{product.item_dimensions}}</div>
        </div>

      </div>
      <div class="divider"></div>

      <!-- Reviews -->
      <div class="reviews-container">
        <h3>Reviews(0)</h3>
        <br>
        <h4 style="font-size:18px">No review</h4>
      </div>
      <div class="divider"></div>
    </div>

    <!-- Introduction -->
    <div class="product-introduction-container" v-show="product.product_description">
      <h3>Product introduction</h3>
      <br>
      <div class="product-introduction-inner-container" v-html="product.product_description"></div>
    </div>
    <div class="divider" v-show="product.product_description"></div>

    <!-- Catalog -->
    <div v-show="product.product_pdf_url" class="catalog-container" id="catalog-container">
      <h3>Catalog</h3>
      <img v-show="!toggle.isCatalogLoaded" src="../../../assets/img/product_loading_image_text.png">
      <!--<h3><a href="/static/web/viewer.html?file=http://localhost:8080/static/test.pdf" target="_blank">Catalog</a></h3>-->
      <!--<iframe id="catalog" src="/static/web/viewer.html?file=/static/test.pdf" allowfullscreen webkitallowfullscreen scrolling="no"  name="pdf" width="724" height="300" style="border: none;">-->
      <!--This browser does not support PDFs. Please download the PDF to view it: <a target="pdf" :href="product.product_image_url_2">Download PDF</a>-->
      <!--</iframe>-->
    </div>
    <div class="divider" v-show="product.product_pdf_url"></div>

    <!-- Related products -->
    <div class="related-products-container">
      <h3 class="title">Related products</h3>
      <br>
      <div class="row">
        <div class="product-container" v-for="(product, index) in products" :key="index" v-if="product.product_id !== product.product_id">
          <div v-if="index < 9" class="col-md-3 col-sm-6 col-xs-12">
            <div class="each-product">
              <img class="related-image" @click="routeProductProfilePage(index)" :src="product.product_image_url_1">
              <p>{{product.product_name}}</p>
              <div class="star-container" v-for="index in 5" :key="index">
                <i class="fa fa-star-o" aria-hidden="true"></i>
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
  export default {
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
        return {
          vendor: data.account,
          product: data.product,
          products: ''
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
      applyJquery () {
        $(document).ready(() => {
          this.imageResize()
          this.activateSlick()
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
          const $image = $('.related-image')
          $image.css('height', $image.width() + 'px')
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '~assets/css/index';

  // Global
  p {
    margin: 0;
  }
  textarea {
    resize: none;
  }

  .left-container {
    margin-top:22px;
    min-height: 377px;
  }

  .header-container .title {
    font-weight:500;
    margin-bottom: 10px;
    word-wrap: break-word;
  }
  .header-container .sub-title-container .sub-title  {
    font-weight: 400;
    display: inline;
  }
  .header-container .sub-title-container .review-title  {
    font-weight: 400;
    display: inline;
  }
  .header-container i {
    color: #317fa9;
    /*color: rgb(53, 105, 206)*/
  }

  .information-container {
    position: relative;

    .category-contents {
      color: @color-font-gray;
      font-size: 17px;
      font-weight: 300;
      padding-right: 80px;
    }

    #vendor-text {
      font-size: 19px;
      margin-bottom: 28px;
      padding-right: 80px;
    }

    .vendor-logo-image {
      position: absolute;
      right: 0;
      width: 60px;
      height: 60px;
      border: 1px solid @color-lightest-grey;
      border-radius: 50%;
    }

    p {
      font-size: 19px;
      font-weight: 300;
      margin-bottom: 3px;
    }

    .list-container {
      position: relative;
      font-weight: 300;
      font-size:17px;
      line-height: 1.9em;

      .left-contents {
        position: absolute;
        word-break: break-all;
        max-width: 100px;
      }
      .right-contents {
        text-align: left;
        padding-left: 100px;
        word-break: break-all;
      }
    }
  }

  .reviews-container h4 {
    font-size:19px;
    font-weight:300;
  }

  .right-container {
    z-index: 2;

    .product-image-container {
      box-shadow: 1px 1px 10px 1px #e4e4e4;
      margin-bottom: 20px;
      width: 100%;
    }

    h4 {
      text-align: center;
      font-weight:400;
      color: grey;
      font-size: 14px;
      margin-bottom: 15px;
    }
    button {
      height:45px;
      width: 100%;
      font-size:17px;
      font-weight:500;
    }
  }

  .review-container {
  }

  .product-introduction-container {
    position: relative;
    font-size:19px;
    font-weight:300;

    .product-introduction-inner-container {
      text-align: inherit;
      word-break: break-all;

      p {
        margin: 0 !important;
      }
    }
    img {
      width:100% !important;
    }
  }

  .catalog-container {
    position: relative;
    overflow: hidden;

    h3 {
      margin-bottom: 30px;
    }

    canvas {
      width: 100% !important;
      height: 100% !important;
    }
  }

  .related-products-container {

    .product-container {

      .each-product {
        p {
          margin-top: 15px;
          margin-bottom: 4px;
          font-size:16px;
          word-break: break-all;
          display: -webkit-box;
          -webkit-line-clamp: 2; /* 라인수 */
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          word-wrap: break-word;
        }
      }
    }
  }
  .related-products-container h4 {
    font-size:19px;
    font-weight:300;
    margin-top: 20px;
  }
  .related-products-container .title {
    margin-bottom: 10px;
  }
  .related-products-container .product-container .each-product {
    margin-bottom:25px;
    min-height:340px;
  }
  .related-products-container .product-container .each-product img {
    cursor: pointer;
    width: 100%;
    box-shadow: 1px 1px 10px 1px #e4e4e4;
  }
  .related-products-container .product-container .each-product p {
  }
  .related-products-container .product-container .each-product .star-container {
    color: #317fa9;
    display: inline-block;
    text-align: center;
  }

  @media ( min-width: 744px ) {
    .left-container{

    }
    .right-container {
      max-width: 600px;
      margin: 0 auto 30px auto;
    }
  }
  @media ( min-width: 1128px ) {
    .left-container {
      position: relative;
      padding-right: 410px;
    }
    .right-container {
      position: absolute;
      width: 340px;
      top: 0;
      right: 0;
    }
    .right-container .divider {
      display: none;
    }
  }
</style>
