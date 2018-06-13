<template>
  <div class="section quotes-container">
    <!-- Modal -->
    <modal-report 
      :isHidden="isReportHidden"
      :payload="getReportData"
      @close="isReportHidden = true"/>
    <modal-image-viewer
      :isHidden="isModalImageViewerHidden"
      :files="currentImages"
      :index="currentIndex"
      @close="isModalImageViewerHidden = true"/>
    <!-- Title -->
    <h4 
      class="section__title">{{getQuotesLength}} Record</h4>
    <!-- Contents -->
    <div class="quote-container">
      <!-- Supplier Cards -->
      <card
        class="card"
        v-for="quote in quotes"
        :key="quote.quote_id"
        :data="quote"
        :topDateDiff="getPostedDate(quote)"
        @onReport="onReportButton(quote.quote_id)"
        :isBottomHidden="isBottomHidden(quote)">
        <!-- Name -->
        <div 
          slot="name"
          class="name-container">
          <div>
            <span 
              class="name">
              <a href="/user">{{getUserName(quote)}}</a></span>
          </div>
          <div class="sub-name">
            <span>
              {{getRole(quote)}}</span>
            <span 
              class="dot">@</span>
            <span>
              <a 
                class="company" 
                :href="getCompanyDomain(quote)" 
                target="_blank">{{getCompany(quote)}}</a></span>
          </div>
        </div>
        <!-- Tags -->
        <div class="tag-container">
          <ul>
            <li>
              <tool-tip :label="quote.mailing_country">This supplier posted in {{quote.mailing_country}}</tool-tip></li>
            <li>
              <tool-tip :label="quote.business_type">Supplier's Business Type</tool-tip></li>
          </ul>
        </div>
        <!-- Main -->
        <div 
          slot="main">
          <!-- Show Content -->
          <div v-if="isThisUserCanRead(quote)">  
            <textarea 
              ref="textarea"
              class="description"
              :value="quote.description"
              readonly>
            </textarea>
            <div class="file-container">
              <square-image
                v-for="(url) in quote.files"
                :key="url"
                :url="url"
                @click="onPdfClick(url)"
                v-if="isPdfType(url)"/>
              <square-image
                v-for="(url, fileIndex) in quote.files"
                :id="fileIndex"
                :key="url"
                :url="url"
                @click="onImageClick(quote.files, fileIndex)"
                v-if="!isPdfType(url)"/>
            </div>
          </div>
          <!-- Hide Content -->
          <div 
            class="description"
            v-else>
            This content is visible only to the author of RFQ.
          </div>
        </div>
        <!-- Card Footer -->
        <div 
          slot="footer">
          <!-- Chat Now Button -->
          <basic-button
            id="quote-button"
            class="button"
            @click="onChatNowButton(quote)">
            Chat Now
          </basic-button>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
// components
import ModalReport from '~/components/Modal/Report'
import ModalImageViewer from '~/components/Modal/ImageViewer'
import SquareImage from '~/components/Image/Square'
import Card from './common/Card'
import BasicButton from '~/components/Button'
import TextInput from '~/components/Inputs/Text'
import ToolTip from '~/components/ToolTip'
// libs
import axios from '~/plugins/axios'
import { getCreatedDateDiff } from '~/utils/timezone'
import { encryptCompanyName } from '~/utils/text'
import { mapGetters } from 'vuex'
export default {
  components: {
    ModalReport,
    ModalImageViewer,
    SquareImage,
    Card,
    BasicButton,
    TextInput,
    ToolTip
  },
  props: ['buyingLead', 'quotes'],
  data: () => ({
    isReportHidden: true,
    isModalImageViewerHidden: true,
    reportId: 0,
    currentPdf: '',
    currentImages: [],
    currentIndex: -1
  }),
  computed: {
    ...mapGetters({
      contact: 'auth/GET_CONTACT'
    }),
    getContactId() {
      return this.contact.contact_id
    },
    getQuotesLength() {
      return this.quotes.length === 1 ? '1 Quote' : `${this.quotes.length} Quotes`
    },
    getReportData() {
      return {
        id: this.reportId,
        table: 'quotes'
      }
    },
    isAuthorOfRfq() {
      const { author_id } = this.buyingLead
      const contact_id = this.contact.contact_id
      return author_id === contact_id
    }
  },
  methods: {
    init() {
      this.resizeTextarea()
    },
    isThisUserCanRead(quote) {
      const { contact_id } = quote

      if (this.isAuthorOfRfq) return true

      return this.contact.contact_id === contact_id
    },
    isBottomHidden(quote) {
      const quote_author_id = quote.contact_id
      const contact_id = this.contact.contact_id

      if (this.isAuthorOfRfq) return false

      if (quote_author_id === contact_id) return true

      return true
    },
    isPdfType(type) {
      return type.indexOf('.pdf') > -1
    },
    getUserName(quote) {
      const { first_name, last_name } = quote

      let name = ''

      if (first_name || !last_name) name = first_name
      if (!first_name || last_name) name = last_name
      if (first_name && last_name) name = `${first_name} ${last_name}`
      if (!first_name && !last_name) name = 'Unknown'

      if (this.isAuthorOfRfq) return name

      if (!this.isThisUserCanRead(quote)) return encryptCompanyName(name)

      return name
    },
    getRole(quote) {
      return quote.contact_title
    },
    getCompany(quote) {
      const company = quote.account_name

      if (this.isAuthorOfRfq) return company

      if (!this.isThisUserCanRead(quote)) return encryptCompanyName(company)

      return quote.account_name
    },
    getCompanyDomain(quote) {
      const { account_domain } = quote

      if (this.isAuthorOfRfq) return `/${account_domain}`

      if (!this.isThisUserCanRead(quote)) return `#`

      return `/${account_domain}`
    },
    getPostedDate(quote) {
      const payload = {
        year_diff: quote.year_diff,
        month_diff: quote.month_diff,
        week_diff: quote.week_diff,
        day_diff: quote.day_diff,
        hour_diff: quote.hour_diff,
        minute_diff: quote.minute_diff,
        second_diff: quote.second_diff
      }
      const result = getCreatedDateDiff(payload)

      return result
    },
    resizeTextarea() {
      const $textareas = this.$refs.textarea
      if (!$textareas) return

      for (let i = 0; i < $textareas.length; i++) {
        const $textarea = $textareas[i]
        const scrollHeight = $textarea.scrollHeight
        $textarea.style.height = `${scrollHeight}px`
      }
    },
    onPdfClick(url) {
      window.open(url)
    },
    onImageClick(images, index) {
      this.currentIndex = index
      this.currentImages = images
      this.isModalImageViewerHidden = false
    },
    async onChatNowButton(quote) {
      const quote_contact_id = quote.contact_id

      let conversationId = ''
      if (quote_contact_id > this.getContactId)
        conversationId = `${this.getContactId}_${quote_contact_id}`
      else conversationId = `${quote_contact_id}_${this.getContactId}`

      const API = `/api/data/inbox`
      const body = {
        sender_id: this.getContactId,
        recipient_id: quote_contact_id,
        conversation_id: conversationId,
        body: `New Chatting is just started.\nHave fun.
        `
      }
      const chatRoomURL = `/dashboard/inbox/${conversationId}`

      try {
        await axios.put(API, { body })
        location.href = chatRoomURL
      } catch (err) {
        console.log('on chat error', err)
      }
    },
    onReportButton(quote_id) {
      this.isReportHidden = false
      this.reportId = quote_id
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
.tag-container {
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

.description {
  padding: 0;
  border: 0;
  font-size: 14px;
  resize: none;
  overflow: hidden;
  line-height: 1.7;

  @media (min-width: 744px) {
    font-size: 17px;
  }
}

.file-container {
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 10px;
}
</style>
