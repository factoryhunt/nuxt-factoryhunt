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
          <div class="list-item" v-for="(certification, cIndex) in value.certifications" :key="cIndex">
            <img
              class="remove-button"
              src="~assets/icons/cancel.svg"
              @click="deleteFile($event.target, cIndex)"
            >
            <img
              class="file-image"
              :src="certification.document_url"
            >
            <div class="category">
              <div v-for="(category, tIndex) in certifications.category" :key="tIndex">
                <input
                  type="radio"
                  :id="`${cIndex}-${tIndex}`"
                  :value="category.value"
                  v-model="certification.document_type"
                >
                <label
                  :for="`${cIndex}-${tIndex}`">
                  {{category.value}}
                </label>
              </div>
            </div>
            <div class="info">
              <label>Title of Document</label>
              <input
                type="text"
                v-model="certification.document_name"
              >
            </div>
          </div>
        </div>
      </div>

      <div class="confirm-container" id="confirm-container">
        <button
          id="save-button"
          class="button-orange"
          @click="onSaveButton">
          Save
        </button>
      </div>

    </div>
  </section>
</template>

<script>
  import axios from '~/plugins/axios'
  import certifications from '~/assets/models/certifications.json'
  import { getFileURL } from '~/utils/fileReader'
  import { showTopAlert } from '~/utils/alert'
  export default {
    head () {
      return {
        title: 'Upload Documents',
        link: [
          { hid: 'canonical', rel: 'canonical', href: `https://www.factoryhunt.com/dashboard/company/documents` }
          // { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.3.3/cropper.min.css' },
        ],
        script: [
          // { src: 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.3.3/cropper.min.js'}
        ]
      }
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
          files: []
        }
      }
    },
    methods: {
      createCertifications (formData) {
        return new Promise((resolve, reject) => {
          const config = {
            headers: {'content-type': 'multipart/form-data'}
          }
          axios.post(`/api/data/documents/certifications/${this.account.account_id}`,
            formData,
            config, {
              onUploadProgress: this.onUploadProgress
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
              document_name: cert.document_name
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
      readFiles (files) {
        let filteredFiles = []

        for (const i in files) {
          const file = files[i]
          const fileFilter = /\/(jpg|jpeg|png)$/
          if (fileFilter.test(file.type)) filteredFiles.push(file)
        }

        this.postImageToS3(filteredFiles)
      },
      async postImageToS3 (files) {
        const formData = new FormData()
        for (let i = 0; i < files.length; i++) {
          formData.append(`certifications`, files[i])
        }

        try {
          await this.createCertifications(formData)
          await this.getCertifications()
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
          this.value.certifications.splice(index, 1)
          $item.css({'opacity': '1',})
        } catch (err) {
          $item.css({'opacity': '1',})
        }
      },
      async onSaveButton () {
        this.hideSaveButton()

        try {
          await this.updateCertifications()
        } catch (err) {
          console.log(err)
          this.showSaveButton()
        }
      },
      onUploadProgress (progressEvent) {
        if (progressEvent.lengthComputable) {
          console.log(progressEvent.loaded + ' ' + progressEvent.total)
        }
      },
      initDropzone () {
        const dropLabel = document.getElementById('drop-label')
        dropLabel.addEventListener("dragover", this.fileDragHover, false)
        dropLabel.addEventListener("drop", this.fileSelectHandler, false)
        dropLabel.addEventListener("dragleave", this.fileDragLeave, false)
      },
      showSaveButton () {
        const container = document.getElementById('confirm-container')
        container.style.display = 'block'
      },
      hideSaveButton () {
        const container = document.getElementById('confirm-container')
        container.style.display = 'none'
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
      transition: background-color .2s linear 0s;

      &:hover {
        cursor: pointer;
        background-color: @color-light-grey;
      }
    }

    .list-container {
      margin-top: 8px;
    }
    .list-item {
      position: relative;
      display: table;
      width: 100%;
      padding: 12px;
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

      .file-image {
        display: table-cell;
        object-fit: cover;
        width: 119px;
        height: 168.4px;
      }

      .category {
        display: table-cell;
        vertical-align: middle;
        text-align: left;
        width: 150px;

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
        width: 481px;
        display: table-cell;
        vertical-align: middle;

        label {
          font-size: @font-size-extra-small;
          display: block;
          margin-bottom: 4px;
        }
        input {
          width: 430px;
          font-size: @font-size-small;
        }
      }
    }
  }

  #confirm-container {
    display: none;
  }

  #progress-bar {
    background-color: @color-orange;
    width: 0;
    height: 12px;
    transition: width .5s ease .3s;
    border-radius: 10px;
  }
</style>
