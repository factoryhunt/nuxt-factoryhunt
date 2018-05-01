<template>
  <div>
    <h1>Business Details</h1>
    <h3>상세한 정보를 제공하는 회사는 상대 비즈니스와 거래가 성사될 가능성이 높습니다.</h3>

    <div id="contents">
        <!-- What is your industries? -->
      <section id="industry-container">
        <h4>What is your industries?<required-icon/></h4>
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
        <h5>Up to 5.</h5>
      </section>

      <section>
        <h4>Company Short Description</h4>
        <textarea rows="4"></textarea>
      </section>

      <section>
        <h4>Company History</h4>
        <textarea rows="9"></textarea>
      </section>

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

      <section id="phone-section">
        <h4>Phone</h4>
        <div class="table">
          <div id="code-section" class="table-cell">
            <select v-model="value.dialCode" @change="onDialCodeChange($event)">
              <option value="" disabled>Select</option>
              <option 
                v-for="(code,index) in dialCodes" 
                :key="index" 
                :title="code.name"
                :value="code.dial_code">{{code.name}} ({{code.dial_code}})</option>
            </select>
          </div>
          <div id="phone-section" class="table-cell">
            <input id="phone-input" v-model="value.phone" type="text" placeholder="e.g +1-201-555-5555">
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
          <input type="text">
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
      </div>

    </div>
    <!-- Bottom Caption -->
    <footer-caption/>

  </div>
</template>

<script>
import axios from '~/plugins/axios'
import business_type from '~/assets/models/business_type.json'
import categories from '~/assets/models/categories.json'
import dial_codes from '~/assets/models/dial_codes.json'
import established_year from '~/assets/models/established_year.json'
import number_of_employees from '~/assets/models/number_of_employees.json'
import total_annual_revenue from '~/assets/models/total_annual_revenue.json'
import accepted_delivery_terms from '~/assets/models/accepted_delivery_terms.json'
import accepted_payment_currency from '~/assets/models/accepted_payment_currency.json'
import language_spoken from '~/assets/models/language_spoken.json'
import accepted_payment_type from '~/assets/models/accepted_payment_type.json'

import FooterCaption from '../components/FooterCaption'
import RequiredIcon from '~/components/Icons/Required'
import { limitCheckboxMaxLength } from '~/utils/checkbox'
import { getVideoURL } from '~/utils/fileReader'
import { mapGetters } from 'vuex'
import { EventBus } from '~/eventBus'
export default {
  layout: 'wizard',
  components: {
    RequiredIcon,
    FooterCaption
  },
  head() {
    return {
      title: 'Basic Company Information',
      link: [
        { hid: 'canonical', rel: 'canonical', href: `https://www.factoryhunt.com/signup/step1` }
      ]
    }
  },
  data() {
    return {
      businessTypes: business_type,
      categories: categories,
      dialCodes: dial_codes,
      establishedYear: established_year,
      numberOfEmployees: number_of_employees,
      totalAnnualRevenue: total_annual_revenue,
      acceptedDeliveryTerms: accepted_delivery_terms,
      acceptedPaymentCurrency: accepted_payment_currency,
      languageSpoken: language_spoken,
      acceptedPaymentType: accepted_payment_type,
      value: {
        industries: [],
        businessTypes: [],
        video: '',
        dialCode: '',
        phone: '',
        establishedYear: '',
        numberOfEmployees: '',
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
    }
  },
  methods: {
    mappingDatas() {},
    onChangeIndusties() {
      const $inputs = '#industry-container input[type=checkbox]'
      limitCheckboxMaxLength($inputs, this.value.industries, 5)
    },
    onDialCodeChange(event) {
      const $select = event.target
      const $phoneInput = document.getElementById('phone-input')
      // $select.style.height = '46.5px'
      this.value.phone = `${event.target.value}-`
      $phoneInput.focus()
    },
    listenEventBus() {
      this.listenSaveButton()
      this.listenSkipThisStep()
    },
    listenSaveButton() {
      EventBus.$on('onSaveButton', () => {
        console.log('parent called onSaveButton')
        // this.updateInformation()
      })
    },
    listenSkipThisStep() {
      EventBus.$on('onSkipThisStep', () => {
        location.href = '/signup/step4'
      })
    },
    updateInformation() {
      return new Promise((resolve, reject) => {
        axios
          .put(`/api/data/account/`)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
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

#phone-section {
  .table {
    margin-top: 0 !important;
  }

  #code-section {
    width: 110px;
  }
  select {
    padding-right: 35px !important;
    background-position-x: 89%;
  }

  #phone-section {
    padding-left: 10px;
    vertical-align: top;
  }
}

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
