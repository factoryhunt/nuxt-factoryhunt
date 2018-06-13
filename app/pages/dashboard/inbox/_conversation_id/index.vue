<template>
  <div ref="page" class="dashboard-page-container">
    <modal-report
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
        <div class="profile-container">
          <circle-img 
            class="recipient-logo"
            :url="recipient.logo_url"/>
          <div class="contents-container">
            <span class="recipient-name">{{ getRecipientName }}</span>
            <span 
              class="recipient-title">
              {{recipient.contact_title}} @ 
              <a 
                :href="`/${recipient.account_domain}`"
                target="_blank">{{recipient.account_name}}</a></span>
            <a 
              class="report"
              @click="onReportButton">Report</a>
          </div>
        </div>
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
                placeholder="Enter Message Here."
                v-model="msg"></textarea>
              <button>Send Message</button>
            </div>
            <circle-img 
              class="user-logo" 
              :url="account.logo_url"/>
          </div>
        </form>
        <!-- Policy -->
        <div class="policy-container">
          <p>All content, including files attached to this chat room, is securely stored and never leaked to the outside world.</p>
        </div>
        <!-- Chatting -->
        <div class="chat-container">
          <chat-buttle
            v-for="message in messages"
            :key="message.inbox_id"
            class="chat-bubble"
            :message="message"
            :isMine="isMyMessage(message)"
            :logoUrl="recipient.logo_url"/>
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
        isReportHidden: true
      }
    }
  },
  computed: {
    getMessageBody() {
      const { conversation_id } = this.$route.params
      return {
        sender_id: this.contact.contact_id,
        recipient_id: this.recipient.contact_id,
        conversation_id: conversation_id,
        body: this.msg.trim()
      }
    },
    getRecipientName() {
      const { first_name, last_name } = this.recipient

      if (first_name && last_name) return `${first_name} ${last_name}`

      if (first_name) return fisrt_name
      if (last_name) return last_name

      return 'Unknown'
    },
    getReportData() {
      return {
        id: this.recipient.contact_id,
        table: 'contacts'
      }
    }
  },
  methods: {
    init() {
      this.getData()
    },
    changeTitle() {
      document.title = `Chatting with ${this.getRecipientName}`
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

      const API = `/api/data/inbox/conversation_id/${conversation_id}/${recipient_id}`

      try {
        const { data } = await axios.get(API)
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

      try {
        await axios.post(API, { body })
        location.reload()
      } catch (err) {
        alert('sending message failed')
        showTopAlert(this.$store, false, 'Sorry, failed sending message. Please try again later.')
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
  padding: 50px 40px;
  max-width: 300px;
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
  margin-top: 10px;
  font-size: 15px;
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
    border: 1px solid @color-deep-gray;
    border-radius: @border-radius;
    font-size: 16px;
    transition: border 0.3s, color 0.3s;
    background-color: @color-white;

    &:hover {
      border-color: @color-link;
      color: @color-link;
    }
  }

  .user-logo {
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
