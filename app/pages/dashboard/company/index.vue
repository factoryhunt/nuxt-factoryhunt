<template>
  <div class="dashboard-page-container">

    <spinkit id="modal-spinkit"></spinkit>

    <!-- Right-side sticky UI container -->
    <!--<div class="right-container">-->
    <!--<div class="sticky-container">-->
    <!--<div class="each-container">-->
    <!--<p class="title">{{ msg.sticky.first.title }}</p>-->
    <!--<p class="sub-title">{{ msg.sticky.first.subTitle }}</p>-->
    <!--</div>-->
    <!--<div class="each-container">-->
    <!--<p class="title">{{ msg.sticky.second.title }}</p>-->
    <!--<p class="sub-title">{{ msg.sticky.second.subTitle }}</p>-->
    <!--</div>-->
    <!--<div class="each-container">-->
    <!--<p class="title">{{ msg.sticky.third.title }}</p>-->
    <!--<p class="sub-title">{{ msg.sticky.third.subTitle }}</p>-->
    <!--</div>-->
    <!--<div class="caption-container">-->
    <!--<p class="caption">{{ msg.sticky.caption }}</p>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->

    <!-- Left-side UI container -->
    <form class="form-container" @submit.prevent="onEditButton(value)">

      <!-- Company Name -->
      <div class="account-name-container input-container">
        <p class="title">{{ $t('dashboardCompany.name.title') }}</p>
        <span class="required-text" v-html="$t('dashboardCompany.name.required')"></span>
        <p class="sub-title">{{ $t('dashboardCompany.name.desc') }}</p>
        <input required pattern="[A-Za-z0-9 ().,]{2,50}" :title="$t('dashboardCompany.name.inputTitle')" id="account-name-input" type="text" :placeholder="$t('dashboardCompany.name.placeholder')" v-model="value.accountName" spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="off">
        <p class="hidden-title"></p>
        <i id="account-name-mark" class="small-mark" aria-hidden="true"></i>
      </div>

      <!-- Company Short Description -->
      <div class="short-description-container input-container">
        <p class="title">{{ $t('dashboardCompany.slogan.title') }}</p>
        <p class="sub-title">{{ $t('dashboardCompany.slogan.desc') }}</p>
        <input id="short-description-input" maxlength="150" :title="$t('dashboardCompany.slogan.inputTitle')" pattern="[A-Za-z0-9 .,']{2,150}" @keyup="countInputLength" :placeholder="$t('dashboardCompany.slogan.placeholder')" v-model="value.shortDescription">
        <p class="third-title">{{ 150 - value.shortDescriptionCount }}</p>
      </div>

      <!-- Company Long Description -->
      <div class="description-container input-container">
        <p class="title">{{ $t('dashboardCompany.description.title') }}</p>
        <p class="sub-title">{{ $t('dashboardCompany.description.desc') }}</p>
        <textarea id="description-input" pattern="[A-Za-z0-9 ().,]{1,25000}" :title="$t('dashboardCompany.description.inputTitle')" maxlength="25000" rows="10" :placeholder="$t('dashboardCompany.description.placeholder')" v-model="value.description"></textarea>
      </div>

      <!-- Company Information -->
      <div class="information-container input-container">
        <p class="title">{{ $t('dashboardCompany.company.title') }}</p>
        <p class="sub-title">{{ $t('dashboardCompany.company.desc') }}</p>
        <!-- Products -->
        <div class="box-container">
          <div class="left-contents">{{ $t('dashboardCompany.company.products.title') }}</div>
          <div class="right-contents"><input type="text" pattern="[A-Za-z0-9 ',-]{1,100}" :title="$t('dashboardCompany.company.products.inputTitle')" maxlength="100" :placeholder="$t('dashboardCompany.company.products.placeholder')" v-model="value.products"></div>
        </div>
        <!-- Website -->
        <div class="box-container">
          <div class="left-contents">{{ $t('dashboardCompany.company.website.title') }}</div>
          <div class="right-contents"><input type="text" pattern="[A-Za-z0-9 .]{1,100}" :title="$t('dashboardCompany.company.website.inputTitle')" maxlength="100" :placeholder="$t('dashboardCompany.company.website.placeholder')" v-model="value.website" spellcheck="false"></div>
        </div>
        <!-- Phone -->
        <div class="box-container">
          <div class="left-contents">{{ $t('dashboardCompany.company.phone.title') }}</div>
          <div class="right-contents"><input type="text" maxlength="21" pattern="[0-9 +-]{1,21}" :title="$t('dashboardCompany.company.phone.inputTitle')" :placeholder="$t('dashboardCompany.company.phone.placeholder')" v-model="value.phone"></div>
        </div>
        <!-- Established Year -->
        <div class="box-container">
          <div class="left-contents">{{ $t('dashboardCompany.company.year.title') }}</div>
          <div class="right-contents"><input type="text" maxlength="10" pattern="[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])" title ="YYYY-MM-DD" :placeholder="$t('dashboardCompany.company.year.placeholder')" v-model="value.establishedDate"></div>
        </div>
        <p class="sub-title" style="margin-top: 12px">{{ $t('dashboardCompany.company.desc2') }}</p>
        <!-- Country -->
        <div class="box-container">
          <div class="left-contents">{{ $t('dashboardCompany.company.country.title') }}</div>
          <div class="right-contents">
            <select required title="required" v-model="value.country">
              <option id="disabled-option" disabled value="">{{ $t('dashboardCompany.company.country.defaultValue') }}</option>
              <option v-for="(country,index) in value.country_list" :key="index" :value="country.country_name">{{country.country_name}}</option>
            </select>
          </div>
        </div>
        <!-- State -->
        <div class="box-container">
          <div class="left-contents">{{ $t('dashboardCompany.company.state.title') }}</div>
          <div class="right-contents"><input type="text" maxlength="50" pattern="[A-Za-z -]{1,50}" :title="$t('dashboardCompany.company.state.inputTitle')" :placeholder="$t('dashboardCompany.company.state.placeholder')" v-model="value.state"></div>
        </div>
        <!-- City -->
        <div class="box-container">
          <div class="left-contents">{{ $t('dashboardCompany.company.city.title') }}</div>
          <div class="right-contents"><input type="text" maxlength="50" pattern="[A-Za-z -]{1,50}" :title="$t('dashboardCompany.company.city.inputTitle')" :placeholder="$t('dashboardCompany.company.city.placeholder')" v-model="value.city"></div>
        </div>
        <!-- Street Address -->
        <div class="box-container">
          <div class="left-contents">{{ $t('dashboardCompany.company.street.title') }}</div>
          <div class="right-contents"><input type="text" maxlength="100" pattern="[A-Za-z0-9 -.,#()]{1,50}" :title="$t('dashboardCompany.company.street.inputTitle')" :placeholder="$t('dashboardCompany.company.street.placeholder')" v-model="value.streetAddress" @keyup="checkPostalCode(value.postalCode)"></div>
        </div>
        <!-- Street Address Detail -->
        <div class="box-container">
          <div class="left-contents">{{ $t('dashboardCompany.company.street2.title') }}</div>
          <div class="right-contents"><input type="text" maxlength="100" pattern="[A-Za-z0-9 -.,#()]{1,50}" :title="$t('dashboardCompany.company.street2.inputTitle')" :placeholder="$t('dashboardCompany.company.street2.placeholder')" v-model="value.streetAddressDetail"></div>
        </div>
        <!-- Postal Code -->
        <div class="box-container">
          <div class="left-contents">{{ $t('dashboardCompany.company.postal.title') }}</div>
          <div class="right-contents"><input type="text" pattern="[0-9-]{1,10}" :title="$t('dashboardCompany.company.postal.inputTitle')" :placeholder="$t('dashboardCompany.company.postal.placeholder')" v-model="value.postalCode"></div>
        </div>
      </div>

      <!-- Company History -->
      <div class="history-container input-container">
        <p class="title">{{ $t('dashboardCompany.history.title') }}</p>
        <p class="sub-title" v-html="$t('dashboardCompany.history.desc')"></p>
        <textarea rows="10" maxlength="25000" :title="$t('dashboardCompany.history.inputTitle')" :placeholder="$t('dashboardCompany.history.placeholder')" v-model="value.history"></textarea>
        <i id="history-mark" class="small-mark" aria-hidden="true"></i>
      </div>

      <!-- Confirm and Submit -->
      <div class="confirm-container input-container sticky-stopper">
        <p class="title">{{ $t('dashboardCompany.save.title') }}</p>
        <p class="sub-title">{{ $t('dashboardCompany.save.desc') }}</p>
        <button class="button-orange">{{ $t('dashboardCompany.save.button') }}</button>
      </div>
    </form>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  import country from '~/assets/models/country.json'
  import Spinkit from '~/components/Loader'
  import { mapGetters } from 'vuex'
  export default {
    layout: 'dashboard',
    components: {
      Spinkit
    },
    data () {
      return {
        value: {
          country_list: country,
          contact: {},
          mainImageUrl: '',
          mainImageFileName: '',
          logoUrl: '',
          logoImageFileName: '',
          accountName: '',
          shortDescription: '',
          shortDescriptionCount: 0,
          description: '',
          products: '',
          website: '',
          phone: '',
          establishedDate: '',
          country: '',
          state: '',
          city: '',
          postalCode: '',
          streetAddress: '',
          streetAddressDetail: '',
          history: ''
        },
        toggle: {
          isDomainAvailable: null,
          isAccountNameAvailable: null,
          isUserAdmin: false
        }
      }
    },
    computed: {
      ...mapGetters({
        account: 'auth/GET_ACCOUNT',
        conatct: 'auth/GET_CONTACT'
      })
    },
    methods: {
      applyAttributes () {
        // when login user is page admin, keep going
        this.applyLocalData(this.account)
        this.applyInputFocusBlurEvent()
      },
      // update server data to local data
      applyLocalData (account) {
        this.value.mainImageUrl = account.account_image_url_1
        this.value.logoUrl = account.thumbnail_url
        this.value.accountName = account.account_name_english
        this.value.description = account.company_description_english
        this.value.shortDescription = account.company_short_description_english
        this.value.shortDescriptionCount = account.company_short_description_english.length
        this.value.products = account.products_english
        this.value.phone = account.phone
        this.value.website = account.website
        this.value.establishedDate = this.getYear(account.established_date)
        this.value.country = account.mailing_country_english
        this.value.state = account.mailing_state_english
        this.value.city = account.mailing_city_english
        this.value.postalCode = account.mailing_postal_code_english
        this.value.streetAddress = account.mailing_street_address_english
        this.value.streetAddressDetail = account.mailing_street_address_2_english
        this.value.history = account.history
      },
      getYear (date) {
        if (date === '0000-00-00') {
          return ''
        }
        let temp = new Date(date)
        let year = temp.getFullYear()
        let month = (temp.getMonth() + 1)
        let day = temp.getDate()
        if (month < 10) {
          month = '0' + month
        }
        if (day < 10) {
          day = '0' + day
        }
        return `${year}-${month}-${day}`
      },
      checkAllInputOnce (value) {
        this.checkAccountName(value.accountName)
      },
      checkAccountName (value) {
        const accountNameMark = $('#account-name-mark')
        const hiddenTitle = $('.account-name-container > .hidden-title')
        if (value) {
          this.toggle.isAccountNameAvailable = true
          this.msg.accountName.hiddenTitle = ''
          accountNameMark.removeClass('fa fa-exclamation')
        } else {
          this.toggle.isAccountNameAvailable = false
          this.msg.accountName.hiddenTitle = '필수 입력 항목입니다.'
          hiddenTitle.css({'color': 'red'})
          accountNameMark.addClass('fa fa-exclamation')
        }
      },
      checkPostalCode (postalCode) {
        this.value.postalCode = postalCode.replace(/[^0-9]/g, '')
      },
      onEditButton (value) {
        // modal loading start
        $('#modal-spinkit').removeClass().addClass('spinkit-modal')

        // props
        const data = {
          account_name_english: value.accountName,
          company_short_description_english: value.shortDescription,
          company_description_english: value.description,
          products_english: value.products,
          website: value.website,
          phone: value.phone,
          established_date: value.establishedDate,
          mailing_country_english: value.country,
          mailing_state_english: value.state,
          mailing_city_english: value.city,
          mailing_postal_code_english: value.postalCode,
          mailing_street_address_english: value.streetAddress,
          mailing_street_address_2_english: value.streetAddressDetail,
          history: value.history
        }
        // request
        axios.put(`/api/data/account/${this.account.account_id}`, {
          account_data: data
        })
          .then(() => {
            this.onEditSuccess()
          })
          .catch(() => {
            this.onEditFail()
          })
      },
      showAlert (alertState, msg) {
        $(document).ready(() => {
          const $alert = $('#alert')
          this.$store.commit('alert/changeState', {
            alertState,
            msg
          })
          $alert.show()
          setTimeout(() => {
            $('.alert-container').hide()
          }, 6000)
        })
      },
      onEditSuccess () {
        $('#modal-spinkit').removeClass()
        this.showAlert(true, this.$t('alert.success'))
      },
      onEditFail () {
        $('#modal-spinkit').removeClass()
        this.showAlert(false, this.$t('alert.fail'))
      },
      // jQuery for CSS
      applyStickyCSS () {
        $(document).ready(function () {
          const $sticky = $('.sticky-container')
//          const $stickyStopper = $('.sticky-stopper')
          if ($sticky.offset()) { // make sure ".sticky" element exists
//            var generalSidebarHeight = $sticky.innerHeight() // 30
            var stickyTop = $sticky.offset().top
//            var stickyBottom = stickyTop + $sticky.outerHeight()
            var stickOffset = 110
//            var stickyStopperPosition = $stickyStopper.offset().top // 2259
//            var stopPoint = stickyStopperPosition - generalSidebarHeight - stickOffset
//            var diff = stopPoint + stickOffset
            $(window).scroll(function () { // scroll event
              var windowTop = $(window).scrollTop() // returns number
//              console.log('windowTop: ', windowTop)
//              console.log('stickyTop: ', stickyTop)
//              console.log('stickyBottom: ', stickyBottom)
//              console.log('stickyStopperPosition: ', stickyStopperPosition)
//              console.log('stopPoint: ', stopPoint)
//              console.log('diff: ', diff)
              if (stickyTop - windowTop < stickOffset) {
                $sticky.css({
                  'position': 'fixed',
                  'top': stickOffset,
                  'width': '310px'
                })
              } else {
                $sticky.css({
                  'position': 'absolute',
                  'top': 'initial'
                })
              }
//              else if (stickyStopperPosition - windowTop < 0) {
//                $sticky.css({
//                  'position': 'absolute',
//                  'bottom': stickyStopperPosition
//                })
            })
          }
        })
      },
      applyInputFocusBlurEvent (input, mark) {
        const accountNameInput = $('#account-name-input')
        const accountNameMark = $('#account-name-mark')
        const hiddenTitle = $('.account-name-container > .hidden-title')

        accountNameInput.blur(() => {
          if (this.value.accountName) {
            this.toggle.isAccountNameAvailable = true
            this.msg.accountName.hiddenTitle = ''
            accountNameMark.removeClass('fa fa-exclamation')
          } else {
            this.toggle.isAccountNameAvailable = false
            this.msg.accountName.hiddenTitle = '필수 입력 항목입니다.'
            hiddenTitle.css({'color': 'red'})
            accountNameMark.addClass('fa fa-exclamation')
          }
        })
      },
      preventEnterKeySubmit () {
        $('input').keydown(() => {
          if (event.keyCode === 13) {
            event.preventDefault()
          }
        })
      },
      countInputLength () {
        this.value.shortDescriptionCount = $('#short-description-input').val().length
      }
    },
    mounted () {
      this.applyAttributes()
    }
  }
</script>

<style lang="less" scoped>
  @import '~assets/css/index';

  /* Global CSS */

  .title {
    display: inline-block;
    font-size: 32px;
    font-weight:700;
    margin: 0;
  }
  .sub-title {
    font-size: 24px;
    font-weight:300;
    margin-bottom:10px;
  }
  /* Global CSS */
  .information-container {
    position: relative;
  }

  .description-container {
    position: relative;
  }

  .history-container {
    position: relative;
  }

  .certification-container {
    position: relative;
  }
  .required-text {
    display: inline-block;
    vertical-align: top;
    padding-top: 4px;
    padding-left: 4px;
    color: @color-orange;
    font-size: 10px;
  }

  @media ( min-width: 768px ) {
    .image-container {
      height: 460px;
    }

    .left-container {
    }

    .header-container .title {
      padding-right: 75px;
    }
    .header-container .logo {
      width: 70px;
      border-radius: 35px;
      border: 1px solid #eeeeee;
    }

    .right-container {
      max-width: 600px;
      margin: 0 auto 30px auto;
    }

    .location-container {  }
    .location-container #map {
      margin: 30px 0;
      width: 100%;
      min-height: 450px;
    }
  }

  @media ( min-width: 1128px ) {

    @height: 50px;
    @mark-right-amount: 12px;
    @small-mark-right-amount: 18px;
    @mark-bottom-amount: 16px;
    @font-size-button: 22px;
    @font-weight-button: 600;

    /* Global CSS */
    .dashboard-page-container {
    }

    .input-container {
      margin-bottom: 40px;
    }

    .title {
      font-size: 30px;
      font-weight:600;
      margin-top: 0;
    }
    .sub-title {
      font-size: 20px;
      font-weight:300;
      margin-bottom: 4px;
    }
    .third-title {
      font-size: 15px;
      font-weight:600;
      margin: 0;
    }
    input {
      width: 100%;
      height: @height;
      font-size: 20px !important;
      font-weight: 400;
      margin-bottom: 5px !important;

      &:focus,
      &:active,
      &:visited {
        -webkit-transition: all 500ms;
        -moz-transition: all 500ms;
        -ms-transition: all 500ms;
        -o-transition: all 500ms;
        transition: all 500ms;
        border: 1px solid @color-link;
      }
    }
    label {
      .upload-label-basic;
      border: 1px solid @color-font-base;
      margin-top: 10px;
      font-size: @font-size-button;
      font-weight: @font-weight-button;
    }
    textarea {
      font-size: 20px !important;
      font-weight: 400 !important;

      &:focus,
      &:active,
      &:visited {
        -webkit-transition: all 500ms;
        -moz-transition: all 500ms;
        -ms-transition: all 500ms;
        -o-transition: all 500ms;
        transition: all 500ms;
        border: 1px solid @color-link;
      }
    }
    select {
      font-size: 20px !important;
      font-weight: 400 !important;
      margin-bottom: 5px !important;
      height: @height !important;
    }
    button {
      font-size: @font-size-button;
      font-weight: @font-weight-button;
      border: 1px solid @color-orange;
    }

    .big-mark {
      position: absolute;
      font-size: 28px;
      font-weight: 100;
      right: @mark-right-amount;
    }
    .small-mark {
      position: absolute;
      font-size: 22px;
      font-weight: 100;
      width: 30px;
      color: @color-font-base;
      right: @small-mark-right-amount
    }

    .account-name-container {
      position: relative;

      #account-name-mark {
        top: 105px;
        right: -3px;
        color: @color-red;
      }
    }

    .short-description-container {
      .third-title {
        text-align: right;
      }
    }

    .description-container {
      position: relative;

      #description-mark {
        bottom: @mark-bottom-amount;
      }
    }

    .information-container {
      position: relative;

      #products-mark {
        top: 104px;
        /*right: 11px;*/
        left: 15px;
      }
      #website-mark {
        top: 160px;
        /*right: 18px;*/
        left: 18px;
      }
      #phone-mark {
        top: 216px;
        /*right: 19px;*/
        left: 19px;
      }
      #established-date-mark {
        top: 270px;
        /*right: 17px;*/
        left: 17px;
      }
      #country-mark {

      }
      #state-mark {

      }
      #city-mark {

      }
      #postal-code-mark {

      }
      #street-address-mark {

      }
      #street-address-detail-mark {

      }
    }

    .history-container {
      position: relative;
      #history-mark {
        bottom: @mark-bottom-amount;
      }
    }

    .certification-container {}

    .confirm-container {
      .title {
        margin-bottom: 0 !important;
      }
      .sub-title {
        margin-bottom: 10px !important;
      }
      button {
        font-size: @font-size-button;
        font-weight: @font-weight-button;
      }
    }
  }
</style>
