<template>
  <div>
    <h1>Business Details</h1>
    <h3>상세한 정보를 제공하는 회사는 상대 비즈니스와 거래가 성사될 가능성이 높습니다.</h3>

    <div id="contents">
        <!-- What is your industries? -->
      <section id="industry-container">
        <h4>What is your industries?<required-icon/>
        <span class="text-counting">{{getRemainLength(value.industries, MAX_INDUSTRY_LENGTH)}} Remainings</span></h4>
        <div id="scroll-container">
          <div class="checkbox-row" v-for="(category, index) in categories" :key="index">
            <input
              type="checkbox"
              :id="category.name"
              :value="category.name"
              v-model="value.industries"
              @change="onChangeIndusties"/>
            <label 
              :for="category.name">
              {{category.name}}
            </label>
          </div>
        </div>
      </section>

      <!-- Website -->
      <section>
        <h4>Company Website</h4>
        <input 
          class="table-cell" 
          placeholder="e.g www.yourcompany.com"
          autocomplete="organization"
          v-model="value.website"/>
      </section>

      <!-- Company Short Description -->
      <section>
        <h4>
          Company Short Description
          <span class="text-counting">{{getRemainLength(value.companyShortDescription, MAX_SHORT_DESCRIPTION_LENGTH)}}</span></h4>
        <textarea 
          rows="3"
          v-model="value.companyShortDescription"></textarea>
      </section>

      <!-- Company Description -->
      <section>
        <h4>Company Description
          <span class="text-counting">{{getRemainLength(value.companyDescription, MAX_COMPANY_DESCRIPTION_LENGTH)}}</span>
        </h4>
        <textarea 
          rows="9"
          :maxlength="MAX_COMPANY_DESCRIPTION_LENGTH"
          v-model="value.companyDescription"></textarea>
      </section>

      <!-- Company History -->
      <section>
        <h4>Company History
          <span class="text-counting">{{getRemainLength(value.history, MAX_HISTORY_LENGTH)}}</span></h4>
        <textarea 
          rows="9"
          v-model="value.history"></textarea>
      </section>

      <!-- Company Introduction Video -->
      <section>
        <h4>Company Introduction Video</h4>
        <input 
          v-model="value.video"
          type="text" 
          placeholder="e.g https://vimeo.com/12345678">
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

      <!-- Phone -->
      <section class="phone-type-section">
        <h4>Phone</h4>
        <div class="table">
          <div class="table-cell code-section">
            <select id="phone" v-model="value.phoneDialCode" @change="onDialCodeChange($event)">
              <option value="" disabled>Select</option>
              <option 
                v-for="(country,index) in countries" 
                :key="index" 
                :title="country.name"
                :value="country.dialling_code">{{country.country_name}} ({{country.dialling_code}})</option>
            </select>
          </div>
          <div class="table-cell input-section">
            <div class="input-container">
              <input 
                ref="phone-input" 
                v-model="value.phone" 
                type="text"
                autocomplete="tel">
              <span>{{value.phoneDialCode}}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Fax -->
      <section class="phone-type-section">
        <h4>Fax</h4>
        <div class="table">
          <div class="table-cell code-section">
            <select id="fax" v-model="value.faxDialCode" @change="onDialCodeChange($event)">
              <option value="" disabled>Select</option>
              <option 
                v-for="(country,index) in countries" 
                :key="index"
                :title="country.country_name"
                :value="country.dialling_code">{{country.country_name}} ({{country.dialling_code}})</option>
            </select>
          </div>
          <div class="table-cell input-section">
            <div class="input-container">
              <input 
                ref="fax-input" 
                v-model="value.fax" 
                type="text"
                autocomplete="tel">
              <span>{{value.faxDialCode}}</span>
            </div>
          </div>
        </div>
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

      <div class="table">
        <!-- Average Lead Time -->
        <section id="average-lead-time-section" class="table-cell">
          <h4>Average Lead Time</h4>
          <input 
            type="text"
            v-model="value.averageLeadTime">
          <span>Day(s)</span>
        </section>
        <!-- Total Annual Revenue -->
        <section id="total-annual-revenue-section" class="table-cell">
          <h4>Total Annual Revenue</h4>
          <select 
            class="table-cell float-left"
            v-model="value.totalAnnualRevenue">
            <option value="" disabled>Select</option>
            <option
              v-for="(revenue, index) in totalAnnualRevenue"
              :key="index"
              :value="revenue.value">{{revenue.value}}</option>
          </select>
        </section>
      </div>

      <!-- Trade Capacity -->
      <div class="section-margin">
        <h2>Trade Capacity</h2>
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
import categories from '~/assets/models/categories.json'
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
import {
  checkboxStringToArray,
  checkboxArrayToString,
  limitCheckboxMaxLength
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
        { hid: 'canonical', rel: 'canonical', href: `https://www.factoryhunt.com/signup/step1` }
      ]
    }
  },
  data() {
    return {
      MAX_INDUSTRY_LENGTH: 5,
      MAX_SHORT_DESCRIPTION_LENGTH: 150,
      MAX_COMPANY_DESCRIPTION_LENGTH: 25000,
      MAX_HISTORY_LENGTH: 25000,
      categories: categories,
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
    onChangeIndusties() {
      const $inputs = '#industry-container input[type=checkbox]'
      limitCheckboxMaxLength($inputs, this.value.industries, 5)
    },
    onDialCodeChange(event) {
      const $select = event.target
      const value = $select.value

      if ($select.id.indexOf('phone') > -1) {
        this.value.phoneDialCode = value
        this.$refs['phone-input'].focus()
      } else {
        this.value.faxDialCode = value
        this.$refs['fax-input'].focus()
      }
    },
    listenEventBus() {
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
          console.log(res)
          EventBus.$emit('onLoadingFinished')
        })
        .catch(err => {
          console.log('update information err', err)
          EventBus.$emit('onLoadingFailed', err)
        })
    },
    checkRequiredField() {
      const { industries } = this.value

      if (industries.length) {
        EventBus.$emit('enableSaveButton')
      } else {
        EventBus.$emit('disableSaveButton')
      }
    }
  },
  mounted() {
    this.listenEventBus()
    this.mappingDatas()
  },
  updated() {
    this.checkRequiredField()
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
#total-annual-revenue-section {
  padding-left: 80px;
  select {
    background-position-x: 95%;
  }
}
</style>
