<template>
  <section id="container">

    <!-- Products -->
    <!--<div class="product-body-container">-->
    <!--<div class="products-container">-->
    <!--&lt;!&ndash; Title &ndash;&gt;-->
    <!--<h2 class="title" v-html="$t('search.products', { count: products.length})"></h2>-->
    <!--&lt;!&ndash; Wrapper &ndash;&gt;-->
    <!--<section class="product-wrapper" v-if="product_count > 0">-->
    <!--&lt;!&ndash; Product &ndash;&gt;-->
    <!--<div class="product-container" v-for="(product, index) in this.products" :key="index">-->
    <!--&lt;!&ndash; Image &ndash;&gt;-->
    <!--<div class="image-container">-->
    <!--<img class="product-image" @click="routeProductProfilePage(index)" :src="product.product_image_url_1">-->
    <!--</div>-->
    <!--&lt;!&ndash; Content &ndash;&gt;-->
    <!--<div class="content-container">-->
    <!--<h2 class="primary-category">{{product.primary_product_category}}</h2>-->
    <!--<h1 class="product-name">{{product.product_name}}</h1>-->
    <!--<div class="star-container">-->
    <!--<i class="fa fa-star-o" aria-hidden="true" v-for="index in 5" :key="index"></i>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</section>-->
    <!--<section v-else>-->
    <!--<div class="product-wrapper">-->
    <!--<div class="product-container">-->
    <!--No result-->
    <!--</div>-->
    <!--</div>-->
    <!--</section>-->
    <!--</div>-->
    <!--</div>-->

    <!-- Suppliers -->
    <div class="body-container">
      <div class="supplier-outer-container each-container">
        <h2 class="title">{{ $t('search.suppliers', {count: getAccountCount}) }}</h2>
        <loader id="loader"/>
        <div v-if="account_count > 0">
          <section class="supplier-container">
            <div class="supplier-wrapper" v-for="(account,index) in accounts" :key="index">
              <h1 class="company-name" @click="routeSupplierPage(account)">{{account.account_name_english || account.account_name}}</h1>
              <i v-show="isApprovedAccount(account)" id="verified-mark" class="fa fa-check-circle" aria-hidden="true"></i>
              <h2 class="product">{{account.products_english}}</h2>
              <h3 class="website">{{account.website}}</h3>
              <h3 class="phone">{{account.phone}}</h3>
              <h3 class="address">{{account.mailing_country_english}}</h3>
            </div>
          </section>
          <ul class="pagination">
            <li v-show="page !== 0" @click="movePreviousPage"><i class="fa fa-angle-left"></i></li>
            <li
              v-for="(p, index) in Math.ceil(account_count / PAGE_ITEM_NUMBER)"
              :key="index"
              v-if="index < PAGINATION_NUMBER && ((page * PAGINATION_NUMBER) + index) < Math.ceil(account_count / PAGE_ITEM_NUMBER)"
              :class="(page * PAGINATION_NUMBER) + index === selected ? 'selected' : ''"
              @click="onPagination((page * PAGINATION_NUMBER) + index)">
              {{(page * PAGINATION_NUMBER) + (index + 1)}}
            <li v-show="isLastPage" @click="moveNextPage"><i class="fa fa-angle-right"></i></li>
          </ul>
        </div>
        <div v-else>
          <section>
            Sorry, no result.
          </section>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
  import axios from '~/plugins/axios'
  import Loader from '~/components/Loader'
  import { addComma, removeNullInArray } from '~/utils/text'
  export default {
    scrollToTop: true,
    layout: 'minify',
    components: {
      Loader
    },
    head () {
      return {
        title: `${this.queryInput}`,
        meta: [
          { hid: 'og-title', property: 'og:title', content: `${this.queryInput} | Factory Hunt` },
          { hid: 'twitter-card', property: 'twitter:card', content: 'summary' },
          { hid: 'twitter-title', property: 'twitter:title', content: `${this.queryInput} | Factory Hunt` }
        ],
        link: [
          { hid: 'canonical', rel: 'canonical', href: `https://www.factoryhunt.com/search?input=${this.queryInput}` }
        ]
      }
    },
    async asyncData ({ query }) {
      let { data } = await axios.get(`/api/data/search/${query.input}/0`)
      return {
        queryInput: query.input,
        accounts: removeNullInArray(data.accounts),
        account_count: data.account_count
      }
    },
    data () {
      return {
        queryInput: '',
        accounts: {},
        account_count: 0,
        page: 0,
        selected: 0,
        PAGE_ITEM_NUMBER: 15,
        PAGINATION_NUMBER: 10
      }
    },
    computed: {
      getAccountCount () {
        return addComma(this.account_count)
      },
      isLastPage () {
        const pagination = Math.ceil((this.account_count / 15) / 10)
        return this.page < (pagination - 1)
      }
    },
    methods: {
      isApprovedAccount (account) {
        return account.account_status === 'approved'
      },
      routeSupplierPage (account) {
        if (account.account_status === 'approved') {
          const url = account.domain
          this.$router.push(`/${url}?input=${this.queryInput}`)
        } else {
          this.$router.push({
            path: `/supplier/${account.domain}`,
            query: {
              input: this.queryInput
            }
          })
        }
      },
      // Deprecated
      routeProductProfilePage (index) {
        const productDomain = this.products[index].product_domain
        if (this.value.input) {
          this.$router.push(`/${this.value.company}/${productDomain}?input=${this.value.input}`)
        } else {
          this.$router.push(`/${this.value.company}/${productDomain}`)
        }
      },
      async onPagination (index) {
        window.scrollTo(0, 0)
        this.activateLoader()
        this.accounts = {}
        this.selected = index
        let { data } = await axios.get(`/api/data/search/${this.queryInput}/${index}`)
        this.accounts = removeNullInArray(data.accounts)
        this.deactivateLoader()
      },
      moveNextPage () {
        if (this.page <= this.account_count / this.PAGE_ITEM_NUMBER) {
          this.page = this.page + 1
          this.selected = 0
          this.onPagination(this.page * this.PAGINATION_NUMBER)
        }
      },
      movePreviousPage () {
        if (this.page > 0) {
          this.page = this.page - 1
          this.selected = 0
          this.onPagination(this.page * this.PAGINATION_NUMBER)
        }
      },
      activateLoader () {
        $(document).ready(() => {
          const $loader = $('#loader')
          $loader.removeClass().addClass('spinkit-default')
        })
      },
      deactivateLoader () {
        $(document).ready(() => {
          const $loader = $('#loader')
          $loader.removeClass().addClass('invisible')
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '~assets/css/index';

  #container {
    padding-top: 20px;

    .each-container {  }

    .product-body-container {
      max-width: 1040px;
      margin: 0 auto;
      padding: 0;

      .products-container {
        outline: none;

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

              .primary-category {
                margin: 4px 0 0 0;
                font-size: .9rem;
                font-weight: 500;
                color: @color-font-gray;
              }
              .product-name {
                margin: 0;
                font-size: 1.2rem;
                font-weight: 500;
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

    .supplier-outer-container {
      padding-bottom: 2rem;

      .title {
        margin-top: 0;
        margin-bottom: 20px;
        font-size: @font-size-small;
        font-weight: @font-weight-medium;
        color: @color-deep-gray;
      }


      .supplier-container {

        .supplier-wrapper {
          padding-bottom: 2rem;

          .company-name {
            display: inline-block;
            margin: 0;
            font-weight: 200;
            font-size: 20px;

            &:hover {
              cursor: pointer;
            }
          }
          #verified-mark {
            padding-left: 5px;
            font-size: 15px;
            color: @color-light-green;
          }
          .product {
            margin: 3px 0 2px 0;
            font-weight: 500;
            font-size: 16px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .website {
            margin: 3px 0;
            font-weight: 400;
            font-size: 14px;
            color: @color-link;
          }
          .phone {
            margin: 3px 0;
            font-weight: 400;
            font-size: 14px;
          }
          .address {
            margin: 3px 0;
            font-weight: 400;
            font-size: 14px;
          }
        }
      }

      .pagination {
        margin: 0;
        padding: 0;
        display: flex;

        li {
          background-color: @color-white;
          color: @color-link;
          font-size: @font-size-small;
          display: flex;
          justify-content: center;
          align-items: center;
          list-style-type: none;
          width: 38px;
          height: 38px;
          border: 1px solid @color-light-gray;

          &:hover {
            cursor: pointer;
            border: 1px solid @color-link;
            background-color: @color-link;
            color: @color-white;
          }

          &.selected {
            cursor: pointer;
            border: 1px solid @color-link;
            background-color: @color-link;
            color: @color-white;
          }
        }
      }
    }
  }

  @media ( min-width: 744px ) {
    #container {
      padding-top: 30px;

      .product-body-container {
        max-width: 1040px;
        margin: 0 auto;
        padding: 0 24px;

        .products-container {

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
                  font-size: .9rem;
                }
                .product-name {
                  font-size: 1.2rem;
                }
                .star-container {
                  i {
                    font-size: 0.9rem;
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
      .each-container {  }

      .product-body-container {
        max-width: 1060px;
        margin: 0 auto;
        padding: 0;

        .products-container {
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
                  font-size: 1.2rem;
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
