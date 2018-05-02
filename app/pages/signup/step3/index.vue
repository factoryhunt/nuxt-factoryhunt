<template>
  <div>
    <h1>Business Address</h1>

    <div id="contents">
      <!-- Office address -->
      <div id="address-container">
        <h2>Office Address</h2>
        <!-- Country & State -->
        <div class="table">
          <!-- Country -->
          <section class="table-cell">
            <h4>Country<required-icon/></h4>
            <select 
              v-model="value.office.country" 
              autocomplete="address-level1"
              @change="delayKeyup(ADDRESS_TYPE_OFFICE)">
              <option value="" disabled>Select</option>
              <option 
                v-for="(country,index) in countries" 
                :key="index" 
                :value="country.country_name">{{country.country_name}}</option>
            </select>
          </section>
          <!-- State -->
          <section class="table-cell">
            <h4>State</h4>
            <input 
              type="text" 
              placeholder="e.g California" 
              v-model="value.office.state" 
              @change="delayKeyup(ADDRESS_TYPE_OFFICE)">
          </section>
          <!-- Map Preview -->
          <div class="preview-container" tabindex="-1">
            <div class="preview-wrapper">
              <div id="no-map" class="preview-item" v-show="!value.office.isMapDisplayed">
                <span>{{value.office.mapPreview}}</span>
              </div>
              <div id="office-map" class="preview-item" v-show="value.office.isMapDisplayed"></div>
            </div>
          </div>
        </div>
        <!-- City -->
        <section>
          <h4>City</h4>
          <input 
            type="text" 
            placeholder="e.g San Francisco"
            v-model="value.office.city"
            @change="delayKeyup(ADDRESS_TYPE_OFFICE)">
        </section>
        <!-- Street Address -->
        <section>
          <h4>Street Address</h4>
          <input 
            type="text"
            placeholder="e.g 7 Hacker Street" 
            autocomplete="address-line1"
            v-model="value.office.streetAddress"
            @change="delayKeyup(ADDRESS_TYPE_OFFICE)">
        </section>
        <!-- Street Address Details -->
        <section>
          <h4>Street Address Details</h4>
          <input 
            type="text" 
            placeholder="e.g Floor 2"
            v-model="value.office.streetAddress2">
        </section>
        <!-- Postal Code -->
        <section>
          <h4>Zip/Postal Code</h4>
          <input 
            id="zip-code" 
            type="text" 
            autocomplete="postal-code"
            v-model="value.office.postalCode">
        </section>
      </div>
      <!-- Factory Address -->
      <div id="address-container" class="section-margin">
        <h2>Factory Address</h2>
        <!-- Country & State -->
        <div class="table">
          <!-- Country -->
          <section class="table-cell">
            <h4>Country</h4>
            <select 
              v-model="value.factory.country" 
              autocomplete="address-level1"
              @change="delayKeyup(ADDRESS_TYPE_FACTORY)">
              <option value="" disabled>Select</option>
              <option 
                v-for="(country,index) in countries" 
                :key="index" 
                :value="country.country_name">{{country.country_name}}</option>
            </select>
          </section>
          <!-- State -->
          <section class="table-cell">
            <h4>State</h4>
            <input 
              type="text" 
              placeholder="e.g California" 
              v-model="value.factory.state" 
              @change="delayKeyup(ADDRESS_TYPE_FACTORY)">
          </section>
          <!-- Map Preview -->
          <div class="preview-container" tabindex="-1">
            <div class="preview-wrapper">
              <div id="no-map" class="preview-item" v-show="!value.factory.isMapDisplayed">
                <span>{{value.factory.mapPreview}}</span>
              </div>
              <div id="factory-map" class="preview-item" v-show="value.factory.isMapDisplayed"></div>
            </div>
          </div>
        </div>
        <!-- City -->
        <section>
          <h4>City</h4>
          <input 
            type="text" 
            placeholder="e.g San Francisco"
            v-model="value.factory.city"
            @change="delayKeyup(ADDRESS_TYPE_FACTORY)">
        </section>
        <!-- Street Address -->
        <section>
          <h4>Street Address</h4>
          <input 
            type="text"
            placeholder="e.g 7 Hacker Street" 
            autocomplete="address-line1"
            v-model="value.factory.streetAddress"
            @change="delayKeyup(ADDRESS_TYPE_FACTORY)">
        </section>
        <!-- Street Address Details -->
        <section>
          <h4>Street Address Details</h4>
          <input 
            type="text" 
            placeholder="e.g Floor 2"
            v-model="value.factory.streetAddress2">
        </section>
        <!-- Postal Code -->
        <section>
          <h4>Zip/Postal Code</h4>
          <input 
            id="zip-code" 
            type="text" 
            autocomplete="postal-code"
            v-model="value.factory.postalCode">
        </section>
      </div>
    </div>
    <!-- Bottom Caption -->
    <footer-caption/>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import countries from '~/assets/models/country.json'
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
      ADDRESS_TYPE_OFFICE: 'office',
      ADDRESS_TYPE_FACTORY: 'factory',
      countries: countries,
      value: {
        office: {
          country: '',
          state: '',
          city: '',
          streetAddress: '',
          streetAddress2: '',
          postalCode: '',
          mapPreview: 'Location Preview',
          isMapDisplayed: false,
          isMapLoading: false
        },
        factory: {
          country: '',
          state: '',
          city: '',
          streetAddress: '',
          streetAddress2: '',
          postalCode: '',
          mapPreview: 'Location Preview',
          isMapDisplayed: false,
          isMapLoading: false
        }
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
    isOfficeAddressEmpty() {
      const { streetAddress, city, state, country } = this.value.office

      if (!streetAddress && !city && !state && !country) return true
      return false
    },
    isFactoryAddressEmpty() {
      const { streetAddress, city, state, country } = this.value.factory

      if (!streetAddress && !city && !state && !country) return true
      return false
    }
  },
  methods: {
    mappingDatas() {
      const {
        mailing_postal_code,
        mailing_street_address,
        mailing_street_address_2,
        mailing_city,
        mailing_state,
        mailing_country,
        factory_postal_code,
        factory_street_address,
        factory_street_address_2,
        factory_city,
        factory_state,
        factory_country
      } = this.userData.account

      this.value.office.postalCode = mailing_postal_code
      this.value.office.streetAddress = mailing_street_address
      this.value.office.streetAddress2 = mailing_street_address_2
      this.value.office.city = mailing_city
      this.value.office.state = mailing_state
      this.value.office.country = mailing_country

      this.value.factory.postalCode = factory_postal_code
      this.value.factory.streetAddress = factory_street_address
      this.value.factory.streetAddress2 = factory_street_address_2
      this.value.factory.city = factory_city
      this.value.factory.state = factory_state
      this.value.factory.country = factory_country
    },
    initMaps() {
      if (!this.isOfficeAddressEmpty) this.renderMap(this.ADDRESS_TYPE_OFFICE, this.value.office)
      if (!this.isFactoryAddressEmpty) this.renderMap(this.ADDRESS_TYPE_FACTORY, this.value.factory)
    },
    delayKeyup(type) {
      const value = type === this.ADDRESS_TYPE_OFFICE ? this.value.office : this.value.factory
      this.renderMap(type, value)
    },
    async renderMap(type, value) {
      value.isMapDisplayed = false
      value.mapPreview = 'Loading...'

      const id = type === this.ADDRESS_TYPE_OFFICE ? 'office-map' : 'factory-map'
      const $map = document.getElementById(id)
      const config = {
        zoom: this.getMapZoom(value),
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
        await renderGoogleMap($map, config, this.getAddress(value))
        value.isMapDisplayed = true
        value.mapPreview = ''
      } catch (err) {
        console.log('map rendering err:', err)
        value.mapPreview = "Google Maps can't identify your address."
      }
    },
    getAddress(type) {
      const { country, state, city, streetAddress } = type
      const config = {
        country,
        state,
        city,
        street_address: streetAddress
      }
      const address = getFullAddress(config)
      return address
    },
    getMapZoom(type) {
      // type is wheter this.value.office or this.value.factory
      const { country, state, city, streetAddress } = type

      if (streetAddress) return 14

      if (city) return 11

      if (state) return 7

      return 4
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
        location.href = '/signup/step4'
      })
    },
    updateInformation() {
      const {
        postalCode: mailing_postal_code,
        streetAddress: mailing_street_address,
        streetAddress2: mailing_street_address_2,
        city: mailing_city,
        state: mailing_state,
        country: mailing_country
      } = this.value.office
      const {
        postalCode: factory_postal_code,
        streetAddress: factory_street_address,
        streetAddress2: factory_street_address_2,
        city: factory_city,
        state: factory_state,
        country: factory_country
      } = this.value.factory

      const body = {
        account_data: {
          mailing_postal_code,
          mailing_street_address,
          mailing_street_address_2,
          mailing_city,
          mailing_state,
          mailing_country,
          factory_postal_code,
          factory_street_address,
          factory_street_address_2,
          factory_city,
          factory_state,
          factory_country
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
      const { country } = this.value.office

      if (country) {
        EventBus.$emit('enableSaveButton')
      } else {
        EventBus.$emit('disableSaveButton')
      }
    }
  },
  mounted() {
    this.listenEventBus()
    this.mappingDatas()
    this.initMaps()
  },
  updated() {
    this.checkRequiredField()
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
@import '~assets/css/less/wizard/index';

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
