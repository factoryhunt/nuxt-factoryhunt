<template>
  <div class="dashboard-page-container">

    <div class="modal-background visible" v-if="toggle.isSaving">
      <div class="modal-content">
        <loader id="loader" class="spinkit-default "></loader>
      </div>
    </div>

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
    <form class="form-container" @submit.prevent="onEditButton">

      <!-- Company Name -->
      <div class="account-name-container input-container">
        <p class="title">{{ $t('dashboardCompany.name.title') }}</p>
        <span class="required-text" v-html="$t('dashboardCompany.name.required')"></span>
        <p class="sub-title">{{ $t('dashboardCompany.name.desc') }}</p>
        <input
          required
          pattern="[A-Za-z0-9 ().,&]{2,50}"
          :title="$t('dashboardCompany.name.inputTitle')"
          id="account-name-input"
          type="text"
          :placeholder="$t('dashboardCompany.name.placeholder')"
          v-model="value.accountName"
          spellcheck="false"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off">
        <i id="account-name-mark" class="small-mark" aria-hidden="true"></i>
      </div>

      <!-- Business Type -->
      <div class='business-type-container input-container'>
        <p class="title">{{ $t('dashboardCompany.businessType.title') }}</p>
        <span class="required-text" v-html="$t('dashboardCompany.name.required')"></span>
        <p class="sub-title">{{ $t('dashboardCompany.businessType.desc') }}</p>
        <div class="checkbox-container" v-for="(business, index) in business_type" :key="index">
          <input
            class="business-type-checkbox"
            type="checkbox"
            :id="business.value"
            :value="business.value"
            v-model="value.businessTypes"
            @change="onCheckbox">
          <label class="checkbox-label" :for="business.value">{{business.value}}</label>
        </div>
      </div>

      <!-- Company Short Description -->
      <div class="short-description-container input-container">
        <p class="title">{{ $t('dashboardCompany.shortDescription.title') }}</p>
        <p class="sub-title">{{ $t('dashboardCompany.shortDescription.desc') }}</p>
        <input
          id="short-description-input"
          maxlength="150"
          :title="$t('dashboardCompany.shortDescription.inputTitle')"
          pattern="[A-Za-z0-9 .,'-]{2,150}"
          @keyup="countInputLength"
          :placeholder="$t('dashboardCompany.shortDescription.placeholder')"
          v-model="value.shortDescription">
        <p class="third-title">{{ 150 - value.shortDescriptionCount }}</p>
      </div>

      <!-- Company Video -->
      <div class="short-description-container input-container">
        <p class="title">{{ $t('dashboardCompany.video.title') }}</p>
        <p class="sub-title">{{ $t('dashboardCompany.video.desc') }}</p>
        <input
          id="video-input"
          maxlength="150"
          :title="$t('dashboardCompany.video.inputTitle')"
          pattern="[A-Za-z0-9 .,'/?&=_:-]{1,150}"
          placeholder="https://www.youtube.com/watch?v=VIDEO_ID or https://vimeo.com/ViDEO_ID"
          v-model="value.video">
        <p class="alert-text" v-show="(!checkVideoLink) && value.video.length > 0">{{ $t('dashboardCompany.video.alert') }}</p>
      </div>

      <!-- Company Information -->
      <div class="information-container input-container">
        <p class="title">{{ $t('dashboardCompany.company.title') }}</p>
        <p class="sub-title">{{ $t('dashboardCompany.company.desc') }}</p>
        <!-- Products -->
        <div class="box-container">
          <div class="left-contents">{{ $t('dashboardCompany.company.products.title') }}</div>
          <div class="right-contents">
            <input
              type="text"
              pattern="[A-Za-z0-9 ',-()]{1,200}"
              :title="$t('dashboardCompany.company.products.inputTitle')"
              maxlength="200"
              :placeholder="$t('dashboardCompany.company.products.placeholder')"
              v-model="value.products">
          </div>
        </div>
        <!-- Website -->
        <div class="box-container">
          <div class="left-contents">{{ $t('dashboardCompany.company.website.title') }}</div>
          <div class="right-contents">
            <input
              type="text"
              pattern="[A-Za-z0-9 ./-]{1,100}"
              :title="$t('dashboardCompany.company.website.inputTitle')"
              maxlength="100"
              :placeholder="$t('dashboardCompany.company.website.placeholder')"
              v-model="value.website"
              spellcheck="false">
          </div>
        </div>
        <!-- Phone -->
        <div class="box-container">
          <div class="left-contents">{{ $t('dashboardCompany.company.phone.title') }}</div>
          <div class="right-contents"><input type="text" maxlength="21" pattern="[0-9 +-]{1,21}" :title="$t('dashboardCompany.company.phone.inputTitle')" :placeholder="$t('dashboardCompany.company.phone.placeholder')" v-model="value.phone"></div>
        </div>
        <!-- Average Lead Time -->
        <div class="box-container">
          <div class="left-contents">{{ $t('dashboardCompany.company.averageLeadTime.title') }}</div>
          <div class="right-contents"><input type="text" maxlength="3" pattern="[0-9]{1,3}" :title="$t('dashboardCompany.company.averageLeadTime.inputTitle')" v-model="value.averageLeadTime"></div>
        </div>
        <!-- Established Year -->
        <div class="box-container">
          <div class="left-contents">{{ $t('dashboardCompany.company.year.title') }}</div>
          <div class="right-contents">
            <select name="established-year" v-model="value.establishedYear">
              <option value="" disabled>{{ $t('dashboardCompany.company.year.placeholder') }}</option>
              <option v-for="(year,index) in established_year" :key="index" :value="year.year">{{year.year}}</option>
            </select>
          </div>
        </div>
        <!--  Number of Employees -->
        <div class="box-container">
          <div class="left-contents">{{ $t('dashboardCompany.company.numberOfEmployees.title') }}</div>
          <div class="right-contents">
            <select name="established-year" v-model="value.numberOfEmployees">
              <option value="" disabled>{{ $t('dashboardCompany.company.numberOfEmployees.placeholder') }}</option>
              <option v-for="(number,index) in number_of_employees" :key="index" :value="number.value">{{number.value}}</option>
            </select>
          </div>
        </div>
        <!--  Total annual revenue -->
        <div class="box-container">
          <div class="left-contents">{{ $t('dashboardCompany.company.totalAnnualRevenue.title') }}</div>
          <div class="right-contents">
            <select name="established-year" v-model="value.totalAnnualRevenue">
              <option value="" disabled>{{ $t('dashboardCompany.company.totalAnnualRevenue.placeholder') }}</option>
              <option v-for="(revenue,index) in total_annual_revenue" :key="index" :value="revenue.value">{{revenue.value}}</option>
            </select>
          </div>
        </div>

        <!-- Text -->
        <p class="sub-title" style="margin-top: 22px">{{ $t('dashboardCompany.company.desc2') }}</p>
        <!-- Country -->
        <div class="box-container">
          <div class="left-contents">{{ $t('dashboardCompany.company.country.title') }}</div>
          <div class="right-contents">
            <select required title="required" v-model="value.country">
              <option id="disabled-option" disabled value="">{{ $t('dashboardCompany.company.country.defaultValue') }}</option>
              <option v-for="(country,index) in country_list" :key="index" :value="country.country_name">{{country.country_name}}</option>
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
          <div class="right-contents"><input type="text" maxlength="100" pattern="[A-Za-z0-9 -.,#()/]{1,100}" :title="$t('dashboardCompany.company.street.inputTitle')" :placeholder="$t('dashboardCompany.company.street.placeholder')" v-model="value.streetAddress"></div>
        </div>
        <!-- Street Address Detail -->
        <div class="box-container">
          <div class="left-contents">{{ $t('dashboardCompany.company.street2.title') }}</div>
          <div class="right-contents"><input type="text" maxlength="100" pattern="[A-Za-z0-9 -.,#()/]{1,100}" :title="$t('dashboardCompany.company.street2.inputTitle')" :placeholder="$t('dashboardCompany.company.street2.placeholder')" v-model="value.streetAddressDetail"></div>
        </div>
        <!-- Postal Code -->
        <div class="box-container">
          <div class="left-contents">{{ $t('dashboardCompany.company.postal.title') }}</div>
          <div class="right-contents"><input type="text" pattern="[0-9-]{1,10}" :title="$t('dashboardCompany.company.postal.inputTitle')" :placeholder="$t('dashboardCompany.company.postal.placeholder')" v-model="value.postalCode"></div>
        </div>
      </div>

      <!-- Company Long Description -->
      <div class="description-container input-container">
        <p class="title">{{ $t('dashboardCompany.description.title') }}</p>
        <p class="sub-title">{{ $t('dashboardCompany.description.desc') }}</p>
        <textarea id="description-input" pattern="[A-Za-z0-9 ().,]{1,25000}" :title="$t('dashboardCompany.description.inputTitle')" maxlength="25000" rows="10" :placeholder="$t('dashboardCompany.description.placeholder')" v-model="value.description"></textarea>
      </div>

      <!-- Company Brochure -->
      <div class="catalog-container input-container">
        <p class="title">{{ $t('dashboardCompany.catalog.title') }}</p>
        <p class="sub-title">{{ $t('dashboardCompany.catalog.desc') }}</p>
        <label for="pdf-input">{{ $t('dashboardProductEdit.catalog.button') }}</label>
        <input name="catalog_pdf" id="pdf-input" type="file" accept="application/pdf" @change="onPDFchanged($event.target.files)">
        <div class="file-information-container">
          <p id="file-information-text">{{msg.pdfText}}</p>
          <a id="pdf-cancel-button" @click="onPDFcancel">{{ $t('dashboardProductEdit.catalog.cancel') }}</a>
        </div>
      </div>

      <!-- Company History -->
      <div class="history-container input-container">
        <p class="title">{{ $t('dashboardCompany.history.title') }}</p>
        <p class="sub-title" v-html="$t('dashboardCompany.history.desc')"></p>
        <textarea rows="10" maxlength="25000" :title="$t('dashboardCompany.history.inputTitle')" :placeholder="$t('dashboardCompany.history.placeholder')" v-model="value.history"></textarea>
        <i id="history-mark" class="small-mark" aria-hidden="true"></i>
      </div>

      <!-- Accepted Delivery Terms -->
      <div class='accepted-delivery-terms-container input-container'>
        <p class="title">{{ $t('dashboardCompany.acceptedDeliveryTerms.title') }}</p>
        <br><br>
        <div class="checkbox-container" v-for="(term, index) in accepted_delivery_terms" :key="index">
          <input
            class="business-type-checkbox"
            type="checkbox"
            :id="term.value"
            :value="term.value"
            v-model="value.acceptedDeliveryTerms">
          <label class="checkbox-label" :for="term.value">{{term.value}}</label>
        </div>
      </div>

      <!-- Accepted Payment Currency -->
      <div class='accepted-payment-currency-container input-container'>
        <p class="title">{{ $t('dashboardCompany.acceptedPaymentCurrency.title') }}</p>
        <br><br>
        <div class="checkbox-container" v-for="(currency, index) in accepted_payment_currency" :key="index">
          <input
            class="business-type-checkbox"
            type="checkbox"
            :id="currency.value"
            :value="currency.value"
            v-model="value.acceptedPaymentCurrency">
          <label class="checkbox-label" :for="currency.value">{{currency.value}}</label>
        </div>
      </div>

      <!-- Accepted Payment Type -->
      <div class='accepted-payment-type-container input-container'>
        <p class="title">{{ $t('dashboardCompany.acceptedPaymentType.title') }}</p>
        <br><br>
        <div class="checkbox-container" v-for="(type, index) in accepted_payment_type" :key="index">
          <input
            class="business-type-checkbox"
            type="checkbox"
            :id="type.value"
            :value="type.value"
            v-model="value.acceptedPaymentType">
          <label class="checkbox-label" :for="type.value">{{type.value}}</label>
        </div>
      </div>

      <!-- Language Spoken -->
      <div class='language-spoken-container input-container'>
        <p class="title">{{ $t('dashboardCompany.languageSpoken.title') }}</p>
        <br><br>
        <div class="checkbox-container" v-for="(language, index) in language_spoken" :key="index">
          <input
            class="business-type-checkbox"
            type="checkbox"
            :id="language.value"
            :value="language.value"
            v-model="value.languageSpoken">
          <label class="checkbox-label" :for="language.value">{{language.value}}</label>
        </div>
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
  import businessType from '~/assets/models/business_type.json'
  import acceptedDeliveryTerms from '~/assets/models/accepted_delivery_terms.json'
  import acceptedPaymentCurrency from '~/assets/models/accepted_payment_currency.json'
  import acceptedPaymentType from '~/assets/models/accepted_payment_type.json'
  import languageSpoken from '~/assets/models/language_spoken.json'
  import country from '~/assets/models/country.json'
  import establishedYear from '~/assets/models/established_year.json'
  import numberOfEmployees from '~/assets/models/number_of_employees.json'
  import totalAnnualRevenue from '~/assets/models/total_annual_revenue.json'
  import loader from '~/components/Loader'
  import { mapGetters } from 'vuex'
  import { checkboxStringToArray, checkboxArrayToString } from '~/utils/checkbox'
  import { showTopAlert } from '~/utils/alert'
  import { updateUserDataToVuex } from '~/utils/auth'
  export default {
    layout: 'dashboard',
    head () {
      return {
        title: 'Edit Company Information',
        link: [
          { hid: 'canonical', rel: 'canonical', href: `https://www.factoryhunt.com/dashboard/company` }
        ]
      }
    },
    components: {
      loader
    },
    data () {
      return {
        accepted_delivery_terms: acceptedDeliveryTerms,
        accepted_payment_currency: acceptedPaymentCurrency,
        accepted_payment_type: acceptedPaymentType,
        language_spoken: languageSpoken,
        business_type: businessType,
        established_year: establishedYear,
        number_of_employees: numberOfEmployees,
        total_annual_revenue: totalAnnualRevenue,
        country_list: country,
        value: {
          contact: {},
          mainImageUrl: '',
          mainImageFileName: '',
          logoUrl: '',
          logoImageFileName: '',
          accountName: '',
          businessTypes: [],
          shortDescription: '',
          shortDescriptionCount: 0,
          video: '',
          description: '',
          products: '',
          website: '',
          phone: '',
          averageLeadTime: '',
          establishedYear: '',
          numberOfEmployees: '',
          totalAnnualRevenue: '',
          country: '',
          state: '',
          city: '',
          postalCode: '',
          streetAddress: '',
          streetAddressDetail: '',
          history: '',
          acceptedDeliveryTerms: [],
          acceptedPaymentCurrency: [],
          acceptedPaymentType: [],
          languageSpoken: []
        },
        toggle: {
          isSaving: false,
          isDomainAvailable: null,
          isAccountNameAvailable: null,
          isUserAdmin: false
        },
        msg: {
          pdfText: ''
        }
      }
    },
    computed: {
      ...mapGetters({
        account: 'auth/GET_ACCOUNT',
        contact: 'auth/GET_CONTACT'
      }),
      checkVideoLink () {
        if (this.value.video.length < 1) return true
        const fc = this.value.video.indexOf('youtube.com/watch?v=') !== -1
        const sc = this.value.video.indexOf('youtu.be/') !== -1
        const vc = this.value.video.indexOf('vimeo.com') !== -1
        const result = (fc || sc || vc)
        console.log(result)
        return result
      }
    },
    methods: {
      applyAttributes () {
        // when login user is page admin, keep going
        this.applyLocalData(this.account)
        this.onCheckbox()
        this.applyInputFocusBlurEvent()
      },
      changeSelectPlaceholderColor () {
        const selects = document.querySelectorAll('.dashboard-page-container select')
        for (const i in selects) {
          const select = selects[i]
          // console.log(select.options[select.selectedIndex])
        }
      },
      // update server data to local data
      applyLocalData (account) {
        this.value.mainImageUrl = account.cover_image_url_1
        this.value.logoUrl = account.logo_url
        this.value.accountName = account.account_name
        this.value.description = account.company_description
        this.value.businessTypes = checkboxStringToArray(businessType, account.business_type)
        this.value.shortDescription = account.company_short_description
        this.value.shortDescriptionCount = account.company_short_description.length
        this.value.video = account.account_video_url
        this.value.products = account.products
        this.value.phone = account.phone
        this.value.website = account.website
        this.value.averageLeadTime = account.average_lead_time
        this.value.establishedYear = account.established_year
        this.value.numberOfEmployees = account.number_of_employees
        this.value.totalAnnualRevenue = account.total_annual_revenue
        this.value.country = account.mailing_country
        this.value.state = account.mailing_state
        this.value.city = account.mailing_city
        this.value.postalCode = account.mailing_postal_code
        this.value.streetAddress = account.mailing_street_address
        this.value.streetAddressDetail = account.mailing_street_address_2
        this.value.history = account.history
        this.value.acceptedDeliveryTerms = checkboxStringToArray(acceptedDeliveryTerms, account.accepted_delivery_terms)
        this.value.acceptedPaymentCurrency = checkboxStringToArray(acceptedPaymentCurrency, account.accepted_payment_currency)
        this.value.acceptedPaymentType = checkboxStringToArray(acceptedPaymentType, account.accepted_payment_type)
        this.value.languageSpoken = checkboxStringToArray(languageSpoken, account.language_spoken)
      },
      onPDFchanged (files) {
        const maxSize = 15 * 1024 * 1024
        var fileSize = ((files[0].size) / 1024) / 1024
        fileSize = fileSize.toFixed(1)
        // over 15MB
        if (files[0].size > maxSize) {
          this.onPDFcancel()
          alert(this.$t('dashboardProductEdit.catalog.caution'))
          return
        }

        $('#pdf-cancel-button').css('display', 'inline-block')
        this.msg.pdfText = `${files[0].name} (${fileSize}MB)`
        var reader = new FileReader()
        reader.onload = (event) => {
          console.log(event)
        }
        reader.readAsDataURL(files[0])
      },
      onPDFcancel () {
        $('#pdf-input').val('')
        this.msg.pdfText = ''
        $('#pdf-cancel-button').css('display', 'none')
      },
      onCheckbox () {
        if (this.value.businessTypes.length > 2) {
          $('.business-type-container input[type=checkbox]').attr('disabled', 'disabled')
        } else {
          $('.business-type-container input[type=checkbox]').removeAttr('disabled')
        }
        $('.business-type-container input[type=checkbox]:checked').removeAttr('disabled')
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
      async onEditButton () {
        // modal loading start
        this.activateLoader()

        // business type is required field.
        if (!checkboxArrayToString(businessType, this.value.businessTypes)) return this.onEditFail(this.$t('alert.required'))

        // Youtube video link
        if (!this.checkVideoLink) return this.onEditFail(this.$t('dashboardCompany.video.alert'))

        // request
        try {
          await Promise.all([
            this.uploadCompanyData(),
            this.uploadPDF()
          ])
          await updateUserDataToVuex(this.$store)
          this.onEditSuccess()
        } catch (err) {
          this.onEditFail()
        }
      },
      uploadCompanyData () {
        const data = {
          account_name: this.value.accountName,
          business_type: checkboxArrayToString(businessType, this.value.businessTypes),
          company_short_description: this.value.shortDescription,
          company_description: this.value.description,
          account_video_url: this.value.video,
          products: this.value.products,
          website: this.value.website,
          phone: this.value.phone,
          average_lead_time: this.value.averageLeadTime,
          established_year: this.value.establishedYear,
          number_of_employees: this.value.numberOfEmployees,
          total_annual_revenue: this.value.totalAnnualRevenue,
          mailing_country: this.value.country,
          mailing_state: this.value.state,
          mailing_city: this.value.city,
          mailing_postal_code: this.value.postalCode,
          mailing_street_address: this.value.streetAddress,
          mailing_street_address_2: this.value.streetAddressDetail,
          history: this.value.history,
          accepted_delivery_terms: checkboxArrayToString(acceptedDeliveryTerms, this.value.acceptedDeliveryTerms),
          accepted_payment_currency: checkboxArrayToString(acceptedPaymentCurrency, this.value.acceptedPaymentCurrency),
          accepted_payment_type: checkboxArrayToString(acceptedPaymentType, this.value.acceptedPaymentType),
          language_spoken: checkboxArrayToString(languageSpoken, this.value.languageSpoken)
        }
        return axios.put(`/api/data/account/${this.account.account_id}`, {
          account_data: data
        })
      },
      uploadPDF () {
        let formData = new FormData()
        const config = {
          headers: {'content-type': 'multipart/form-data'}
        }
        if (document.getElementById('pdf-input').files[0]) {
          formData.append('pdf', document.getElementById('pdf-input').files[0])
        } else {
          return
        }
        return axios.put(`/api/data/account/${this.account.account_id}/pdf`, formData, config)
      },
      onEditSuccess () {
        showTopAlert(this.$store, true, this.$t('alert.success'))
        this.deactivateLoader()
      },
      onEditFail (msg) {
        showTopAlert(this.$store, false, msg || this.$t('alert.fail'))
        this.deactivateLoader()
      },
      activateLoader () {
        this.toggle.isSaving = true
        $('.alert-container').hide()
      },
      deactivateLoader () {
        this.toggle.isSaving = false
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

        accountNameInput.blur(() => {
          if (this.value.accountName) {
            this.toggle.isAccountNameAvailable = true
            accountNameMark.removeClass('fa fa-exclamation')
          } else {
            this.toggle.isAccountNameAvailable = false
            accountNameMark.addClass('fa fa-exclamation')
          }
        })
      },
      countInputLength () {
        this.value.shortDescriptionCount = $('#short-description-input').val().length
      }
    },
    mounted () {
      this.applyAttributes()
    },
    updated () {
      this.onCheckbox()
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
  .alert-text {
    margin: 0;
    font-size: @font-size-small;
    color: @color-red;
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

      &[type=checkbox] {
        width: 16px;
        height: inherit;
      }
    }
    label {
      .upload-label-basic;
      margin-top: 10px;
      font-size: @font-size-button;
      font-weight: @font-weight-button;

      &.checkbox-label {
        border: 0;
        padding: 0;
        font-size: @font-size-medium;
        font-weight: @font-weight-thin;

        &:checked {
          font-weight: @font-weight-bold;
        }
      }
    }
    textarea {
      font-size: 20px !important;
      font-weight: 400 !important;

      &:focus,
      &:active {
        -webkit-transition: all 500ms;
        -moz-transition: all 500ms;
        -ms-transition: all 500ms;
        -o-transition: all 500ms;
        transition: border 500ms;
        border: 1px solid @color-link;
      }
    }
    select {
      font-size: 20px !important;
      font-weight: 400 !important;
      margin-bottom: 5px !important;
      height: @height !important;
      border: none !important;
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

    .business-type-container {
      .checkbox-container {
        display: block;
        padding: 4px 0;
        width: 100%;
      }
    }

    .checkbox-container {
      display: inline-block;
      width: 25%;
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

    .catalog-container {

      .title {
        display: block;
      }

      label {
        display: inline-block;
        .upload-label-basic;
        margin-top: 10px;
        font-size: @font-size-button;
        font-weight: @font-weight-button;
      }

      .file-information-container {
        margin-top: 8px;

        #pdf-cancel-button {
          display: none;
          font-size: 17px;
          margin-left: 8px;
        }
        #file-information-text {
          float: left;
          margin-top: 0;
          font-size: 17px;
          color: @color-font-gray;
        }
      }
    }

    .history-container {
      position: relative;
      #history-mark {
        bottom: @mark-bottom-amount;
      }
    }

  }
</style>
