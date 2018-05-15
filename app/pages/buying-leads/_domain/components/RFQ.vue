<template>
  <div class="rfq-container">
    <!-- Buyer RFQ Card -->
      <card
        :data="buyingLead"
        @onReport="onReportButton('rfq')">

        <!-- User Name -->
        <div 
          slot="name"
          class="name-container">
          <div class="name">
            <a href="/user">Filip Zajac</a></div>
          <div class="sub-name">Importing Header Office Manager</div>
        </div>

        <!-- Verified Mark -->
        <section class="verify-container">
          <ul>
            <li><tool-tip
                label="South Korea">This buyer posted in South Korea</tool-tip></li>
            <li><tool-tip
                label="1K Pieces">Buyer wants 1K Pieces quantities.</tool-tip></li>
            <li><tool-tip
                label="Email Confirmed">This buyer emails is confirmed.</tool-tip></li>
            <li><tool-tip
                label="Active Buyer">This is test tool-tip box! This is test tool-tip box! This is test tool-tip box! This is test tool-tip box!</tool-tip></li>
            <li><tool-tip
                label="FOB">This is test tool-tip box! This is test tool-tip box! This is test tool-tip box! This is test tool-tip box!</tool-tip></li>
            <li><tool-tip
                label="T/T">This is test tool-tip box! This is test tool-tip box! This is test tool-tip box! This is test tool-tip box!</tool-tip></li>
            <li><tool-tip
                label="Busan">This is test tool-tip box! This is test tool-tip box! This is test tool-tip box! This is test tool-tip box!</tool-tip></li>
            <li><tool-tip
                label="1 USD">This is test tool-tip box! This is test tool-tip box! This is test tool-tip box! This is test tool-tip box!</tool-tip></li>
          </ul>
        </section>

        <!-- Content -->
        <div slot="main">

          <!-- Main Content -->
          <section class="content">
            <h1>{{buyingLead.title}}</h1>
            <div class="description" v-html="buyingLead.description"></div>
          </section>

          <!-- Other Requirement -->
          <!-- <section class="other-requirement-container">
            <dl>
              <dt>Delivery Term</dt>
              <dd>FOB</dd>
            </dl>
            <dl>
              <dt>Payment Type</dt>
              <dd>T/T</dd>
            </dl>
          </section> -->

          <!-- Images -->
          <section class="product">
            <div class="product-wrapper">
              <div class="product__image-container">
                <img src="https://sc01.alicdn.com/kf/UTB8.Ljmy5DEXKJk43Oqq6Az3XXaH.jpg_200x200xz.jpg">
              </div>
              <div class="product__image-container">
                <img src="https://zdnet2.cbsistatic.com/hub/i/r/2017/07/18/071068d1-e257-4abf-811d-48a626f621f7/resize/770xauto/72e298cc964f48604e0edb0a3ee72339/bear.jpg">
              </div>
              <div class="product__image-container">
                <img src="https://images.unsplash.com/photo-1514557179557-9efc4d7949cc?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fc34800506787363e917e96d6b091817&auto=format&fit=crop&w=1600&q=60">
              </div>
              <div class="product__image-container">
                <img src="https://images.unsplash.com/photo-1524253860834-0e02422248bc?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9758e730ae59212caca2bf7d046770b8&auto=format&fit=crop&w=1600&q=60">
              </div>
              <div class="product__image-container">
                <img src="https://images.unsplash.com/photo-1496198225320-0dd08d34b9d8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e975bc534cdf469fa29525749e5d0ee2&auto=format&fit=crop&w=1600&q=60">
              </div>
            </div>
          </section>
        </div>

        <!-- Card Footer -->
        <div slot="footer">
          <!-- Quote Now Button -->
          <basic-button
            id="quote-button"
            class="button"
            @onButton="onQuoteButton">
            Quote Now
          </basic-button>

          <!-- Link Copy Button -->
          <basic-button
            id="copy-button"
            type="black"
            class="button"
            @onButton="onLinkCopyButton">
            Link Copy
          </basic-button>
        </div>
      </card>
  </div>
</template>

<script>
import Card from './Card'
import BasicButton from '~/components/Button'
import ToolTip from '~/components/ToolTip'
export default {
  components: {
    Card,
    BasicButton,
    ToolTip
  },
  props: ['buyingLead'],
  methods: {
    onReportButton(contact_id) {
      console.log('onReport Button', contact_id)
    },
    onQuoteButton() {},
    onLinkCopyButton() {}
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
  padding-top: @card-padding;
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
  margin-top: 80px;
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
    object-fit: cover;
  }
}
</style>
