<template>
  <div 
    :id="id" 
    class="dropzone-container" 
    v-show="toggle.isMounted">
    <label class="drop-label" :for="`${id}-input`">
      <div class="dropzone-container__wrapper">
        <!-- images -->
        <div class="image-preview-container">
          <slot name="preview"></slot>
        </div>
      </div>
      <!-- Placeholder -->
      <div
        class="placeholder-container"
        v-if="placeholder">
        <p>{{placeholder}}</p>
      </div>
    </label>
    <input
      :id="`${id}-input`"
      type="file"
      @change="fileAdded($event.target.files)"
      :multiple="multiple"/>
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
    files: {
      type: Array,
      default: () => []
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
      toggle: {
        isMounted: false,
        isUploading: false
      }
    }
  },
  computed: {
    getAllowFileTypes() {
      // /\/(jpg|jpeg|png)$/
      let fileType = new RegExp(this.allowFileTypes)
      return fileType
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
        $dropzoneContainer.style.minHeight = this.height
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
      // Validate files
      const result = await this.validateFiles(files)

      // return files to parent
      this.$emit('fileChanged', result)
    },
    async validateFiles(files) {
      let validatedFiles = []

      // Max File Length
      if (files.length > this.maxFileLength) {
        this.onError({ msg: `Maximum file length is ${this.maxFileLength}.` })
      }

      for (let i = 0; i < files.length; i++) {
        let file = files[i]

        // File format
        const filetype = this.getAllowFileTypes

        // Check accpeted file format
        if (!filetype.test(file.type)) {
          this.onError({ msg: `Unaccpeted format. ${file.type}` })
        }

        // File size over
        if (kilobyteToMegabyte(file.size) >= this.maxFileSize) {
          this.onError({
            msg: `Maxium file size is each ${this.maxFileSize}MB.`
          })
        }

        // Aceppted
        if (
          filetype.test(file.type) &&
          kilobyteToMegabyte(file.size) < this.maxFileSize &&
          i < this.maxFileLength
        ) {
          file.url = await getFileURL(file)
          validatedFiles.push(file)
        }
      }

      return validatedFiles
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
