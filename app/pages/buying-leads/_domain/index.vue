<template>
  <div class="body-container">
    <div class="body__wrapper">
      <breadcrumb 
        root="Buying Leads"/>
      <card
        :data="buyingLead"
        :currentTime="currentTime"/>
      <quote/>
    </div>
  </div>
</template>

<script>
// components
import Breadcrumb from '~/components/Breadcrumb'
import Card from './components/Card'
import Quote from './components/Quote'
// libs
import axios from '~/plugins/axios'
import { getServerTime } from '~/utils/timezone'
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
          content: `${this.buyingLead.description}, ${
            this.buyingLead.category
          } | Factory Hunt`
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
          content:
            'https://s3-us-west-1.amazonaws.com/factoryhunt.com/logo2.png'
        },
        {
          hid: 'twitter-domain',
          property: 'twitter:domain',
          content: `https://www.factoryhunt.com/buying-leads/${
            this.buyingLead.domain
          }`
        }
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `https://www.factoryhunt.com/buying-leads/${
            this.buyingLead.domain
          }`
        }
      ]
    }
  },
  components: {
    Breadcrumb,
    Card,
    Quote
  },
  async asyncData({ error, params }) {
    const { domain } = params

    try {
      const { data } = await axios.get(
        `/api/data/buying_leads/domain/${domain}`
      )

      // Domain is not available
      if (!data) error({ statusCode: 404, message: 'Page not found' })

      return {
        buyingLead: data
      }
    } catch (err) {
      console.log('buying-lead/domain err', err)
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  data: () => ({
    currentTime: '',
    value: {}
  }),
  methods: {
    async mappingData() {
      this.currentTime = await getServerTime()
    }
  },
  mounted() {
    this.mappingData()
  }
}
</script>

<style lang="less" scoped>
.body-container {
  max-width: 780px !important;
  padding-bottom: 80px;
}
</style>
