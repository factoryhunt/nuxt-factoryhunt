<template>
  <div class="rfq-container">
    <!-- Modal -->
      <modal-report 
        :isHidden="isReportHidden"
        :payload="getReportData"
        @close="isReportHidden = true"/>
      <modal-image-viwer
        :isHidden="isModalImageHidden"
        :files="modalImages"
        :index="modalImageIndex"
        @close="isModalImageHidden = true"/>

    <!-- Buyer RFQ Card -->
      <card
        :data="buyingLead"
        :topDateDiff="getDueDateDiff"
        @onReport="onReportButton()">

        <!-- User Name -->
        <div 
          slot="name"
          class="name-container">
          <div class="name">
            <a href="/user">{{getAuthorName}}</a></div>
          <div class="sub-name">
            <span v-show="buyingLead.contact_title">
              {{buyingLead.contact_title}}</span>
            <span v-show="buyingLead.account_name || buyingLead.contact_title"> 
              @
            <!-- <span>{{getEncryptedCompanyName}}</span>  -->
              <a 
                  :href="getCompanyDomain"
                  target="_blank">{{getEncryptedCompanyName}}</a></span>
            <span> · Posted {{getPostedDate}}</span>
          </div>
        </div>

        <!-- Verified Mark -->
        <section class="verify-container">
          <ul>
            <li><tool-tip
                :label="buyingLead.mailing_country">This buyer posted in {{buyingLead.mailing_country}}</tool-tip></li>
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
            <square-image
              v-for="(document,index) in documents"
              :key="document.document_id"
              :url="document.location"
              @click="onImageClick(index)"/>
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
import ModalReport from '~/components/Modal/Report'
import ModalImageViwer from '~/components/Modal/ImageViewer'
import SquareImage from '~/components/Image/Square'
import Card from './common/Card'
import BasicButton from '~/components/Button'
import ToolTip from '~/components/ToolTip'
// libs
import Clipboard from 'clipboard'
import { mapGetters } from 'vuex'
import { getCreatedDateDiff, getTimeLeft } from '~/utils/timezone'
import { encryptCompanyName } from '~/utils/text'
// static
const DESCRIPTION = 'description'
const MAX_HEIGHT = 190
export default {
  components: {
    ModalReport,
    ModalImageViwer,
    SquareImage,
    Card,
    BasicButton,
    ToolTip
  },
  props: ['buyingLead', 'documents'],
  data: () => ({
    isModalImageHidden: true,
    isReportHidden: true,
    isReadmoreButtonHidden: true,
    modalImageIndex: '',
    modalImages: [],
    copyLink: 'Link Copy'
  }),
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/IS_LOGGED_IN',
      user: 'auth/GET_USER'
    }),
    getReportData() {
      return {
        id: this.buyingLead.buying_lead_id,
        table: 'buying_leads'
      }
    },
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
    getPostedDate() {
      const payload = {
        year_diff: this.buyingLead.year_diff,
        month_diff: this.buyingLead.month_diff,
        week_diff: this.buyingLead.week_diff,
        day_diff: this.buyingLead.day_diff,
        hour_diff: this.buyingLead.hour_diff,
        minute_diff: this.buyingLead.minute_diff,
        second_diff: this.buyingLead.second_diff
      }
      const result = getCreatedDateDiff(payload)

      return result
    },
    getDueDateDiff() {
      const { status, due_day_diff, due_hour_diff, due_minute_diff } = this.buyingLead

      if (status !== 'Activated') return 'Not Activated'

      const timeLeft = getTimeLeft(due_minute_diff, due_hour_diff, due_day_diff)

      if (timeLeft) return timeLeft

      return 'Deal Closed'
    },
    getCompanyDomain() {
      return '#'
      // return this.isLoggedIn ? `/${this.buyingLead.domain}` : '#'
    },
    getEncryptedCompanyName() {
      const { account_name } = this.buyingLead
      return encryptCompanyName(account_name)
    }
  },
  methods: {
    init() {
      this.resizeTextarea()
      this.activateClipboard()
      this.mappingModalFiles()
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
    mappingModalFiles() {
      this.modalImages = this.documents.map(document => {
        return document.location
      })
    },
    onImageClick(index) {
      this.modalImageIndex = index

      this.isModalImageHidden = false
    },
    onExpandReadmore() {
      const $description = this.$refs[DESCRIPTION]
      const height = $description.scrollHeight

      $description.style.height = `${height}px`
      this.isReadmoreButtonHidden = true
    },
    onReportButton() {
      this.isReportHidden = false
    },
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
    margin-right: 6px;
    margin-bottom: 6px;
    background-color: @color-bg-gray;
    font-size: 11px;

    @media (min-width: 744px) {
      margin-right: 12px;
      margin-bottom: 12px;
      font-size: 13px;
    }
  }
}

// Content
h1 {
  font-size: 24px;

  @media (min-width: 744px) {
    font-size: 28px;
  }
}
.description {
  margin-top: @card-padding;
  font-size: 14px;
  padding: 0;
  border: 0 !important;
  resize: none;
  overflow: hidden;
  line-height: 1.7;

  @media (min-width: 744px) {
    font-size: 16px;
  }
}
.posted-in {
  font-size: 13px;
  color: @color-font-gray;
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
  margin-top: 30px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;

  @media (min-width: 744px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
}
.product__image-container {
  display: inline-flex;
  width: 105px;
  height: 105px;
  box-shadow: 0px 2px 4px @color-light-gray;
  border-radius: @border-radius;
  overflow: hidden;
  margin-right: 12px;
  margin-bottom: 12px;
  cursor: pointer;

  @media (min-width: 375px) {
    width: 130px;
    height: 130px;
  }
  @media (min-width: 744px) {
    width: 135px;
    height: 135px;
  }

  img {
    width: 100%;
    object-fit: contain;
  }
}
</style>
