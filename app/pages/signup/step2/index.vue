<template>
  <div>
    <h1>Contacts & Address</h1>
    <h3>In this step, we will help you to fill in your company information to connect your potential target easier.</h3>

    <div id="contents">

      <div id="contacts-container">
        <h2>Contacts</h2>
        <!-- Email -->
        <section>
          <h4>Your email<a class="help-button" href="/contact" target="_blank">Help?</a></h4>
          <input value="tester@factoryhunt.com" type="text" disabled>
        </section>
        <!-- Contact Name -->
        <section id="contacts-container__contact-name-section">
          <div class="table">
            <h4>Contact Name<required-icon/></h4>
            <select 
              class="table-cell float-left"
              v-model="value.salutation">
              <option value="" disabled>Select</option>
              <option 
                v-for="(salutation,index) in salutations" 
                :key="index"
                :value="salutation">{{salutation}}</option>
            </select>
            <input class="table-cell" type="text" placeholder="Peter">
            <input class="table-cell" type="text" placeholder="Smith">
          </div>
        </section>
        <!-- Title/Role -->
        <section>
          <h4>Title/Role</h4>
          <input type="text" placeholder="e.g CEO">
        </section>
        <!-- Mobile -->
        <section>
          <h4>Mobile</h4>
          <input type="text" placeholder="e.g +1-201-555-5555">
        </section>
      </div> <!-- End of Contacts Section -->

      <div id="address-container" class="section-margin">
        <h2>Address</h2>
        <!-- Country & State -->
        <div class="table">
          <!-- Country -->
          <section class="table-cell">
            <h4>Country<required-icon/></h4>
            <select v-model="value.country">
              <option value="" disabled>Select</option>
              <option 
                v-for="(country,index) in countries" 
                :key="index" 
                :value="country.name">{{country.name}}</option>
            </select>
          </section>
          <!-- State -->
          <section class="table-cell">
            <h4>State</h4>
            <input type="text" placeholder="e.g California">
          </section>
        </div>
        <!-- City -->
        <section>
          <h4>City</h4>
          <input type="text" placeholder="e.g San Francisco">
        </section>
        <!-- Street Address -->
        <section>
          <h4>Street Address</h4>
          <input type="text" placeholder="e.g 7 Hacker Street">
        </section>
        <!-- Street Address Details -->
        <section>
          <h4>Street Address Details</h4>
          <input type="text" placeholder="e.g Floor 2">
        </section>
        <!-- Postal Code -->
        <section>
          <h4>Zip/Postal Code</h4>
          <input id="zip-code" type="text">
        </section>

      </div>

    </div>

  </div>
</template>

<script>
import axios from '~/plugins/axios'
import salutations from '~/assets/models/salutation.json'
import countries from '~/assets/models/countries.json'
import RequiredIcon from '~/components/Icons/Required'
import { mapGetters } from 'vuex'
import { EventBus } from '~/eventBus'
export default {
  layout: 'wizard',
  components: {
    RequiredIcon
  },
  head() {
    return {
      title: 'Contacts & Address',
      link: [
        { hid: 'canonical', rel: 'canonical', href: `https://www.factoryhunt.com/signup/step2` }
      ]
    }
  },
  data() {
    return {
      salutations: salutations,
      countries: countries.english,
      value: {
        salutation: '',
        country: ''
      }
    }
  },
  computed: mapGetters({
    userData: 'auth/GET_USER'
  }),
  methods: {
    businessTypeUpdated() {
      EventBus.$emit('enableSaveButton')
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
        location.href = '/signup/step3'
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
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
@import '~assets/css/less/wizard/index';

#contacts-container__contact-name-section {
  select {
    width: 110px;
    background-position-x: 89%;
  }
  input {
    width: 200px;
    margin-left: 12px;
  }
}
#address-container {
  select {
    width: 280px;
    background-position-x: 94%;
  }
  #zip-code {
    width: 150px;
  }
}
</style>
