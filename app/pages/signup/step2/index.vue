<template>
  <div>
    <h1>Business Details</h1>
    <h3>상세한 정보를 제공하는 회사는 상대 비즈니스와 거래가 성사될 가능성이 높습니다.</h3>

    <div id="contents">
      <!-- Website -->
      <section>
        <h4>
          Company Website
          <span class="text-counting">{{getRemainLength(value.website, MAX_WEBSITE_LENGTH)}}</span>
          </h4>
        <input 
          class="table-cell" 
          type="text"
          placeholder="e.g www.yourcompany.com"
          :pattern="getPattern('website', MAX_WEBSITE_LENGTH)"
          :maxlength="MAX_WEBSITE_LENGTH"
          :title="$t('dashboardCompany.company.website.inputTitle')"
          autocomplete="organization"
          spellcheck="false"
          v-model="value.website"/>
      </section>

      <!-- Phone -->
      <section class="phone-type-section">
        <h4>Phone</h4>
        <input 
          type="text"
          placeholder="e.g +1-201-555-5555"
          :pattern="getPattern('tel', MAX_PHONE_TYPE_LENGTH)"
          :maxlength="MAX_PHONE_TYPE_LENGTH" 
          :title="$t('dashboardCompany.company.phone.inputTitle')" 
          autocomplete="tel"
          v-model="value.phone" >
      </section>

      <!-- Fax -->
      <section class="phone-type-section">
        <h4>Fax</h4>
        <input 
          type="text"
          placeholder="e.g +1-201-555-5555"
          :pattern="getPattern('tel', MAX_PHONE_TYPE_LENGTH)"
          :maxlength="MAX_PHONE_TYPE_LENGTH" 
          :title="$t('dashboardCompany.company.phone.inputTitle')" 
          autocomplete="tel"
          v-model="value.fax"/>
      </section>
 
      <div class="table">
        <!-- Established Year -->
        <section id="established-year-section" class="table-cell">
          <h4>Established Year</h4>
          <select 
            class="float-left"
            v-model="value.establishedYear">
            <option value="" disabled>Select</option>
            <option 
              v-for="(year, index) in establishedYear" 
              :key="index" 
              :value="year.year">{{year.year}}</option>
          </select>
        </section>

        <!-- Total Employees -->
        <section id="total-employees-section" class="table-cell">
          <h4>Total Employees</h4>
          <select
           v-model="value.numberOfEmployees">
            <option value="" disabled>Select</option>
            <option 
              v-for="(employee, index) in numberOfEmployees"
              :key="index"
              :value="employee.value">{{employee.value}}</option>
          </select>
        </section>
      </div>

      <!-- Total Annual Revenue -->
      <section id="total-annual-revenue-section">
        <h4>Total Annual Revenue</h4>
        <select v-model="value.totalAnnualRevenue">
          <option value="" disabled>Select</option>
          <option
            v-for="(revenue, index) in totalAnnualRevenue"
            :key="index"
            :value="revenue.value">{{revenue.value}}</option>
        </select>
      </section>


      <!-- Company Introduction Video -->
      <section>
        <h4>Company Introduction Video</h4>
        <input 
          type="text"
          :pattern="getPattern('video', MAX_VIDEO_LENGTH)"
          :maxlength="MAX_VIDEO_LENGTH"
          :title="$t('dashboardCompany.video.inputTitle')"
          placeholder="e.g https://vimeo.com/12345678"
          v-model="value.video">
        <h5>Please copy and paste only YouTube or Vimeo link.</h5>
        <div 
          id="video-preview-section" 
          class="preview-container" 
          tabindex="-1">
          <div class="video-container">
            <iframe 
            class="preview-item"
            :src="getVideo" 
            frameborder="0" 
            allowfullscreen></iframe>
          </div>
        </div>
      </section>

      <!-- Company Short Description -->
      <section>
        <h4>
          Company Short Description
          <span class="text-counting">{{getRemainLength(value.companyShortDescription, MAX_SHORT_DESCRIPTION_LENGTH)}}</span></h4>
        <textarea 
          rows="4"
          :placeholder="$t('dashboardCompany.shortDescription.placeholder')"
          :pattern="getPattern('short_description', MAX_SHORT_DESCRIPTION_LENGTH)"
          :maxLength="MAX_SHORT_DESCRIPTION_LENGTH"
          :title="$t('dashboardCompany.shortDescription.inputTitle')"
          v-model="value.companyShortDescription"></textarea>
      </section>

      <!-- Company Description -->
      <section>
        <h4>Company Description
          <span class="text-counting">{{getRemainLength(value.companyDescription, MAX_LONG_DESCRIPTION_LENGTH)}}</span>
        </h4>
        <textarea 
          rows="9"
          :pattern="getPattern('long_description', MAX_LONG_DESCRIPTION_LENGTH)"
          :maxlength="MAX_LONG_DESCRIPTION_LENGTH"
          :title="$t('dashboardCompany.description.inputTitle')" 
          v-model="value.companyDescription"></textarea>
      </section>

      <!-- Company History -->
      <section>
        <h4>Company History
          <span class="text-counting">{{getRemainLength(value.history, MAX_LONG_DESCRIPTION_LENGTH)}}</span></h4>
        <textarea 
          rows="9"
          :placeholder="$t('dashboardCompany.history.placeholder')" 
          :pattern="getPattern('long_description', MAX_LONG_DESCRIPTION_LENGTH)"
          :maxlength="MAX_LONG_DESCRIPTION_LENGTH"
          :title="$t('dashboardCompany.history.inputTitle')" 
          v-model="value.history"></textarea>
      </section>

      <!-- Trade Capacity -->
      <div class="section-margin">
        <h2>Trade Capacity</h2>
        <!-- Average Lead Time -->
        <section id="average-lead-time-section">
          <h4>Average Lead Time</h4>
          <input 
            type="text"
            v-model="value.averageLeadTime">
          <span>Day(s)</span>
        </section>
        <!-- Accepted Delivery Terms -->
        <section>
          <h4>Accepted Delivery Terms</h4>
          <div id="scroll-container">
            <div 
              class="checkbox-row" 
              v-for="(deliveryTerm, index) in acceptedDeliveryTerms" 
              :key="index">
              <input
                type="checkbox"
                :id="deliveryTerm.value"
                :value="deliveryTerm.value"
                v-model="value.acceptedDeliveryTerms"/>
              <label 
                :for="deliveryTerm.value">
                {{deliveryTerm.value}}
              </label>
            </div>
          </div>
        </section>
        <!-- Accepted Payment Currency -->
        <section>
          <h4>Accepted Payment Currency</h4>
          <div id="scroll-container">
            <div 
              class="checkbox-row" 
              v-for="(currency, index) in acceptedPaymentCurrency" 
              :key="index">
              <input
                type="checkbox"
                :id="currency.value"
                :value="currency.value"
                v-model="value.acceptedPaymentCurrency"/>
              <label 
                :for="currency.value">
                {{currency.value}}
              </label>
            </div>
          </div>
        </section>
        <!-- Language Spoken -->
        <section>
          <h4>Language Spoken</h4>
          <div id="scroll-container">
            <div 
              class="checkbox-row" 
                v-for="(language, index) in languageSpoken" 
                :key="index">
              <input
                type="checkbox"
                :id="language.value"
                :value="language.value"
                v-model="value.languageSpoken"/>
              <label 
                :for="language.value">
                {{language.value}}
              </label>
            </div>
          </div>
        </section>
        <!-- Accepted Payment Type -->
        <section>
          <h4>Accepted Payment Type</h4>
          <div id="scroll-container">
            <div 
              class="checkbox-row" 
              v-for="(paymentType, index) in acceptedPaymentType" 
              :key="index">
              <input
                type="checkbox"
                :id="paymentType.value"
                :value="paymentType.value"
                v-model="value.acceptedPaymentType"/>
              <label 
                :for="paymentType.value">
                {{paymentType.value}}
              </label>
            </div>
          </div>
        </section>
      </div>

    </div>
    <!-- Bottom Caption -->
    <footer-caption/>

  </div>
</template>

<script>
import axios from '~/plugins/axios'
import countries from '~/assets/models/country.json'
import established_year from '~/assets/models/established_year.json'
import number_of_employees from '~/assets/models/number_of_employees.json'
import total_annual_revenue from '~/assets/models/total_annual_revenue.json'
import accepted_delivery_terms from '~/assets/models/accepted_delivery_terms.json'
import accepted_payment_currency from '~/assets/models/accepted_payment_currency.json'
import language_spoken from '~/assets/models/language_spoken.json'
import accepted_payment_type from '~/assets/models/accepted_payment_type.json'

import FooterCaption from '../components/FooterCaption'
import RequiredIcon from '~/components/Icons/Required'
import PhoneInput from '~/components/Inputs/Phone'
import { renderGoogleMap } from '~/utils/google_api'
import { get_pattern, get_pattern_max_length } from '~/utils/reg_exr'
import {
  checkboxStringToArray,
  checkboxArrayToString,
  limitCheckboxMaxLength,
  removeNullInArray
} from '~/utils/checkbox'
import { getFullAddress, getRemainInputLength } from '~/utils/text'
import { getVideoURL } from '~/utils/fileReader'
import { mapGetters } from 'vuex'
import { EventBus } from '~/eventBus'
export default {
  layout: 'wizard',
  components: {
    RequiredIcon,
    PhoneInput,
    FooterCaption
  },
  head() {
    return {
      title: 'Business Details',
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `https://www.factoryhunt.com/signup/step1`
        }
      ]
    }
  },
  data() {
    return {
      MAX_WEBSITE_LENGTH: get_pattern_max_length.WEBSITE,
      MAX_SHORT_DESCRIPTION_LENGTH: get_pattern_max_length.SHORT_DESCRIPTION,
      MAX_LONG_DESCRIPTION_LENGTH: get_pattern_max_length.LONG_DESCRIPTION,
      MAX_VIDEO_LENGTH: get_pattern_max_length.VIDEO,
      MAX_PHONE_TYPE_LENGTH: get_pattern_max_length.TEL,
      countries: countries,
      establishedYear: established_year,
      numberOfEmployees: number_of_employees,
      totalAnnualRevenue: total_annual_revenue,
      acceptedDeliveryTerms: accepted_delivery_terms,
      acceptedPaymentCurrency: accepted_payment_currency,
      languageSpoken: language_spoken,
      acceptedPaymentType: accepted_payment_type,
      value: {
        industries: [],
        website: '',
        companyShortDescription: '',
        companyDescription: '',
        history: '',
        video: '',
        phoneDialCode: '',
        phone: '',
        faxDialCode: '',
        fax: '',
        establishedYear: '',
        numberOfEmployees: '',
        averageLeadTime: '',
        totalAnnualRevenue: '',
        acceptedDeliveryTerms: [],
        acceptedPaymentCurrency: [],
        languageSpoken: [],
        acceptedPaymentType: []
      }
    }
  },
  computed: {
    ...mapGetters({
      userData: 'auth/GET_USER'
    }),
    getVideo() {
      return getVideoURL(this.value.video)
    },
    getAccountId() {
      return this.userData.account.account_id
    }
  },
  methods: {
    mappingDatas() {
      const {
        website,
        company_short_description,
        company_description,
        history,
        account_video_url,
        phone,
        fax,
        established_year,
        number_of_employees,
        average_lead_time,
        total_annual_revenue,
        accepted_delivery_terms,
        accepted_payment_currency,
        language_spoken,
        accepted_payment_type
      } = this.userData.account

      this.value.website = website
      this.value.companyShortDescription = company_short_description
      this.value.companyDescription = company_description
      this.value.history = history
      this.value.video = account_video_url
      this.value.phone = phone
      this.value.fax = fax
      this.value.establishedYear = established_year
      this.value.numberOfEmployees = number_of_employees
      this.value.averageLeadTime = average_lead_time
      this.value.totalAnnualRevenue = total_annual_revenue
      this.value.acceptedDeliveryTerms = checkboxStringToArray(
        this.acceptedDeliveryTerms,
        accepted_delivery_terms
      )
      this.value.acceptedPaymentCurrency = checkboxStringToArray(
        this.acceptedPaymentCurrency,
        accepted_payment_currency
      )
      this.value.languageSpoken = checkboxStringToArray(this.languageSpoken, language_spoken)
      this.value.acceptedPaymentType = checkboxStringToArray(
        this.acceptedPaymentType,
        accepted_payment_type
      )
    },
    getRemainLength(string, maxLength) {
      return getRemainInputLength(string, maxLength)
    },
    getPattern(type, max_length, min_length) {
      return get_pattern(type, max_length, min_length)
    },
    listenEventBus() {
      EventBus.$emit('enableSaveButton')
      this.listenSaveButton()
      this.listenSkipThisStep()
    },
    listenSaveButton() {
      EventBus.$on('onSaveButton', () => {
        this.updateInformation()
      })
    },
    listenSkipThisStep() {
      EventBus.$on('onSkipThisStep', () => {
        location.href = '/signup/step3'
      })
    },
    updateInformation() {
      const {
        website,
        companyDescription: company_short_description,
        companyShortDescription: company_description,
        history,
        video: account_video_url,
        phone,
        fax,
        establishedYear: established_year,
        numberOfEmployees: number_of_employees,
        averageLeadTime: average_lead_time,
        totalAnnualRevenue: total_annual_revenue,
        acceptedDeliveryTerms,
        acceptedPaymentCurrency,
        languageSpoken,
        acceptedPaymentType
      } = this.value
      const accepted_delivery_terms = checkboxArrayToString(
        this.acceptedDeliveryTerms,
        acceptedDeliveryTerms
      )
      const accepted_payment_currency = checkboxArrayToString(
        this.acceptedPaymentCurrency,
        acceptedPaymentCurrency
      )
      const language_spoken = checkboxArrayToString(this.languageSpoken, languageSpoken)
      const accepted_payment_type = checkboxArrayToString(
        this.acceptedPaymentType,
        acceptedPaymentType
      )

      const body = {
        account_data: {
          website,
          company_short_description,
          company_description,
          account_video_url,
          history,
          phone,
          fax,
          established_year,
          number_of_employees,
          average_lead_time,
          total_annual_revenue,
          accepted_delivery_terms,
          accepted_payment_currency,
          language_spoken,
          accepted_payment_type
        }
      }

      axios
        .put(`/api/data/account/${this.getAccountId}`, body)
        .then(res => {
          // EventBus.$emit('onLoadingFinished')
          location.href = '/signup/step3'
        })
        .catch(err => {
          console.log('update information err', err)
          EventBus.$emit('onLoadingFailed', err)
        })
    }
  },
  mounted() {
    this.listenEventBus()
    this.mappingDatas()
  },
  updated() {
    EventBus.$emit('enableSaveButton')
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
@import '~assets/css/less/wizard/index';

#established-year-section {
  width: 164px;

  select {
    background-position-x: 90%;
  }
}
#total-employees-section {
  padding-left: 80px;

  select {
    background-position-x: 95%;
  }
}
#average-lead-time-section {
  width: 164px;
  input {
    display: inline-block;
    width: 104px;
    margin-right: 8px;
  }
}
</style>
