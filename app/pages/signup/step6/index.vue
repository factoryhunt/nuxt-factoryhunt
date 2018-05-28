<template>
  <div>
    <h1>Certification & Awards</h1>
    <h3>Verify your company by uploading certifications.</h3>

    <div id="contents">
      <section>
        <h4>Documents</h4>
        <dropzone 
          id="certification-dropzone"
          class="dropzone"
          placeholder="Click or drag image(s) to this area (1MB MAX)"
          :maxFileSize="1"
          @fileAdded="onFileAdded"
          @onError="onFileError"/>
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
      title: 'Documents',
      link: [
        { hid: 'canonical', rel: 'canonical', href: `https://www.factoryhunt.com/signup/step4` }
      ]
    }
  },
  data() {
    return {
      value: {
        files: []
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
        location.href = '/dashboard'
      })
    },
    onFileAdded(files) {
      if (!files.length) return

      this.value.files = files
      console.log('files', this.value.files)
    },
    onFileError(err) {
      console.log('err', err)
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
#contents {
  min-height: 0;
}
.dropzone {
  margin-top: 9px !important;
}
</style>
