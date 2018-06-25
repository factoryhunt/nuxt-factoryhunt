<template>
  <div class="rfq-container">
    <!-- Modal -->
      <modal-report 
        title="Report Buying Lead"
        type="checkbox"
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
            <span>{{getAuthorName}}</span></div>
          <div class="sub-name">
            <span 
              v-show="buyingLead.contact_title">
              {{buyingLead.contact_title}}</span>
            <span 
              v-show="buyingLead.account_name || buyingLead.contact_title"> 
              <span v-show="getEncryptedCompanyName"> @ </span>
              <div class="company">
                <a>{{getEncryptedCompanyName}}</a> 
                <div class="tool-tip">The buyer details will be visible when your quote is accepted.</div>
              </div>
                <!-- <a 
                    :href="getCompanyDomain"
                    target="_blank">{{getEncryptedCompanyName}}</a> -->
                    </span>
              <span> · Posted {{getPostedDate}}</span>
          </div>
        </div>

        <!-- Verified Mark -->
        <section class="verify-container">
          <ul>
            <li v-show="getCountry">
              <tool-tip
                :label="getCountry">The buyer posted in {{getCountry}}.</tool-tip></li>
            <!-- <li><tool-tip
                label="Email Confirmed">This buyer emails is confirmed.</tool-tip></li> -->
            <!-- <li><tool-tip
                label="Active Buyer">This buyer has sent inquiries or posted Buying Requests frequently within the last 90 days.</tool-tip></li> -->
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
            <li v-show="getQuantity"><tool-tip
              :label="getQuantity">The buyer wants {{getQuantity}}.</tool-tip></li>
            <li v-if="isAdmin"><tool-tip
              label="Posted by FH">This buying lead is posted by Factory Hunt</tool-tip></li>
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
            v-if="buyingLead.files.length">
            <square-image
              v-for="(file,index) in buyingLead.files"
              :key="index"
              :url="file"
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
import { encryptCompanyName, nFormatter, getName } from '~/utils/text'
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
  props: ['buyingLead'],
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
    isAdmin() {
      const { account_type } = this.buyingLead

      if (account_type.indexOf('Admin') !== -1) return true

      return false
    },
    getCountry() {
      const { author_id, mailing_country, temp_mailing_country } = this.buyingLead

      if (this.isAdmin) return temp_mailing_country || ''

      return mailing_country || ''
    },
    getReportData() {
      return {
        id: this.buyingLead.buying_lead_id,
        table: 'buying_leads'
      }
    },
    getAuthorName() {
      const { first_name, last_name, temp_first_name, temp_last_name } = this.buyingLead

      if (this.isAdmin) return getName(temp_first_name, temp_last_name)

      return getName(first_name, last_name)
    },
    getQuantity() {
      let { quantity, unit } = this.buyingLead
      quantity = nFormatter(quantity, 1)
      unit = unit.toLowerCase()

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

      return result.toLowerCase()
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
      const { account_name, temp_account_name } = this.buyingLead

      if (this.isAdmin) return encryptCompanyName(temp_account_name || '')
      return encryptCompanyName(account_name || '')
    },
    getURL() {
      const domain = this.buyingLead.domain
      return `https://www.factoryhunt.com/buying-leads/${domain}`
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
      this.modalImages = this.buyingLead.files
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
      font-size: 14px;
    }
  }
}
.company {
  display: inline-block;
  position: relative;

  a {
    text-decoration: none !important;
    cursor: help !important;
  }

  &:hover {
    .tool-tip {
      display: block;
    }
  }

  .tool-tip {
    display: none;
    position: absolute;
    min-width: 250px;
    bottom: 110%;
    left: 5%;
    width: 100%;
    color: @color-font-black;
    box-shadow: 0 2px 4px @color-light-gray;
    z-index: 2;
    background-color: @color-white;
    padding: 11px;
    border-radius: @border-radius;
  }
}

// Content
h1 {
  font-size: 24px;

  @media (min-width: 744px) {
    font-size: 29px;
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
    font-size: 17px;
  }
}
.posted-in {
  font-size: 13px;
  color: @color-font-gray;
}
.read-more {
  font-size: 16px;
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
