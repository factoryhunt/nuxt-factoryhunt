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
          <div class="progress-bar"></div>
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
      default: 'Drop or drag image(s) to this area'
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
      type: String,
      default: '1'
    },
    maxFileLength: {
      type: String,
      default: '30'
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
    fileDragHover(e) {
      e.stopPropagation()
      e.preventDefault()
    },
    fileDragLeave(e) {
      this.fileDragHover(e)
    },
    fileSelectHandler(e) {
      this.fileDragHover(e)
      const files = e.target.files || e.dataTransfer.files

      this.readFiles(files)
    },
    fileAdded(files) {
      this.readFiles(files)
    },
    async readFiles(files) {
      const length = this.value.files.length
      console.log('기존 파일 갯수', length)
      let filteredFiles = []

      for (let i = 0; i < files.length; i++) {
        let file = files[i]

        // File format
        const fileFilter = /\/(jpg|jpeg|png)$/

        // Over Max File Length
        if (this.value.files.length >= this.maxFileLength) {
          this.onError({ msg: `Maximum file length is ${this.maxFileLength}.` })
        }

        // Check accpeted file format
        if (!fileFilter.test(file.type)) {
          this.onError({ msg: `Unaccpeted format. ${file.type}` })
        }

        // File size over
        if (kilobyteToMegabyte(file.size) >= this.maxFileSize) {
          this.onError({ msg: `Maxium file size is each ${this.maxFileSize}MB.` })
        }

        // Aceppted
        if (
          fileFilter.test(file.type) &&
          kilobyteToMegabyte(file.size) < this.maxFileSize &&
          this.value.files.length < this.maxFileLength
        ) {
          file.url = await getFileURL(file)
          this.value.files.push(file)
          this.renderImageContainer(this.value.files.length, '10%')
        }
      }

      for (let i = 0; i < this.value.files.length; i++) {
        const file = files[i]
        const { data } = await this.getFileUrlFromS3(file, i + 1)
        filteredFiles.push(data)
      }

      // return files to parent
      this.$emit('fileAdded', filteredFiles)
    },
    renderImageContainer(index, percent) {
      if (!this.imageWidth) return this.onError({ msg: `imageWidth is not defined.` })

      this.$nextTick(() => {
        const $imageContainer = document.getElementById(`image-${index}`)
        const $progressBar = $imageContainer.children[0]

        if (this.margin) $imageContainer.style.margin = `0 ${this.margin} ${this.margin} 0`

        setTimeout(() => {
          $imageContainer.style.width = this.imageWidth
          if (percent) $progressBar.style.width = percent
        }, 100)
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
            reject(err)
          })
      })
    },
    onRemoveFile(event, index) {
      this.fileDragLeave(event)
      this.value.files.splice(index, 1)

      this.$emit('fileAdded', this.value.files)
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
      border-color: @color-link;
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

  .progress-bar {
    position: absolute;
    width: 0;
    height: 5px;
    opacity: 0.4;
    bottom: 0;
    border-radius: 10px;
    background-color: @color-orange;
    transition: all ease-in 0.8s;
    z-index: 3;
  }
}
</style>
