<template>
  <section id="container">

    <!-- Header -->
    <header class="header-container">

      <!-- Short Description -->
      <div class="short-description-container">
        <h1 class="title">{{ $t('home.title') }}</h1>
        <h4 class="sub-title" v-html="$t('home.subTitle')"></h4>
      </div>

      <!-- Search Bar -->
      <form @submit.prevent="onSearchInput(value.input)">
        <div class="search-bar-container">
          <div class="search-bar-wrapper">
            <div class="search-input-container">
              <input
                id="search-input"
                type="text"
                v-model="value.input"
                pattern="[A-Za-z0-9 ]{2,100}"
                autocomplete=off
                :placeholder="$t('home.input')"
                :title="$t('home.searchCaution')">
            </div>
            <div class="search-button-container">
              <button id="search-button" type="submit" class="button-orange">{{ $t('home.search') }}</button>
            </div>
          </div>

          <div class="auto-completion" v-show="suggestions.options.length">
            <ul id="suggestion-container">
              <li 
              class="suggestion"
              v-for="(suggestion, index) in suggestions.options"
              :key="index"
              @click="onSearchInput(suggestion.text)"
              >
                {{suggestion.text}}
              </li>
            </ul>
          </div>
        </div>
      </form>
    </header>

    <!-- Featured Suppliers -->
    <loader v-show="!isLoaded" id="loader" class="spinkit-default"/>
    <div class="featured-container" v-show="isLoaded">

      <!-- Title -->
      <h2 class="title">{{ $t('home.featured') }}</h2>

      <!-- Featured Supplier -->
      <div class="contents-container">
        <div class="card-container" v-for="(feature,index) in features" :key="index" v-if="index < value.featuresLength">
          <div class="image-container">
            <a :href="`/${feature.domain}`" target="_blank" class="image-wrapper">
              <img id="featured-image" :src="feature.cover_image_url_1" alt="featured-image">
            </a>
          </div>
          <div class="description-container">
            <div class="description-contents">
              <p class="product">{{ feature.products }}</p>
              <h2 class="company-name">{{ feature.account_name }}</h2>
              <h3 class="short-description">{{ feature.company_short_description }}</h3>
              <button @click="routeAccountProfilePage(feature)" class="view-more-button">{{ $t('home.viewMore') }}</button>
            </div>
          </div>
        </div>
        <div class="show-more-button-container" v-if="features.length > value.featuresLength">
          <button @click="onShowMoreButton"><i><img src="~assets/icons/arrow-angle-down.png" alt="show more"></i>{{$t('home.showMore')}}</button>
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
  import { removeTextSpace } from '~/utils/text'
  export default {
    components: {
      Loader
    },
    async asyncData () {
      try {
        let { data } = await axios.get('/api/data/account/featured')
        return { features: data }
      } catch (err) {
        return {
          features: {}
        }
      }
    },
    data () {
      return {
        value: {
          input: '',
          featuresLength: 10,
        },
        suggestions: {
          options: []
        },
        isLoaded: false,
        canUpdateSuggestion: true
      }
    },
    watch: {
      async 'value.input' (input) {
        if (this.canUpdateSuggestion) {
          const { data } = await this.getSearchSuggestion(input)
          this.suggestions = data
        }
      }
    },
    methods: {
      onSearchKeypress () {
        const nuxt = this
        const $input = $('#search-input')

       $input.keydown((event) => {
         const $li = $('.suggestion.highlighted')
          switch (event.which) {
            case 38:
              event.preventDefault() // prevent moving the cursor
              nuxt.canUpdateSuggestion = false
              if (!$li.length) $('.suggestion').removeClass('highlighted')
              else {
                $li.removeClass('highlighted').prev().addClass('highlighted')
                const $prev = $li.removeClass('highlighted').prev()
                $prev.addClass('highlighted')
                nuxt.value.input = $prev[0].innerText
              }
              break;
            case 40:
              event.preventDefault()
              nuxt.canUpdateSuggestion = false
              if (!$li.length) {
                $('.suggestion').first().addClass('highlighted')
              }
              else {
                const $next = $li.removeClass('highlighted').next()
                $next.addClass('highlighted')
                nuxt.value.input = $next[0].innerText
              }
              break;
            default:
              nuxt.canUpdateSuggestion = true
              break;
          }
        })
      },
      getSearchSuggestion () {
        return new Promise((resolve, reject) => {
          axios.post(`api/data/search/elastic/suggestion`, {input: this.value.input})
          .then((res) => {
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
        })
      },
      onSearchInput (text) {
        if (!text) return
        let input = removeTextSpace(text)
        location.href = `/search?q=${input}`
      },
      onShowMoreButton () {
        const length = this.features.length
        if (this.value.featuresLength < length) this.value.featuresLength += 10
      },
      routeAccountProfilePage (feature) {
        const domain = feature.domain
        window.open(`/${domain}`)
      },
      activateJquery () {
        $(document).ready(() => {
          this.calculateWindowHeight()
          this.onSearchKeypress()
          this.deactivateLoader()
          this.isLoaded = true
        })
      },
      calculateWindowHeight () {
        const windowHeight = window.innerHeight * 0.74
        const $headerContainer = $('.header-container')
        $headerContainer.css('min-height', `${windowHeight}px`)
      },
      deactivateLoader () {
        const $loader = $('#loader')
        $loader.removeClass().addClass('invisible')
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
    .header-container {

      .short-description-container {
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

        .search-bar-wrapper {
          position: relative;
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
              padding: 0;
              width: 100%;
              border: none;
              font-size:15px;
            }
          }

          .search-button-container {
            display: none;
          }
        }

        .auto-completion {
          position: absolute;
          left: 0;
          top: 100%;
          width: 100%;
          border: 1px solid @color-light-gray;
          border-top: 0;
          border-bottom-left-radius: @border-radius;
          border-bottom-right-radius: @border-radius;
          background-color: @color-white;
          box-shadow: 0 2px 4px @color-light-gray;
          z-index: 10;

          ul {
            list-style: none;
            margin:0;
            padding:0;
          }
          li {
            background-color: @color-white;
            padding: 12px 16px;
            font-size:15px;

            &:hover {
              cursor: pointer;
              background-color: @color-lightest-grey;
            }

            &.highlighted {
              background-color: @color-lightest-grey;
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
          padding-top: 32px;
          padding-bottom: 20px;
          border-bottom: 1px solid @color-light-gray;

          &:last-child {
            border-bottom: 0;
            margin-bottom: 50px;
          }

          .image-container {
            max-height: 210px;
            overflow: hidden;
            display: flex;
            align-items: center;

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
              margin: 0;
              font-size:30px;
            }
            .short-description {
              margin-top: 8px;
              font-weight: 300;
              display: -webkit-box;
              -webkit-line-clamp: 3; /* 라인수 */
              -webkit-box-orient: vertical;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .view-more-button {
              width: 100%;
              background-color: @color-white;
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

        .show-more-button-container {
          padding: 11px 0;
          text-align: center;
          background-color: @color-white;

          button {
            background-color: @color-white;
            color: @color-font-gray;
            width: 100%;
            height: 100%;
            border: 0;
            font-size: @font-size-small;
            text-transform: uppercase;
          }
          img {
            display: inline-block;
            vertical-align: middle;
            width: 14px;
            margin: 0 6px;
          }
        }
      }
    }
  }

  @media ( min-width: 744px ) {
    #container {
      .header-container {

        .short-description-container {
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
              .short-description {
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
        .short-description-container {
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
              padding: 13px 24px;
              #search-input {
                font-size:20px;
                height: 60px;
              }
            }

            .search-button-container {
              display: table-cell;
              padding: 10px 10px 10px 0;
              vertical-align: middle;
              #search-button {
                font-size: 17px;
                font-weight: @font-weight-bold;
                height: 60px;
                white-space: nowrap;
              }
            }
          }
          .auto-completion {
            li {
              padding-left: 24px;
              padding-right: 24px;
              font-size:18px;
            }
          }
        }
      }

      .featured-container {
        .title {
        }

        .contents-container {

          .card-container {
            width: 100%;

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
              .short-description {
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
