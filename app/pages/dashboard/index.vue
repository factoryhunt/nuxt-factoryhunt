<template>
  <section class="page-container">

    <!-- Left-side -->
    <left-navigation/>

    <!-- Right-side -->
    <div class="right-container">

      <!-- Header -->
      <header class="header-container">
        <p class="sub-title">
          {{ $t('dashboard.welcome', {name: getAccountName}) }}
          <span v-if="isTesterAccount"><br>This app is 1.2.1 version.</span>
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

        <div class="box-container" v-show="isUserSupplier">
          <div class="title-container">
            <nuxt-link to="/dashboard/company/domain" class="button">{{ $t('dashboard.edit') }}</nuxt-link>
            <p class="title">{{ $t('dashboard.domain.title') }}</p>
          </div>
          <div class="text-container">
            <p class="text">Customized your page URL and share it with your potential business partners.</p>
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
            <p class="text">Update company information and create a company page in a minute.</p>
          </div>
        </div>

        <div class="box-container" v-show="isUserSupplier">
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
            <p class="text">Update your contact details. You will be connected with potential business partner.</p>
          </div>
        </div>

      </div>

    </div>

  </section>
</template>

<script>
import LeftNavigation from './components/LeftNavigation'
import Clipboard from 'clipboard'
import { mapGetters } from 'vuex'
export default {
  layout: 'dashboard',
  head() {
    return {
      title: this.$t('dashboard.dashboard'),
      link: [{ hid: 'canonical', rel: 'canonical', href: `https://www.factoryhunt.com/dashboard` }]
    }
  },
  components: {
    LeftNavigation
  },
  data: _ => ({
    toggle: {
      imageLoaded: false
    }
  }),
  computed: {
    getAccountName() {
      return this.contact.first_name
        ? this.contact.salutation + ' ' + this.contact.first_name + ' ' + this.contact.last_name
        : this.contact.contact_email
    },
    ...mapGetters({
      account: 'auth/GET_ACCOUNT',
      contact: 'auth/GET_CONTACT',
      isLoggedIn: 'auth/isLoggedIn',
      isUserSupplier: 'auth/IS_USER_SUPPLIER'
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

.page-container {
  display: flex;
  padding-bottom: 60px;
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

.right-container {
  flex: 1;
  margin-left: 30px;

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
</style>
