<template>
  <div :id="id" class="dropzone-container" v-show="toggle.isMounted">
    <label class="drop-label" :for="`${id}-input`">
      <div class="dropzone-container__wrapper">
        <!-- images -->
        <div 
          v-for="(file, i) in value.files" 
          :key="i"
          class="image-container"
          :id="`image-${i + 1}`">
          <div class="progress-bar-wrapper">
            <div class="progress-bar"></div>
          </div>
          <img 
            class="remove-button" 
            @click="onRemoveFile($event, i)"
            src="~assets/icons/cancel.svg">
          <div class="image-wrapper">
            <img 
              class="file-image" 
              :src="file.url">
          </div>
        </div>
      </div>
      <!-- Placeholder -->
      <div
        class="placeholder-container"
        v-show="!value.files.length">
        <p>{{placeholder}}</p>
      </div>
    </label>
    <input
      :id="`${id}-input`"
      type="file"
      @change="fileAdded($event.target.files)"
      :multiple="multiple"
      accept="image/jpeg, image/jpg, image/png"/>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import { getFileURL, kilobyteToMegabyte } from '~/utils/fileReader'
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: 'Click, or drag and drop file(s) to this area'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    imageWidth: {
      type: String,
      default: '100%'
    },
    margin: {
      type: String,
      default: '6px'
    },
    multiple: {
      type: Boolean,
      default: true
    },
    maxFileSize: {
      type: Number,
      default: 1
    },
    maxFileLength: {
      type: Number,
      default: 30
    },
    allowFileTypes: {
      type: String,
      default: ''
    },
    s3: {
      type: Object
    }
  },
  data() {
    return {
      value: {
        files: []
      },
      toggle: {
        isMounted: false,
        isUploading: false
      }
    }
  },
  methods: {
    initDropzone() {
      const dropLabel = document.getElementById(this.id).children[0]
      dropLabel.addEventListener('dragenter', this.fileDragEnter, false)
      dropLabel.addEventListener('dragover', this.fileDragHover, false)
      dropLabel.addEventListener('drop', this.fileSelectHandler, false)
      dropLabel.addEventListener('dragleave', this.fileDragLeave, false)

      this.configDropzone()
      this.toggle.isMounted = true
    },
    configDropzone() {
      const $dropzoneContainer = document.getElementById(this.id)

      if (this.width) {
        $dropzoneContainer.style.width = this.width
      }
      if (this.height) {
        $dropzoneContainer.style.height = this.height
      }
    },
    preventEvent(e) {
      e.stopPropagation()
      e.preventDefault()
    },
    fileDragHover(e) {
      this.preventEvent(e)

      this.setDropzoneBorderColor('#317fa9') // @color-link
    },
    fileDragEnter(e) {
      this.preventEvent(e)
    },
    fileDragLeave(e) {
      this.preventEvent(e)
      this.setDropzoneBorderColor('#dedede') // @color-light-gray
    },
    fileSelectHandler(e) {
      this.preventEvent(e)
      this.setDropzoneBorderColor('#dedede') // @color-light-gray

      const files = e.target.files || e.dataTransfer.files

      this.readFiles(files)
    },
    setDropzoneBorderColor(color) {
      const $dropzone = document.getElementById(this.id)
      const $label = $dropzone.children[0]
      $label.style.borderColor = color
    },
    fileAdded(files) {
      this.readFiles(files)
    },
    async readFiles(files) {
      if (this.toggle.isUploading)
        return this.onError({
          msg: `Your files are being uploaded now. Please try it later again.`
        })

      this.toggle.isUploading = true
      this.$emit('isUploading')
      const length = this.value.files.length

      // Validate files
      files = await this.validateFiles(files)

      // Get local files data
      for (let i = 0; i < files.length; i++) {
        let file = files[i]
        const index = length + i + 1
        this.value.files.push(file)
        this.renderImageContainer(index)
      }

      // Upload files to S3
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const index = length + i + 1
        this.updateProgressBar(index, '70%')
        const { data } = await this.getFileUrlFromS3(file, index)
        this.updateProgressBar(index, '100%')
        this.value.files[length + i].location = data.location
      }

      this.toggle.isUploading = false
      // return files to parent

      this.$emit('fileChanged', this.value.files)
    },
    async validateFiles(files) {
      let length = this.value.files.length
      let validatedFiles = []

      for (let i = 0; i < files.length; i++) {
        let file = files[i]

        if (length >= this.maxFileLength) {
          this.onError({ msg: `Maximum number of files you can upload is ${this.maxFileLength}.` })
        }

        // File format
        const fileFilter = /\/(jpg|jpeg|png)$/

        // Check accpeted file format
        if (!fileFilter.test(file.type)) {
          this.onError({ msg: `${file.type} is not acceptable format.` })
        }

        // File size over
        if (kilobyteToMegabyte(file.size) >= this.maxFileSize) {
          this.onError({ msg: `Maximum file size is ${this.maxFileSize}MB each.` })
        }

        // Aceppted
        if (
          fileFilter.test(file.type) &&
          kilobyteToMegabyte(file.size) < this.maxFileSize &&
          length < this.maxFileLength
        ) {
          file.url = await getFileURL(file)
          validatedFiles.push(file)
          length++
        }
      }

      return validatedFiles
    },
    renderImageContainer(index) {
      if (!this.imageWidth) return this.onError({ msg: `imageWidth is not defined.` })

      // index would be started from 1
      const nuxt = this
      const $dropzone = document.getElementById(this.id)
      const $label = $dropzone.children[0]
      const $wrapper = $label.children[0]

      this.$nextTick(() => {
        const $imageContainer = $wrapper.childNodes[index - 1]

        if (this.margin) $imageContainer.style.margin = `0 ${this.margin} ${this.margin} 0`
        nuxt.updateProgressBar(index, '18%')

        setTimeout(() => {
          $imageContainer.style.width = this.imageWidth
        }, 100)
      })
    },
    updateProgressBar(index, percent) {
      this.$nextTick(() => {
        const $dropzone = document.getElementById(this.id)
        const $label = $dropzone.children[0]
        const $wrapper = $label.children[0]
        const $imageContainer = $wrapper.childNodes[index - 1]
        const $progressBar = $imageContainer.children[0]

        if (percent) {
          $progressBar.style.width = percent
          $progressBar.style.opacity = 1
        }

        if (percent === '100%') {
          setTimeout(() => {
            $progressBar.style.opacity = 0
          }, 1800)
        }
      })
    },
    getFileUrlFromS3(file, index) {
      let { api_url, fieldname, mysql_table } = this.s3
      fieldname = `${fieldname}_${index}`

      const formData = new FormData()
      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }

      formData.append('table', mysql_table)
      formData.append(fieldname, file)

      return new Promise((resolve, reject) => {
        axios
          .post(api_url, formData, config)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            this.toggle.isUploading = false
            reject(err)
          })
      })
    },
    onRemoveFile(event, index) {
      this.fileDragLeave(event)

      if (this.toggle.isUploading)
        return this.onError({
          msg: 'Your files are being uploaded now. Please try it later again.'
        })

      this.value.files.splice(index, 1)
      this.$emit('fileChanged', this.value.files)
    },
    onError(err) {
      this.$emit('onError', err)
    }
  },
  mounted() {
    this.initDropzone()
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
.dropzone-container {
  display: block;
  position: relative;
  width: 100%;
  min-height: 200px;
  border-radius: @border-radius;

  .drop-label {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    padding: 11px;
    font-size: 17px;
    min-height: 200px;
    background-color: #f3f3f3;
    border-radius: @border-radius;
    border: 1px dashed @color-light-grey;
    transition: border 0.2s linear 0s;

    &:hover {
      cursor: pointer;
      border-color: @color-link !important;
    }
  }

  .dropzone-container__wrapper {
    display: table;
    width: 100%;
  }

  .placeholder-container {
    display: table;
    width: 100%;
    height: calc(200px - 24px);

    p {
      display: table-cell;
      text-align: center;
      vertical-align: middle;
      margin: 0;
    }
  }

  .image-container {
    position: relative;
    display: inline-table;
    vertical-align: top;
    width: 1%;
    transition: width ease-in 0.2s;
    margin-right: 6px;
    margin-bottom: 6px;

    &:hover {
      .remove-button {
        opacity: 1;
      }
    }

    &::after {
      content: '';
      display: block;
      padding-bottom: 100%;
      position: relative;
    }
    .image-wrapper {
      position: absolute;
      background-color: @color-white;
      border-radius: @border-radius;
      display: flex;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      padding: 7px;
    }
    .file-image {
      width: auto !important;
      height: auto !important;
      max-width: 100% !important;
      max-height: 100% !important;
      margin: auto !important;
    }
  }

  .remove-button {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 28px;
    height: 28px;
    padding: 5px;
    border-radius: 50%;
    background-color: @color-white;
    box-shadow: 0 0 5px @color-light-gray;
    transition: all linear 0.2s;
    opacity: 0;
    z-index: 2;

    &:hover {
      box-shadow: 0 0 5px 2px @color-light-gray;
    }
  }

  .progress-bar-wrapper {
    position: absolute;
    width: 12%;
    height: 5px;
    opacity: 0;
    bottom: 10px;
    padding: 0 12px;
    transition: width ease-in 1.5s, opacity ease-in 0.5s;
    z-index: 3;

    .progress-bar {
      border-radius: 10px;
      background-color: @color-orange;
      height: 100%;
      width: 100%;
    }
  }
}
</style>
