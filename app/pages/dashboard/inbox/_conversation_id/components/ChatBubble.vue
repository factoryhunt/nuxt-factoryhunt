<template>
  <div>
    <div class="bubble">
      <modal-report
        title="Report Message"
        type="checkbox"
        :isHidden="isReportHidden"
        :payload="getReportData"
        @close="isReportHidden = true"/>
      <img 
        class="flag-button"
        src="~assets/icons/flag.svg" 
        alt="report"
        v-show="!isMine"
        @click="onReportButton">
      <circle-img 
        class="logo recipient-img" 
        :url="getLogoUrl"
        v-show="!isMine"/>
      <div class="text-container">
        <div 
          class="bubble-wrapper"
          ref="bubbleWrapper"
          :class="{mine: isMine}">
          <div 
            class="chat"
            v-html="getBody"></div>
          <a
            class="link-preview" 
            v-show="extractedUrl"
            target="_blank"
            :href="extractedUrl">
            <i 
              class="fa fa-globe globe" 
              aria-hidden="true"></i>Open the attached link on a new tab</a>
        </div>
        <div class="time">{{getCreatedDate}}</div>
      </div>
      <circle-img 
        class="logo user-img" 
        :url="getMylogoUrl"
        v-show="isMine"/>
    </div>
  </div>
</template>

<script>
// components
import ModalReport from '~/components/Modal/Report'
import CircleImg from '~/components/Image/CircleViewer'
import Reports from '~/assets/models/reports.json'
// libs
import axios from '~/plugins/axios'
import { getCreatedDateDiff } from '~/utils/timezone'
import { urlify } from '~/utils/text'
import { mapGetters } from 'vuex'
export default {
  components: {
    ModalReport,
    CircleImg
  },
  props: ['message', 'logoUrl', 'isMine'],
  data: () => ({
    reports: Reports,
    extractedUrl: '',
    isReportHidden: true
  }),
  computed: {
    ...mapGetters({
      account: 'auth/GET_ACCOUNT'
    }),
    getMylogoUrl() {
      const { logo_url } = this.account
      return logo_url ? logo_url : require('~/assets/img/temp-logo-image_english_512.png')
    },
    getLogoUrl() {
      return this.logoUrl ? this.logoUrl : require('~/assets/img/temp-logo-image_english_512.png')
    },
    getReportData() {
      return {
        id: this.message.inbox_id,
        table: 'inbox'
      }
    },
    getCreatedDate() {
      const payload = {
        year_diff: this.message.year_diff,
        month_diff: this.message.month_diff,
        week_diff: this.message.week_diff,
        day_diff: this.message.day_diff,
        hour_diff: this.message.hour_diff,
        minute_diff: this.message.minute_diff,
        second_diff: this.message.second_diff
      }
      const result = getCreatedDateDiff(payload)

      return result
    },
    getBody() {
      let { body } = this.message
      body = urlify(body)
      body = body.replace(/\n/g, '<br>')
      return body
    }
  },
  methods: {
    init() {
      // this.resizeTextarea()
      this.extractUrl()
    },
    extractUrl() {
      const urls = this.message.body.match(/\bhttps?:\/\/\S+/gi)

      if (urls) this.extractedUrl = urls[0]
    },
    onReportButton() {
      console.log('onreport')
      this.isReportHidden = false
    }
  },
  mounted() {
    this.init()
  }
}
</script>


<style lang="less" scoped>
@import '~assets/css/index';
.bubble {
  display: flex;
  width: 100%;
  position: relative;
}
.text-container {
  flex: 1;
}
.bubble-wrapper {
  font-size: 16px;
  padding: 22px;
  line-height: 1.6;
  border: 1px solid @color-border-gray;
  border-radius: @border-radius;

  &.mine {
    background-color: @color-bg-gray;
  }

  .link-preview {
    display: block;
    color: @color-font-black;
    line-height: unset;
    background-color: @color-white;
    padding: 20px 11px;
    margin-top: 50px;
    border: 1px solid @color-border-gray;
    text-decoration: none;
    transition: border linear 0.3s;

    &:hover {
      border-color: @color-link;
    }
  }
  .globe {
    margin: 0 6px;
  }
}
.logo {
  width: 50px !important;
  height: 50px !important;
}
.recipient-img {
  margin-right: 20px;
}
.user-img {
  margin-left: 20px;
}
.flag-button {
  position: absolute;
  top: 22px;
  right: 22px;
  width: 20px;
  height: 20px;
  transform: rotate(11deg);

  &:hover {
    cursor: pointer;
  }
}
.time {
  margin-top: 3px;
  margin-right: 6px;
  text-align: right;
  font-size: 12px;
  color: @color-font-gray;
}
</style>
