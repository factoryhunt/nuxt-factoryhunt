<template>
  <section class="page-container">

    <!-- Left-side -->
    <div class="left-container">
      <div class="profile-container">
        <div class="profile-inner-container">
          <div class="company-image-container" v-show="toggle.imageLoaded">
            <img v-if="account.logo_url" id="company-image" :src="account.logo_url">
            <img v-else id="company-image" src="~assets/img/temp-logo-image_english_512.png">
          </div>
          <div class="contents-container">
            <div class="title-contents">
              <p class="title">{{ account.account_name }}</p>
              <p v-if="contact.first_name" class="sub-title">{{contact.first_name + ' ' + contact.last_name}}<small></small></p>
            </div>
            <button id="view-button" @click="routeCompanyPage" class="view-button button-white">{{ $t('dashboard.viewWebsite') }}</button>
            <button id="edit-button" @click="routeCompanyEditPage" class="edit-button button-white">{{ $t('dashboard.edit') }}</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Right-side -->
    <div class="right-container">

      <!-- Header -->
      <header class="header-container">
        <p class="sub-title">
          {{ $t('dashboard.welcome', {name: getAccountName}) }}
          <span v-if="isTesterAccount"><br>This app is 0.7.7.5 version.</span>
        </p>
      </header>

      <!-- Link -->
      <!--<div class="link-container">-->
      <!--<p class="text">회사 정보를 입력하고 멋진 홈페이지를 바이어에게 공유하세요! 몇 분만 투자하면 됩니다.</p>-->
      <!--<a @click="removeLinkContainer"><icon class="cancel-button" name="times" scale="1.4"></icon></a>-->
      <!--</div>-->

      <!-- Body -->
      <div class="body-container">

        <p class="title">{{ $t('dashboard.dashboard') }}</p>

        <div class="box-container">
          <div class="title-container">
            <nuxt-link to="/dashboard/company/domain" class="button">{{ $t('dashboard.edit') }}</nuxt-link>
            <p class="title">{{ $t('dashboard.domain.title') }}</p>
          </div>
          <div class="text-container">
            <p class="text">{{ $t('dashboard.domain.desc') }}</p>
            <a id="clipboard" data-clipboard-target="#domain-text">
              <span id="domain-text" class="text">https://www.factoryhunt.com/{{account.domain}}
              </span>
            </a>
            <span id="copied-text">{{ $t('dashboard.domain.linkCopied') }}</span>
          </div>
        </div>

        <div class="box-container">
          <div class="title-container">
            <nuxt-link to="/dashboard/company" class="button">{{ $t('dashboard.edit') }}</nuxt-link>
            <p class="title">{{ $t('dashboard.company.title') }}</p>
          </div>
          <div class="text-container">
            <p class="text">{{ $t('dashboard.company.desc') }}</p>
          </div>
        </div>

        <div class="box-container">
          <div class="title-container">
            <nuxt-link to="/dashboard/product" class="button">{{ $t('dashboard.edit') }}</nuxt-link>
            <p class="title">{{ $t('dashboard.product.title') }}</p>
          </div>
          <div class="text-container">
            <p class="text">{{ $t('dashboard.product.desc') }}</p>
          </div>
        </div>

        <div class="box-container">
          <div class="title-container">
            <nuxt-link to="/dashboard/account" class="button">{{ $t('dashboard.edit') }}</nuxt-link>
            <p class="title">{{ $t('dashboard.account.title') }}</p>
          </div>
          <div class="text-container">
            <p class="text">{{ $t('dashboard.account.desc') }}</p>
          </div>
        </div>

      </div>

    </div>

  </section>
</template>

<script>
import Clipboard from 'clipboard'
import { mapGetters } from 'vuex'
export default {
  head() {
    return {
      title: this.$t('dashboard.dashboard'),
      link: [{ hid: 'canonical', rel: 'canonical', href: `https://www.factoryhunt.com/dashboard` }]
    }
  },
  data() {
    return {
      toggle: {
        imageLoaded: false
      }
    }
  },
  layout: 'dashboard',
  computed: {
    getAccountName() {
      return this.contact.first_name
        ? this.contact.salutation + ' ' + this.contact.first_name + ' ' + this.contact.last_name
        : this.contact.contact_email
    },
    ...mapGetters({
      account: 'auth/GET_ACCOUNT',
      contact: 'auth/GET_CONTACT',
      isLoggedIn: 'auth/isLoggedIn'
    }),
    isTesterAccount() {
      return this.contact.contact_level === '0'
    }
  },
  methods: {
    removeLinkContainer() {
      $('.link-container').fadeOut(500, () => {
        $(this).remove()
      })
    },
    routeCompanyPage() {
      window.open(`/${this.account.domain}`)
    },
    routeCompanyEditPage() {
      this.$router.push('/dashboard/company')
    },
    activateClipboardJS() {
      const clipboard = new Clipboard('#clipboard')
      clipboard.on('success', e => {
        //          console.info('Action:', e.action)
        //          console.info('Text:', e.text)
        //          console.info('Trigger:', e.trigger)
        $('#copied-text')
          .show()
          .delay(1000)
          .fadeOut(500)
        e.clearSelection()
      })
      clipboard.on('error', e => {
        alert('Copied failed. Please try again.')
      })
    },
    resizeLogoImage() {
      const $profileInnerContainer = $('.profile-inner-container')
      const $imageContainer = $('.company-image-container')
      const width = `${$profileInnerContainer.width()}px`
      $imageContainer.css({
        width: width,
        height: width
      })
      this.toggle.imageLoaded = true
    },
    activateJquery() {
      $(document).ready(() => {
        this.activateClipboardJS()
        this.resizeLogoImage()
      })
    }
  },
  mounted() {
    this.activateJquery()
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';

// Header
.header-container {
  .title {
    font-size: 30px;
    font-weight: 600;
  }
}

p {
  margin: 0;
}

.title {
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 8px;
}
.sub-title {
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 8px;
}

.page-container {
  .left-container {
    .profile-container {
      position: absolute;
      left: 0;
      top: 0;
      width: 240px;
      border: 1px solid @color-light-grey;
      border-radius: @border-radius;

      .profile-inner-container {
        width: 100%;
        position: relative;
        text-align: center;

        .company-image-container {
          display: flex;
          background-color: @color-white;

          #company-image {
            max-width: 100% !important;
            max-height: 100% !important;
            width: auto !important;
            height: auto !important;
            margin: auto !important;
          }
        }

        .contents-container {
          border-top: 1px solid @color-lightest-grey;
          padding-top: 12px;
          padding-right: 20px;
          padding-left: 20px;

          .title-contents {
            margin-bottom: 22px;
            .title {
              font-weight: 500;
              font-size: 24px;
              margin: 0;
            }
            .sub-title {
              font-size: 20px;
              font-weight: 300;
              margin: 0;
            }
          }
          button {
            color: @color-font-base;
            border: 1px solid @color-input-placeholder;
            width: 100%;
            font-size: 14px;
            margin-bottom: 8px;
            padding-top: 6px;
            padding-bottom: 6px;
            font-weight: 600;
          }
          #edit-button {
            margin-bottom: 18px;
          }
        }
      }
    }
  }

  .right-container {
    padding-left: 270px;

    .header-container {
    }

    .link-container {
      position: relative;
      background-color: @color-link;
      border-radius: @border-radius;
      margin-bottom: 50px;

      .text {
        opacity: 1;
        font-size: 17px;
        font-weight: 400;
        padding: 8px 20px;
        height: 90px;
        color: @color-white;
      }

      .cancel-button {
        position: absolute;
        right: 16px;
        top: 9px;
        font-weight: 100;
        color: @color-white;
      }
    }

    .body-container {
      .box-container {
        display: block;
        border: 1px solid @color-light-grey;
        border-radius: @border-radius;
        margin-bottom: 30px;

        .title-container {
          padding: 8px 20px;
          background-color: @color-lightest-grey;
          border-top-left-radius: 2px;
          border-top-right-radius: 2px;

          .title {
            font-size: 17px;
            font-weight: 500;
            margin-bottom: 0;
          }
          .button {
            color: @color-font-base;
            border: 1px solid @color-deep-gray;
            border-radius: @border-radius;
            padding: 2px 8px;
            font-size: 14px;
            text-decoration: none;
            float: right;
          }
        }

        .text-container {
          padding: 8px 20px;
          font-size: 18px;
          font-weight: 300;
          margin: 10px 0;

          .text {
            font-size: 18px;
          }

          #share-button {
            vertical-align: middle;
            margin-left: 5px;
          }
          #copied-text {
            display: none;
            margin-left: 8px;
            color: @color-font-base;
            font-size: 16px;
            font-weight: 500;
          }
        }
      }
    }
  }
}
</style>
