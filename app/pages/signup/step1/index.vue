<template>
  <div>
    <h1>Welcome, {{companyName}}</h1>
    <h3>In this step, we will help you to fill in your company information to connect your potential target easier.</h3>

    <div id="contents">
      <h2>Basic Company Information</h2>

      <!-- Buyer or Supplier -> Business Type -->
      <section>
        <h4>Are you a buyer or supplier?</h4>
        <select v-model="value.userType" @change="onChangedUserType">
          <option value="" disabled>Select</option>
          <option value="buyer">Buyer</option>
          <option value="supplier">Supplier</option>
          <option value="buyer_and_supplier">Buyer & Supplier</option>
        </select>
      </section>

      <div v-show="value.userType">
        <section v-show="value.userType != 'buyer'">
          <h4>What is your business type?<required-icon/></h4>
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
                @change="businessTypeUpdated"/>
              <label 
                :for="businessType.value">
                {{businessType.value}}
              </label>
            </div>
          </div>
          <h5>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident aperiam soluta eaque fuga inventore modi neque itaque laboriosam, sunt ad deserunt quos exercitationem est perferendis voluptas. Laboriosam ullam debitis eius?</h5>
        </section>

        <section v-if="isUserBuyer">
          <h4>What do you buy?<required-icon/></h4>
          <input 
            type="text" 
            placeholder="e.g LED"
            v-model="value.buy"/>
        </section>

        <section v-if="isUserSupplier">
          <h4>What do you supply?<required-icon/></h4>
          <input 
            type="text" 
            placeholder="e.g Steal"
            v-model="value.supply"/>
        </section>

        <section>
          <h4>Products/Core Values<required-icon/></h4>
          <input 
            type="text" 
            placeholder="e.g Steal"
            v-model="value.products"/>
          <h5>Each value is separeted by comma(,)</h5>
        </section>

        <section id="domain-section">
          <h4>Website Address in Factory Hunt<required-icon/></h4>
          <div class="table">
            <p class="table-cell">factoryhunt.com/</p>
            <input type="text" v-model="value.domain">
          </div>
        </section>

        <section>
          <h4>Company Website</h4>
          <input 
            class="table-cell" 
            type="text" 
            placeholder="e.g www.yourcompany.com"
            v-model="value.website"/>
        </section>

        <section>
          <h4>Company Description</h4>
          <textarea 
            rows="9"
            v-model="value.companyDescription"></textarea>
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
      companyName: '',
      value: {
        userType: '',
        businessTypes: [],
        buy: '',
        supply: '',
        products: '',
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
    }
  },
  methods: {
    applyLocalData() {
      const { account } = this.userData
      console.log(account)
      this.companyName = account.account_name
      this.value.domain = account.domain
    },
    onChangedUserType() {
      this.value.businessTypes = []
      if (this.isUserBuyer) this.value.businessTypes.push('Buying Office')
    },
    businessTypeUpdated() {
      if (this.value.businessTypes.length) EventBus.$emit('enableSaveButton')

      if (!this.value.businessTypes.length) EventBus.$emit('disableSaveButton')
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
        console.log('parent called onSaveButton')
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
    }
  },
  mounted() {
    this.applyLocalData()
    this.listenEventBus()
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
