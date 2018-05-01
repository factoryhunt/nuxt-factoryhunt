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
          <input 
            v-model="value.email" 
            type="text" 
            autocomplete="email"
            disabled>
        </section>
        <!-- Contact Name -->
        <section id="contacts-container__contact-name-section">
          <div class="table">
            <h4>Contact Name<required-icon/></h4>
            <!-- Salutation -->
            <select 
              class="table-cell float-left"
              v-model="value.salutation">
              <option value="" disabled>Select</option>
              <option 
                v-for="(salutation,index) in salutations" 
                :key="index"
                :value="salutation">{{salutation}}</option>
            </select>
            <!-- First name -->
            <input 
              class="table-cell" 
              type="text"
              v-model="value.firstname" 
              placeholder="Peter">
            <!-- Last name -->
            <input 
              class="table-cell" 
              type="text"
              v-model="value.lastname" 
              placeholder="Smith">
          </div>
        </section>
        <!-- Title/Role -->
        <section>
          <h4>Title/Role</h4>
          <input 
            type="text" 
            v-model="value.role"
            placeholder="e.g CEO">
        </section>
        <!-- Mobile -->
        <section>
          <h4>Mobile</h4>
          <input 
            type="text" 
            placeholder="e.g +1-201-555-5555"
            v-model="value.mobile">
        </section>
      </div> <!-- End of Contacts Section -->

      <div id="address-container" class="section-margin">
        <h2>Address</h2>
        <!-- Country & State -->
        <div class="table">
          <!-- Country -->
          <section class="table-cell">
            <h4>Country<required-icon/></h4>
            <select 
              v-model="value.country" 
              autocomplete="address-level1"
              @change="delayKeyup">
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
            <input 
              type="text" 
              placeholder="e.g California" 
              v-model="value.state" 
              @change="delayKeyup">
          </section>
          <!-- Map Preview -->
          <div class="preview-container" tabindex="-1">
            <div class="preview-wrapper">
              <div id="no-map" class="preview-item" v-show="!toggle.isMapDisplayed">
                <span v-if="toggle.isMapLoading">Loading...</span>
                <span v-if="!toggle.isMapLoading">Location Preview</span>
              </div>
              <div id="map" class="preview-item" v-show="toggle.isMapDisplayed"></div>
            </div>
          </div>
        </div>
        <!-- City -->
        <section>
          <h4>City</h4>
          <input 
            type="text" 
            placeholder="e.g San Francisco"
            v-model="value.city"
            @change="delayKeyup">
        </section>
        <!-- Street Address -->
        <section>
          <h4>Street Address</h4>
          <input 
            type="text"
            placeholder="e.g 7 Hacker Street" 
            autocomplete="address-line1"
            v-model="value.streetAddress"
            @change="delayKeyup">
        </section>
        <!-- Street Address Details -->
        <section>
          <h4>Street Address Details</h4>
          <input 
            type="text" 
            placeholder="e.g Floor 2"
            v-model="value.streetAddressDetails"
            @change="delayKeyup">
        </section>
        <!-- Postal Code -->
        <section>
          <h4>Zip/Postal Code</h4>
          <input 
            id="zip-code" 
            type="text" 
            autocomplete="postal-code"
            v-model="value.zipCode">
        </section>
      </div>

    </div>

    <!-- Bottom Caption -->
    <footer-caption/>

  </div>
</template>

<script>
import axios from '~/plugins/axios'
import salutations from '~/assets/models/salutation.json'
import countries from '~/assets/models/countries.json'
import FooterCaption from '../components/FooterCaption'
import RequiredIcon from '~/components/Icons/Required'
import { mapGetters } from 'vuex'
import { renderGoogleMap } from '~/utils/google_api'
import { getFullAddress } from '~/utils/text'
import { EventBus } from '~/eventBus'
export default {
  layout: 'wizard',
  components: {
    RequiredIcon,
    FooterCaption
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
      googleMap: null,
      geocoder: null,
      value: {
        email: '',
        salutation: '',
        firstname: '',
        lastname: '',
        role: '',
        mobile: '',
        country: '',
        state: '',
        city: '',
        streetAddress: '',
        streetAddressDetails: '',
        zipCode: ''
      },
      toggle: {
        isMapDisplayed: false,
        isMapLoading: false
      }
    }
  },
  computed: {
    ...mapGetters({
      userData: 'auth/GET_USER'
    }),
    getAddress() {
      const config = {
        country: this.value.country,
        state: this.value.state,
        city: this.value.city,
        street_address: this.value.streetAddress,
        street_address_details: this.value.streetAddressDetails
      }
      const address = getFullAddress(config)
      return address
    },
    getMapZoom() {
      const { country, state, city, streetAddress, streetAddressDetails } = this.value

      if (streetAddress || streetAddressDetails) return 14

      if (city) return 11

      if (state) return 7

      return 4
    }
  },
  methods: {
    mappingDatas() {
      this.value.email = this.userData.contact.contact_email
    },
    delayKeyup() {
      this.renderMap()
    },
    async renderMap() {
      this.toggle.isMapDisplayed = false
      this.toggle.isMapLoading = true

      const $map = document.getElementById('map')
      const config = {
        zoom: this.getMapZoom,
        // center: latlng,
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.TOP_RIGHT
        },
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false
      }

      try {
        await renderGoogleMap($map, config, this.getAddress)
        this.toggle.isMapDisplayed = true
        this.toggle.isMapLoading = false
      } catch (err) {
        console.log('map rendering err:', err)
        this.toggle.isMapLoading = false
      }
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
            console.log('update information err', err)
            reject(err)
          })
      })
    },
    checkRequiredField() {
      const { email, salutation, firstname, lastname, country } = this.value

      if (email && salutation && firstname && lastname && country) {
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
.preview-wrapper {
  padding-bottom: 100% !important;
}
#no-map {
  display: flex;
  align-items: center;
  background-color: #f3f3f3;
  padding: 18px;
  text-align: center;

  span {
    width: 100%;
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
