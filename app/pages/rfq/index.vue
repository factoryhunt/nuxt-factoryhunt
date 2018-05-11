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
            :units="units"
            :paymentTypes="paymentTypes"
            :deliveryTerms="deliveryTerms"
            @input="onUpdated"/>

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
// models
import units from '~/assets/models/units.json'
import delivery_terms from '~/assets/models/delivery_terms.json'
import payment_types from '~/assets/models/payment_type.json'
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
    units: units,
    deliveryTerms: delivery_terms,
    paymentTypes: payment_types,
    value: {
      title: '',
      category: ['aaa'],
      description:
        "Dear Sir/Madam, I'm looking for products with the following specifications:"
    }
  }),
  computed: {
    ...mapGetters({
      userData: 'auth/GET_USER'
    })
  },
  methods: {
    onUpdated(value) {
      const keys = Object.keys(value)
      const key = keys[0]
      this.value[keys[0]] = value[keys[0]]
    },
    isUserBuyer() {
      const account_type = this.userData.account.account_type
      if (account_type.indexOf('Buyer') === -1) this.$router.go(-1)
    }
  },
  created() {
    this.isUserBuyer()
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
@import '~assets/css/less/rfq/index';
</style>
