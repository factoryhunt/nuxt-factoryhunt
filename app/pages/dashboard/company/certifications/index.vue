<template>
  <section>

    <div class="certification-container each-section">
      <h2 class="title">Certifications</h2>

      <div class="dropzone-container" id="dropzone-wrapper">

        <label id="drop-label" for="drop-input">
          Click or drag image(s) to this area to upload (Each 5MB MAX)<br>
          JPG, JPEG, PNG format only
        </label>
        <input
          id="drop-input"
          type="file"
          @change="fileAdded($event.target.files)"
          multiple
          accept="image/jpeg, image/jpg, image/png"
        >

        <div class="certification list-container" id="list">
          <div class="list-item" id="list-item" v-for="(certification, cIndex) in value.certifications" :key="cIndex">

            <!-- Remove Button -->
            <img
              class="remove-button"
              src="~assets/icons/cancel.svg"
              @click="deleteFile($event.target, cIndex)"
            >

            <!-- Certification image -->
            <div class="cert-image-wrapper">
              <img
                class="file-image"
                :src="certification.document_url"
              >
              <div class="progress-bar-wrapper">
                <div class="progress-bar" :id="`progress-bar-${cIndex}`"></div>
              </div>
            </div>

            <!-- Document Type -->
            <div class="category">
              <div v-for="(category, tIndex) in certifications.category" :key="tIndex">
                <input
                  type="radio"
                  :id="`${cIndex}-${tIndex}`"
                  :value="category.value"
                  v-model="certification.document_type"
                  @change="inputChanged"
                >
                <label
                  :for="`${cIndex}-${tIndex}`">
                  {{category.value}}
                </label>
              </div>
            </div>

            <!-- Document Info -->
            <div class="info">
              <label>Title of Document</label>
              <input
                type="text"
                v-model="certification.document_name"
                @keyup="inputChanged"
              >
              <label class="size">{{getDocumentFileSize(certification.document_size)}}</label>
            </div>
          </div>
        </div>
      </div>

      <!-- Save Button -->
      <div class="confirm-container" id="confirm-container">
        <loader
          id="loader"
          class="spinkit-inline"
          v-if="toggle.isUploading"
        />
        <button
          id="save-button"
          class="button-orange"
          @click="onSaveButton"
          v-if="!toggle.isUploading"
          :disabled="!toggle.canUpload">
          Save
        </button>
      </div>

    </div>
  </section>
</template>

<script>
  import axios from '~/plugins/axios'
  import certifications from '~/assets/models/certifications.json'
  import Loader from '~/components/Loader'
  import { getFileURL, kilobyteToMegabyte } from '~/utils/fileReader'
  import { showTopAlert } from '~/utils/alert'
  export default {
    head () {
      return {
        title: 'Certificatations',
        link: [
          { hid: 'canonical', rel: 'canonical', href: `https://www.factoryhunt.com/dashboard/company/certifications` }
          // { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.3.3/cropper.min.css' },
        ],
        script: [
          // { src: 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.3.3/cropper.min.js'}
        ]
      }
    },
    components: {
      Loader
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
        certifications: certifications,
        value: {
          certifications: [],
          picked: '',
          files: [],
          caution: ''
        },
        toggle: {
          canUpload: false,
          isUploading: false
        }
      }
    },
    methods: {
      createCertifications (formData, index) {
        return new Promise((resolve, reject) => {
          const options = {
            headers: {'content-type': 'multipart/form-data'}
          }
          axios.post(`/api/data/documents/certifications/${this.account.account_id}`,
            formData,
            options)
            .then(() => {
              resolve()
            })
            .catch((err) => {
              console.log(err)
              reject(err)
            })
        })
      },
      getCertifications () {
        return new Promise((resolve, reject) => {
          axios.get(`/api/data/documents/certifications/${this.account.account_id}`)
            .then((res) => {
              this.value.certifications = res.data
              resolve()
            })
            .catch((err) => {
              console.log(err)
              reject(err)
            })
        })
      },
      updateCertifications () {
        return new Promise((resolve, reject) => {
          let certs = []
          for (const i in this.value.certifications) {
            const cert = this.value.certifications[i]
            const data = {
              document_id: cert.document_id,
              document_type: cert.document_type,
              document_name: cert.document_name,
              document_size: cert.document_size
            }
            certs.push(data)
          }
          axios.put(`/api/data/documents/certifications`, {
            certifications: certs
          })
            .then(() => {
              resolve()
            })
            .catch((err) => {
              console.log(err)
              reject(err)
            })
        })
      },
      removeCertification (document_id) {
        return new Promise((resolve, reject) => {
          axios.delete(`/api/data/documents/certifications/${document_id}`)
            .then(() => {
              resolve()
            })
            .catch((err) => {
              console.log(err)
              reject(err)
            })
        })
      },
      fileDragHover (e) {
        e.stopPropagation()
        e.preventDefault()
      },
      fileDragLeave (e) {
        this.fileDragHover(e)
      },
      fileSelectHandler (e) {
        this.fileDragHover(e)
        const files = e.target.files || e.dataTransfer.files

        this.readFiles(files)
      },
      fileAdded (files) {
        this.readFiles(files)
      },
      async readFiles (files) {
        let filteredFiles = []

        for (let i = 0; i < files.length; i++) {
          let file = files[i]
          const fileFilter = /\/(jpg|jpeg|png)$/

          // Invalid Format
          if (!fileFilter.test(file.type)) showTopAlert(this.$store, false, 'JPG JPEG PNG format only.')

          // File size over
          if (kilobyteToMegabyte(file.size) >= 7) showTopAlert(this.$store, false, 'Maximum each file size is 5MB')

          // Approved
          if (fileFilter.test(file.type) &&
              kilobyteToMegabyte(file.size) < 7) {

            file.document_name = file.name
            file.document_url = await getFileURL(file)
            file.document_size = file.size

            this.value.certifications.unshift(file)
            // this.postImageToS3(file, i)
          }
        }
      },
      async postImageToS3 (file, index) {
        if (file.size <= 0) return
        console.log(`${index}번째 file 업로드시작`)

        const formData = new FormData()
        formData.append(`certification`, file)

        try {
          let progressBar
          await this.$nextTick(() => {
            progressBar = document.getElementById(`progress-bar-${index}`)
          })
          this.progressBarDone(5, index, progressBar)
          await this.createCertifications(formData)
          this.progressBarDone(80, index, progressBar)
          // const url = await getFileURL(file)
          await this.getCertifications()
          this.progressBarDone(100, index, progressBar, true)
        } catch (err) {
          console.log('postImageToS3 Error')
          console.log(err)
        }
      },
      async deleteFile (target, index) {
        const $item = $(target).parent()
        $item.css({'opacity': '0.4',})
        const document_id = this.value.certifications[index].document_id

        try {
          await this.removeCertification(document_id)
          await this.getCertifications()
          $item.css({'opacity': '1'})
        } catch (err) {
          $item.css({'opacity': '1'})
        }
      },
      async onSaveButton () {
        this.toggle.isUploading = true

        try {
          await this.updateCertifications()
          this.toggle.isUploading = false
          this.toggle.canUpload = false
          showTopAlert(this.$store, true, 'Uploaded.')
        } catch (err) {
          console.log(err)
          showTopAlert(this.$store, false, 'Failed.')
          this.toggle.isUploading = false
        }
      },
      onUploadProgress (progressEvent) {
        if (progressEvent.lengthComputable) {
          let progress = Math.round( (progressEvent.loaded * 100) / progressEvent.total )
          progress = progress < 10 ? progress : 10

          this.progressBarDone(progress)
        }
      },
      onDownloadProgress (progressEvent) {
        if (progressEvent.lengthComputable) {
          let progress = Math.round( (progressEvent.loaded * 100) / progressEvent.total )
        }
      },
      progressBarDone (percent, index, progressBar, finished) {
        this.$nextTick(() => {
          console.log('progressbar', progressBar)
          console.log('percent index', percent, index)
          progressBar.style.width = `${percent}%`
          progressBar.style.opacity = `1`

          if (finished) {
            setTimeout(() => {
              progressBar.style.opacity = `0`
              setTimeout(() => {
                progressBar.style.width = `0`
              }, 500)
            }, 1500)
          }
        })
      },
      initDropzone () {
        const dropLabel = document.getElementById('drop-label')
        dropLabel.addEventListener("dragover", this.fileDragHover, false)
        dropLabel.addEventListener("drop", this.fileSelectHandler, false)
        dropLabel.addEventListener("dragleave", this.fileDragLeave, false)
      },
      inputChanged () {
        this.toggle.canUpload = true
      },
      getDocumentFileSize (kilobyte) {
        return `${kilobyteToMegabyte(kilobyte, 2)}MB`
      }
    },
    async mounted () {
      this.initDropzone()
      this.getCertifications()
    }
  }
</script>

<style lang="less" scoped>
  @import "~assets/css/index";
  @import "~assets/css/less/dashboard/index.less";

  img {
    max-width:100%;
  }

  .dropzone-container {
    display: block;
    position: relative;
    width: 100%;
    min-height: 200px;
    border-radius: @border-radius;

    #drop-label {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      min-height: 200px;
      background-color: @color-lightest-grey;
      border-radius: @border-radius;
      border: 1px dashed @color-light-grey;
      transition: border .2s linear 0s;

      &:hover {
        cursor: pointer;
        border-color: @color-deep-gray;
      }
    }

    .list-container {
      margin-top: 8px;
    }
    .list-item {
      position: relative;
      display: table;
      width: 100%;
      padding: 24px;
      margin-bottom: 8px;
      box-shadow: 1px 1px 10px 1px @color-lightest-grey;
      border-radius: @border-radius;
      transition: all .2s linear 0s;

      &:hover {
        box-shadow: 1px 1px 20px 1px @color-light-gray;
      }

      .remove-button {
        position: absolute;
        padding: 4px;
        width: 24px;
        height: 24px;
        top: 12px;
        right: 12px;
        border-radius: 50%;
        transition: background-color .2s linear 0s;

        &:hover {
          cursor: pointer;
          background-color: @color-lightest-grey;
        }
      }

      .cert-image-wrapper {
        display: table-cell;
        position: relative;
        vertical-align: middle;
        height: 186px;

        .file-image {
          object-fit: cover;
          border-radius: @border-radius;
          height: 100%;
          background-image: url(~assets/icons/a4_gray.png);
        }

        .progress-bar-wrapper {
            position: absolute;
            left: 0;
            bottom: 15px;
            width: 100%;
            padding: 0 8px;

          .progress-bar {
            position: relative;
            height: 4px;
            border-radius: 4px;
            background-color: @color-orange;
            opacity: 0;
            width: 0;
            transition: all .5s ease .1s;
          }
        }
      }

      .category {
        display: table-cell;
        vertical-align: middle;
        text-align: left;
        width: 150px;
        padding-left: 20px;

        div {
          margin: 5px 0;
          font-size: @font-size-small;
        }

        label,
        input {
          cursor: pointer;
        }
      }
      .info {
        width: 480px;
        display: table-cell;
        vertical-align: middle;
        padding-left: 20px;

        label {
          font-size: @font-size-extra-small;
          display: block;
          margin-bottom: 4px;
        }
        input {
          width: 300px;
          font-size: @font-size-small;
        }
        .size {
          display: inline-table;
          margin-left: 12px;
        }
      }
    }
  }

  #loader {
    vertical-align: middle;
    width: 104px;
  }
</style>
