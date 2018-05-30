<template>
  <div class="rfq-container">
    <!-- Buyer RFQ Card -->
      <card
        :data="buyingLead"
        :topDateDiff="getDueDateDiff"
        :bottomDateDiff="getCreatedDateDiff"
        @onReport="onReportButton()">

        <!-- User Name -->
        <div 
          slot="name"
          class="name-container">
          <div class="name">
            <a href="/user">{{getAuthorName}}</a></div>
          <div class="sub-name">{{buyingLead.contact_title}}</div>
        </div>

        <!-- Verified Mark -->
        <section class="verify-container">
          <ul>
            <li><tool-tip
                label="South Korea">This buyer posted in South Korea</tool-tip></li>
            <li v-show="getQuantity"><tool-tip
                :label="getQuantity">Buyer wants {{getQuantity}} quantities.</tool-tip></li>
            <!-- <li><tool-tip
                label="Email Confirmed">This buyer emails is confirmed.</tool-tip></li> -->
            <li><tool-tip
                label="Active Buyer">This buyer has sent inquiries or posted Buying Requests frequently within the last 90 days.</tool-tip></li>
            <!-- Delivery Term -->
            <li v-show="buyingLead.delivery_term"><tool-tip
                :label="buyingLead.delivery_term">Delivery Term</tool-tip></li>
            <!-- Payment Type -->
            <li v-show="buyingLead.payment_type"><tool-tip
                :label="buyingLead.payment_type">Payment Type</tool-tip></li>
            <!-- Destination Port -->
            <li v-show="buyingLead.destination_port"><tool-tip
                :label="buyingLead.destination_port">Destination Port</tool-tip></li>
            <!-- Preffered Unit Price -->
            <li v-show="getPaymentUnitPrice"><tool-tip
                :label="getPaymentUnitPrice">Preffered Unit Price</tool-tip></li>
          </ul>
        </section>

        <!-- Content -->
        <div slot="main">

          <!-- Main Content -->
          <section class="content">
            <h1>{{buyingLead.title}}</h1>
            <textarea 
              class="description" 
              ref="description"
              readonly 
              :value="buyingLead.description"></textarea>
            <a 
              class="read-more" 
              @click="onExpandReadmore()"
              v-show="!isReadmoreButtonHidden">Read More</a>
          </section>

          <!-- Images -->
          <section 
            class="product"
            v-if="documents.length">
            <div class="product-wrapper">
              <div 
                class="product__image-container"
                v-for="document in documents"
                :key="document.document_id">
                <img :src="document.location">
              </div>
            </div>
          </section>
        </div>

        <!-- Card Footer -->
        <div slot="footer">
          <!-- Quote Now Button -->
          <!-- <basic-button
            id="quote-button"
            class="button"
            @onButton="onQuoteButton">
            Quote Now
          </basic-button> -->

          <!-- Link Copy Button -->
          <basic-button
            id="copy-button"
            :data-clipboard-text="getURL"
            type="black"
            class="button"
            @onButton="onLinkCopyButton">
            {{copyLink}}
          </basic-button>
        </div>
      </card>
  </div>
</template>

<script>
// components
import Card from './Card'
import BasicButton from '~/components/Button'
import ToolTip from '~/components/ToolTip'
// libs
import Clipboard from 'clipboard'
// static
const DESCRIPTION = 'description'
const MAX_HEIGHT = 190
export default {
  components: {
    Card,
    BasicButton,
    ToolTip
  },
  props: ['buyingLead', 'documents'],
  data: () => ({
    isReadmoreButtonHidden: true,
    copyLink: 'Link Copy'
  }),
  computed: {
    getAuthorName() {
      const { first_name, last_name } = this.buyingLead

      let name = ''

      if (first_name || !last_name) name = first_name
      if (!first_name || last_name) name = last_name
      if (first_name && last_name) name = `${first_name} ${last_name}`
      if (!first_name && !last_name) name = 'Unknown'

      return name
    },
    getQuantity() {
      const { quantity, unit } = this.buyingLead

      let result = ''

      if (quantity && unit) result = `${quantity} ${unit}`

      return result
    },
    getPaymentUnitPrice() {
      const { preferred_unit_price, preferred_unit_price_currency } = this.buyingLead

      let payment = ''

      if (preferred_unit_price && preferred_unit_price_currency)
        payment = `${preferred_unit_price} ${preferred_unit_price_currency}`

      return payment
    },
    getURL() {
      return `https://www.factoryhunt.com/buying-leads/${this.buyingLead.domain}`
    },
    getCreatedDateDiff() {
      const {
        year_diff,
        month_diff,
        week_diff,
        day_diff,
        hour_diff,
        minute_diff,
        second_diff
      } = this.buyingLead

      if (year_diff) {
        return year_diff === 1 ? `A Year Ago` : `${year_diff} Years Ago`
      }
      if (month_diff) {
        return month_diff === 1 ? `A Month Ago` : `${month_diff} Months Ago`
      }
      if (week_diff) {
        return week_diff === 1 ? `A Week Ago` : `${week_diff} Weeks Ago`
      }
      if (day_diff) {
        return month_diff === 1 ? `A Day Ago` : `${day_diff} Days Ago`
      }
      if (hour_diff) {
        return hour_diff === 1 ? `A Hour Ago` : `${hour_diff} Hours Ago`
      }
      if (minute_diff) {
        return minute_diff === 1 ? `A Minute Ago` : `${minute_diff} Minutes Ago`
      }
      if (second_diff) {
        return second_diff === 1 ? `A Second Ago` : `${second_diff} Seconds Ago`
      }

      return ''
    },
    getDueDateDiff() {
      const { due_diff } = this.buyingLead

      if (due_diff) return `${due_diff} Days Left`

      return 'Closed'
    }
  },
  methods: {
    init() {
      this.resizeTextarea()
      this.activateClipboard()
    },
    resizeTextarea() {
      const $description = this.$refs[DESCRIPTION]
      const height = $description.scrollHeight

      $description.style.height = `${height}px`

      if (height > MAX_HEIGHT) {
        $description.style.height = `${MAX_HEIGHT}px`
        this.isReadmoreButtonHidden = false
      }
    },
    activateClipboard() {
      const clipboard = new Clipboard('#copy-button')
      clipboard.on('success', e => {
        this.copyLink = 'Link Copied!'
        e.clearSelection()
      })
    },
    onExpandReadmore() {
      const $description = this.$refs[DESCRIPTION]
      const height = $description.scrollHeight

      $description.style.height = `${height}px`
      this.isReadmoreButtonHidden = true
    },
    onReportButton() {
      const payload = {
        table: 'buying_leads',
        id: this.buyingLead.buying_lead_id
      }
      this.$emit('onReport', payload)
    },
    onQuoteButton() {},
    onLinkCopyButton() {
      this.copyLink = 'Link Copied!'
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="less" scoped>
@import '../styles/index';
ul {
  list-style: none;
  padding: 0;
  margin-left: 0;
  margin-top: @card-padding;
}

.verify-container {
  li {
    .gray-border;
    display: inline-flex;
    margin-right: 12px;
    margin-bottom: 12px;
    background-color: @color-bg-gray;
    font-size: 13px;
  }
}

// Content
h1 {
  font-size: 28px;
}
.description {
  margin-top: @card-padding;
  font-size: 16px;
  padding: 0;
  border: 0 !important;
  resize: none;
  overflow: hidden;
  line-height: 1.7;
}
.read-more {
  font-size: 15px;
}

// Other Requirements
.other-requirement-container {
  dl {
    display: flex;
  }
  dt {
    width: 120px;
  }
  dd {
    flex: 1;
    margin-left: 12px;
  }
}

// Product Images
.product {
  margin-top: @margin-top;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.product__image-container {
  display: inline-flex;
  width: 135px;
  height: 135px;
  box-shadow: 0px 2px 4px @color-light-gray;
  border-radius: @border-radius;
  overflow: hidden;
  margin-right: 12px;
  margin-bottom: 12px;
  cursor: pointer;

  img {
    width: 100%;
    object-fit: contain;
  }
}
</style>
