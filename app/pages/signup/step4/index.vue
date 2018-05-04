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
            <!-- Help Button -->
            <a 
              class="text-counting" 
              href="/contact" 
              target="_blank">Help?</a></h4>
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
              v-model="value.salutation"
              required>
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
              :maxlength="MAX_NAME_LENGTH"
              :pattern="getPattern('name', MAX_NAME_LENGTH)"
              :placeholder="$t('dashboardMyAccount.body.firstName.placeholder')" 
              :title="$t('dashboardMyAccount.body.firstName.inputTitle')" 
              v-model="value.firstname"
              required>
            <!-- Last name -->
            <input 
              class="table-cell" 
              type="text"
              :pattern="getPattern('name', MAX_NAME_LENGTH)"
              :placeholder="$t('dashboardMyAccount.body.lastName.placeholder')" 
              :title="$t('dashboardMyAccount.body.lastName.inputTitle')"
              v-model="value.lastname"
              required>
          </div>
        </section>
        <!-- Title/Role -->
        <section>
          <h4>Title/Role</h4>
          <input 
            type="text" 
            :maxlength="MAX_ROLE_LENGTH"
            :pattern="getPattern('role', MAX_ROLE_LENGTH)"
            :placeholder="$t('dashboardMyAccount.body.titles.placeholder')" 
            :title="$t('dashboardMyAccount.body.titles.inputTitle')" 
            v-model="value.title">
        </section>
        <!-- Mobile -->
        <section>
          <h4>Mobile</h4>
          <input 
            type="text" 
            :pattern="getPattern('tel', MAX_TEL_LENGTH)"
            :placeholder="$t('dashboardMyAccount.body.mobile.placeholder')" 
            :title="$t('dashboardMyAccount.body.mobile.inputTitle')" 
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
import { get_pattern, get_pattern_max_length } from '~/utils/reg_exr'
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
      MAX_NAME_LENGTH: get_pattern_max_length.NAME,
      MAX_ROLE_LENGTH: get_pattern_max_length.ROLE,
      MAX_TEL_LENGTH: get_pattern_max_length.TEL,
      salutations: salutations,
      value: {
        email: '',
        salutation: '',
        firstname: '',
        lastname: '',
        title: '',
        mobile: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      userData: 'auth/GET_USER'
    }),
    getContactId() {
      return this.userData.contact.contact_id
    }
  },
  methods: {
    mappingDatas() {
      const {
        contact_email,
        salutation,
        first_name,
        last_name,
        contact_title,
        contact_phone
      } = this.userData.contact

      this.value.email = contact_email
      this.value.salutation = salutation
      this.value.firstname = first_name
      this.value.lastname = last_name
      this.value.title = contact_title
      this.value.mobile = contact_phone
    },
    getPattern(type, max_length, min_length) {
      return get_pattern(type, max_length, min_length)
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
        salutation,
        firstname: first_name,
        lastname: last_name,
        title: contact_title,
        mobile: contact_phone
      } = this.value

      const body = {
        contact_data: {
          salutation,
          first_name,
          last_name,
          contact_title,
          contact_phone
        }
      }

      axios
        .put(`/api/data/contact/${this.getContactId}`, body)
        .then(res => {
          EventBus.$emit('onLoadingFinished')
          location.href = '/signup/step5'
        })
        .catch(err => {
          console.log('update information err', err)
          EventBus.$emit('onLoadingFailed', err)
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
