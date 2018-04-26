<template>
  <div>
    <h1>Certification & Awards</h1>
    <h3>In this step, we will help you to fill in your company information to connect your potential target easier.</h3>

    <div id="contents">
      <!-- Buyer or Supplier -> Business Type -->
      <section>
        <h4>Are you a buyer or supplier?</h4>
        <select v-model="value.type">
          <option value="" disabled>Select</option>
          <option value="Buyer">Buyer</option>
          <option value="Supplier">Supplier</option>
          <option value="Buyer & Supplier">Buyer & Supplier</option>
        </select>
      </section>

      <div v-show="value.type">
        <section>
          <h4>Business Type</h4>
          <span class="required-mark">*</span>
          <div id="scroll-container">
            <div class="checkbox-row" v-for="(businessType, index) in businessTypes" :key="index">
              <input
                type="checkbox"
                :id="businessType.value"
                :value="businessType.value"
                v-model="value.businessTypes"
                @change="businessTypeUpdated"/>
              <label 
                :for="businessType.value">
                {{businessType.value}}
              </label>
            </div>
          </div>
          <h5>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident aperiam soluta eaque fuga inventore modi neque itaque laboriosam, sunt ad deserunt quos exercitationem est perferendis voluptas. Laboriosam ullam debitis eius?</h5>
        </section>

        <section>
          <h4>Factory Hunt Domain</h4>
          <span class="required-mark">*</span>
          <input type="text">
          <h5>Your website will be https://www.factoryhunt.com/sample</h5>
        </section>

        <section>
          <h4>Website</h4>
          <input type="text" placeholder="www.yourcompany.com">
        </section>

        <section>
          <h4>Company Description</h4>
          <textarea id="short-description" rows="9"></textarea>
        </section>
      </div>
      
    </div>

  </div>
</template>

<script>
import axios from '~/plugins/axios'
import business_type from '~/assets/models/business_type.json'
import { mapGetters } from 'vuex'
import { EventBus } from '~/eventBus'
export default {
  layout: 'wizard',
  head() {
    return {
      title: 'Certification & Awards',
      link: [
        { hid: 'canonical', rel: 'canonical', href: `https://www.factoryhunt.com/signup/step5` }
      ]
    }
  },
  data() {
    return {
      businessTypes: business_type,
      value: {
        type: '',
        businessTypes: []
      }
    }
  },
  computed: mapGetters({
    userData: 'auth/GET_USER'
  }),
  methods: {
    businessTypeUpdated() {
      if (this.value.businessTypes.length) EventBus.$emit('enableSaveButton')
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
        location.href = '/dashboard'
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
