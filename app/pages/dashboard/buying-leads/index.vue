<template>
  <div class="dashboard-wrapper">
    <!-- Header -->
    <header>
      <div class="header__list">
        <section 
          class="title-section">
          <h1>Buying Leads</h1>
        </section>
        <section 
          class="button-section">
          <button 
            class="button-orange"
            @click="onRFQButton()">Request for Quotes</button>
        </section>
      </div>
    </header>

    <!-- Main -->
    <main
      class="body__container">
      <!-- Loader -->
      <div 
        v-if="!toggle.isDataFetched">
        <dot-spinner
          color="#f2583d"/>
      </div>
      <!-- Body -->
      <div 
        class="body__wrapper" v-else>
        <!-- Cards -->
        <div class="cards-container">
          <cards 
            :buying_leads="buyingLeads"
            @onViewBuyingLead="routeRFQDetailPage"
            @onEditBuyingLead="routeRFQEditPage"
            @onDeleteBuyingLead="onDeleteBuyingLead"/>
        </div>
      </div>
    </main>

  </div>
</template>

<script>
// components
import DotSpinner from '~/components/Spinner/Dots'
import Cards from './components/Cards'
// libs
import axios from '~/plugins/axios'
import { mapGetters } from 'vuex'
export default {
  layout: 'dashboard',
  components: {
    DotSpinner,
    Cards
  },
  data: () => ({
    buyingLeads: [],
    toggle: {
      isDataFetched: false
    }
  }),
  computed: {
    ...mapGetters({
      user: 'auth/GET_USER'
    }),
    getAccountId() {
      return this.user.account.account_id
    },
    getContactId() {
      return this.user.account.contact_id
    }
  },
  methods: {
    async fetchBuyingLeads() {
      try {
        const { data } = await axios.get(
          `/api/data/buying_leads/${this.getAccountId}`
        )
        this.buyingLeads = data
        this.toggle.isDataFetched = true
      } catch (err) {
        console.log('err', err)
        this.toggle.isDataFetched = true
      }
    },
    async onDeleteBuyingLead(buying_lead_id) {
      try {
        await axios.delete(`/api/data/buying_leads/${buying_lead_id}`)
        await this.fetchBuyingLeads()
      } catch (err) {
        console.log('onDeleteBuyingLead err', err)
        alert('Sorry, deleting Buying Lead failed.')
      }
    },
    onRFQButton() {
      location.href = '/rfq'
    },
    routeRFQDetailPage(domain) {
      location.href = `/buying-leads/${domain}`
    },
    routeRFQEditPage(domain) {
      location.href = `/rfq?domain=${domain}`
    }
  },
  mounted() {
    this.fetchBuyingLeads()
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/less/dashboard/index';
</style>
