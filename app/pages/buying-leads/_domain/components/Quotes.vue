<template>
  <div class="section quotes-container">
    <!-- Title -->
    <h4 class="section__title">3 Quotes Record</h4>
    <!-- Contents -->
    <div class="quote-container">
      <!-- Supplier Cards -->
      <card
        class="card"
        v-for="(quote,index) in quotes"
        :key="index"
        :data="quote"
        @onReport="onReportButton(quote.id)">
        <!-- Name -->
        <div 
          slot="name"
          class="name-container">
          <div>
            <span class="name"><a href="/user">Peter Kim</a></span>
          </div>
          <div class="sub-name">
            <span>Product Manager</span>
            <span class="dot">@</span>
            <span><a class="company" href="/zizle" target="_blank">Factory Hunt Team</a></span>
          </div>
        </div>
        <!-- Main -->
        <div slot="main">
          <div class="description">
            I suggest some toys for you. Please chat me.
          </div>
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
import Card from './Card'
import BasicButton from '~/components/Button'
import TextInput from '~/components/Inputs/Text'
export default {
  props: ['quotes'],
  components: {
    Card,
    BasicButton,
    TextInput
  },
  methods: {
    onReportButton(id) {
      const payload = {
        table: 'quotes',
        id: id
      }
      this.$emit('onReport', payload)
    },
    onChatButton() {
      this.$emit('onChatNow')
    }
  }
}
</script>

<style lang="less" scoped>
@import '../styles/index';

.description {
  font-size: 16px;
}
</style>
