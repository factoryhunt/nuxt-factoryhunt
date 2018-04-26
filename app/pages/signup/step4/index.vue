<template>
  <div>
    <h1>Brand Images</h1>
    <h3>Your company's identity is visually expressed through its logo.</h3>

    <div id="contents">
      <section>
        <h4>Logo</h4>
        <dropzone 
          class="dropzone"
          placeholder="Click or drag image to this area (1MB MAX)"/>
          <h5>Logo image is recommended with square size.</h5>
      </section>

      <section>
        <h4>Cover Images</h4>
        <dropzone 
          class="dropzone"
          placeholder="Click or drag image(s) to this area (Each 5MB MAX)"/>
          <h5>Up to 8 images, Maximum file size is 5MB each.</h5>
      </section>
    </div>

  </div>
</template>

<script>
import axios from '~/plugins/axios'
import Dropzone from '~/components/Dropzone'
import RequiredIcon from '~/components/Icons/Required'
import { mapGetters } from 'vuex'
import { EventBus } from '~/eventBus'
export default {
  layout: 'wizard',
  components: {
    Dropzone,
    RequiredIcon
  },
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

.dropzone {
  margin-top: 9px !important;
}
</style>
