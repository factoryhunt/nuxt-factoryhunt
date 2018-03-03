<template>
  <nav class="navigation-container">
    <div class="navigation-inner-container">

      <!-- Left Main Logo -->
      <div class="logo-container">
        <div class="logo-inner-container">
          <a href="/">
            <img id="logo" src="~assets/img/logo_white.png">
          </a>
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
              <input type="text" :placeholder="$t('navigationBar.search')" v-model="value.input">
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
            <li v-if="!isLoggedIn" class="button-item-container">
              <div class="button-item-wrapper">
                <div class="button-item">
                  <a id="promote-company" href="/for-supplier">{{ $t('navigationBar.promote') }}</a>
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
            <li v-if="!isLoggedIn" class="button-item-container">
              <div class="button-item-wrapper">
                <div class="button-item">
                  <a href="/login">{{ $t('navigationBar.login') }}</a>
                </div>
              </div>
            </li>
            <li v-if="isLoggedIn" class="button-item-container">
              <div class="button-item-wrapper">
                <div class="button-item">
                  <img v-if="account.thumbnail_url" :src="account.thumbnail_url" id="user-logo" @click="onProfileImage">
                  <img v-else src="~assets/img/temp-logo-image_english_512.png" id="user-logo" @click="onProfileImage">
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Toggle menu -> Invisible -->
      <!-- Profile Toggle Menu -->
      <div class="profile-toggle-container" v-if="isLoggedIn">
        <div class="dropdown-container">
          <div class="dropdown-pointer"></div>
          <div class="dropdown-pointer-bg"></div>
          <div class="dropdown-contents">
            <div class="user-container">
              <p class="user-email">{{contact.contact_email}}</p>
              <p class="user-company-name">{{account.account_name}}</p>
              <p class="user-name">{{contact.salutation + ' ' + contact.first_name + ' ' + contact.last_name}}</p>
            </div>
            <div class="footer-divider"></div>
            <div class="footer">
              <div class="footer-left">
                <a id="my-page-button" href="/dashboard">{{ $t('navigationBar.dashboard') }}</a>
              </div>
              <div class="footer-right">
                <a id="logout-button" @click="onLogoutButton">{{ $t('navigationBar.logout') }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        value: {
          input: this.$route.query.input
        },
        toggle: {
          isProfileDropdownShown: false
        }
      }
    },
    computed: {
      ...mapGetters({
        account: 'auth/GET_ACCOUNT',
        contact: 'auth/GET_CONTACT',
        isLoggedIn: 'auth/isLoggedIn'
      })
    },
    methods: {
      onLogoutButton () {
        this.$store.dispatch('auth/logout')
          .then(() => {
            location.replace('/')
          })
      },
      activateJquery () {
        $(document).ready(() => {
          this.renderSearchBar()
        })
      },
      renderSearchBar () {
        if (this.$route.path === '/') {
          $('.search-container').css({
            'visibility': 'hidden',
            'border-left': 'none'
          })
          $('.navigation-container').css('border-bottom', 'none')
        } else {
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
      },
      onProfileImage () {
        const dropdown = $('.profile-toggle-container')

        if (this.toggle.isProfileDropdownShown) dropdown.css({'display': 'none'})
        else dropdown.css({'display': 'inherit'})
        this.toggle.isProfileDropdownShown = !this.toggle.isProfileDropdownShown
      },
    },
    created () {
      console.log(this.account)
    },
    mounted () {
      this.activateJquery()
    },
    watch: {
      '$route' () {
        this.activateJquery()
      },
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

                  #promote-company {
                    font-weight: @font-weight-bold;
                    color: @color-link;
                    border: 2px solid @color-link;
                    border-radius: 5px;
                    padding: 12px 20px;
                    &:hover {
                      text-decoration: none;
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

      .profile-toggle-container {
        display: none;
        position: relative;
        right: 0;
        top: 75px;
        z-index: 9999 !important;

        .dropdown-container {
          position: absolute;
          width: 300px;
          border: 1px solid @color-light-grey;
          border-radius: @border-radius;
          top: 100% + 25px;
          right: 0;
          background-color: @color-white;
          min-width: 160px;
          box-shadow: 0 2px 10px rgba(0,0,0,.2);

          .dropdown-pointer {
            border-color: transparent;
            border-bottom-color: @color-white;
            border-style: dashed dashed solid;
            border-width: 0 8.5px 8.5px;
            position: absolute;
            height: 0;
            width: 0;
            top: -9px;
            right: 45px;
            z-index: 5;
          }
          .dropdown-pointer-bg {
            border-color: transparent;
            border-bottom-color: @color-light-grey;
            border-style: dashed dashed solid;
            border-width: 0 8.5px 8.5px;
            position: absolute;
            height: 0;
            width: 0;
            top: -10px;
            right: 45px;
            z-index: 4;
          }

          .dropdown-contents {
            width: 300px;
            border-radius: @border-radius;
            padding: 12px 20px;
            top: 100% + 25px;
            right: 0;
            background-color: @color-white;
            min-width: 160px;
            box-shadow: 0 2px 10px rgba(0,0,0,.2);
            z-index: 1;

            .user-container {
              margin-bottom: 50px;
              text-align: right;

              .user-email {
                margin: 0;
                font-weight: 400;
              }
              .user-company-name {
                font-size: 22px;
                font-weight: 500;
                margin: 0;
              }
              .user-name {
                font-size: 18px;
                font-weight: 300;
                margin: 0;
              }
            }

            .footer-divider {
              height: 1px;
              background-color: @color-light-grey;
              position: absolute;
              width: 100%;
              left: 0;
              right: 0;
              bottom: 60px;
            }

            .footer {
              display: table;
              width: 100%;
              margin-bottom: 5px;
              font-size: 16px;

              .footer-left {
                display: table-cell;
                text-align: left;

                #my-page-button {
                  display: inline !important;
                  margin: 0 12px;
                  color: @color-orange;
                  /*<!--border: 1px solid @color-deep-gray;-->*/
                  /*<!--border-radius: @border-radius;-->*/
                  /*<!--padding: 5px 12px;-->*/
                  /*<!--background-color: @color-light-grey;-->*/

                  &:hover {
                    //
                  }
                }
              }

              .footer-right {
                display: table-cell;
                text-align: right;

                #logout-button {
                  display: inline !important;
                  margin: 0 12px;
                  color: @color-font-base;
                  /*<!--border: 1px solid @color-deep-gray;-->*/
                  /*<!--border-radius: @border-radius;-->*/
                  /*<!--padding: 5px 12px;-->*/
                  /*<!--background-color: @color-light-grey;-->*/
                }
              }

              a {
                text-decoration: none !important;
                display: block !important;
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
