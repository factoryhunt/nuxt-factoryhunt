<template>
  <div>
    <h1>Welcome, Factory Hunt Inc.</h1>
    <h3>In this step, we will help you to fill in your company information to connect your potential target easier.</h3>

    <div id="contents">
      <h2>Basic Company Information</h2>
      <h3>Complete profile is crucial to increasing your visibility within our network and ensuring connections with companies from around the world.</h3>

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
          <input type="text" placeholder="e.g LED">
        </section>

        <section v-if="isUserSupplier">
          <h4>What do you supply?<required-icon/></h4>
          <input type="text" placeholder="e.g Steal">
        </section>

        <section>
          <h4>Products/Core Values<required-icon/></h4>
          <input type="text" placeholder="e.g Steal">
          <h5>Each value is separeted by comma(,)</h5>
        </section>

        <section>
          <h4>Website Address in Factory Hunt<required-icon/></h4>
          <input type="text">
          <h5>이 주소로 회사 홈페이지를 가질 수 있습니다.</h5>
        </section>

        <section>
          <h4>Company Website</h4>
          <dl>
            <dt>factoryhunt.com/</dt>
            <dl><input class="table-cell" type="text" placeholder="e.g www.yourcompany.com"></dl>
          </dl>
        </section>

        <section>
          <h4>Company Description</h4>
          <textarea id="short-description" rows="9"></textarea>
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
      value: {
        userType: '',
        businessTypes: []
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
    onChangedUserType() {
      this.value.businessTypes = []
      if (this.isUserBuyer) this.value.businessTypes.push('Buying Office')
    },
    businessTypeUpdated() {
      if (this.value.businessTypes.length) EventBus.$emit('enableSaveButton')
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
    this.listenEventBus()
    console.log('userData', this.userData)
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
@import '~assets/css/less/wizard/index';
</style>
