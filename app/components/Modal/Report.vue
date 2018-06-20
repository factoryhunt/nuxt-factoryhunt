<template>
  <modal 
    :isHidden="isHidden"
    @close="$emit('close')">
    <card 
      :title="`${title}`"
      @close="$emit('close')">
      <!-- Before Reporting -->
      <div 
        class="report" 
        v-if="!isSubmiited">
        <!-- Cheeckbox -->
        <div 
          class="checkbox-container"
          v-show="type === 'checkbox'">
          <div class="description">Why are you reporting this?</div>
          <div 
            class="checkbox"
            v-for="report in reports"
            :key="report">
            <input 
              type="radio"
              :id="report"
              :value="report"
              v-model="reason">
            <label 
              :for="report">{{report}}</label>
          </div>
        </div>
        <div v-show="!type">
          <!-- Textarea -->
          <div class="description">Help us understand why you're reporting this person.</div>
          <text-area 
            class="textarea"
            v-model="reason"/>
        </div>
        <!-- Submit -->
        <submit-button
          class="submit"
          :disabled="!reason"
          :isLoading="isSubmitting"
          @click="onSubmit()">Submit</submit-button>
      </div>
      <!-- After Reporting -->
      <div 
        class="submitted" 
        v-else>
        <div>
          Your report has been sent to us successfully.<br>We will check it and get back to you shortly.</div>
        <!-- Close -->
        <submit-button
          class="submit"
          @click="onClose()">Close</submit-button>
      </div>
    </card>
  </modal>
</template>

<script>
import axios from '~/plugins/axios'
import Modal from '~/components/Modal/Container'
import Card from '~/components/Card/Modal'
import SubmitButton from '~/components/Button'
import TextArea from '~/components/Inputs/Textarea'
import Reports from '~/assets/models/reports.json'
import { EventBus } from '~/eventBus'
import { mapGetters } from 'vuex'
export default {
  components: {
    Modal,
    Card,
    TextArea,
    SubmitButton
  },
  props: {
    isHidden: null,
    type: String,
    payload: Object,
    title: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    reports: Reports,
    isSubmiited: false,
    isSubmitting: false,
    reason: ''
  }),
  computed: {
    ...mapGetters({
      contact: 'auth/GET_CONTACT'
    })
  },
  methods: {
    init() {},
    async onSubmit() {
      const { table, id } = this.payload

      this.isSubmitting = true
      const body = {
        contact_id: this.contact.contact_id,
        type: 'Report',
        message: `Report Requestion
        
        table: ${table || 'Undefined'}
        id: ${id || 0}
        reason:
        ${this.reason || 'Undefined'}
        `
      }

      axios
        .post('/api/data/customer_services/', { body })
        .then(() => {
          this.success()
        })
        .catch(err => {
          console.log('submitting report failed', err)
          this.success()
        })
    },
    success() {
      this.title = 'Thank You'
      this.isSubmiited = true
      this.isSubmitting = false
    },
    onClose() {
      this.$emit('close')
      this.title = 'Report Question'
      this.isSubmiited = false
      this.isSubmitting = false
      this.reason = ''
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';

@section-margin-top: 30px;
@margin-top: 12px;

.modal-background {
  display: block;
}
.description {
  font-weight: 500;
  font-size: 16px;

  @media (min-width: 744px) {
    font-size: 18px;
  }
}
.checkbox-container {
  margin-top: @margin-top;
  font-size: 14px;

  @media (min-width: 744px) {
    font-size: 16px;
  }

  .checkbox {
    margin-top: @margin-top;
  }

  label {
    margin-left: 8px;
    cursor: pointer;
  }
}

.textarea {
  margin-top: @margin-top;
}

.submit {
  margin-top: @section-margin-top;
  font-size: 16px;

  @media (min-width: 744px) {
    font-size: 18px;
  }
}
</style>
