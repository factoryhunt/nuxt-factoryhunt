<template>
  <div class="body-container">
    <div class="body__wrapper">
      <!-- Breadcrumb -->
      <breadcrumb 
        :payload="breadcrumb"/>

      <!-- Buyer RFQ -->
      <r-f-q 
        :buyingLead="buyingLead"/>

      <!-- Your Quote -->
      <your-quote
        :buyingLead="buyingLead"
        v-show="!isAuthorOfRfq"/>

      <!-- Supplier Quotes -->
      <quotes
        :buyingLead="buyingLead"
        :quotes="quotes"/>
    </div>
  </div>
</template>

<script>
// components
import Breadcrumb from '~/components/Breadcrumb'
import RFQ from './components/RFQ'
import YourQuote from './components/YourQuote'
import Quotes from './components/Quotes'
// libs
import axios from '~/plugins/axios'
import { mapGetters } from 'vuex'
export default {
  layout: 'feed',
  head() {
    return {
      title: `${this.buyingLead.title}`,
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: `${
            this.buyingLead.title
          }, factoryhunt, factory, hunt, factory hunt, quote, bulk, wholesale, supplier, factory hunt, online catalog, supplier directory, free website, international trade`
        },
        {
          hid: 'description',
          name: 'description',
          content: `${this.buyingLead.description}, ${this.buyingLead.category} | Factory Hunt`
        },
        {
          hid: 'og-title',
          property: 'og:title',
          content: this.buyingLead.title
        },
        {
          hid: 'og-description',
          property: 'og:description',
          content: this.buyingLead.description
        },
        // { hid: 'og-image', property: 'og:image', content: this.vendor.cover_image_url_1 },
        {
          hid: 'og-url',
          property: 'og:url',
          content: `factoryhunt.com/buying-leads/${this.buyingLead.domain}`
        },
        { hid: 'twitter-card', property: 'twitter:card', content: 'summary' },
        {
          hid: 'twitter-title',
          property: 'twitter:title',
          content: `${this.buyingLead.description} | Factory Hunt`
        },
        {
          hid: 'twitter-description',
          property: 'twitter:description',
          content: `${this.buyingLead.description} | Factory Hunt`
        },
        {
          hid: 'twitter-image',
          property: 'twitter:image',
          content: 'https://s3-us-west-1.amazonaws.com/factoryhunt.com/logo2.png'
        },
        {
          hid: 'twitter-domain',
          property: 'twitter:domain',
          content: `https://www.factoryhunt.com/buying-leads/${this.buyingLead.domain}`
        }
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `https://www.factoryhunt.com/buying-leads/${this.buyingLead.domain}`
        }
      ]
    }
  },
  components: {
    Breadcrumb,
    RFQ,
    YourQuote,
    Quotes
  },
  async asyncData({ error, params }) {
    const { domain } = params

    try {
      const { data } = await axios.get(`/api/data/buying_leads/domain/${domain}`)

      // Domain is not available
      if (!data.buying_lead) error({ statusCode: 404, message: 'Page not found' })

      return {
        buyingLead: data.buying_lead,
        quotes: data.quotes
      }
    } catch (err) {
      console.log('buying-lead/domain err', err)
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  data: () => ({
    breadcrumb: []
  }),
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/IS_LOGGED_IN',
      contact: 'auth/GET_CONTACT'
    }),
    isAuthorOfRfq() {
      const { author_id } = this.buyingLead
      const contact_id = this.contact.contact_id
      return author_id === contact_id
    }
  },
  methods: {
    init() {
      this.setBreadcrumb()
    },
    setBreadcrumb() {
      let array = this.buyingLead.category.split(' > ')

      const initialValue = [
        {
          value: 'Buying Leads',
          uri: '/buying-leads'
        }
      ]
      const reducer = function(accumulator, value) {
        const item = {
          value: value,
          uri: `/buying-leads?category=${value}`
        }
        accumulator.push(item)

        return accumulator
      }

      array = array.reduce(reducer, initialValue)
      this.breadcrumb = array
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="less" scoped>
@import './styles/index';
</style>
