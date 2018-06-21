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
            placeholder="Click, or drag and drop an image to this area (2MB MAX)"
            width="200px"
            :maxFileSize="3"
            :maxFileLength="1"
            margin="0"
            :multiple="false"
            :s3="this.getS3Config('company_logo')"
            @isUploading="isUploading"
            @fileChanged="onLogoFileAdded"
            @onError="onLogoFileError"/>
        </div>
          <h5>Square logo image is recommended.</h5>
      </section>

      <section>
        <h4>Cover Images</h4>
        <div class="dropzone-margin-top">
          <dropzone 
            id="cover-image-dropzone"
            class="dropzone"
            placeholder="Click, or drag and drop image(s) to this area (Each 3MB MAX)"
            :maxFileSize="4"
            :maxFileLength="8"
            margin="6px"
            imageWidth="172px"
            :s3="this.getS3Config('company_cover_image')"
            @isUploading="isUploading"
            @fileChanged="onCoverImageFileAdded"
            @onError="onCoverImageFileError"/>
        </div>
          <h5>You can upload up to 8 images.</h5>
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
    mappingDatas() {
      const {
        logo_url,
        cover_image_url_1,
        cover_image_url_2,
        cover_image_url_3,
        cover_image_url_4,
        cover_image_url_5,
        cover_image_url_6,
        cover_image_url_7,
        cover_image_url_8
      } = this.userData.account
    },
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
        this.updateInformation()
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
      this.value.logoImageFile = files

      if (files.length) EventBus.$emit('enableSaveButton')
      else EventBus.$emit('disableSaveButton')
    },
    onLogoFileError(err) {
      showTopAlert(this.$store, false, err.msg)
    },
    onCoverImageFileAdded(files) {
      this.value.coverImageFiles = files

      if (files.length) EventBus.$emit('enableSaveButton')
      else EventBus.$emit('disableSaveButton')
    },
    onCoverImageFileError(err) {
      showTopAlert(this.$store, false, err.msg)
    },
    updateInformation() {
      const { logoImageFile, coverImageFiles } = this.value

      let body = {
        account_data: {}
      }

      // Put logo files
      for (let i = 0; i < logoImageFile.length; i++) {
        const file = logoImageFile[i]
        body.account_data[`logo_url`] = file.location
      }

      // Put cover files
      for (let i = 0; i < coverImageFiles.length; i++) {
        const file = coverImageFiles[i]

        body.account_data[`cover_image_url_${i + 1}`] = file.location
      }

      axios
        .put(`/api/data/account/${this.getAccountId}`, body)
        .then(res => {
          EventBus.$emit('onLoadingFinished')
          location.href = '/dashboard'
        })
        .catch(err => {
          console.log('update information err', err)
          EventBus.$emit('onLoadingFailed', err)
        })
    }
  },
  mounted() {
    this.listenEventBus()
    // this.mappingDatas()
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
