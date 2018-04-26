<template>
  <div>
    <h1>Business Details</h1>
    <h3>상세한 정보를 제공하는 회사는 상대 비즈니스와 거래가 성사될 가능성이 높습니다.</h3>

    <div id="contents">
        <!-- What is your industries? -->
      <section>
        <h4>What is your industries?<required-icon/></h4>
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
      </section>

      <section>
        <h4>Company Short Description</h4>
        <textarea rows="4"></textarea>
      </section>

      <section>
        <h4>Company History</h4>
        <textarea rows="9"></textarea>
      </section>

      <section>
        <h4>Company Introduction Video</h4>
        <input type="text" placeholder="e.g https://vimeo.com/12345678">
        <h5>Please copy and paste only YouTube or Vimeo link.</h5>
      </section>

      <section>
        <h4>Phone</h4>
        <input type="text" placeholder="e.g +1-201-555-5555">
      </section>

      <div class="table">
        <!-- Established Year -->
        <section id="established-year-section" class="table-cell">
          <h4>Established Year</h4>
          <select class="float-left">
            <option value="" disabled>Select</option>
          </select>
        </section>
        <!-- Total Employees -->
        <section id="total-employees-section" class="table-cell">
          <h4>Total Employees</h4>
          <select>
            <option value="" disabled>Select</option>
          </select>
        </section>
      </div>

      <div class="table">
        <!-- Average Lead Time -->
        <section id="average-lead-time-section" class="table-cell">
          <h4>Average Lead Time</h4>
          <input type="text">
        </section>
        <!-- Total Annual Revenue -->
        <section id="total-annual-revenue-section" class="table-cell">
          <h4>Total Annual Revenue</h4>
          <select class="table-cell float-left">
            <option value="" disabled>Select</option>
          </select>
        </section>
      </div>

      <div class="section-margin">
        <h2>Trade Capacity</h2>
        <!-- Accepted Payment Currency -->
        <section>
          <h4>Accepted Payment Currency</h4>
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
        </section>
        <!-- Accepted Payment Type -->
        <section>
          <h4>Accepted Payment Type</h4>
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
        </section>
        <!-- Language Spoken -->
        <section>
          <h4>Language Spoken</h4>
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
        </section>
        <!-- Accepted Delivery Terms -->
        <section>
          <h4>Accepted Delivery Terms</h4>
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
        </section>
      </div>

    </div>
    <!-- Bottom Caption -->
    <footer-caption/>

  </div>
</template>

<script>
import axios from '~/plugins/axios'
import business_type from '~/assets/models/business_type.json'
import categories from '~/assets/models/categories.json'
import FooterCaption from '../components/FooterCaption'
import RequiredIcon from '~/components/Icons/Required'
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
      categories: categories,
      value: {
        categories: [],
        businessTypes: []
      }
    }
  },
  computed: {
    ...mapGetters({
      userData: 'auth/GET_USER'
    })
  },
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

#established-year-section {
  width: 164px;

  select {
    background-position-x: 87%;
  }
}
#total-employees-section {
  padding-left: 80px;
}
#average-lead-time-section {
  width: 164px;
}
#total-annual-revenue-section {
  padding-left: 80px;
}
</style>
