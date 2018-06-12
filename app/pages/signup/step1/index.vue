<template>
  <div>
    <h1>Hi, {{value.companyName}}</h1>
    <h3>In this step, we will help you to fill in your company information to connect your potential business partner easier.</h3>

    <div id="contents">
      <h2>Basic Company Information</h2>

      <!-- Buyer or Supplier => Business Type -->
      <section>
        <h4>Are you a buyer or supplier?</h4>
        <select 
          v-model="value.accountType" 
          @change="onChangedUserType"
          required>
          <option value="" disabled>Select</option>
          <option value="Buyer">Buyer</option>
          <option value="Supplier">Supplier</option>
          <option value="Buyer & Supplier">Buyer & Supplier</option>
        </select>
      </section>

      <!-- Business Types -->
      <div v-show="value.accountType">
        <section 
          class="business-type-container" 
          v-show="!isUserBuyer">
          <h4>
            What is your business type?<required-icon/>
            <span class="text-counting">Max {{getMaxBusinessTypeLength}}</span></h4>
          <div id="scroll-container">
            <div 
              class="checkbox-row" 
              v-for="(businessType, index) in businessTypes"
              :key="index"
              v-show="!(businessType.value === 'Buying Office' && isUserSupplier)">
              <input
                type="checkbox"
                :id="businessType.value"
                :value="businessType.value"
                v-model="value.businessTypes"
                :disabled="businessType.value === 'Buying Office'"
                @change="onChangeBusinessTypes"/>
              <label :for="businessType.value">
                {{businessType.value}}
              </label>
            </div>
          </div>
        </section>

        <!-- What is your industries? -->
        <section id="industry-container">
          <h4>
            What is your industries?<required-icon/>
            <span class="text-counting">{{getRemainLength(value.industries, MAX_INDUSTRY_LENGTH)}} Remainings</span></h4>
          <div id="scroll-container">
            <div 
              class="checkbox-row" 
              v-for="(category, index) in categories" 
              :key="index">
              <input
                type="checkbox"
                :id="category.name"
                :value="category.name"
                v-model="value.industries"
                @change="onChangeIndusties"/>
              <label :for="category.name">
                {{category.name}}
              </label>
            </div>
          </div>
        </section>

        <!-- What do you Buy? -->
        <section v-if="isUserBuyer || isUserBuyerAndSupplier">
          <h4>
            What do you buy?<required-icon/>
            <span class="text-counting">{{getRemainLength(value.buy, MAX_PRODUCTS_LENGTH)}}</span></h4>
          <input 
            type="text" 
            placeholder="e.g LED"
            :pattern="getPattern('products', MAX_PRODUCTS_LENGTH)"
            :maxlength="MAX_PRODUCTS_LENGTH"
            :title="$t('dashboardCompany.company.products.inputTitle')"
            v-model="value.buy"/>
            <h5>Each value is separeted by comma(,)</h5>
        </section>

        <!-- What do you Supply? -->
        <section v-if="isUserSupplier || isUserBuyerAndSupplier">
          <h4>
            What do you supply?<required-icon/>
            <span class="text-counting">{{getRemainLength(value.supply, MAX_PRODUCTS_LENGTH)}}</span></h4>
          <input 
            type="text" 
            placeholder="e.g Steel"
            :pattern="getPattern('products', MAX_PRODUCTS_LENGTH)"
            :maxlength="MAX_PRODUCTS_LENGTH"
            :title="$t('dashboardCompany.company.products.inputTitle')"
            v-model="value.supply"/>
        </section>

        <!-- Factory Hunt Domain -->
        <section id="domain-section">
          <h4>
            Website Address in Factory Hunt<required-icon/>
            <span class="text-counting">{{getRemainLength(value.domain, MAX_DOMAIN_LENGTH)}}</span></h4>
          <div class="table">
            <p class="table-cell">www.factoryhunt.com/</p>
            <input 
              type="text"  
              :maxlength="MAX_DOMAIN_LENGTH"
              :title="$t('dashboardCompany.domain.inputTitle')" 
              spellcheck="false" 
              autocomplete="off" 
              autocorrect="off" 
              autocapitalize="off"
              v-model="value.domain">
          </div>
          <span class="notice">Website Address must be only contain lowercased letters, numbers and periods.</span>
        </section>
      </div>
    </div>

    <!-- Bottom Caption -->
    <footer-caption v-show="value.accountType"/>

  </div>
</template>

<script>
import axios from '~/plugins/axios'
import categories from '~/assets/models/categories.json'
import business_type from '~/assets/models/business_type.json'
import static_domains from '~/assets/models/static_domains.json'
import RequiredIcon from '~/components/Icons/Required'
import FooterCaption from '../components/FooterCaption'
import { mapGetters } from 'vuex'
import { showTopAlert } from '~/utils/alert'
import { get_pattern, get_pattern_max_length } from '~/utils/reg_exr'
import {
  checkboxStringToArray,
  checkboxArrayToString,
  removeNullInArray,
  limitCheckboxMaxLength
} from '~/utils/checkbox'
import { getRemainInputLength } from '~/utils/text'
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
      MAX_INDUSTRY_LENGTH: get_pattern_max_length.INDUSTRIES,
      MAX_BUSINESS_TYPE_LENGTH: get_pattern_max_length.BUSINESS_TYPE,
      MAX_PRODUCTS_LENGTH: get_pattern_max_length.PRODUCTS,
      MAX_DOMAIN_LENGTH: get_pattern_max_length.DOMAIN,
      categories: categories,
      businessTypes: business_type,
      value: {
        industries: [],
        companyName: '',
        accountType: '',
        businessTypes: [],
        buy: '',
        supply: '',
        domain: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      userData: 'auth/GET_USER'
    }),
    getAccountId() {
      return this.userData.account.account_id
    },
    isUserBuyer() {
      return this.value.accountType === 'Buyer'
    },
    isUserSupplier() {
      return this.value.accountType === 'Supplier'
    },
    isUserBuyerAndSupplier() {
      return this.value.accountType === 'Buyer & Supplier'
    },
    getMaxBusinessTypeLength() {
      return this.isUserSupplier ? 3 : 4
    },
    getApiBody() {
      let {
        industries,
        accountType: account_type,
        businessTypes,
        buy: products_buy,
        supply: products,
        domain
      } = this.value
      const account_industries = this.checkboxArrayToString2(this.categories, industries)
      const business_type = checkboxArrayToString(this.businessTypes, businessTypes)

      if (this.isUserBuyer) products = ''
      if (this.isUserSupplier) products_buy = ''

      const body = {
        account_data: {
          account_industries,
          account_type,
          business_type,
          products_buy,
          products,
          domain
        }
      }

      return body
    }
  },
  methods: {
    mappingDatas() {
      const {
        account_industries,
        account_name,
        business_type,
        account_type,
        products_buy,
        products,
        domain
      } = this.userData.account

      this.value.industries = this.checkboxStringToArray2(this.categories, account_industries)
      this.value.companyName = account_name
      this.value.businessTypes = checkboxStringToArray(this.businessTypes, business_type)
      this.value.accountType = account_type
      this.value.buy = products_buy
      this.value.supply = products
      this.value.domain = domain
    },
    checkboxStringToArray2(originalArray, string) {
      let temp = []

      for (const i in originalArray) {
        const value = originalArray[i].name
        if (string.includes(value)) {
          temp.push(value)
        }
      }
      return temp
    },
    checkboxArrayToString2(originalArray, array) {
      let string = ''
      let removedEmptyArray = removeNullInArray(array)

      for (const originalIndex in originalArray) {
        const rawValue = originalArray[originalIndex].name

        for (const index in removedEmptyArray) {
          if (rawValue === removedEmptyArray[index]) {
            string = string + `, ${rawValue}`
          }
        }
      }
      return string.substring(2)
    },
    getRemainLength(string, maxLength) {
      return getRemainInputLength(string, maxLength)
    },
    getPattern(type, max_length, min_length) {
      return get_pattern(type, max_length, min_length)
    },
    onChangedUserType() {
      this.value.businessTypes = []

      if (this.isUserBuyer) this.value.businessTypes.push('Buying Office')

      if (this.isUserBuyerAndSupplier) {
        this.value.businessTypes.push('Buying Office')
        this.MAX_BUSINESS_TYPE_LENGTH = 4
      } else {
        this.MAX_BUSINESS_TYPE_LENGTH = 3
      }
    },
    onChangeIndusties() {
      const $inputs = '#industry-container input[type=checkbox]'
      limitCheckboxMaxLength($inputs, this.value.industries, 5)
    },
    onChangeBusinessTypes() {
      const $inputs = '.business-type-container input[type=checkbox]'

      limitCheckboxMaxLength($inputs, this.value.businessTypes, this.MAX_BUSINESS_TYPE_LENGTH)

      // Buying Office is always disabled
      const $buyingOffice = document.getElementById('Buying Office')
      $buyingOffice.setAttribute('disabled', 'disabled')
    },
    listenEventBus() {
      this.listenSaveButton()
      this.listenSkipThisStep()
    },
    listenSaveButton() {
      EventBus.$on('onSaveButton', () => {
        this.update()
      })
    },
    listenSkipThisStep() {
      EventBus.$on('onSkipThisStep', () => {
        location.href = '/signup/step2'
      })
    },
    denyStaticDomain() {
      const { domain } = this.value
      for (let i = 0; i < static_domains.length; i++) {
        const _domain = static_domains[i]
        if (domain === _domain) throw { msg: 'This domain is not available.' }
      }
    },
    checkDomain() {
      const { domain } = this.value
      const domainFilter = new RegExp('a-z0-9.')
      const result = domainFilter.test(domain)

      return new Promise((resolve, reject) => {
        // This is mine
        if (domain === this.userData.account.domain) resolve({ msg: 'This is my domain' })

        if (!result)
          reject({
            msg: 'Website Address must be only contain lowercased letters, numbers and periods.'
          })

        axios
          .get(`/api/data/account/check_domain/${domain}`)
          .then(res => {
            const account = res.data

            // Nobody taken
            if (!account.account_id) resolve(account.msg)
            else
              // Taken
              reject({ msg: 'This domain is already taken.' })
          })
          .catch(err => {
            console.log('checkdomain err', err.response)
            reject(err)
          })
      })
    },
    requestUpdating() {
      return new Promise((resolve, reject) => {
        axios
          .put(`/api/data/account/${this.getAccountId}`, this.getApiBody)
          .then(() => {
            resolve()
          })
          .catch(err => {
            console.log('request updating err', err)
            reject(err)
          })
      })
    },
    finishedUpdating() {
      location.href = '/signup/step2'
    },
    failedUploading() {
      EventBus.$emit('onLoadingFailed')
    },
    async update() {
      try {
        this.denyStaticDomain()
        await this.checkDomain()
        await this.requestUpdating()
        this.finishedUpdating()
      } catch (err) {
        console.log('update information err\n', err.msg)
        showTopAlert(this.$store, false, err.msg)
        EventBus.$emit('onLoadingFailed', err)
      }
    },
    checkRequiredField() {
      const { accountType, businessTypes, industries, buy, supply, domain } = this.value

      if (!accountType || !businessTypes.length || !industries.length || !domain)
        return EventBus.$emit('disableSaveButton')

      if (this.isUserBuyer && buy) {
        EventBus.$emit('enableSaveButton')
      } else if (this.isUserSupplier && supply) {
        EventBus.$emit('enableSaveButton')
      } else if (this.isUserBuyerAndSupplier && buy && supply) {
        EventBus.$emit('enableSaveButton')
      } else {
        console.log('nono')
        EventBus.$emit('disableSaveButton')
      }
    }
  },
  mounted() {
    this.mappingDatas()
    this.listenEventBus()
  },
  updated() {
    this.checkRequiredField()
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
@import '~assets/css/less/wizard/index';

#domain-section {
  .table {
    margin-top: 0 !important;
  }
  p {
    font-size: 18px;
    width: 144px;
  }
  .notice {
    display: inline-block;
    margin-top: 14px;
    color: @color-font-gray;
    font-size: 14px;
  }
}
</style>
