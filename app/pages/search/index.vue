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
        <h2 class="title">{{ $t('search.suppliers') }}</h2>
        <section class="supplier-container" v-if="account_count > 0">
          <div class="supplier-wrapper" v-for="(account,index) in accounts" :key="index">
            <h1 class="company-name" @click="routeSupplierPage(account)">{{account.account_name_english || account.account_name}}</h1>
            <i v-show="isApprovedAccount(account)" id="verified-mark" class="fa fa-check-circle" aria-hidden="true"></i>
            <h2 class="product">{{account.products_english}}</h2>
            <h3 class="website">{{account.website}}</h3>
            <h3 class="phone">{{account.phone}}</h3>
            <h3 class="address">{{account.mailing_country_english}}</h3>
          </div>
        </section>
        <section v-else>
          Sorry, no result.
        </section>
      </div>
    </div>

  </section>
</template>

<script>
  import axios from '~/plugins/axios'
  export default {
    layout: 'minify',
    head () {
      return {
        title: `${this.queryInput}`
      }
    },
    async asyncData ({ query }) {
      let { data } = await axios.get(`/api/data/search/${query.input}`)
      return {
        queryInput: query.input,
        products: data.products,
        product_count: data.product_count,
        accounts: data.accounts,
        account_count: data.account_count
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
          const url = account.account_name_english || account.account_name
          const id = account.account_id
          this.$router.push({
            path: `/supplier/${url}`,
            query: {
              id: id,
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
              word-break: break-all;

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

      .read-more-button-container {

        .read-more {
          font-size: 1.1rem;
          font-weight: 400;
        }
        #angle-right {
          font-size: 1.1rem;
          padding-left: 6px;
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
