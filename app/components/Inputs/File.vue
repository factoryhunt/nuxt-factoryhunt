<template>
  <div>
    <label for="input">{{label}}</label>
    <input 
      id="input" 
      type="file"
      :multiple="multiple"
      :required="required"
      :accept="accept"
      @change="onFileChange($event.target.files)">
  </div>
</template>

<script>
import { getFileURL, kilobyteToMegabyte } from '~/utils/fileReader'
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    maxFileLength: [String, Number],
    maxFileSize: {
      type: [String, Number],
      default: '1'
    },
    multiple: {
      type: [Boolean, String],
      default: false
    },
    required: {
      type: [Boolean, String],
      default: false
    },
    accept: {
      type: String,
      default: ''
    }
  },
  computed: {
    getAccepRegExp() {
      return new RegExp(this.accept)
    }
  },
  methods: {
    async onFileChange(files) {
      // Validate files
      const result = await this.validateFiles(files)

      // return files to parent
      this.$emit('change', result)
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
        const filetype = this.getAccepRegExp

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
      this.$emit('error', err)
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
label {
  display: inline-block;
  background-color: @color-bg-gray;
  border: 1px solid @color-border-gray;
  border-radius: @border-radius;
  padding: 11px;
  transition: background-color 0.3s;

  &:hover {
    cursor: pointer;
    background-color: @color-lightest-grey;
  }
}
</style>

