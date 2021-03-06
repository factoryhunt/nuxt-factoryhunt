<template>
  <div ref="page" class="dashboard-page-container">
    <modal-report
      title="What's the issue?"
      :isHidden="toggle.isReportHidden"
      :payload="getReportData"
      @close="toggle.isReportHidden = true"/>
    <loader 
      color="#f2583d"
      v-show="!toggle.isFetched"/>

    <div 
      class="container"
      v-show="toggle.isFetched">

      <!-- Left-side -->
      <div class="left-container">
        <!-- Profile -->
        <div class="profile-container">
          <circle-img 
            class="recipient-logo"
            :url="getRecipientLogoUrl"/>
          <div class="contents-container">
            <span 
              class="recipient-name"
              v-show="getRecipientName">{{ getRecipientName }}</span>
            <span 
              class="recipient-title">
              <span v-show="recipient.contact_title">{{recipient.contact_title}}<br></span>
              <span>@ <a 
                :href="getRecipientDomain"
                target="_blank">{{recipient.account_name}}</a></span>
            </span>
            <a 
              class="report"
              @click="onReportButton">Report</a>
          </div>
        </div>
        <!-- Details -->
        <dl class="details">
          <div 
            class="row"
            v-show="recipient.account_type">
            <dt>Account Type</dt>
            <dd>{{recipient.account_type}}</dd>
          </div>
          <div 
            class="row"
            v-show="recipient.business_type">
            <dt>Business Type</dt>
            <dd>{{recipient.business_type}}</dd>
          </div>
          <div 
            class="row"
            v-show="recipient.account_industries">
            <dt>Industries</dt>
            <dd>{{recipient.account_industries}}</dd>
          </div>
          <div 
            class="row"
            v-show="recipient.products_buy">
            <dt>Buy</dt>
            <dd>{{recipient.products_buy}}</dd>
          </div>
          <div 
            class="row"
            v-show="recipient.products">
            <dt>Sell</dt>
            <dd>{{recipient.products}}</dd>
          </div>
          <div 
            class="row"
            v-show="getRecipientAddress">
            <dt>Address</dt>
            <dd>{{getRecipientAddress}}</dd>
          </div>
          <div 
            class="row"
            v-show="recipient.phone">
            <dt>Phone</dt>
            <dd>{{recipient.phone}}</dd>
          </div>
          <div 
            class="row"
            v-show="recipient.website">
            <dt>Website</dt>
            <dd><a :href="getRecipientWebsite" target="_blank">{{recipient.website}}</a></dd>
          </div>
          <div 
            class="row"
            v-show="recipient.number_of_employees">
            <dt>Number of Employees</dt>
            <dd>{{recipient.number_of_employees}}</dd>
          </div>
          <div 
            class="row"
            v-show="recipient.established_year">
            <dt>Established Year</dt>
            <dd>{{recipient.established_year}}</dd>
          </div>
          <div 
            class="row"
            v-show="recipient.total_annual_revenue">
            <dt>Total Annual Revenue</dt>
            <dd>{{recipient.total_annual_revenue}}</dd>
          </div>
          <div 
            class="row" 
            v-show="recipient.language_spoken">
            <dt>Language</dt>
            <dd>{{recipient.language_spoken}}</dd>
          </div>
        </dl>
      </div>

      <!-- Right-side -->
      <div class="right-container">
        <!-- Form -->
        <form 
          @submit.prevent="sendMessage">
          <div class="input-container">
            <div class="input-inner-container">
              <textarea
                ref="textarea"
                placeholder="Enter message here."
                v-model="msg"></textarea>
              <button 
                :disabled="toggle.isSending">{{toggle.isSending ? 'Sending..' : 'Send Message'}}</button>
            </div>
            <circle-img 
              class="user-logo" 
              :url="getMyLogoUrl"/>
          </div>
        </form>
        <!-- Policy -->
        <!-- <div class="policy-container">
          <p>All content, including files attached to this chat room, is securely stored and never leaked to the outside.</p>
        </div> -->
        <!-- Chatting -->
        <div class="chat-container">
          <chat-buttle
            v-for="message in messages"
            :key="message.inbox_id"
            class="chat-bubble"
            :message="message"
            :isMine="isMyMessage(message)"
            :logoUrl="getRecipientLogoUrl"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// components
import ModalReport from '~/components/Modal/Report'
import Loader from '~/components/Spinner/Dots'
import ChatButtle from './components/ChatBubble'
import CircleImg from '~/components/Image/CircleViewer'
// libs
import axios from '~/plugins/axios'
import { showTopAlert } from '~/utils/alert'
import { getFullAddress, validateURL } from '~/utils/text'
import { mapGetters } from 'vuex'
export default {
  components: {
    ModalReport,
    Loader,
    ChatButtle,
    CircleImg
  },
  props: {
    account: {
      type: Object,
      default: () => {
        return {}
      }
    },
    contact: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      msg: '',
      messages: [],
      recipient: [],
      toggle: {
        isFetched: false,
        isSending: false,
        isReportHidden: true
      }
    }
  },
  computed: {
    getMessageBody() {
      const { conversation_id } = this.$route.params
      return {
        sender_id: this.contact.contact_id,
        recipient_id: this.recipient.contact_id || `${this.recipient.lead_id}L`,
        conversation_id: conversation_id,
        body: this.msg.trim()
      }
    },
    getRecipientName() {
      const { first_name, last_name, account_name } = this.recipient

      if (first_name && last_name) return `${first_name} ${last_name}`

      if (first_name) return first_name
      if (last_name) return last_name

      return ''
    },
    getRecipientDomain() {
      const { lead_id, account_domain } = this.recipient

      if (lead_id) return `/supplier/${account_domain}`

      return `/${account_domain}`
    },
    getRecipientWebsite() {
      return validateURL(this.recipient.website)
    },
    getRecipientAddress() {
      const {
        mailing_country,
        mailing_state,
        mailing_city,
        mailing_street_address,
        mailing_street_address_2
      } = this.recipient
      const payload = {
        country: mailing_country,
        state: mailing_state,
        city: mailing_city,
        street_address: mailing_street_address,
        street_address_2: mailing_street_address_2
      }
      return getFullAddress(payload)
    },
    getRecipientLogoUrl() {
      const { logo_url } = this.recipient
      return logo_url ? logo_url : require('~/assets/img/temp-logo-image_english_512.png')
    },
    getMyLogoUrl() {
      const { logo_url } = this.account
      return logo_url ? logo_url : require('~/assets/img/temp-logo-image_english_512.png')
    },
    getReportData() {
      const { lead_id, contact_id } = this.recipient

      if (lead_id)
        return {
          id: lead_id,
          table: 'leads'
        }

      return {
        id: contact_id,
        table: 'contacts'
      }
    },
    isRecipientSupplier() {
      const { account_type, business_type } = this.recipient
      return true
    }
  },
  methods: {
    init() {
      this.getData()
    },
    changeTitle() {
      const { account_name } = this.recipient
      document.title = `Chatting with ${this.getRecipientName || account_name}`
    },
    async getData() {
      const { conversation_id } = this.$route.params
      const { contact_id } = this.contact
      const ids = conversation_id.split('_')
      let recipient_id

      const canAccess = ids.indexOf(`${contact_id}`)
      if (canAccess === -1) this.redirectInbox()

      if (ids[0] === `${contact_id}`) recipient_id = ids[1]
      else recipient_id = ids[0]

      let api = `/api/data/inbox/conversation_id/${conversation_id}/${recipient_id}`

      try {
        const { data } = await axios.get(api)
        this.messages = data.messages
        this.recipient = data.recipient
        this.toggle.isFetched = true
        this.changeTitle()
      } catch (err) {
        console.log('err', err)
        this.redirectInbox()
      }
    },
    async sendMessage() {
      if (!this.msg) return

      const API = '/api/data/inbox'
      const body = this.getMessageBody
      this.toggle.isSending = true

      try {
        await axios.post(API, { body })
        location.reload()
      } catch (err) {
        showTopAlert(
          this.$store,
          false,
          'Sorry, server connection is not stable. Please try it later again.'
        )
        this.toggle.isSending = false
      }
    },
    onReportButton() {
      this.toggle.isReportHidden = false
    },
    isMyMessage(message) {
      const { sender_id } = message
      const isMine = this.contact.contact_id === sender_id

      if (isMine) return true

      return false
    },
    autoResize($textarea) {
      const $wrapper = this.$refs.textareaWrapper
      const { scrollHeight } = $textarea
      console.log('scroll height', scrollHeight)
      $wrapper.style.height = `${scrollHeight}px`
      console.log('wrapper height', $wrapper.style.height)
    },
    redirectInbox() {
      location.href = '/dashboard/inbox'
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';

* {
  margin: 0;
  padding: 0;
}
ul {
  list-style: none;
}

.container {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding-bottom: 30px;
}

.left-container {
  border: 1px solid @color-border-gray;
  border-radius: @border-radius;
  padding: 50px 28px;
  width: 284px;
}
.profile-container {
  text-align: center;
}
.recipient-logo {
  display: inline-block;
  width: 140px !important;
  height: 140px !important;
}
.contents-container {
  margin-top: 20px;
}
.recipient-name {
  display: block;
  font-size: 20px;
  font-weight: 500;
}
.recipient-title {
  display: block;
  margin-top: 4px;
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Open Sans', 'Helvetica Neue', sans-serif;
  color: @color-font-gray;
}
.report {
  display: inline-block;
  margin-top: 8px;
  font-size: 15px;
}
.details {
  margin-top: 30px;

  .row {
    margin-top: 32px;
    &:first-child {
      margin-top: 0;
    }
  }

  dt {
    margin-top: 14px;
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 500;
    color: #bbbbbb;
  }
  dd {
    font-size: 17px;
    margin-top: 4px;
  }
}

.right-container {
  margin-left: 60px;
  flex: 1;
  width: 100%;
}

.section__title {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 14px;
}
.input-container {
  display: flex;
  justify-content: space-between;

  .input-inner-container {
    flex: 1;
    text-align: right;
  }
  textarea {
    font-size: 16px;
    min-height: 180px;
    padding: 22px;
    line-height: 1.6;
    transition: border 0.3s;

    &:focus {
      border-color: @color-link;
    }
  }
  button {
    margin-top: 8px;
    padding: 11px 20px;
    border-radius: @border-radius;
    font-size: 16px;
    font-weight: 500;
    transition: background-color 0.3s;
    color: @color-white;
    background-color: @color-link;
    border: 0;

    &:hover {
      background-color: @color-dark-link;
    }
  }

  .user-logo {
    width: 50px !important;
    height: 50px !important;
    margin-left: 20px;
  }
}

.policy-container {
  border-top: 1px solid @color-border-gray;
  padding: 10px 20px;
  margin-top: 60px;
  color: @color-font-gray;
  font-size: 16px;
}

.chat-container {
  margin-top: 50px;
}
.chat-bubble {
  margin-top: 30px;

  &:first-child {
    margin-top: 0;
  }
}
</style>
