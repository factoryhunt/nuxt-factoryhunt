<template>
  <div class="dashboard-page-container">

    <spinkit id="modal-loader"/>

    <!-- Company Logo -->
    <div class="logo-image-container">
      <!-- Title -->
      <div class="title-container">
        <p class="title">{{ $t('dashboardCompany.logo.title') }}</p>
        <p class="sub-title">{{ $t('dashboardCompany.logo.desc') }}</p>
        <p class="third-title">{{ $t('dashboardCompany.logo.caution') }}</p>
      </div>

      <!-- Logo Image -->
      <img v-if="account.logo_url" id="logo-image" class="logo-image" :src="account.logo_url">
      <img v-else id="logo-image" class="logo-image" src="~assets/img/temp-logo-image_english_512.png">

      <!-- Upload Button -->
      <div class="button-container">
        <label for="logo-image-input">{{ $t('dashboardCompany.logo.button') }}</label>
        <input id="logo-image-input" type="file" @change="onLogoImageChanged($event.target.files)" accept="image/*">
        <button id="logo-image-upload-button" class="button-orange" @click="imageUpload('logo')">{{ $t('dashboardCompany.upload') }}</button>
      </div>
    </div>

    <!-- Main Image -->
    <div class="main-image-container">
      <!-- Title -->
      <div class="title-container">
        <p class="title">{{ $t('dashboardCompany.cover.title') }}</p>
        <p class="sub-title" v-html="$t('dashboardCompany.cover.desc')"></p>
      </div>

      <!-- Main Image -->
      <!--<div class="image-container">-->
      <!--<div id="preview-image" class="main-image"></div>-->
      <!--</div>-->

      <!-- Cover Image Upload Buttons -->
      <ul class="cover-image-container">
        <li v-for="(url, index) in value.urls" :key="index" :id="`cover-image-wrapper-${index}`" class="cover-image">
          <label :for="`cover-image-${index}`" :style="`background-image: url(${url})`"></label>
          <input :id="`cover-image-${index}`" type="file" accept="image/*" @change="onCoverImageEdited($event, index)">
          <a id="remove-image-button" @click="removeURL(index)">✕</a>
        </li>
        <li id="cover-image-add-wrapper" class="cover-image" v-show="value.urls.length < 8">
          <label for="cover-image-add" class="add"></label>
          <input id="cover-image-add" multiple type="file" accept="image/*" @change="onCoverImageAdded($event.target, $event.target.files)">
        </li>
      </ul>

      <!-- Upload Button -->
      <div class="button-container">
        <!--<p class="third-title">{{ $t('dashboardCompany.cover.caution') }}</p>-->
        <button id="main-image-upload-button" class="button-orange" @click="imageUpload('cover')">{{ $t('dashboardCompany.save.button') }}</button>
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
          logoImageFileName: '',
          files: [],
          urls: []
        }
      }
    },
    methods: {
      mappingData () {
        const {
          cover_image_url_1,
          cover_image_url_2,
          cover_image_url_3,
          cover_image_url_4,
          cover_image_url_5,
          cover_image_url_6,
          cover_image_url_7,
          cover_image_url_8
        } = this.account
        if (cover_image_url_1) this.pushArray(cover_image_url_1)
        if (cover_image_url_2) this.pushArray(cover_image_url_2)
        if (cover_image_url_3) this.pushArray(cover_image_url_3)
        if (cover_image_url_4) this.pushArray(cover_image_url_4)
        if (cover_image_url_5) this.pushArray(cover_image_url_5)
        if (cover_image_url_6) this.pushArray(cover_image_url_6)
        if (cover_image_url_7) this.pushArray(cover_image_url_7)
        if (cover_image_url_8) this.pushArray(cover_image_url_8)
      },
      pushArray (url) {
        this.value.urls.push(url)
        this.value.files.push(new File([''], ''))
      },
      async onCoverImageAdded (target, files) {
        if (files.length > 8) return this.showAlert(false, this.$t('dashboardCompany.alert.image.upTo8'))

        // multiple upload
        for (let i = 0; i < files.length; i++) {
          await this.addNewImage(files[i])
        }

        // remove after index number 8
        this.value.urls.splice(8, this.value.urls.length)
        this.value.files.splice(8, this.value.urls.length)

        $('#main-image-upload-button').show()
      },
      async addNewImage (file) {
        const fileURL = await this.getFileURL(file)
        this.value.urls.push(fileURL)
        this.value.files.push(file)
      },
      async onCoverImageEdited (event, index) {
        const { target } = event
        const file = target.files[0]

        const label = $(target).siblings()[0]
        const fileURL = await this.getFileURL(file)

        this.value.urls[index] = fileURL
        this.value.files[index] = file

        label.style.backgroundImage = `url(${fileURL})`

        $('#main-image-upload-button').show()
      },
      removeURL (index) {
        this.value.urls.splice(index, 1)
        $('#main-image-upload-button').show()
      },
      async onLogoImageChanged (files) {
        const image = $('.logo-image')
        const fileURL = await this.getFileURL(files[0])
        image.attr('src', fileURL)

        const uploadButton = $('#logo-image-upload-button')
        uploadButton.css({'display': 'inline-block'})
      },
      getFileURL (file) {
        return new Promise((resolve, reject) => {
          if (file.size < 0) reject()

          const reader = new FileReader()
          reader.onload = function (event) {
            resolve(event.target.result)
          }
          reader.readAsDataURL(file)
        })
      },
      async imageUpload (status) {
        this.activateLoader()
        try {
//          const compressedFile = await this.imageCompress(file)
          await this.postImagesToS3(status)
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
      postImagesToS3 (status) {
        return new Promise((resolve, reject) => {
          const formData = new FormData()
          const config = {
            headers: {'content-type': 'multipart/form-data'}
          }
          if (status === 'logo') {
            const file = document.getElementById('logo-image-input').files[0]
            formData.append('logo', file)
            formData.append('db_column', 'logo_url')
          }
          else {
            for (let i = 0; i < this.value.urls.length; i++) {
              const url = this.value.urls[i]
              const file = this.value.files[i]

              if (file.size > 0) formData.append(`cover_${i}`, file)
              else formData.append(`cover_image_url_${i+1}`, url)
            }
            formData.append('db_column', 'cover_image_url_1')
          }

          axios.put(`/api/data/account/image/${this.account.account_id}`, formData, config)
            .then(() => {
              resolve()
            })
            .catch((err) => {
              reject(err)
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
      activateJquery () {
        $(document).ready(() => {
          this.applyMainBackgroundImage()
        })
      },
      applyMainBackgroundImage () {
        const $image = $('#preview-image')
        let image = this.account.cover_image_url_1
        if (image) {
          image = `url(${image})`
          $image.css('background-image', image)
        }
      },
      previewHoverEvent (element) {
        $('.cover-image').hover(
          function (event) {
            $('#preview-image').css('background-image', event.target.style.backgroundImage)
          }, function () {
          })
      }
    },
    mounted () {
      this.mappingData()
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

        #preview-image {
          width: 100%;
          height: 304px;
          background-image: url(~assets/img/cover_image_english.png);
          background-size: cover;
          background-position: 50%, 50%;
          background-repeat: no-repeat;
        }
      }
    }

    .cover-image-container {
      position: relative;
      list-style: none;
      padding: 0;
      margin: 8px 0;
      width: 100%;

      .cover-image {
        position: relative;
        display: inline-block;
        width: 24%;
        margin: 4px;

        label {
          box-shadow: @box-shadow;
          border: 0;
          border-radius: 0;
          text-align: center;
          display: inline-block;
          width: 100%;
          height: 146px;
          background-size: cover;
          background-position: 50%, 50%;
          background-repeat: no-repeat;

          &.add {
            box-shadow: none;
            border: 1px dashed @color-font-black;
            background-image: url(~assets/icons/plus.svg);
            background-size: 22px;
            background-position: 50%, 50%;
            background-repeat: no-repeat;
          }
        }

        #remove-image-button {
          display: none;
          align-items: center;
          justify-content: center;
          position: absolute;
          border-radius: 50%;
          background-repeat: no-repeat;
          background-size: contain;
          top: 8px;
          right: 8px;
          width: 34px;
          height: 34px;
          font-size: 20px;
          text-decoration: none;
          color: @color-white;
          background: rgba(0, 0, 0, .3);
          font-weight: @font-weight-ultra-thin;
        }

        &:hover {
          #remove-image-button {
            display: flex;
          }
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

    #main-image-upload-button {
      margin-left: 0;
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
