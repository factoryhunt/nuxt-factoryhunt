<template>
  <div>
    <div class="bubble">
      <modal-report
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
        :url="logoUrl"
        v-show="!isMine"/>
      <textarea 
        ref="textarea"
        :class="{mine: isMine}"
        :value="message.body"
        readonly></textarea>
      <circle-img 
        class="logo user-img" 
        :url="account.logo_url"
        v-show="isMine"/>
    </div>
    <div class="time">{{getCreatedDate}}</div>
  </div>
</template>

<script>
// components
import ModalReport from '~/components/Modal/Report'
import CircleImg from '~/components/Image/CircleViewer'
// libs
import { getCreatedDateDiff } from '~/utils/timezone'
import { mapGetters } from 'vuex'
export default {
  components: {
    ModalReport,
    CircleImg
  },
  props: ['message', 'logoUrl', 'isMine'],
  data: () => ({
    isReportHidden: true
  }),
  computed: {
    ...mapGetters({
      account: 'auth/GET_ACCOUNT'
    }),
    getRecipientLogoUrl() {
      return this.logoUrl ? this.logoUrl : require('~/assets/icons/user.svg')
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
    }
  },
  methods: {
    init() {
      this.resizeTextarea()
    },
    resizeTextarea() {
      const textarea = this.$refs['textarea']
      const height = textarea.scrollHeight
      textarea.style.height = `${height}px`
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
textarea {
  flex: 1;
  font-size: 18px;
  padding: 22px;
  line-height: 1.6;
  resize: none;
  border: 1px solid @color-border-gray;
  border-radius: @border-radius;
  overflow: hidden;

  &.mine {
    background-color: @color-bg-gray;
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
  margin-top: 6px;
  margin-right: 6px;
  text-align: right;
  font-size: 12px;
  color: @color-font-gray;
}
</style>
