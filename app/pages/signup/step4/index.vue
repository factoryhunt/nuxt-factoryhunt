<template>
  <div>
    <h1>Contacts & Address</h1>
    <h3>In this step, we will help you to fill in your company information to connect your potential target easier.</h3>

    <div id="contents">
      <div id="contacts-container">
        <h2>Contacts</h2>
        <!-- Email -->
        <section>
          <h4>Your email
            <a class="text-counting" href="/contact" target="_blank">Help?</a></h4>
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
    </div>

    <!-- Bottom Caption -->
    <footer-caption/>

  </div>
</template>

<script>
import axios from '~/plugins/axios'
import salutations from '~/assets/models/salutation.json'
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
      value: {
        email: '',
        salutation: '',
        firstname: '',
        lastname: '',
        role: '',
        mobile: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      userData: 'auth/GET_USER'
    })
  },
  methods: {
    mappingDatas() {
      this.value.email = this.userData.contact.contact_email
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
            console.log('update information err', err)
            reject(err)
          })
      })
    },
    checkRequiredField() {
      const { email, salutation, firstname, lastname } = this.value

      if (email && salutation && firstname && lastname) {
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

.text-counting {
  font-size: 13px;
  font-weight: 500;
  color: @color-link !important;

  &:hover {
    cursor: help !important;
  }
}
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
</style>
