<template>
  <div :id="id" class="dropzone-container">
    <label class="drop-label" for="drop-input">
      {{placeholder}}
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
        if (i + 1 > this.maxFileLength) {
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
          i + 1 <= this.maxFileLength
        ) {
          file.url = await getFileURL(file)
          filteredFiles.push(file)
        }
      }

      // return files to parent
      this.$emit('fileAdded', filteredFiles)
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
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
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
}
</style>
