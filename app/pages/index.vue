<template>
  <section id="container">
    <!-- Header -->
    <header class="header-container">
      <!-- Slogan -->
      <div class="slogan-container">
        <h1 class="title">{{ $t('home.title') }}</h1>
        <h4 class="sub-title" v-html="$t('home.subTitle')"></h4>
      </div>

      <!-- Search Bar -->
      <form @submit.prevent="onSearchInput">
        <div class="search-bar-container">
          <div class="search-bar-wrapper">
            <div class="search-input-container">
              <input id="search-input" type="text" v-model="value.input" pattern="[A-Za-z0-9]{2,50}" :placeholder="$t('home.input')" :title="$t('home.searchCaution')">
            </div>
            <div class="search-button-container">
              <button id="search-button" type="submit" class="button-orange">{{ $t('home.search') }}</button>
            </div>
          </div>
        </div>
      </form>
    </header>

    <!-- Featured Suppliers -->
    <div class="featured-container">
      <!-- Title -->
      <h2 class="title">{{ $t('home.featured') }}</h2>
      <loader v-show="!features" id="featured-loader" class="spinkit-default"></loader>

      <!-- Featured Supplier -->
      <div class="contents-container">
        <div class="card-container" v-for="(feature,index) in features" :key="index">
          <div class="image-container">
            <div @click="routeAccountProfilePage(feature)" class="image-wrapper">
              <img id="featured-image" :src="feature.account_image_url_1">
            </div>
          </div>
          <div class="description-container">
            <div class="description-contents">
              <p class="product">{{ feature.products_english }}</p>
              <h2 class="company-name">{{ feature.account_name_english }}</h2>
              <h3 class="slogan">{{ feature.company_short_description }}</h3>
              <button @click="routeAccountProfilePage(feature)" class="view-more-button">{{ $t('home.viewMore') }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Test -->
    <!--<img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />-->
    <!--<h1 class="title">-->
    <!--USERS-->
    <!--</h1>-->
    <!--<ul class="users">-->
    <!--<li v-for="(user, index) in users" :key="index" class="user">-->
    <!--<nuxt-link :to="{ name: 'id', params: { id: index }}">-->
    <!--{{ user.name }}-->
    <!--</nuxt-link>-->
    <!--</li>-->
    <!--</ul>-->
  </section>
</template>

<script>
  import axios from '~/plugins/axios'
  import Loader from '~/components/Loader.vue'

  export default {
    components: {
      Loader
    },
    async asyncData () {
      let { data } = await axios.get('/api/data/account/featured')
      return { features: data }
    },
    data () {
      return {
        value: {
          input: ''
        }
      }
    },
    methods: {
      onSearchInput () {
        // No empty search
        if (!this.value.input) return
        this.$router.push({
          path: '/search',
          query: {
            input: this.value.input
          }
        })
      },
      routeAccountProfilePage (feature) {
        const domain = feature.domain
        this.$router.push(`/${domain}`)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '~assets/css/index';

  #container {
    .header-container {
      min-height: 58vh;

      .slogan-container {
        padding-top: 54px;

        .title {
          font-size: 34px;
          color: @color-orange;
          font-weight: 500;
          margin-bottom: 10px;
        }
        .sub-title {
          font-size:24px;
          color: @color-font-black;
          margin-top: 0;
          font-weight: 300;
          margin-bottom: 30px;
          line-height: 1.42;
          width: 90%;
        }
      }

      .search-bar-container {
        position: relative;

        .placeholder(300);

        .search-bar-wrapper {
          border: 1px solid @color-light-grey;
          border-radius: @border-radius;
          box-shadow: @box-shadow;
          width: 100%;
          display: table;

          .search-input-container {
            width: 100%;
            display: table-cell;
            vertical-align: middle;
            padding: 14px 16px;
            #search-input {
              width: 100%;
              border: none;
              font-size:15px;
              height: 20px;
            }
          }

          .search-button-container {
            display: none;
            #search-button {
            }
          }
        }
      }
    }

    .featured-container {
      .title {
        margin-bottom: 0;
      }

      .contents-container {
        width: 100%;

        .card-container {
          padding: 20px 0;
          border-bottom: 1px solid @color-light-grey;

          .image-container {
            display: block;

            &:hover {
              cursor: pointer;
            }

            .image-wrapper {
              width: 100%;
            }
            img {
              width: 100%;
            }
          }

          .description-container {
            display: block;
            padding: 12px;

            .product {
              color: @color-link;
              font-size: 14px;
              font-weight: 500;
              margin: 0;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              /*display: -webkit-box;*/
              /*-webkit-line-clamp: 1; !* 라인수 *!*/
              /*-webkit-box-orient: vertical;*/
              /*overflow: hidden;*/
              /*text-overflow: ellipsis;*/
            }
            .company-name {
              margin: 2px 0 0 0;
              font-size:30px;
            }
            .slogan {
              font-weight: 300;
              display: -webkit-box;
              -webkit-line-clamp: 3; /* 라인수 */
              -webkit-box-orient: vertical;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .view-more-button {
              width: 100%;
              outline: none;
              color: @color-link;
              font-weight: 700;
              font-size: 16px;
              border: 1px solid @color-link;
              border-radius: @border-radius;
              height: 42px;
            }
          }
        }
      }
    }
  }

  @media ( min-width: 744px ) {
    #container {
      .header-container {
        min-height: 74vh;

        .slogan-container {
          .title {
            font-size: 40px;
          }
          .sub-title {
            font-size:29px;
            width: 55%;
            margin-bottom: 60px;
          }
        }

        .search-bar-container {

          .search-bar-wrapper {

            .search-input-container {
              #search-input {
                height: 20px;
              }
            }

          }
        }
      }

      .featured-container {
        .title {
          font-size: 27px;
        }

        .contents-container {
          width: 100%;

          .card-container {
            display: table;
            table-layout: fixed;
            padding: 30px 0;
            border-bottom: 1px solid @color-light-grey;

            .image-container {
              display: table-cell;
              vertical-align: middle;

              .image-wrapper {
                width: 460px;
                height: 300px;
                display: flex;
                overflow: hidden;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                -webkit-box-pack: center;
                -ms-flex-pack: center;
                justify-content: center;
              }
              img {
                width: 100%;
              }
            }

            .description-container {
              display: table-cell;
              vertical-align: middle;
              padding-left: 40px;
              position: relative;

              .product {
                font-size:16px;
                max-width: 260px;
              }
              .company-name {
                font-size: 32px;
              }
              .slogan {
                font-size:19px;
              }
              .view-more-button {
                width: 160px;
              }
            }
          }
        }
      }
    }
  }
  @media ( min-width: 1128px ) {
    #container {
      .header-container {
        .slogan-container {
          padding-top: 44px;
          .title {
            font-size: 50px;
          }
          .sub-title {
            font-size:40px;
            width: 55%;
          }
        }

        .search-bar-container {

          .search-bar-wrapper {

            .search-input-container {
              padding: 14px 24px;
              #search-input {
                font-size:20px;
                height: 50px;
              }
            }

            .search-button-container {
              display: table-cell;
              padding: 10px 10px 10px 0;
              vertical-align: middle;
              height: 50px;
              #search-button {
                font-size: 17px;
                font-weight: 700;
                height: 100%;
              }
            }
          }
        }
      }

      .featured-container {
        .title {
        }

        .contents-container {

          .card-container {

            .image-container {

              .image-wrapper {
                width: 540px;
                height: 280px;
              }
              img {
              }
            }

            .description-container {
              display: table-cell;
              vertical-align: middle;
              padding-left: 60px;

              .product {
                font-size:17px;
                max-width: 400px;
              }
              .company-name {
                font-size: 33px;
              }
              .slogan {
                font-size:20px;
              }
              .view-more-button {
              }
            }
          }
        }
      }
    }
  }
</style>