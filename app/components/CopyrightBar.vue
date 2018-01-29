<template>
  <div class="body-container">
    <div class="body-wrapper">
      <div class="footer-container">

        <!-- Left-side -->
        <div class="left-container">
          <div class="copyright-container">
            <div class="logo-container">
              <img id="logo" src="~assets/img/favicon_gray.png">
            </div>
            <div class="text-container">
              <span><i class="fa fa-copyright"></i> 2018 Factory Hunt</span>
            </div>
          </div>
        </div>

        <!-- Right-side -->
        <div class="right-container">
          <nuxt-link class="each-button" to="/terms">{{ $t('terms.short') }}</nuxt-link>
          <nuxt-link class="each-button" to="/privacy">{{ $t('privacy.short') }}</nuxt-link>
          <span class="language-container each-button">
            <select v-model="language" @change="onLanguageSelect($event.target.value)" name="languages" id="languages">
              <option value="" disabled>Languages</option>
              <option value="eng">English</option>
              <option value="kor">한국어</option>
            </select>
            <i id="arrow-icon" class="fa fa-angle-down"></i>
          </span>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        language: this.$store.state.i18n.locale
      }
    },
    methods: {
      onLanguageSelect (locale) {
        this.$i18n.locale = locale
        this.$store.commit('i18n/SET_LANG', locale)
        window.scrollTo(0, 0)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '~assets/css/index';

  .body-container {

    .body-wrapper {
      border-top: 1px solid @color-light-grey;
      padding-top: 24px !important;
      padding-bottom: 60px !important;
    }

    .footer-container {
      display: table;
      width: 100%;

      .left-container {
        display: table-cell;
        vertical-align: top;

        .copyright-container {
          display: table-cell;
          vertical-align: middle;

          .logo-container {
            display: table-cell;
            #logo {
              vertical-align: middle;
              width: 22px;
              height: 22px;
            }
          }

          .text-container {
            display: table-cell;
            vertical-align: middle;

            .fa-copyright {
              font-size: 13px;
            }
            span {
              color: @color-font-gray;
              margin-left: 5px;
              font-weight: 400;
              font-size: 16px;
              white-space: nowrap;
            }
          }

        }
      }

      .right-container {
        display: table-cell;
        text-align: right;
        vertical-align: middle;

        .each-button {
          margin-left: 6px;
          vertical-align: top;
        }

        a {
          font-weight: 400;
          color: @color-font-gray;
          font-size: 16px;
        }

        .language-container {
          position: relative;
          border: 1px solid @color-light-grey;
          display: inline-block;
          border-radius: @border-radius;

          select {
            width: 100%;
            border: none;
            font-size: 17px;
            padding-right: 20px;
          }
          #arrow-icon {
            position: absolute;
            font-size: 25px;
            top: 8px;
            right: 10px;
          }
        }
      }
    }
  }

  @media ( min-width: 744px ) {
    .body-container {

      .body-wrapper {
      }

      .footer-container {
        .left-container {
          vertical-align: middle;

          .copyright-container {
            vertical-align: middle;

            .logo-container {
              #logo {
              }
            }

            .text-container {

              .fa-copyright {
                font-size: 13px;
              }
              span {
                font-size: 16px;
              }
            }

          }
        }

        .right-container {
          vertical-align: middle;

          .each-button {
            vertical-align: middle;
          }

          a {
            vertical-align: middle;
          }

          .language-container {
            select {
            }
            #arrow-icon {
            }
          }
        }
      }
    }
  }
  @media ( min-width: 1128px ) {
  }
</style>
