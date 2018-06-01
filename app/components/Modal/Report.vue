<template>
  <modal 
    :isHidden="isHidden"
    @close="$emit('close')">
    <card 
      :title="title"
      @close="$emit('close')">
      <!-- Before Reporting -->
      <div 
        class="report" 
        v-if="!isSubmiited">
        <div class="description">This question is:</div>
        <!-- Cheeckbox -->
        <div class="checkbox-container">
          <div 
            class="checkbox"
            v-for="report in reports"
            :key="report">
            <input 
              type="radio"
              :id="report"
              :value="report"
              v-model="requestion">
            <label 
              :for="report">{{report}}</label>
          </div>
        </div>
        <!-- Submit -->
        <submit-button
          class="submit"
          :disabled="!requestion"
          :isLoading="isSubmitting"
          @click="onSubmit()">Submit</submit-button>
      </div>
      <!-- After Reporting -->
      <div 
        class="submitted" 
        v-else>
        <div>
          Your report has been sent to us successfully.<br>We will check it out as soons as possible.</div>
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
import TextareaInput from '~/components/Inputs/Textarea'
import { EventBus } from '~/eventBus'
import Reports from '~/assets/models/reports.json'
import { mapGetters } from 'vuex'
export default {
  components: {
    Modal,
    Card,
    TextareaInput,
    SubmitButton
  },
  props: ['payload', 'isHidden'],
  data: () => ({
    title: 'Report Question',
    isSubmiited: false,
    isSubmitting: false,
    reports: Reports,
    requestion: ''
  }),
  computed: {
    ...mapGetters({
      contact: 'auth/GET_CONTACT'
    })
  },
  methods: {
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
        ${this.requestion || 'Undefined'}
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
      this.requestion = ''
    }
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
  color: @color-black;
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
.submit {
  margin-top: @section-margin-top;
  font-size: 16px;

  @media (min-width: 744px) {
    font-size: 18px;
  }
}
</style>
