<template>
  <div>
    <div class="body-container">
      <div id="page">
        <!-- Header -->
        <page-header/>

        <div class="page-container">
          <!-- Form -->
          <r-f-q-form
            :user="userData"
            :value="value"
            :isSubmiting="toggle.isSubmiting"
            @input="onUpdated"
            @onSubmitButton="submitNewRFQ"/>

          <!-- Right Panel -->
          <right-panel
            :value="value"/>
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
// libs
import axios from '~/plugins/axios'
import { mapGetters } from 'vuex'
export default {
  layout: 'minify',
  middleware: 'authenticated',
  head: () => ({
    title: 'Request for Quotation'
  }),
  components: {
    PageHeader,
    RFQForm,
    RightPanel
  },
  data: () => ({
    value: {
      buyingLeadId: 0,
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
      terms: ''
    },
    toggle: {
      isSubmiting: false
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
    }
  },
  methods: {
    // When create New RFQ
    async createNewRFQRecord() {
      const body = {
        account_id: this.getAccountId,
        contact_id: this.getContactId
      }
      try {
        let { data } = await axios.post(`/api/data/buying_leads/`, body)
        data.description =
          "Dear Sir/Madam, I'm looking for products with the following specifications:"
        this.mappingData(data)
      } catch (err) {
        console.log('createNewRFQRecord', err)
        alert('Sorry, Internal server error occured. - 1')
      }
    },
    // When edit New RFQ
    async fetchBuyingLeadData(domain) {
      try {
        const { data } = await axios.get(
          `/api/data/buying_leads/domain/${domain}`
        )
        await this.canAccess(data.account_id)
        this.mappingData(data)
      } catch (err) {
        console.log('err', err)
        alert(err.msg)
      }
    },
    mappingData(data) {
      const {
        buying_lead_id,
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

      this.value.buyingLeadId = buying_lead_id
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
    },
    async submitNewRFQ(data) {
      if (!this.value.buyingLeadId)
        return alert('Sorry, Internal server error occured. - 4')

      this.toggle.isSubmiting = true
      const {
        buyingLeadId: buying_lead_id,
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

      let body = {
        buying_lead_body: {
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
        }
      }

      if (data.status === 'activated')
        body.buying_lead_body.status = 'Activated'

      try {
        await axios.put(`/api/data/buying_leads/${buying_lead_id}`, body)
        location.href = '/dashboard/buying-leads'
      } catch (err) {
        console.log('submitNewRFQ err', err)
        alert('Sorry, Internal server error occured. - 3')
        this.toggle.isSubmiting = false
      }
    },
    onUpdated(object) {
      const { dataKey, value } = object
      this.value[dataKey] = value
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
      const msg = "This user doesn't have permission to access."
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
