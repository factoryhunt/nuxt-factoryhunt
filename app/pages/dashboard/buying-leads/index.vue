<template>
  <div class="dashboard-wrapper">
    <!-- Header -->
    <header>
      <div class="header__list">
        <!-- Title -->
        <section 
          class="title-section">
          <h1>Buying Leads</h1>
        </section>
        <!-- Button -->
        <section 
          class="button-section"
          v-if="buyingLeads.length">
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
      <div v-if="!toggle.isDataFetched">
        <dot-spinner color="#f2583d"/>
      </div>
      <!-- Body -->
      <div 
        class="body__wrapper" 
        v-else>
        <!-- No exists-->
        <no-item-card 
          class="no-item-container"
          v-if="!buyingLeads.length">
          <h2 
            class="title">Let the right supplier find you with RFQ</h2>
          <p class="description">Get quotes, and close deals one click.</p>
          <basic-button 
            class="rfq-button"
            @click="onRFQButton()">Request First Quotation</basic-button>
        </no-item-card>
        <!-- Exists -->
        <div 
          class="cards-container"
          v-else>
          <!-- Select -->
          <select-input
            class="filter"
            :value="filter"
            @input="onFilterChange"
            :array="status"/>
          <!-- List -->
          <cards 
            :buying_leads="buyingLeads"
            @onViewBuyingLead="routeRFQDetailPage"
            @onEditBuyingLead="routeRFQEditPage"
            @onArchiveBuyingLead="onArchiveBuyingLead"/>
        </div>
      </div>
    </main>

  </div>
</template>

<script>
// components
import Cards from './components/Cards'
import NoItemCard from '../components/NoItemCard'
import DotSpinner from '~/components/Spinner/Dots'
import SelectInput from '~/components/Inputs/Select'
import BasicButton from '~/components/Button'
// models
import status from './models/status.json'
// libs
import axios from '~/plugins/axios'
import { mapGetters } from 'vuex'
import { showTopAlert } from '~/utils/alert'
export default {
  layout: 'dashboard',
  components: {
    NoItemCard,
    DotSpinner,
    SelectInput,
    Cards,
    BasicButton
  },
  data: () => ({
    buyingLeads: [],
    status: status,
    filter: '',
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
    init() {
      this.mappingData()
      this.fetchBuyingLeads()
    },
    mappingData() {
      this.fetchFilterQueryString()
    },
    fetchFilterQueryString() {
      const { filter } = this.$route.query

      const result = status.indexOf(filter)

      if (status.indexOf(filter) !== -1) {
        if (filter) this.filter = filter
        else this.filter = status[0] || 'All'
      } else this.filter = status[0] || 'All'
    },
    async fetchBuyingLeads() {
      try {
        let apiAddress = `/api/data/buying_leads/${this.getAccountId}`
        if (this.filter) apiAddress = apiAddress + `?filter=${this.filter}`
        const { data } = await axios.get(apiAddress)
        this.buyingLeads = data
        this.toggle.isDataFetched = true
      } catch (err) {
        console.log('err', err)
        this.toggle.isDataFetched = true
      }
    },
    async onArchiveBuyingLead(buying_lead_id) {
      const body = {
        buying_lead_body: {
          status: 'Archived'
        }
      }
      try {
        await axios.put(`/api/data/buying_leads/${buying_lead_id}`, body)
        await this.fetchBuyingLeads()
      } catch (err) {
        console.log('onDeleteBuyingLead err', err)
        showTopAlert(this.$store, false, 'Sorry, archiving Buying Lead failed.')
      }
    },
    onFilterChange(value) {
      const path = this.$route.path
      location.href = `${path}?filter=${value}`
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
    this.init()
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
@section-margin: 40px;

* {
  margin: 0;
  padding: 0;
}

ul {
  list-style: none;
}

.dashboard-wrapper {
  padding-bottom: @section-margin;
}

header {
  h1 {
    font-size: 30px;
  }
  h2 {
    margin-top: 12px;
    font-size: 24px;
  }
  button {
    background-color: @color-orange;
    padding: 14px 28px;
    font-weight: 500;
    font-size: 18px;

    &:disabled {
      opacity: 0.4;
    }
  }
  .header__list {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

main {
  margin-top: @section-margin;
}
.no-item-container {
  .title {
    font-weight: 500;
    font-size: 24px;
  }
  .description {
    font-weight: 300;
  }
  .rfq-button {
    margin-top: 20px;
  }
}
.filter {
  width: 200px;
}
</style>
