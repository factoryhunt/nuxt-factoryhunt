<template>
  <div class="dashboard-page-container">

    <spinkit id="modal-loader"></spinkit>

    <!-- Logo -->
    <div class="logo-image-container">
      <!-- Title -->
      <div class="title-container">
        <p class="title" v-lang.logo.title></p>
        <p class="sub-title" v-lang.logo.desc></p>
        <p class="third-title" v-lang.logo.caution></p>
      </div>

      <!-- Logo Image -->
      <div id="logo-image" class="logo-image"></div>

      <!-- Upload Button -->
      <div class="button-container">
        <label for="logo-image-input" v-lang.logo.button></label>
        <input id="logo-image-input" type="file" @change="onLogoImageChanged($event.target.files)" accept="image/*">
        <button id="logo-image-upload-button" class="button-orange" @click="imageUpload('logo-image-input')" v-lang.upload></button>
      </div>
    </div>

    <!-- Main Image -->
    <div class="main-image-container">
      <!-- Title -->
      <div class="title-container">
        <p class="title" v-lang.cover.title></p>
        <p class="sub-title" v-lang.cover.desc></p>
      </div>

      <!-- Main Image -->
      <div class="image-container">
        <img id="main-image" class="main-image">
      </div>

      <!-- Upload Button -->
      <div class="button-container">
        <p class="caution-text" v-lang.cover.caution></p>
        <label for="main-image-input" v-lang.cover.button></label>
        <input id="main-image-input" type="file" @change="onMainImageChanged($event.target.files)" accept="image/*">
        <button id="main-image-upload-button" class="button-orange" @click="imageUpload('main-image-input')" v-lang.upload></button>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  import $ from 'jquery'
  import Spinkit from '../../../../components/Loader'
//  import Compressor from '@xkeshi/image-compressor'
  import { mapGetters } from 'vuex'
  export default {
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
    messages: {
      eng: {
        upload: 'Upload',
        logo: {
          title: 'Edit Logo',
          desc: 'Your company\'s identity is visually expressed through its logo.',
          caution: 'Upload a square image.',
          button: 'Choose File'
        },
        cover: {
          title: 'Edit Company Cover Photo',
          desc: 'A cover photo is the larger photo at the top of your company website.',
          caution: 'Optimize your cover photo for the right dimensions: 1280 pixels wide and 460 pixels tall.',
          button: 'Choose File'
        },
        alert: {
          success: 'Your photo has been updated successfully.',
          fail: 'Photo update failed. Please try again.'
        }
      },
      kor: {
        upload: '업로드',
        logo: {
          title: '로고 이미지 수정',
          desc: '회사를 상징하는 로고입니다.',
          caution: '로고 사이즈는 정사각형에 최적화되어 있습니다.',
          button: '파일 선택'
        },
        cover: {
          title: '대표 이미지 수정',
          desc: '홈페이지에 가장 먼저 노출되고 강조되는 부분입니다. 가장 멋진 사진을 올려주세요!',
          caution: '대표 이미지의 사이즈는 가로 1280픽셀과 세로 460픽셀에 최적화 되어있습니다.',
          button: '파일 선택'
        },
        alert: {
          success: '이미지가 성공적으로 업데이트 되었습니다.',
          fail: '이미지를 업데이트 하지 못했습니다. 다시 시도해주세요.'
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
      readURL (image, files) {
//        console.log('files: ', files)
        if (files) {
          var reader = new FileReader()
          reader.onload = function (event) {
//            console.log('event: ', event)
//            image.attr('src', event.target.result)
            image.css('background-image', `url(${event.target.result})`)
          }
          reader.readAsDataURL(files[0])
//          console.log('reader: ', reader)
        }
      },
      onMainImageChanged (fileList) {
        var image = $('.main-image')
        var uploadButton = $('#main-image-upload-button')
        uploadButton.css({'display': 'inline-block'})
        this.readURL(image, fileList)
      },
      onLogoImageChanged (fileList) {
        var image = $('.logo-image')
        var uploadButton = $('#logo-image-upload-button')
        uploadButton.css({'display': 'inline-block'})
        this.readURL(image, fileList)
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
          window.scrollTo(0, 0)
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
        this.showAlert(true, this.getSuccessAlert)
      },
      uploadFail () {
        this.showAlert(false, this.getFailAlert)
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
          console.log(file)
          axios.put(`/api/data/account/image/${this.account.account_id}`, formData, config)
            .then((res) => {
              console.log(res)
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
        var image = this.account.account_image_url_1
        if (image) {
          image = 'url(' + image + ')'
        } else {
          image = 'url(../../../static/cover_image_english.png)'
        }
        $image.css('background-image', image)
      },
      activateJquery () {
        $(document).ready(() => {
          this.applyLogoBackgroundImage()
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
    }
    .sub-title {
      font-size: 20px;
      font-weight: 300;
      margin-bottom: 0;
    }
    .third-title {
      font-size: 14px;
      font-weight:600;
      margin-bottom: 8px;
    }

    // title
    .title-container {
      display: inline-block;
      margin-bottom: 10px;
    }

    .logo-image-container {

      #logo-image {
        float: right;
        display: inline-block;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 1px solid @color-light-grey;
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
          background-size: cover;
          background-position: 50%, 50%;
          background-repeat: no-repeat;
        }
      }
      .caution-text {
        margin-bottom: 12px;
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
