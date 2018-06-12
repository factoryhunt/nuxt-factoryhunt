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
          <a class="each-button" href="/terms">{{ $t('terms.short') }}</a>
          <a class="each-button" href="/privacy">{{ $t('privacy.short') }}</a>
          <!-- Translation -->
          <!-- <span class="language-container each-button">
            <select v-model="language" @change="onLanguageSelect($event.target.value)" name="languages" id="languages">
              <option value="" disabled>Languages</option>
              <option value="eng">English</option>
              <option value="kor">한국어</option>
            </select>
          </span> -->
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { setLocaleOnServerSession } from '~/utils/i18n'
export default {
  data() {
    return {
      language: this.$store.state.i18n.locale
    }
  },
  methods: {
    onLanguageSelect(locale) {
      setLocaleOnServerSession(locale)
      const payload = {
        locale,
        i18n: this.$i18n
      }
      this.$store.commit('i18n/SET_LANG', payload)
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
        vertical-align: top;

        .logo-container {
          display: table-cell;
          #logo {
            vertical-align: top;
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
        margin-left: 10px;
      }

      a {
        font-weight: 400;
        color: @color-font-gray;
        font-size: @font-size-extra-small;
      }

      .language-container {
        margin-top: 10px;
        position: relative;
        border: 1px solid @color-light-grey;
        display: inline-block;
        border-radius: @border-radius;

        select {
          width: 100%;
          border: none !important;
          font-size: 17px;
          padding-right: 20px;
          background-position: 90% center;
        }
      }
    }
  }
}

@media (min-width: 744px) {
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
              vertical-align: middle;
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
          font-size: @font-size-small;
          vertical-align: middle;
        }

        .language-container {
          margin-top: 0;
          select {
          }
          #arrow-icon {
          }
        }
      }
    }
  }
}
@media (min-width: 1128px) {
}
</style>
