<template>
  <div>
    <div class="body-container">
      <div id="page">
        <!-- Header -->
        <page-header/>

        <loader v-if="!toggle.isFetched"/>
        <div v-else class="page-container">
          <!-- Form -->
          <r-f-q-form
            :value="value"
            :isSubmiting="toggle.isSubmiting"
            @changed="checkProcess()"
            @fileAdded="onFileAdded"
            @submit="sumbitRequestion"
            @saveDraft="saveDraft"/>

          <!-- Right Panel -->
          <right-panel
            :files="value.files"
            :progress="progress"
            :fileProgress="value.fileProgress"
            @imageDelete="onFileDelete"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// components
import PageHeader from './components/Header'
import RFQForm from './components/Form'
import RightPanel from './components/RightPanel'
import Loader from '~/components/Spinner/Dots'
// libs
import axios from '~/plugins/axios'
import { showTopAlert } from '~/utils/alert'
import { mapGetters } from 'vuex'
import { convertEnterToBrTag } from '~/utils/text'
// static
const MAX_FILE_LENGTH = 5
export default {
  layout: 'dashboard',
  middleware: 'authenticated',
  head: () => ({
    title: 'Request for Quotation'
  }),
  components: {
    PageHeader,
    RFQForm,
    RightPanel,
    Loader
  },
  data: () => ({
    progress: 0,
    buyingLeadId: 0,
    value: {
      status: 'Draft',
      title: '',
      category: '',
      description: '',
      quantity: '',
      unit: '',
      deliveryTerm: '',
      paymentType: '',
      destinationPort: '',
      preferredUnitPrice: '',
      preferredUnitPriceCurrency: '',
      businessCard: '',
      terms: '',
      files: [],
      fileProgress: 0
    },
    toggle: {
      isFetched: false,
      isSubmiting: false,
      isFileProcessing: false
    }
  }),
  computed: {
    ...mapGetters({
      userData: 'auth/GET_USER'
    }),
    getAccountId() {
      return this.userData.account.account_id
    },
    getContactId() {
      return this.userData.contact.contact_id
    },
    areRequiredFieldsFilled() {
      const { title, category, description } = this.value

      if (title && category && description) return true

      return false
    },
    getSubmitData() {
      const {
        title,
        category,
        description,
        quantity,
        unit,
        deliveryTerm: delivery_term,
        paymentType: payment_type,
        destinationPort: destination_port,
        preferredUnitPrice: preferred_unit_price,
        preferredUnitPriceCurrency: preferred_unit_price_currency
      } = this.value
      const buying_lead_id = this.buyingLeadId
      const domain = this.getDomain(title)

      let body = {
        title,
        domain,
        category,
        description,
        quantity,
        unit,
        delivery_term,
        payment_type,
        destination_port,
        preferred_unit_price,
        preferred_unit_price_currency
      }
      return body
    }
  },
  methods: {
    onDownload() {
      const href = 'https://s3.us-west-1.amazonaws.com/factoryhunt.com/accounts/4/pdf'
      window.open(href)
    },
    // When create New RFQ
    async createNewRFQRecord() {
      const body = {
        account_id: this.getAccountId,
        contact_id: this.getContactId
      }
      try {
        let { data } = await axios.post(`/api/data/buying_leads/`, body)
        // this.mappingDefaultData(data)
        this.mappingData(data)
      } catch (err) {
        console.log('createNewRFQRecord', err)
        alert('Sorry, Internal server error occured. - 1')
        this.$router.go(-1)
      }
    },
    // When edit New RFQ
    async fetchBuyingLeadData(domain) {
      try {
        const { data } = await axios.get(`/api/data/buying_leads/rqs/${domain}`)
        await this.canAccess(data.buying_lead.account_id)
        this.mappingData(data.buying_lead)
        this.mappingDocuments(data.documents)
      } catch (err) {
        console.log('err', err)
        alert(err.msg)
        this.$router.go(-1)
      }
    },
    mappingDefaultData(data) {
      data.description =
        "Dear Sir/Madam, I'm looking for products with the following specifications:"
      // data.delivery_term = 'FOB'
      // data.payment_type = 'T/T'
      // data.preferred_unit_price_currency = 'USD'
    },
    mappingData(data) {
      const {
        buying_lead_id,
        status,
        title,
        category,
        description,
        quantity,
        unit,
        delivery_term,
        payment_type,
        destination_port,
        preferred_unit_price,
        preferred_unit_price_currency
      } = data

      this.buyingLeadId = buying_lead_id
      this.value.status = status
      this.value.title = title
      this.value.category = category
      this.value.description = description
      this.value.quantity = quantity
      this.value.unit = unit
      this.value.deliveryTerm = delivery_term
      this.value.paymentType = payment_type
      this.value.destinationPort = destination_port
      this.value.preferredUnitPrice = preferred_unit_price
      this.value.preferredUnitPriceCurrency = preferred_unit_price_currency

      this.checkProcess()
      this.toggle.isFetched = true
    },
    mappingDocuments(documents) {
      for (let i = 0; i < documents.length; i++) {
        const document = documents[i]
        const { id, original_name, content_type, body_length, location } = document
        let file = new File([''], original_name, {
          type: content_type,
          size: body_length
        })
        file.id = id
        file.url = location

        this.value.files.push(file)
      }

      this.checkProcess()
    },
    getDomain(title) {
      return (
        title
          .trim()
          .toLowerCase()
          .replace(/\%/g, '')
          .replace(/\s/g, '-') + `-${this.buyingLeadId}`
      )
    },
    sumbitRequestion() {
      if (!this.areRequiredFieldsFilled)
        return showTopAlert(this.$store, false, 'Please fill in all required fields.')

      let body = this.getSubmitData
      body.status = 'Activated'

      this.submitNewRFQ(body)
    },
    saveDraft() {
      let body = this.getSubmitData
      this.submitNewRFQ(body)
    },
    async submitNewRFQ(body) {
      if (!this.buyingLeadId)
        return showTopAlert(this.$store, false, 'Sorry, Internal server error occured. - 4')

      if (this.toggle.isFileProcessing)
        return showTopAlert(
          this.$store,
          false,
          'The files are being uploaded now. Please try it later again.'
        )

      if (this.toggle.isSubmiting)
        return showTopAlert(
          this.$store,
          false,
          'Your request is being submitted now. Please try it later again.'
        )

      this.toggle.isSubmiting = true

      try {
        await axios.put(`/api/data/buying_leads/${this.buyingLeadId}`, {
          buying_lead_body: body
        })
        location.href = '/dashboard/buying-leads'
      } catch (err) {
        console.log('submitNewRFQ err', err)
        alert('Sorry, Internal server error occured. - 3')
        this.toggle.isSubmiting = false
      }
    },
    checkProcess() {
      const {
        title,
        category,
        description,
        quantity,
        unit,
        deliveryTerm,
        paymentType,
        destinationPort,
        preferredUnitPrice,
        preferredUnitPriceCurrency,
        files
      } = this.value

      let completeness = 0

      if (title) completeness += 9
      if (category) completeness += 15
      if (description) completeness += 15
      if (files.length) completeness += 21
      if (quantity && unit) completeness += 13
      if (deliveryTerm) completeness += 7
      if (paymentType) completeness += 7
      if (destinationPort) completeness += 6
      if (preferredUnitPrice && preferredUnitPriceCurrency) completeness += 7

      if (completeness > 100) completeness = 100

      this.progress = completeness
    },
    async onFileAdded(files) {
      if (this.toggle.isFileProcessing)
        return showTopAlert(
          this.$store,
          false,
          'The files are being uploaded now. Please try it later again.'
        )

      this.toggle.isFileProcessing = true
      this.value.fileProgress = 0
      const beforeLength = this.value.files.length

      // Locally Added
      for (let i = 0; i < files.length; i++) {
        const length = beforeLength + i

        if (length < MAX_FILE_LENGTH) {
          const file = files[i]
          this.value.files.push(file)
        } else {
          showTopAlert(
            this.$store,
            false,
            `Maximum number of files you can upload is ${MAX_FILE_LENGTH}`
          )
        }
      }

      this.value.fileProgress = 1

      // Upload to S3
      for (let i = 0; i < files.length; i++) {
        const length = beforeLength + i
        if (length < MAX_FILE_LENGTH) {
          const file = files[i]
          const { insertId } = await this.uploadFilesToS3(file)
          this.value.fileProgress += 100 / files.length - 1
          this.value.files[length].id = insertId
        }
      }

      this.value.fileProgress = 100
      this.toggle.isFileProcessing = false
      this.checkProcess()
    },
    uploadFilesToS3(file) {
      const formData = new FormData()
      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }
      formData.append('parent_table', 'buying_leads')
      formData.append('parent_id', this.buyingLeadId)
      formData.append('document', file)

      return new Promise((resolve, reject) => {
        axios
          .post('/api/data/documents/single', formData, config)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            console.log('err', err)
            this.toggle.isFileProcessing = false
            resolve(err)
          })
      })
    },
    async onFileDelete(index) {
      if (this.toggle.isFileProcessing)
        return showTopAlert(
          this.$store,
          false,
          'The files are being uploaded now. Please try it later again.'
        )

      const { id } = this.value.files[index]
      const data = {
        data: {
          id: id
        }
      }

      try {
        await axios.delete('/api/data/documents/single', { data })
        this.value.files.splice(index, 1)
        this.checkProcess()
        this.toggle.isFileProcessing = false
      } catch (err) {
        console.log('err', err)
        this.toggle.isFileProcessing = false
      }
    },
    isUserHavePermission() {
      const { domain } = this.$route.query

      // Check user whether buyer is or not
      const account_type = this.userData.account.account_type
      if (account_type.indexOf('Buyer') === -1) this.$router.go(-1)

      // When editing
      if (domain) this.fetchBuyingLeadData(domain)
      else this.createNewRFQRecord()
    },
    canAccess(account_id) {
      const msg = 'Your are trying to access the page without permission.'
      return new Promise((resolve, reject) => {
        account_id === this.getAccountId ? resolve() : reject({ msg })
      })
    }
  },
  mounted() {
    this.isUserHavePermission()
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
@import '~assets/css/less/rfq/index';
</style>
