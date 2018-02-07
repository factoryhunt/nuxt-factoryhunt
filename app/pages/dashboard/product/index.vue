<template>
  <div class="dashboard-page-container">

    <!-- Modal -->
    <div class="modal-background" @click="modalToggle">
      <div class="modal-container">
        <div class="modal-contents" @click="modalToggle">
          <p class="title">{{ $t('dashboardProduct.modal.title') }}</p>
          <div class="button-container">
            <div class="left-button-container">
              <button class="button-white confirm-button" @click="deleteProduct">{{ $t('dashboardProduct.modal.delete') }}</button>
            </div>
            <div class="right-button-container">
              <button class="button-orange cancel-button" @click="modalToggle">{{ $t('dashboardProduct.modal.cancel') }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Header -->
    <div class="header-container">
      <button v-if="products.length > 0" class="button-orange product-upload-button" @click="onProductUploadButton">{{ $t('dashboardProduct.header.newProduct') }}</button>
      <h1 class="title">{{ $t('dashboardProduct.header.title') }}</h1>
    </div>

    <!-- Body -->
    <div class="product-container">

      <!-- products empty -->
      <div v-if="products.length === 0" class="product-empty-container">
        <div class="empty">
          <p class="title">{{ $t('dashboardProduct.empty.title') }}</p>
          <p class="sub-title">{{ $t('dashboardProduct.empty.subTitle') }}</p>
          <button @click="onProductUploadButton" class="product-upload-button button-orange">{{ $t('dashboardProduct.empty.uploadProduct') }}</button>
        </div>
      </div>

      <!-- products exist -->
      <div v-else class="product-list-container">
        <div class="list-container">
          <div v-for="(product, index) in getReversedProducts" :id="'list-' + index" class="list" :key="index">
            <div class="image-container">
              <img class="product-image" :src="product.product_image_url_1">
            </div>
            <div class="category-container">
              <p class="primary-text">{{product.primary_product_category}}</p>
              <p class="secondary-text">{{product.secondary_product_category}}</p>
            </div>
            <div class="product-name-container">
              <p class="name-text">{{product.product_name}}</p>
              <p class="code-text">{{product.product_code}}</p>
            </div>
            <div class="status-container">
              <p :class="product.product_status === 'pending' ? 'pending' : 'on-sale'">{{getProductStatus(product)}}</p>
              <p class="price-text">{{product.price ? product.price : ''}}</p>
            </div>
            <div class="tool-container">
              <a class="product-edit-button" @click="onEditButton(index)">{{ $t('dashboardProduct.exist.edit') }}</a>
              <span> | </span>
              <a class="product-remove-button" @click="showProductRemoveModal(index)">{{ $t('dashboardProduct.exist.delete') }}</a>
              <a class="view-product-button" @click="routeProductPage(index)">{{ $t('dashboardProduct.exist.view') }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  export default {
    props: {
      products: {
        type: Array,
        default: () => {
          return []
        }
      },
      account: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data () {
      return {
        value: {
          productIndex: null
        }
      }
    },
    computed: {
      getReversedProducts () {
        return this.products.slice(0).reverse()
      }
    },
    methods: {
      getProductStatus (product) {
        return product.product_status === 'pending' ? this.$t('dashboardProduct.pending') : this.$t('dashboardProduct.approved')
      },
      onProductUploadButton () {
        this.$router.push('/dashboard/product/upload')
      },
      onEditButton (index) {
        const productId = this.getReversedProducts[index].product_id
        this.$router.push(`/dashboard/product/edit?id=${productId}`)
      },
      modalToggle () {
        $('.modal-container, .modal-background').toggle()
      },
      showProductRemoveModal (index) {
        this.modalToggle()
        this.value.productIndex = index
      },
      deleteProduct () {
        this.modalToggle()
        const index = this.value.productIndex
        const productId = this.getReversedProducts[index].product_id
        axios.delete(`/api/data/product/${productId}`)
          .then(() => {
            this.$router.go()
          })
          .catch((err) => {
            console.log(err)
            alert(err.response.data.msg)
          })
      },
      removeLastBorderBottom () {
        var length = this.products.length - 1
        $(`#list-${length}`).css('border-bottom', '0')
      },
      routeProductPage (index) {
        const url = `/${this.account.domain}/${this.getReversedProducts[index].product_domain}`
        this.$router.push(url)
      },
      activateJquery () {
        $(document).ready(() => {
          this.removeLastBorderBottom()
        })
      }
    },
    mounted () {
      this.activateJquery()
    },
    watch: {
      '$route' () {
        this.activateJquery()
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "~assets/css/index";

  @list-height: 60px;

  //Global
  p {
    margin: 0;
  }
  button {
    font-size: 17px;
  }

  .list-divider {
    height: 1px;
    background-color: @color-light-grey;
  }

  .dashboard-page-container {

    // Header
    .header-container {
      .title {
        font-size: 30px;
        font-weight: 600;
        margin-top: 0;
        margin-bottom: 40px;
      }

      .product-upload-button {
        font-weight: 600;
        font-size: 16px;
        float: right;
      }
    }

    // Products
    .product-container {
      border: 1px solid @color-light-grey;
      border-radius: @border-radius;
      margin-top:12px;

      .product-empty-container {
        padding: 80px 12px;

        .empty {
          text-align: center;
          .title {
            font-weight: 500;
            font-size: 24px;
          }
          .sub-title {
            font-weight: 300;
            font-size: 18px;
            margin-bottom: 28px;
          }
          .product-upload-button {
            font-weight: 600;
            font-size: 19px;
          }
        }
      }

      .product-list-container {
        padding: 0 22px;

        .list-container {
          width: 100%;

          .list {
            display: table;
            table-layout: fixed;
            width: 100%;
            padding: 22px 0;
            border-bottom: 1px solid @color-light-grey;

            &:hover {

              .tool-container {
                visibility: visible;
              }
            }

            // 9%
            .image-container {
              width: 9%;
              display: table-cell;
              vertical-align: middle;

              img {
                width: 80px;
              }
            }

            // 18%
            .category-container {
              vertical-align: middle;
              display: table-cell;
              width: 18%;
              padding: 0 8px;

              .primary-text {
                font-size: 15px;
                font-weight: 500;
                display: -webkit-box;
                -webkit-line-clamp: 2; /* 라인수 */
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
                word-wrap: break-word;
              }
              .secondary-text {
                font-size: 15px;
                font-weight: 300;
                display: -webkit-box;
                -webkit-line-clamp: 2; /* 라인수 */
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
                word-wrap: break-word;
              }
            }

            // 53%
            .product-name-container {
              vertical-align: middle;
              text-align: left;
              display: table-cell;
              padding: 0 8px;
              width: 53%;

              .name-text {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size:17px;
                font-weight: 400;
              }
              .code-text {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-weight: 300;
              }
            }

            // 10%
            .status-container {
              width: 12%;
              display: table-cell;
              vertical-align: middle;
              text-align: left;
              padding: 0 8px;

              p {
                font-size: @font-size-small;
                font-weight: 600;
              }
              i {
                font-size: 0.1px;
                margin-right: 2px;
              }

              .pending {
                color: @color-yellow;
                i {
                  color: @color-yellow;
                }
              }
              .on-sale {
                color: @color-green;
                i {
                  color: @color-green;
                }
              }
            }

            // 10%
            .tool-container {
              width: 8%;
              vertical-align: middle;
              text-align: center;
              display: table-cell;
              visibility: hidden;
              /*text-align: center;*/

              a {
                font-size: 15px;
                font-weight: 300;
              }
              span {
                font-size: 13px;
                color: @color-link;
              }

              .view-product-button {
                display: block;
              }
              .product-edit-button {

              }
              .product-remove-button {

              }
            }
          }
        }

      }
    }
  }
</style>
