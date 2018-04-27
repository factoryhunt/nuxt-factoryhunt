<template>
  <div :id="id" class="dropzone-container">
    <label class="drop-label" for="drop-input">
      <p v-show="!value.files.length">{{placeholder}}</p>

      <!-- images -->
      <div 
        class="image-container"
        v-for="(file, i) in value.files" 
        :key="i">
        <div class="image-wrapper">
          <img id="file-image" :src="file.url">
        </div>
        <img 
          id="remove-button" 
          @click="onRemoveFile(i)"
          src="~assets/icons/cancel.svg">
      </div>

    </label>
    <input
      id="drop-input"
      type="file"
      @change="fileAdded($event.target.files)"
      :multiple="multiple"
      accept="image/jpeg, image/jpg, image/png"/>
  </div>
</template>

<script>
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
      type: [Number, String],
      default: 0
    },
    height: {
      type: [Number, String],
      default: 0
    },
    imageWidth: {
      type: [Number, String],
      default: '100%'
    },
    imageHeight: {
      type: [Number, String],
      default: '100%'
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
      default: '10'
    },
    allowFileTypes: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      value: {
        files: []
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
    },
    configDropzone() {
      const $dropzoneContainer = document.getElementById(this.id)

      if (this.width) {
        const width = `${this.width}px`
        $dropzoneContainer.style.width = width
      }
      if (this.height) {
        const height = `${this.height}px`
        $dropzoneContainer.style.height = height
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
      let filteredFiles = []

      for (let i = 0; i < files.length; i++) {
        let file = files[i]
        const fileFilter = /\/(jpg|jpeg|png)$/

        // Over Max File Length
        if (this.value.files.length >= this.maxFileLength) {
          this.onError({ msg: `Maximum file length is ${this.maxFileLength}.` })
        }

        // Invalid Format
        if (!fileFilter.test(file.type)) {
          this.onError({ msg: `Unaccpeted format. ${file.type}` })
        }

        // File size over
        if (kilobyteToMegabyte(file.size) >= this.maxFileSize) {
          this.onError({ msg: `Maxium file size is each ${this.maxFileSize}MB.` })
        }

        // Approved
        if (
          fileFilter.test(file.type) &&
          kilobyteToMegabyte(file.size) < this.maxFileSize &&
          this.value.files.length < this.maxFileLength
        ) {
          file.url = await getFileURL(file)

          this.value.files.push(file)
          filteredFiles.push(file)

          this.renderImageContainer(this.value.files.length)
        }
      }

      // return files to parent
      this.$emit('fileAdded', filteredFiles)
    },
    renderImageContainer(index) {
      if (!this.imageWidth) return
      console.log('index', index)
      console.log(this.imageWidth)
      const $dropzone = document.getElementById(this.id)
      const $label = $dropzone.children[0]
      this.$nextTick(() => {
        const $imageContainer = $label.children[index]
        setTimeout(() => {
          $imageContainer.style.width = this.imageWidth
        }, 100)
      })
    },
    onRemoveFile(index) {
      this.value.files.splice(index, 1)
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

  .image-container {
    position: relative;
    display: inline-block;
    width: 1%;
    transition: width ease-in 0.2s;
    margin: 0 4px;

    &:hover {
      #remove-button {
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
      width: 100%;
      height: 100%;
      padding: 7px;
    }
    #file-image {
      width: auto !important;
      height: auto !important;
      max-width: 100% !important;
      max-height: 100% !important;
      margin: auto !important;
    }
  }

  #remove-button {
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
}
</style>
