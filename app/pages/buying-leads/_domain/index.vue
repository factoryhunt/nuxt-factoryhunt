<template>
  <div class="body-container">
    <div class="body__wrapper">
      <!-- Modal -->
      <modal-report 
        table="buying_leads"
        :isHidden="toggle.isReportHidden"
        :payload="reportData"
        @close="closeReport"/>
      <modal-auth
        :isHidden="toggle.isAuthHidden"
        @close="closeSigningIn"/>
      <modal-image-viwer
        :isHidden="toggle.isModalImageHidden"
        @close="toggle.isModalImageHidden = true"/>

      <!-- Breadcrumb -->
      <breadcrumb 
        :payload="breadcrumb"/>

      <!-- Buyer RFQ -->
      <r-f-q 
        :buyingLead="buyingLead"
        :documents="documents"
        @onReport="onReport"
        @clickImage="showModalImage"/>

      <!-- Your Quote -->
      <your-quote
        :data="yourQuote"
        :isSubmitting="toggle.isSubmitting"
        @focus="onSendQuote"
        @fileChange="onYourQuoteFileChange"
        @fileDelete="onYourQuoteFileDelete"
        @submit="onSubmitButton"/>

      <!-- Supplier Quotes -->
      <quotes
        :quotes="quotes"
        @onReport="onReport"/>

      <!-- Your Quote -->
      <your-quote
        :data="yourQuote"
        @click="onSendQuote"
        @fileChange="onYourQuoteFileChange"
        @fileDelete="onYourQuoteFileDelete"
        v-if="quotes.length"/>
    </div>
  </div>
</template>

<script>
// components
import ModalReport from '~/components/Modal/Report'
import ModalAuth from '~/components/Modal/Auth'
import ModalImageViwer from '~/components/Modal/ImageViewer'
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
    ModalReport,
    ModalAuth,
    ModalImageViwer,
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
        documents: data.documents,
        quotes: data.quotes
      }
    } catch (err) {
      console.log('buying-lead/domain err', err)
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  data: () => ({
    currentTime: '',
    reportData: {},
    breadcrumb: [],
    yourQuote: {
      text: '',
      files: [],
      errorMsg: '',
      rows: 1
    },
    toggle: {
      isReportHidden: true,
      isAuthHidden: true,
      isModalImageHidden: true,
      isSubmitting: false
    }
  }),
  computed: {
    ...mapGetters({
      contact: 'auth/GET_CONTACT',
      isLoggedIn: 'auth/IS_LOGGED_IN',
      isUserSupplier: 'auth/IS_USER_SUPPLIER'
    }),
    getSubmittingBody() {
      let body = {
        buying_lead_id: this.buyingLead.buying_lead_id,
        contact_id: this.contact.contact_id,
        description: this.yourQuote.text
      }

      return body
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
          uri: '/'
        }
        accumulator.push(item)

        return accumulator
      }

      array = array.reduce(reducer, initialValue)
      this.breadcrumb = array
    },
    onChatNowButton() {},
    onReport(payload) {
      this.reportData = payload
      this.toggle.isReportHidden = false
    },
    showModalImage(document) {
      this.toggle.isModalImageHidden = false
    },
    onSendQuote() {
      if (!this.isLoggedIn) return (this.toggle.isAuthHidden = false)

      if (!this.isUserSupplier) return alert('Sorry, sending quote is serviced only for suppliers.')

      this.yourQuote.rows = 7
    },
    closeReport() {
      this.toggle.isReportHidden = true
    },
    closeSigningIn() {
      this.toggle.isAuthHidden = true
    },
    onYourQuoteFileChange(files) {
      this.yourQuote.files = files
    },
    onYourQuoteFileDelete(index) {
      this.yourQuote.files.splice(index, 1)
    },
    async onSubmitButton() {
      this.toggle.isSubmitting = true

      try {
        const body = this.getSubmittingBody
        await axios.post('/api/data/quotes', { body })
        location.reload()
      } catch (error) {
        console.log('submit error', error)
        this.toggle.isSubmitting = false
      }
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
