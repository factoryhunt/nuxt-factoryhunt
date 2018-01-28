<template>
  <nav class="navigation-container">
    <div class="navigation-inner-container">

      <!-- Left Main Logo -->
      <div class="logo-container">
        <div class="logo-inner-container">
          <nuxt-link to="/">
            <img id="logo" src="~assets/img/logo_white.png">
          </nuxt-link>
        </div>
      </div>

      <!-- Search Bar -->
        <div class="search-container">
          <form @submit.prevent="onSearchInput">
          <div class="search-inner-container">
            <div class="search-icon-container">
              <div class="fa fa-search" id="search-icon"></div>
            </div>
            <div class="search-input-container">
              <input type="text" placeholder="Search" v-model="value.input">
            </div>
          </div>
          </form>
        </div>

      <!-- Right Button container -->
      <div class="button-container">
        <nav class="button-inner-container">
          <ul class="button-wrapper">
            <!--<li class="button-item-container">-->
              <!--<div class="button-item-wrapper">-->
                <!--<div class="button-item">-->
                  <!--<a href="/login">Become a buyer</a>-->
                <!--</div>-->
              <!--</div>-->
            <!--</li>-->
            <li class="button-item-container">
              <div class="button-item-wrapper">
                <div class="button-item">
                  <nuxt-link to="/signup">Become a seller</nuxt-link>
                </div>
              </div>
            </li>
            <!--<li class="button-item-container">-->
              <!--<div class="button-item-wrapper">-->
                <!--<div class="button-item">-->
                  <!--<a href="/signup">Help</a>-->
                <!--</div>-->
              <!--</div>-->
            <!--</li>-->
            <li class="button-item-container">
              <div class="button-item-wrapper">
                <div class="button-item">
                  <nuxt-link to="/login">Login</nuxt-link>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Toggle menu -> Invisible -->
    </div>
  </nav>
</template>

<script>
  import $ from 'jquery'
  export default {
    data () {
      return {
        value: {
          input: this.$route.query.input
        }
      }
    },
    methods: {
      activateJquery () {
        $(document).ready(() => {
          this.renderSearchBar()
        })
      },
      renderSearchBar () {
        if (this.$route.path !== '/') {
          $('.search-container').css({
            'visibility': 'visible',
            'border-left': '1px solid #dedede'
          })
          $('.navigation-container').css('border-bottom', '1px solid #dedede')
        }
      },
      onSearchInput () {
        if (!this.value.input) return
        location.href = `/search?input=${this.value.input}`
      }
    },
    mounted () {
      this.activateJquery()
    },
    watch: {
      '$route.query.input' (newValue) {
        this.value.input = newValue
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '~assets/css/index';

  .navigation-container {
    position: relative;
    z-index: 2;
    background-color: @color-white;

    .navigation-inner-container {
      display: table;
      width: 100%;

      .logo-container {
        .logo-inner-container {
          position: relative;
          padding: 11.5px;
          #logo {
            display: table-cell;
            vertical-align: middle;
            height: 57px;
          }
        }
      }

      .search-container {
        position: relative;
        display: table-cell;
        width: 100%;
        vertical-align: middle;
        visibility: hidden;

        .search-inner-container {
          display: table;
          width: 100%;

          .search-icon-container {
            display: table-cell;

            #search-icon {
              display: inline-block;
              padding-left: 12px;
              font-size:18px;
            }
          }

          .search-input-container {
            display: table-cell;
            width: 100%;

            input {
              display: table-cell;
              width: 100%;
              height: 80px;
              padding-left: 10px;
              border: none;
              outline: none;
              font-size: 17px;
              font-weight: 300;
            }
          }
        }
      }

      .button-container {
        display: none;
        vertical-align: middle;
        padding-right: 18px;

        .button-inner-container {

          .button-wrapper {
            display: table-cell;
            list-style: none;
            margin: 0;
            padding: 0;

            .button-item-container {
              display: table-cell;

              .button-item-wrapper {
                height: 80px;
                line-height: 80px;
                background: transparent;
                display: inline-block;
                padding: 0 8px;
                white-space: nowrap;

                .button-item {
                  display: inline-block;
                  padding: 8px;
                  vertical-align: middle;
                  line-height: 1;

                  a {
                    color: @color-font-gray;
                    font-weight: 400;
                    font-size: 16px;
                    text-decoration: none;

                    &:hover {
                      text-decoration: underline;
                    }
                  }
                }

                #user-logo {
                  display: inline-block;
                  cursor: pointer;
                  width: 40px !important;
                  height: 40px !important;
                  background-repeat: no-repeat !important;
                  background-size: cover !important;
                  background-position: 50% 50% !important;
                  border-radius: 20px;
                  border: 2px solid @color-light-grey;
                }
              }
            }
          }
        }
      }
    }
  }

  @media ( min-width: 744px ) {

  }
  @media ( min-width: 1128px ) {
    .navigation-container {
      .navigation-inner-container {
        .button-container {
          display: table-cell;
        }
      }
    }
  }
</style>
