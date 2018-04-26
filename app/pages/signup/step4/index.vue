<template>
  <div>
    <h1>Brand Images</h1>
    <h3>Your company's identity is visually expressed through its logo.</h3>

    <div id="contents">
      <section>
        <h4>Logo</h4>
        <h5>Squared image size is recommended.</h5>
      </section>

      <section>
        <h4>Cover Images</h4>
        <h5>Up to 8 images, and maximum file size is 5MB each.</h5>
      </section>
      
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
      title: 'Brand Images',
      link: [
        { hid: 'canonical', rel: 'canonical', href: `https://www.factoryhunt.com/signup/step4` }
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
        location.href = '/signup/step5'
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
