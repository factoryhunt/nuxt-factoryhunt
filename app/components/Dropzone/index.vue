<template>
  <div class="dropzone-container">
    <label id="drop-label" for="drop-input">
      {{placeholder}}</label>
    <input
      id="drop-input"
      type="file"
      @change="fileAdded($event.target.files)"
      multiple
      accept="image/jpeg, image/jpg, image/png"/>
  </div>
</template>

<script>
import { getFileURL, kilobyteToMegabyte } from '~/utils/fileReader'
export default {
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    }
  },
  methods: {
    initDropzone() {
      const dropLabel = document.getElementById('drop-label')
      dropLabel.addEventListener('dragover', this.fileDragHover, false)
      dropLabel.addEventListener('drop', this.fileSelectHandler, false)
      dropLabel.addEventListener('dragleave', this.fileDragLeave, false)
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

        // Invalid Format
        if (!fileFilter.test(file.type)) {
        }

        // File size over
        if (kilobyteToMegabyte(file.size) >= 7) {
        }

        // Approved
        if (fileFilter.test(file.type) && kilobyteToMegabyte(file.size) < 7) {
          file.document_name = file.name
          file.document_url = await getFileURL(file)
          file.document_size = file.size

          // this.value.certifications.unshift(file)
          // this.postImageToS3(file, i)
        }
      }
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

  #drop-label {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
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
