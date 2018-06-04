<template>
  <div class="section quotes-container">
    <!-- Title -->
    <h4 
      class="section__title"
      v-if="quotes.length">{{getQuotesLength}} Record</h4>
    <!-- Contents -->
    <div class="quote-container">
      <!-- Supplier Cards -->
      <card
        class="card"
        v-for="(quote,index) in quotes"
        :key="quote.quote_id"
        :data="quote"
        :topDateDiff="getPostedDate(quote)"
        @onReport="onReportButton(quote.quote_id)">
        <!-- Name -->
        <div 
          slot="name"
          class="name-container">
          <div>
            <span 
              class="name">
              <a 
                href="/user">{{getUserName(quote)}}</a></span>
          </div>
          <div class="sub-name">
            <span>
              {{quote.contact_title}}</span>
            <span 
              class="dot">@</span>
            <span>
              <a 
                class="company" 
                :href="`/${quote.account_domain}`" 
                target="_blank">{{quote.account_name}}</a></span>
          </div>
        </div>
        <!-- Main -->
        <div slot="main">
          <textarea 
            ref="textarea"
            class="description"
            :value="quote.description"
            readonly>
          </textarea>
        </div>
        <!-- Card Footer -->
        <div slot="footer">
          <!-- Chat Now Button -->
          <basic-button
            id="quote-button"
            class="button"
            @onButton="onChatNowButton(index)">
            Chat Now
          </basic-button>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
import Card from './common/Card'
import BasicButton from '~/components/Button'
import TextInput from '~/components/Inputs/Text'
import { getCreatedDateDiff } from '~/utils/timezone'
export default {
  props: ['quotes'],
  components: {
    Card,
    BasicButton,
    TextInput
  },
  computed: {
    getQuotesLength() {
      return this.quotes.length === 1 ? '1 Quote' : `${this.quotes.length} Quotes`
    }
  },
  methods: {
    init() {
      this.resizeTextarea()
    },
    onReportButton(id) {
      const payload = {
        table: 'quotes',
        id: id
      }
      this.$emit('onReport', payload)
    },
    getUserName(quote) {
      const { first_name, last_name } = quote

      let name = ''

      if (first_name || !last_name) name = first_name
      if (!first_name || last_name) name = last_name
      if (first_name && last_name) name = `${first_name} ${last_name}`
      if (!first_name && !last_name) name = 'Unknown'

      return name
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

      for (let i = 0; i < $textareas.length; i++) {
        const $textarea = $textareas[i]
        const scrollHeight = $textarea.scrollHeight
        $textarea.style.height = `${scrollHeight}px`
      }
    },
    onChatButton() {
      this.$emit('onChatNow')
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="less" scoped>
@import '../styles/index';

.description {
  padding: 0;
  border: 0;
  font-size: 14px;
  resize: none;
  overflow: hidden;
  line-height: 1.7;

  @media (min-width: 744px) {
    font-size: 16px;
  }
}
</style>
