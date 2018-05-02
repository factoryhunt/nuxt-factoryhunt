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
            :maxFileSize="1"
            :maxFileLength="1"
            margin="0"
            :multiple="false"
            :s3="this.getS3Config('company_logo')"
            @isUploading="isUploading"
            @fileChanged="onLogoFileAdded"
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
            :maxFileSize="4"
            :maxFileLength="8"
            margin="6px"
            imageWidth="172px"
            :s3="this.getS3Config('company_cover_image')"
            @isUploading="isUploading"
            @fileChanged="onCoverImageFileAdded"
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
import { showTopAlert } from '~/utils/alert'
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
        logoImageFile: [],
        coverImageFiles: []
      }
    }
  },
  computed: {
    ...mapGetters({
      userData: 'auth/GET_USER'
    }),
    getAccountId() {
      return this.userData.account.account_id
    }
  },
  methods: {
    getS3Config(fieldname) {
      return {
        mysql_table: 'accounts',
        fieldname: fieldname,
        api_url: `/api/data/account/image/${this.getAccountId}`
      }
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
    isUploading() {
      EventBus.$emit('disableSaveButton')
    },
    listenSkipThisStep() {
      EventBus.$on('onSkipThisStep', () => {
        location.href = '/dashboard'
      })
    },
    onLogoFileAdded(files) {
      console.log(files)
      this.value.logoImageFile = files

      EventBus.$emit('enableSaveButton')
    },
    onLogoFileError(err) {
      showTopAlert(this.$store, false, err.msg)
    },
    onCoverImageFileAdded(files) {
      console.log(files)
      this.value.coverImageFiles = files

      EventBus.$emit('enableSaveButton')
    },
    onCoverImageFileError(err) {
      showTopAlert(this.$store, false, err.msg)
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
