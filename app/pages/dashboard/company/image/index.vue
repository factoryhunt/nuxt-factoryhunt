<template>
  <div class="dashboard-page-container">

    <spinkit id="modal-loader"></spinkit>

    <!-- Logo -->
    <div class="logo-image-container">
      <!-- Title -->
      <div class="title-container">
        <p class="title">{{ $t('dashboardCompany.logo.title') }}</p>
        <p class="sub-title">{{ $t('dashboardCompany.logo.desc') }}</p>
        <p class="third-title">{{ $t('dashboardCompany.logo.caution') }}</p>
      </div>

      <!-- Logo Image -->
      <img v-if="account.thumbnail_url" id="logo-image" class="logo-image" :src="account.thumbnail_url">
      <img v-else id="logo-image" class="logo-image" src="~assets/img/temp-logo-image_english_512.png">

      <!-- Upload Button -->
      <div class="button-container">
        <label for="logo-image-input">{{ $t('dashboardCompany.logo.button') }}</label>
        <input id="logo-image-input" type="file" @change="onLogoImageChanged($event.target.files)" accept="image/*">
        <button id="logo-image-upload-button" class="button-orange" @click="imageUpload('logo-image-input')">{{ $t('dashboardCompany.upload') }}</button>
      </div>
    </div>

    <!-- Main Image -->
    <div class="main-image-container">
      <!-- Title -->
      <div class="title-container">
        <p class="title">{{ $t('dashboardCompany.cover.title') }}</p>
        <p class="sub-title">{{ $t('dashboardCompany.cover.desc') }}</p>
      </div>

      <!-- Main Image -->
      <div class="image-container">
        <div id="main-image" class="main-image"></div>
      </div>

      <!-- Upload Button -->
      <div class="button-container">
        <p class="third-title">{{ $t('dashboardCompany.cover.caution') }}</p>
        <label for="main-image-input">{{ $t('dashboardCompany.cover.button') }}</label>
        <input id="main-image-input" type="file" @change="onMainImageChanged($event.target.files)" accept="image/*">
        <button id="main-image-upload-button" class="button-orange" @click="imageUpload('main-image-input')">{{ $t('dashboardCompany.upload') }}</button>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  import Spinkit from '../../../../components/Loader'
//  import Compressor from '@xkeshi/image-compressor'
  import { mapGetters } from 'vuex'
  export default {
    head () {
      return {
        title: 'Upload Image',
        link: [
          { hid: 'canonical', rel: 'canonical', href: `https://www.factoryhunt.com/dashboard/company/image` }
        ]
      }
    },
    components: {
      Spinkit
    },
    props: {
      account: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data () {
      return {
        value: {
          mainImageFileName: '',
          logoImageFileName: ''
        }
      }
    },
    computed: {
      ...mapGetters([
        'getAccountId'
      ])
    },
    methods: {
      //      filterImageFileName (fileName) {
//        fileName = fileName.replace(/ /gi, '+')
//        fileName = 'https://s3-us-west-1.amazonaws.com/factoryhunt.com/accounts/' + this.getAccountId + '/' + fileName
//        return fileName
//      },
      readURL (image, files, target) {
//        console.log('files: ', files)
        if (files) {
          var reader = new FileReader()
          reader.onload = function (event) {
//            console.log('event: ', event)
//            image.attr('src', event.target.result)
            if (target === 'main') {
              image.css('background-image', `url(${event.target.result})`)
            }
            if (target === 'logo') {
              image.attr('src', event.target.result)
            }
          }
          reader.readAsDataURL(files[0])
//          console.log('reader: ', reader)
        }
      },
      onMainImageChanged (fileList) {
        var image = $('.main-image')
        var uploadButton = $('#main-image-upload-button')
        uploadButton.css({'display': 'inline-block'})
        this.readURL(image, fileList, 'main')
      },
      onLogoImageChanged (fileList) {
        var image = $('.logo-image')
        var uploadButton = $('#logo-image-upload-button')
        uploadButton.css({'display': 'inline-block'})
        this.readURL(image, fileList, 'logo')
      },
      async imageUpload (inputId) {
        this.activateLoader()
        const file = document.getElementById(inputId).files[0]
        try {
//          const compressedFile = await this.imageCompress(file)
          await this.postImageToS3(inputId, file)
          this.uploadSuccess()
        } catch (err) {
          this.uploadFail()
        }
      },
      showAlert (alertState, msg) {
        $(document).ready(() => {
          this.deactivateLoader()
          const $alert = $('#alert')
          this.$store.commit('alert/changeState', {
            alertState,
            msg
          })
          $alert.show()
          setTimeout(() => {
            $('.alert-container').hide()
          }, 6000)
        })
      },
      uploadSuccess () {
        this.showAlert(true, this.$t('dashboardCompany.alert.image.success'))
      },
      uploadFail () {
        this.showAlert(false, this.$t('dashboardCompany.alert.image.fail'))
      },
      imageCompress (file) {
        return new Promise((resolve, reject) => {
          new Compressor(file, { // eslint-disable-line no-new
            quality: 0.6,
            success (resultFile) { resolve(resultFile) },
            error (err) { reject(err) }
          })
        })
      },
      postImageToS3 (inputId, file) {
        return new Promise((resolve, reject) => {
          const formData = new FormData()
          const config = {
            headers: {'content-type': 'multipart/form-data'}
          }
          formData.append('image', file)
          if (inputId === 'logo-image-input') {
            formData.append('db_column', 'thumbnail_url')
          } else if (inputId === 'main-image-input') {
            formData.append('db_column', 'account_image_url_1')
          }
          axios.put(`/api/data/account/image/${this.account.account_id}`, formData, config)
            .then(() => {
              resolve()
            })
            .catch(() => {
              reject()
            })
        })
      },
      activateLoader () {
        const $loader = $('#modal-loader')
        $loader.removeClass().addClass('spinkit-modal')
      },
      deactivateLoader () {
        const $loader = $('#modal-loader')
        $loader.removeClass()
      },
      applyLogoBackgroundImage () {
        const $image = $('#logo-image')
        var image = this.account.thumbnail_url
        if (image) {
          image = 'url(' + image + ')'
        } else {
          image = 'url(../../../static/temp-logo-image_english_512.png)'
        }
        $image.css('background-image', image)
      },
      applyMainBackgroundImage () {
        const $image = $('#main-image')
        let image = this.account.account_image_url_1
        if (image) {
          image = 'url(' + image + ')'
          $image.css('background-image', image)
        }
      },
      activateJquery () {
        $(document).ready(() => {
          this.applyMainBackgroundImage()
        })
      }
    },
    mounted () {
      this.activateJquery()
    }
  }
</script>

<style lang="less" scoped>
  @import "~assets/css/index";

  // Global
  @height: 50px;
  @mark-right-amount: 12px;
  @small-mark-right-amount: 18px;
  @mark-bottom-amount: 16px;
  @font-size-button: 22px;
  @font-weight-button: 600;

  label {
    .upload-label-basic;
    border: 1px solid @color-font-base;
    font-size: @font-size-button;
    font-weight: @font-weight-button;
  }
  button {
    font-size: @font-size-button;
    font-weight: @font-weight-button;
    border: 1px solid @color-orange;
  }

  .dashboard-page-container {
    position: relative;

    .title {
      font-size: 30px;
      font-weight: 600;
      margin-top: 0;
    }
    .sub-title {
      font-size: 20px;
      font-weight: 300;
      margin-bottom: 3px;
    }
    .third-title {
      font-size: @font-size-medium;
      font-weight:@font-weight-medium;
      margin-top: 2px;
      margin-bottom: 18px;
    }

    // title
    .title-container {
      display: inline-block;
    }

    .logo-image-container {

      #logo-image {
        float: right;
        display: inline-block;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 2px solid @color-light-grey;
        background-size: cover;
        background-position: 50%, 50%;
        background-repeat: no-repeat;
      }
    }

    // images
    .main-image-container {
      position: relative;

      .image-container {
        position: relative;
        box-shadow: @box-shadow;
        margin-bottom: 8px;

        #main-image {
          width: 100%;
          height: 280px;
          background: url(~assets/img/cover_image_english.png);
          background-size: cover;
          background-position: 50%, 50%;
          background-repeat: no-repeat;
        }
      }
    }

    .button-container {
      position: relative;
      margin-bottom: 60px;

      label {
        display: inline-block;
      }
      button {
        display: none;
        margin-left: 12px;
      }
    }

  }

  @media ( min-width: 744px ) {
    .page-container {

    }
  }
  @media ( min-width: 1128px ) {
    .page-container {

    }
  }
</style>
