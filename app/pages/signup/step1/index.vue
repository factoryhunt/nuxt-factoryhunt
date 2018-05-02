<template>
  <div>
    <h1>Hi, {{companyName}}</h1>
    <h3>In this step, we will help you to fill in your company information to connect your potential business partner easier.</h3>

    <div id="contents">
      <h2>Basic Company Information</h2>

      <!-- Buyer or Supplier => Business Type -->
      <section>
        <h4>Are you a buyer or supplier?</h4>
        <select v-model="value.userType" @change="onChangedUserType">
          <option value="" disabled>Select</option>
          <option value="buyer">Buyer</option>
          <option value="supplier">Supplier</option>
          <option value="buyer_and_supplier">Buyer & Supplier</option>
        </select>
      </section>

      <!-- Business Types -->
      <div v-show="value.userType">
        <section class="business-type-container" v-show="value.userType != 'buyer'">
          <h4>
            What is your business type?<required-icon/>
            <span class="text-counting">Max {{getMaxBusinessTypeLength}}</span></h4>
          <div id="scroll-container">
            <div 
              class="checkbox-row" 
              v-for="(businessType, index) in businessTypes"
              :key="index"
              v-show="canDisplayBuyingOffice(businessType.value)">
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
        <section v-if="isUserBuyer">
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
        <section v-if="isUserSupplier">
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
      v-show="value.userType"/>

  </div>
</template>

<script>
import axios from '~/plugins/axios'
import business_type from '~/assets/models/business_type.json'
import RequiredIcon from '~/components/Icons/Required'
import FooterCaption from '../components/FooterCaption'
import { mapGetters } from 'vuex'
import { limitCheckboxMaxLength } from '~/utils/checkbox'
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
      companyName: '',
      value: {
        userType: '',
        businessTypes: [],
        buy: '',
        supply: '',
        domain: '',
        website: '',
        companyDescription: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      userData: 'auth/GET_USER'
    }),
    isUserBuyer() {
      return this.value.userType.indexOf('buyer') != -1
    },
    isUserSupplier() {
      return this.value.userType.indexOf('supplier') != -1
    },
    getMaxBusinessTypeLength() {
      return this.isUserBuyer ? 4 : 3
    }
  },
  methods: {
    mappingDatas() {
      const { account } = this.userData
      this.companyName = account.account_name
      this.value.domain = account.domain
    },
    getRemainLength(string, maxLength) {
      return getRemainInputLength(string, maxLength)
    },
    onChangedUserType() {
      this.value.businessTypes = []

      if (this.isUserBuyer) {
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
      return !(this.value.userType === 'supplier' && type === 'Buying Office')
    },
    listenEventBus() {
      this.listenSaveButton()
      this.listenSkipThisStep()
    },
    listenSaveButton() {
      EventBus.$on('onSaveButton', () => {
        setTimeout(() => {
          console.log('onLoadingFinish in child')
          EventBus.$emit('onLoadingFinished')
        }, 2000)
        // this.updateInformation()
      })
    },
    listenSkipThisStep() {
      EventBus.$on('onSkipThisStep', () => {
        location.href = '/signup/step2'
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
      const { userType, businessTypes, buy, supply, products, domain } = this.value

      if (userType && businessTypes.length && (buy || supply) && products && domain) {
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
