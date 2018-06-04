<template>
  <div>
    <div class="section your-quote-container">
      <!-- Title -->
      <h4 class="section__title">Your Quote</h4>
      <div class="your-quote-wrapper">
        <card
          class="card">
          <!-- Form Header -->
          <div class="quote-form">
            <!-- Profile Image -->
            <img 
              class="profile"
              src="~assets/icons/user.svg">
            <!-- Form -->
            <div class="form-main">
              <form @submit.prevent="submitQuote">
                <text-area 
                  class="text-input"
                  placeholder="Suggest your product with a quote."
                  :rows="data.rows"
                  v-model="data.text"
                  @click="$emit('click')"
                  @focus="$emit('focus')"/>
                <div 
                  class="submit-form"
                  v-show="data.rows > 1">
                    <div class="grid">
                      <image-viewer
                        class="img-container"
                        v-for="(file,index) in data.files"
                        :key="index"
                        :url="file.url"
                        @delete="$emit('fileDelete', index)"/>
                    </div>
                    <error 
                      class="error"
                      v-show="errorMsg"
                      :message="errorMsg"/>
                    <div class="submit-container">
                      <submit-button
                        class="button"
                        :disabled="!data.text"
                        :isLoading="isSubmitting">
                        Submit
                      </submit-button>
                      <file-input
                        class="file-input"
                        label="File Attachment"
                        multiple="true"
                        :maxFileLength="4"
                        :maxFileSize="2"
                        accept="\/(pdf|png|jpeg|jpg)$"
                        @change="onFileChange"
                        @error="onFileError"/>
                    </div>
                </div>
              </form>
            </div>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import Card from './common/Card'
import TextArea from '~/components/Inputs/Textarea'
import Button from '~/components/Button'
import Dropzone from '~/components/Dropzone/Test'
import FileInput from '~/components/Inputs/File'
import ImageViewer from '~/components/Image/Viewer'
import Error from '~/components/Alert/Error'
import { mapGetters } from 'vuex'
export default {
  components: {
    Card,
    TextArea,
    SubmitButton: Button,
    Dropzone,
    FileInput,
    ImageViewer,
    Error
  },
  props: ['data', 'isSubmitting'],
  data: () => ({
    isFormHidden: true,
    placeholder: 'Drop or drag PDF file(s) to this area.',
    errorMsg: ''
  }),
  computed: {
    ...mapGetters({
      contact: 'auth/GET_CONTACT'
    }),
    getPostedDate() {
      const payload = {
        year_diff: this.data.year_diff,
        month_diff: this.data.month_diff,
        week_diff: this.data.week_diff,
        day_diff: this.data.day_diff,
        hour_diff: this.data.hour_diff,
        minute_diff: this.data.minute_diff,
        second_diff: this.data.second_diff
      }
      const result = getCreatedDateDiff(payload)

      return result
    }
  },
  methods: {
    onInput(value) {
      this.$emit('input', value)
    },
    onFocus() {
      this.isFormHidden = false
      this.rows = 7
    },
    onFileChange(data) {
      this.$emit('fileChange', data)
    },
    onFileError(error) {
      const { msg } = error
      this.errorMsg = msg
    },
    submitQuote() {
      this.isFormHidden = true
      this.rows = 1

      this.$emit('submit')
    }
  }
}
</script>

<style lang="less" scoped>
@import '../styles/index';

@margin: 12px;

.your-quote-container {
  font-size: 13px;

  @media (min-width: 744px) {
    font-size: 15px;
  }
}
.quote-form {
  display: flex;
  width: 100%;
}
img.profile {
  width: 36px;
  height: 36px;
  border-radius: 50%;

  @media (min-width: 744px) {
    width: 40px;
    height: 40px;
  }
}
.form-main {
  width: 100%;
  margin-left: 12px;
}
#dropzone {
  margin-top: 8px;
}

.grid {
  margin-top: 4px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 100px;

  @media (min-width: 744px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-auto-rows: 130px;
  }
}
.img-container {
  padding: 11px;
}
.submit-container {
  margin-top: 24px;
  display: flex;
  align-items: center;
}
</style>
