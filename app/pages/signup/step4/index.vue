<template>
  <div>
    <h1>Brand Images</h1>
    <h3>Your company's identity is visually expressed through its logo.</h3>

    <div id="contents">
      <section>
        <h4>Logo</h4>
        <div id="logo-wrapper" class="dropzone-margin-top">
          <dropzone 
          id="logo-dropzone"
          class="dropzone"
          placeholder="Click or drag image to this area (1MB MAX)"
          width="200px"
          height="200px"
          maxFileSize="1"
          maxFileLength="1"
          :multiple="false"
          @fileAdded="onLogoFileAdded"
          @onError="onLogoFileError"/>
        </div>
          <h5>Logo image is recommended with square size.</h5>
      </section>

      <section>
        <h4>Cover Images</h4>
        <div class="dropzone-margin-top">
          <dropzone 
            id="cover-image-dropzone"
            class="dropzone"
            placeholder="Click or drag image(s) to this area (Each 3MB MAX)"
            maxFileSize="4"
            maxFileLength="8"
            imageWidth="31%"
            imageHeight="100px"
            @fileAdded="onCoverImageFileAdded"
            @onError="onCoverImageFileError"/>
        </div>
          <h5>Up to 8 images.</h5>
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
        logoImageFile: {},
        coverImageFiles: []
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
    },
    onLogoFileAdded(files) {
      console.log(files)
      this.value.logoImageFile = files[0]
    },
    onLogoFileError(err) {
      console.log('err', err.msg)
    },
    onCoverImageFileAdded(files) {
      console.log('files', files)
    },
    onCoverImageFileError(err) {
      console.log('err', err.msg)
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

#logo-image-container {
  display: flex;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 10px @color-light-grey;
  background-color: #fff;
}
#logo-image {
  margin: auto !important;
  width: auto !important;
  height: auto !important;
  max-width: 100% !important;
  max-height: 100% !important;
}
</style>
