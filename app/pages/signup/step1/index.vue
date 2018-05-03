<template>
  <div>
    <h1>Hi, {{value.companyName}}</h1>
    <h3>In this step, we will help you to fill in your company information to connect your potential business partner easier.</h3>

    <div id="contents">
      <h2>Basic Company Information</h2>

      <!-- Buyer or Supplier => Business Type -->
      <section>
        <h4>Are you a buyer or supplier?</h4>
        <select v-model="value.accountType" @change="onChangedUserType">
          <option value="" disabled>Select</option>
          <option value="Buyer">Buyer</option>
          <option value="Supplier">Supplier</option>
          <option value="Buyer & Supplier">Buyer & Supplier</option>
        </select>
      </section>

      <!-- Business Types -->
      <div v-show="value.accountType">
        <section class="business-type-container" v-show="!isUserBuyer">
          <h4>
            What is your business type?<required-icon/>
            <span class="text-counting">Max {{getMaxBusinessTypeLength}}</span></h4>
          <div id="scroll-container">
            <div 
              class="checkbox-row" 
              v-for="(businessType, index) in businessTypes"
              :key="index"
              v-show="!isUserBuyer">
              <input
                type="checkbox"
                :id="businessType.value"
                :value="businessType.value"
                v-model="value.businessTypes"
                :disabled="businessType.value === 'Buying Office'"
                @change="onChangeBusinessTypes"/>
              <label 
                :for="businessType.value">
                {{businessType.value}}
              </label>
            </div>
          </div>
        </section>

        <!-- What do you Buy? -->
        <section v-if="isUserBuyer || isUserBuyerAndSupplier">
          <h4>
            What do you buy?<required-icon/>
            <span class="text-counting">{{getRemainLength(value.buy, MAX_BUY_LENGTH)}}</span></h4>
          <input 
            type="text" 
            placeholder="e.g LED"
            :maxlength="MAX_BUY_LENGTH"
            v-model="value.buy"/>
            <h5>Each value is separeted by comma(,)</h5>
        </section>

        <!-- What do you Supply? -->
        <section v-if="isUserSupplier || isUserBuyerAndSupplier">
          <h4>What do you supply?<required-icon/>
            <span class="text-counting">{{getRemainLength(value.supply, MAX_SUPPLY_LENGTH)}}</span></h4>
          <input 
            type="text" 
            placeholder="e.g Steal"
            pattern="[A-Za-z ,]{1,30}"
            :maxlength="MAX_SUPPLY_LENGTH"
            v-model="value.supply"/>
        </section>

        <!-- Factory Hunt Domain -->
        <section id="domain-section">
          <h4>Website Address in Factory Hunt<required-icon/></h4>
          <div class="table">
            <p class="table-cell">www.factoryhunt.com/</p>
            <input type="text" v-model="value.domain">
          </div>
        </section>
      </div>
    </div>

    <!-- Bottom Caption -->
    <footer-caption 
      v-show="value.accountType"/>

  </div>
</template>

<script>
import axios from '~/plugins/axios'
import business_type from '~/assets/models/business_type.json'
import RequiredIcon from '~/components/Icons/Required'
import FooterCaption from '../components/FooterCaption'
import { mapGetters } from 'vuex'
import {
  checkboxStringToArray,
  checkboxArrayToString,
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
        { hid: 'canonical', rel: 'canonical', href: `https://www.factoryhunt.com/signup/step1` }
      ]
    }
  },
  data() {
    return {
      MAX_BUSINESS_TYPE_LENGTH: 3,
      MAX_BUY_LENGTH: 200,
      MAX_SUPPLY_LENGTH: 200,
      businessTypes: business_type,
      value: {
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
    }
  },
  methods: {
    mappingDatas() {
      const {
        account_name,
        business_type,
        account_type,
        products_buy,
        products,
        domain
      } = this.userData.account
      this.value.companyName = account_name
      this.value.businessTypes = checkboxStringToArray(this.businessTypes, business_type)
      this.value.accountType = account_type
      this.value.buy = products_buy
      this.value.supply = products
      this.value.domain = domain
    },
    getRemainLength(string, maxLength) {
      return getRemainInputLength(string, maxLength)
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
    onChangeBusinessTypes() {
      const $inputs = '.business-type-container input[type=checkbox]'

      limitCheckboxMaxLength($inputs, this.value.businessTypes, this.MAX_BUSINESS_TYPE_LENGTH)

      // Buying Office is always disabled
      const $buyingOffice = document.getElementById('Buying Office')
      $buyingOffice.setAttribute('disabled', 'disabled')
    },
    canDisplayBuyingOffice(type) {
      return !(this.value.accountType === 'supplier' && type === 'Buying Office')
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
        location.href = '/signup/step2'
      })
    },
    updateInformation() {
      const {
        accountType: account_type,
        businessTypes,
        buy: products_buy,
        supply: products,
        domain
      } = this.value
      const business_type = checkboxArrayToString(this.businessTypes, businessTypes)

      const body = {
        account_data: {
          account_type,
          business_type,
          products_buy,
          products,
          domain
        }
      }

      axios
        .put(`/api/data/account/${this.getAccountId}`, body)
        .then(res => {
          EventBus.$emit('onLoadingFinished')
        })
        .catch(err => {
          console.log('update information err', err)
          EventBus.$emit('onLoadingFailed', err)
        })
    },
    checkRequiredField() {
      const { accountType, businessTypes, buy, supply, domain } = this.value

      if (this.isUserBuyer && accountType && businessTypes.length && buy && domain) {
        EventBus.$emit('enableSaveButton')
      } else if (this.isUserSupplier && accountType && businessTypes.length && supply && domain) {
        EventBus.$emit('enableSaveButton')
      } else if (
        this.isUserBuyerAndSupplier &&
        accountType &&
        businessTypes.length &&
        buy &&
        supply &&
        domain
      ) {
        EventBus.$emit('enableSaveButton')
      } else {
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
}
</style>
