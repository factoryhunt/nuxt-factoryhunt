<template>
  <div>
    <!-- Modal -->
    <modal-auth
      :isHidden="isModalAuthHidden"
      @close="isModalAuthHidden = true"/>

    <div class="section your-quote-container">
      <!-- Title -->
      <h4 class="section__title">Your Quote</h4>
      <div class="your-quote-wrapper">
        <card
          class="card"
          :isBottomHidden="true">
          <!-- Form Header -->
          <div class="quote-form">
            <!-- Profile Image -->
            <circle-img class="logo" :url="getLogoURL"/>
            <!-- Form -->
            <div class="form-main">
              <form @submit.prevent="onSumbit()">
                <error 
                  class="error"
                  v-show="errorMsg"
                  :message="errorMsg"/>
                <text-area 
                  class="text-input"
                  placeholder="Type comments about your quote."
                  :rows="rows"
                  :maxlength="1000"
                  v-model="description"
                  @click="$emit('click')"
                  @focus="onFocus"/>
                <div 
                  class="submit-form"
                  v-show="rows > 1">
                    <div class="grid">
                      <image-viewer
                        class="img-container"
                        v-for="(file,index) in files"
                        :key="index"
                        :mimetype="file.type"
                        :url="file.url"
                        @delete="onFileDelete(index)"/>
                    </div>
                    <div class="caution">
                      <span>PDF, PNG, JPG, JPEG only. You can attach up to 5 files and the maxium file size is 5MB each.</span>
                    </div>
                    <div class="submit-container">
                      <submit-button
                        class="button"
                        :disabled="!description"
                        :isLoading="isSubmitting">
                        Submit
                      </submit-button>
                      <file-input
                        class="file-input"
                        label="Attach file"
                        multiple="true"
                        :maxFileLength="5"
                        :maxFileSize="7"
                        accept="\/(pdf|png|jpeg|jpg)$"
                        @change="onFileChange"
                        @error="onFileError">
                      </file-input>
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
// components
import ModalAuth from '~/components/Modal/Auth'
import Card from './common/Card'
import TextArea from '~/components/Inputs/Textarea'
import ToolTip from '~/components/ToolTip'
import Button from '~/components/Button'
import Dropzone from '~/components/Dropzone/Test'
import FileInput from '~/components/Inputs/File'
import ImageViewer from '~/components/Image/Viewer'
import Error from '~/components/Alert/Error'
import CircleImg from '~/components/Image/CircleViewer'
// libs
import axios from '~/plugins/axios'
import { uploadDocument } from '~/utils/api'
import { mapGetters } from 'vuex'
// static
const MAX_FILE_LENGTH = 5
export default {
  components: {
    ModalAuth,
    Card,
    TextArea,
    SubmitButton: Button,
    ToolTip,
    Dropzone,
    FileInput,
    ImageViewer,
    Error,
    CircleImg
  },
  props: ['buyingLead'],
  data: () => ({
    files: [],
    description: '',
    rows: 1,
    isModalAuthHidden: true,
    isSubmitting: false,
    errorMsg: ''
  }),
  computed: {
    ...mapGetters({
      account: 'auth/GET_ACCOUNT',
      contact: 'auth/GET_CONTACT',
      isLoggedIn: 'auth/IS_LOGGED_IN',
      isUserSupplier: 'auth/IS_USER_SUPPLIER'
    }),
    getLogoURL() {
      const noImage = require('~/assets/icons/user.svg')
      if (!this.isLoggedIn) return noImage

      const { logo_url } = this.account

      return logo_url ? logo_url : noImage
    },
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
    },
    getSubmittingBody() {
      let body = {
        buying_lead_id: this.buyingLead.buying_lead_id,
        contact_id: this.contact.contact_id,
        description: this.description
      }
      return body
    }
  },
  methods: {
    onFocus(target) {
      target.blur()
      if (!this.isLoggedIn) return (this.isModalAuthHidden = false)

      if (!this.isUserSupplier) return alert('Sorry, the service is only available for suppliers.')

      if (this.buyingLead.status !== 'Activated')
        return alert('Sorry, this buying lead is not activated.')

      this.isFormHidden = false
      this.rows = 7
    },
    onFileChange(files) {
      this.files = files
    },
    onFileError(error) {
      const { msg } = error
      this.errorMsg = msg
    },
    onFileDelete(index) {
      this.files.splice(index, 1)
    },
    async onSumbit() {
      this.isSubmitting = true

      try {
        const body = this.getSubmittingBody
        const { data } = await axios.post('/api/data/quotes', { body })
        await this.uploadDocuments(data.insertId)
        location.reload()
      } catch (err) {
        console.log('submit error', err)
        alert('Sorry, Internal server error occured. - 1')
        this.isSubmitting = false
      }
    },
    uploadDocuments(quote_id) {
      return new Promise(async (resolve, reject) => {
        try {
          for (let i = 0; i < this.files.length; i++) {
            const file = this.files[i]
            let formData = new FormData()

            formData.append('parent_table', 'quotes')
            formData.append('parent_id', quote_id)
            formData.append('document', file)
            await uploadDocument(formData)
          }
          resolve()
        } catch (err) {
          reject(err)
        }
      })
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
    font-size: 16px;
  }
}
.quote-form {
  display: flex;
  width: 100%;
}
.error {
  margin-bottom: 8px;

  @media (min-width: 744px) {
    margin-bottom: 14px;
  }
}
.logo {
  width: 36px !important;
  height: 36px !important;

  @media (min-width: 744px) {
    width: 40px !important;
    height: 40px !important;
  }
}
.form-main {
  flex: 1;
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
  grid-gap: 6px;

  @media (min-width: 744px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-auto-rows: 130px;
  }
}
.img-container {
  padding: 11px;
}

.caution {
  margin-top: 18px;

  @media (min-width: 744px) {
    margin-top: 24px;
  }
}

.submit-container {
  margin-top: 12px;
  display: flex;
  align-items: center;
}
</style>
